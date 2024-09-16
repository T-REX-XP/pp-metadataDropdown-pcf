import * as React from 'react';
import { useState } from 'react';
import { IComboBoxOption } from '@fluentui/react';
import { IRepository } from '../Repository/Repository';
import { CustomDropdown } from './CustomDropdown';
import IOptionSetValue from '../abstracts/IOptionSetValue';


export interface IMainComponentProps {
  repository: IRepository;
  options: IOptionSetValue[];
  onChange: (newValue: string | number | undefined) => void;
  isDisabled: boolean;
  selectedKey: number | undefined;
}

export const MainComponent: React.FunctionComponent<IMainComponentProps> = (props) => {
  const [options, setOptions] = useState<IComboBoxOption[]>();
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
    />
  )
}
