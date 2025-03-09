import * as React from 'react';
import { Dropdown, IDropdownOption, Icon, mergeStyles } from '@fluentui/react';
import IOptionSetValue from '../abstracts/IOptionSetValue';
import { IThemeProvider } from '../Utils/ThemeProvider';
import { getClassNames, getDropdownStyles } from './CustomDropdown.Styles';

interface CustomDropdownProps {
  options: IOptionSetValue[];
  defaultOptionText?: string; // Text for the default option (placeholder-like)
  selectedKey?: string; // Selected key for controlled component
  defaultSelectedKey?: number; // Default selected key when component loads
  placeholder?: string; // Optional placeholder for empty state
  isDisabled?: boolean; // Support for disabling the dropdown
  isReadOnly?: boolean; // Support for read-only mode
  onChange: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => void;
  themeProvider: IThemeProvider;
}


export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  defaultOptionText = 'Select an option', // Default placeholder option text
  selectedKey,
  defaultSelectedKey,
  placeholder = 'Select an option',
  isDisabled = false,
  isReadOnly = false,
  onChange,
  themeProvider
}): React.ReactElement => {
  const [internalSelectedKey, setInternalSelectedKey] = React.useState<string | number | undefined>(defaultSelectedKey);
  const [selectedColor, setSelectedColor] = React.useState<string | undefined>(undefined);
  const isModernStyles = themeProvider?.isFormModernizationEnabled()
    && themeProvider?.isUseModernTheme()
    && themeProvider?.isFluentEnabled();

  const classNames = getClassNames(isModernStyles, themeProvider);
  // Add default placeholder option at the top
  const dropdownOptions: IDropdownOption[] = [
    { key: 'default', text: defaultOptionText, data: { color: 'transparent' } }, // Default option at the top
    ...options.map((opt) => ({
      key: opt.Value,
      text: opt.Label,
      data: { color: opt.Color || 'transparent' }, // Fallback to transparent if no color
    })),
  ];

  // Handle option change to set selected color and key
  const handleChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (isReadOnly || isDisabled) return; // Prevent changes in readonly/disabled mode

    if (option?.key === 'default') {
      setInternalSelectedKey(undefined); // Reset to undefined if default option is selected
      setSelectedColor(undefined); // Reset the selected color
      onChange(event, undefined); // Call onChange with undefined to clear the value
      return;
    }

    if (option && option.data?.color) {
      setSelectedColor(option.data.color); // Set the selected color for the dropdown
    }

    setInternalSelectedKey(option?.key as string); // Update internal state
    onChange(event, option); // Call external onChange
  };

  // Set selected color if selectedKey or defaultSelectedKey changes
  React.useEffect(() => {
    const selectedOption = dropdownOptions.find((option) => option.key === (selectedKey || internalSelectedKey));
    if (selectedOption && selectedOption.data?.color) {
      setSelectedColor(selectedOption.data.color);
    }
  }, [selectedKey, internalSelectedKey, dropdownOptions]);

  const onRenderOption = (option?: IDropdownOption): React.ReactElement | null => {
    if (!option) return null;

    const backgroundColor = option.data?.color || 'transparent'; // Fallback to transparent if no color
    const isSelected = option.key === (selectedKey || internalSelectedKey); // Check if the current option is the selected one

    return (
      <div
        className={mergeStyles(classNames.dropdownOption, {
          backgroundColor,
        }, isSelected ? classNames.selectedOption : classNames.unselectedOption)}
      >
        {isSelected && option.key !== 'default' && (
          <Icon iconName="CheckMark" className={classNames.iconClass} /> // Render checkmark if selected
        )}
        {option.text}
      </div>
    );
  };

  const onRenderTitle = (options?: IDropdownOption[]): React.ReactElement | null => {
    const option = options && options[0];
    if (!option) return null;

    const backgroundColor = option.data?.color || 'transparent'; // Fallback to transparent if no color
    return (
      <div className={mergeStyles({ backgroundColor, borderRadius: '4px' })}>
        {option.text}
      </div>
    );
  };

  return (
      <Dropdown
        placeholder={placeholder}
        options={dropdownOptions}
        defaultSelectedKey={internalSelectedKey}
        selectedKey={selectedKey} // Use selectedKey or internal selected key
        onChange={handleChange}
        onRenderOption={onRenderOption} // Use custom render function for options with checkmark
        onRenderTitle={onRenderTitle} // Use custom render function for the selected item
        styles={getDropdownStyles(selectedColor)} // Apply custom styles with no borders, only bottom line
        disabled={isDisabled} // Disable the dropdown when isDisabled is true
      />
  );
};

export default CustomDropdown;
