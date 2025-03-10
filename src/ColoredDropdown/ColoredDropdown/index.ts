import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { MainComponent, IMainComponentProps } from "./components/MainComponent";
import * as React from "react";
import { IRepository, Repository } from "./Repository/Repository";
import IContextNew from "./abstracts/IContextNew";
import IOptionSetValue from "./abstracts/IOptionSetValue";
import ThemeProvider, { IThemeProvider } from "./Utils/ThemeProvider";

export class ColoredDropdown implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private _webApi: ComponentFramework.WebApi;
    private _utility: ComponentFramework.Utility;
    private _context: IContextNew;
    private _repository: IRepository;
    private _selectedValue: string | number | undefined;
    private _options: IOptionSetValue[];
    private _themeProvider: IThemeProvider;
    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this._themeProvider = new ThemeProvider(context);
        this._context = context as IContextNew;
        this._webApi = this._context.webAPI;
        this._utility = this._context.utils;
        this._repository = new Repository(this._webApi, this._utility);
        this._options = this._context.parameters.value?.attributes?.Options as IOptionSetValue[];
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this._selectedValue = context.parameters.value.raw ?? undefined;

        const props: IMainComponentProps = {
            options: this._options,
            repository: this._repository,
            onChange: this.onChange,
            isDisabled: context.mode.isControlDisabled,
            selectedKey: this._selectedValue,
            themeProvider: this._themeProvider
        };
        return React.createElement(
            MainComponent, props
        );
    }
    onChange = (newValue: string | number | undefined): void => {
        this._selectedValue = newValue;
        this.notifyOutputChanged();
    };

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        // custom code goes here - remove the line below and return the correct output
        const result: IOutputs = {
            value: this._selectedValue as number
        };
        return result;
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
