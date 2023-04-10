import * as React from 'react';
import { useState } from 'react';
import { ComboBox, IComboBoxOption } from '@fluentui/react';
import { IRepository } from './Repository/Repository';
import { Utils } from './Utils/Utils';

export interface IMainComponentProps {
  repository: IRepository;
  endpoint: string;
  options: string;
  keyFieldName: string;
  textFieldName: string;
  onChange: (option: IComboBoxOption | undefined) => void;
  isDisabled: boolean;
  selectedKey: string | undefined;
  mask: string | undefined;
}

export const MainComponent: React.FunctionComponent<IMainComponentProps> = (props) => {
  const [options, setOptions] = useState<IComboBoxOption[]>();

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
    <ComboBox options={options || []}
      placeholder='---'
      onChange={(event, option) => props.onChange(option)}
      autoComplete='on'
      disabled={props.isDisabled}
      selectedKey={props.selectedKey}
    />
  )
}
