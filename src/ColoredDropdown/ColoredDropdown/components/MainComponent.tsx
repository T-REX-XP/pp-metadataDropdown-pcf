import * as React from 'react';
import { IRepository } from '../Repository/Repository';
import { CustomDropdown } from './CustomDropdown';
import IOptionSetValue from '../abstracts/IOptionSetValue';
import { IThemeProvider } from '../Utils/ThemeProvider';


export interface IMainComponentProps {
  repository: IRepository;
  options: IOptionSetValue[];
  onChange: (newValue: string | number | undefined) => void;
  isDisabled: boolean;
  selectedKey: number | undefined;
  themeProvider: IThemeProvider;
}

export const MainComponent: React.FunctionComponent<IMainComponentProps> = (props) => {
  const [selectedKey, setSelectedKey] = React.useState<string | number | undefined>();
  return (
    <CustomDropdown
      options={props.options || []}
      defaultOptionText="--Select--" // Default option text (acts like a placeholder)
      onChange={(e, option) => {
        const newValue = option?.key;
        setSelectedKey(newValue);
        props.onChange(newValue)
      }}
      placeholder='---'
      defaultSelectedKey={props.selectedKey}
      isDisabled={props.isDisabled}
      themeProvider={props.themeProvider}
    />
  )
}
