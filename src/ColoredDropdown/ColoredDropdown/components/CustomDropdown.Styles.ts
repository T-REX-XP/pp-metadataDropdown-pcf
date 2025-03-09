import { IDropdownStyles, mergeStyleSets } from '@fluentui/react';
import { DefaultPalette } from '@fluentui/theme';
import { IThemeProvider } from '../Utils/ThemeProvider';

export const getClassNames = (isModernStyles: boolean, themeProvider: IThemeProvider) =>
  mergeStyleSets({
    dropdownOption: {
      padding: '8px',
      marginBottom: '4px',      
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'space-between', // Add space between checkmark and text
      width: '100%', // Ensure the background color applies to the full width of the item
      selectors: {
        ':hover': {
          backgroundColor: isModernStyles
            ? themeProvider?.getTokens()?.colorBrandBackground // Modern theme color
            : DefaultPalette.themePrimary, // Default Fluent UI primary color
          color: '#fff', // White text on hover
        },
      },
    },
    selectedOption: {
      color: '#fff', // Text color for selected item
    },
    unselectedOption: {
      color: '#000', // Text color for unselected item
    },
    iconClass: {
      marginLeft: '8px', // Add margin to push the checkmark icon outside
      
    },
    textWrapper: {
      flex: 1, // Ensure the text takes full available space
      padding: '8px',
    },
    container: {
      backgroundColor: isModernStyles ? themeProvider?.getTokens()?.colorNeutralBackground3 : '#fff',
      padding: '10px 5px 10px 10px',
      marginRight: '3px',
      maxHeight: '400px',
      overflow: 'scroll',
      width: '100%',
      boxShadow: isModernStyles ? 'none' : '0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)',
    },
  });

export const getDropdownStyles = (selectedColor: string | undefined) => {
  // Apply styles to the dropdown, removing borders and adding bottom border on focus
  const dropdownStyles: Partial<IDropdownStyles> = {
    root: {
      width: '100%',
      // borderRadius: '4px',
    },
    title: {
      backgroundColor: selectedColor, // Apply selected color to dropdown title background
      border: 'none', // Remove all borders
      borderBottom: '2px solid transparent', // Default transparent bottom border
      borderRadius: '4px', // No border radius
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
  return dropdownStyles;
}