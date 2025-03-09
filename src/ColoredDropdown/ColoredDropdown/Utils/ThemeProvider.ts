export interface IThemeProvider {
    getTokens(): any;
    isFormModernizationEnabled(): boolean;
    isUseModernTheme(): boolean;
    isFluentEnabled(): boolean;
}


export class ThemeProvider implements IThemeProvider {
    private _isFormModernizationEnabled: boolean;
    private _useModernTheme: boolean;
    private _isFluentEnabled: boolean;
    private _tokens: any;

    constructor(context: any) {
        try {
            if((context.utils as any)?.isFeatureEnabled){
                this._isFormModernizationEnabled = (context.utils as any)?.isFeatureEnabled("FormModernization");
                this._useModernTheme = (context.utils as any)?.isFeatureEnabled("ModernLookupControl");
                this._isFluentEnabled = (context as any)?.appSettings?.getIsFluentThemingEnabled();
                if (this._isFluentEnabled) {
                    this._tokens = (context as any)?.fluentDesignLanguage?.tokenTheme;
                    this._initializeModernStyles();
                }
            }else{
                this._isFormModernizationEnabled = false;
                this._useModernTheme = false;
                this._isFluentEnabled = false;
            }
           
        } catch (e) {
          //  console.log(e);
        }
    }
    private _initializeModernStyles(): void {
        //TODO: Add the modern styles here
    }
    public getTokens(): any {
        return this._tokens;
    }
    public isFormModernizationEnabled(): boolean {
        return this._isFormModernizationEnabled;
    }
    public isUseModernTheme(): boolean {
        return this._useModernTheme;
    }
    public isFluentEnabled(): boolean {
        return this._isFluentEnabled;
    }
}

export default ThemeProvider;