import * as React from 'react';
import { useState } from 'react';
import { IComboBoxOption, IDropdownOption } from '@fluentui/react';
import { IRepository } from '../Repository/Repository';
import { Utils } from '../Utils/Utils';
import { CustomDropdown, CustomDropdownOption } from './CustomDropdown';

export interface IMainComponentProps {
  repository: IRepository;
  endpoint: string;
  options: string;
  keyFieldName: string;
  textFieldName: string;
  onChange: (newValue: string | undefined) => void;
  isDisabled: boolean;
  selectedKey: string | undefined;
  mask: string | undefined;
}

export const MainComponent: React.FunctionComponent<IMainComponentProps> = (props) => {
  const [options, setOptions] = useState<IComboBoxOption[]>();
  const [selectedKey, setSelectedKey] = React.useState<string | undefined>();
  const sampleOptions: CustomDropdownOption[] = [
    { key: '1', text: 'Option 1', color: '#ffcccc' },
    { key: '2', text: 'Option 2', color: '#ccffcc' },
    { key: '3', text: 'Option 3', color: '#ccccff' },
  ];


  function useLoadItems() {
    React.useEffect(() => {
      (async () => {
        const items = await props.repository?.retrieveMultipleRecords(props.endpoint, props.options, 5000)
          .then(data => data.entities)
          .then(records => {
            return Promise.resolve(records.map(record => {
              return {
                key: record[props.keyFieldName],
                text: !props.mask ? record[props.textFieldName] : Utils.format(props.mask, record)
              };
            }));
          });

        setOptions(items);
      })();
    }, []);
  }
  useLoadItems();

  return (
    <CustomDropdown
      options={sampleOptions || []}
      defaultOptionText="--Select--" // Default option text (acts like a placeholder)
      onChange={(e, option) => {
        const newValue = option?.key as string;
        setSelectedKey(newValue);
        props.onChange(newValue)
      }}
      placeholder='---'
      defaultSelectedKey={props.selectedKey}
    />
  )
}
