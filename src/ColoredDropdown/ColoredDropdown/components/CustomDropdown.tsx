import * as React from 'react';
import { Dropdown, IDropdownOption, IDropdownStyles, Icon } from '@fluentui/react';

export interface CustomDropdownOption {
  key: string;
  text: string;
  color?: string; // Optional color property for background
}

interface CustomDropdownProps {
  options: CustomDropdownOption[];
  defaultOptionText?: string; // Text for the default option (placeholder-like)
  selectedKey?: string; // Selected key for controlled component
  defaultSelectedKey?: string; // Default selected key when component loads
  placeholder?: string; // Optional placeholder for empty state
  isDisabled?: boolean; // Support for disabling the dropdown
  isReadOnly?: boolean; // Support for read-only mode
  onChange: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => void;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  defaultOptionText = 'Select an option', // Default placeholder option text
  selectedKey,
  defaultSelectedKey,
  placeholder = 'Select an option',
  isDisabled = false,
  isReadOnly = false,
  onChange
}): React.ReactElement => {
  const [internalSelectedKey, setInternalSelectedKey] = React.useState<string | undefined>(defaultSelectedKey);
  const [selectedColor, setSelectedColor] = React.useState<string | undefined>(undefined);

  // Add default placeholder option at the top
  const dropdownOptions: IDropdownOption[] = [
    { key: 'default', text: defaultOptionText, data: { color: 'transparent' } }, // Default option at the top
    ...options.map((opt) => ({
      key: opt.key,
      text: opt.text,
      data: { color: opt.color || 'transparent' }, // Fallback to transparent if no color
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
    const selectedOption = dropdownOptions.find(option => option.key === (selectedKey || internalSelectedKey));
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
        style={{
          backgroundColor, // Apply the background color to the entire item
          padding: '8px', // Padding for the item
          marginBottom: '4px', // Optional margin between items
          color: isSelected ? '#fff' : '#000', // Text color: white if selected, black otherwise
          display: 'flex',
          alignItems: 'center',
          width: '100%', // Ensure the background color applies to the full width of the item
        }}
      >
        {isSelected && option.key !== 'default' && (
          <Icon iconName="CheckMark" style={{ marginRight: '8px' }} /> // Render checkmark if selected
        )}
        {option.text}
      </div>
    );
  };

  // Custom rendering for the selected item with background color
  const onRenderTitle = (options?: IDropdownOption[]): React.ReactElement | null => {
    const option = options && options[0];
    if (!option) return null;

    const backgroundColor = option.data?.color || 'transparent'; // Fallback to transparent if no color
    return (
      <div style={{ backgroundColor, padding: '4px 8px', borderRadius: '4px' }}>
        {option.text}
      </div>
    );
  };

  // Apply styles to the dropdown, removing borders and adding bottom border on focus
  const dropdownStyles: Partial<IDropdownStyles> = {
    title: {
      backgroundColor: selectedColor, // Apply selected color to dropdown title background
      border: 'none', // Remove all borders
      borderBottom: '2px solid transparent', // Default transparent bottom border
      borderRadius: '0px', // No border radius
      boxShadow: 'none', // No shadow
    },
    dropdownItem: {
      borderRadius: '4px',
    },
    dropdownItemSelected: {
      borderRadius: '4px',
    },
    caretDownWrapper: {
      color: selectedColor, // Apply selected color to the dropdown icon
    },
    callout: {
      border: 'none', // Remove callout border
    },
    dropdown: {
      selectors: {
        '&:focus-within .ms-Dropdown-title': {
          borderBottom: '2px solid #0078D4', // Show bottom border when focused or selected
        },
        '&:hover .ms-Dropdown-title': {
          borderBottom: '2px solid #0078D4', // Show bottom border on hover
        },
      },
    },
  };

  return (
    <Dropdown
      placeholder={placeholder}
      options={dropdownOptions}
      defaultSelectedKey={internalSelectedKey}
      selectedKey={selectedKey} // Use selectedKey or internal selected key
      onChange={handleChange}
      onRenderOption={onRenderOption} // Use custom render function for options with checkmark
      onRenderTitle={onRenderTitle}   // Use custom render function for the selected item
      styles={dropdownStyles}         // Apply custom styles with no borders, only bottom line
      disabled={isDisabled}           // Disable the dropdown when isDisabled is true
    />
  );
};

export default CustomDropdown;
