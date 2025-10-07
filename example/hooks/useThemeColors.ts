import { useColorScheme } from './useColorScheme';

// Extended color palette for the app
const lightColors = {
  // Base colors
  primary: '#673AB7',
  secondary: '#4CAF50',
  danger: '#f44336',
  warning: '#FF9800',
  info: '#2196F3',
  success: '#4CAF50',
  
  // On colors (text/icons on colored backgrounds)
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onDanger: '#FFFFFF',
  onWarning: '#FFFFFF',
  onInfo: '#FFFFFF',
  onSuccess: '#FFFFFF',
  
  // Surface colors
  background: '#f8f9fa',
  surface: '#FFFFFF',
  surfaceVariant: '#f5f5f5',
  
  // Text colors
  textPrimary: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  
  // Border and divider colors
  border: '#e0e0e0',
  divider: '#f0f0f0',

  // Highlight colors
  highlight: '#FFF3E0',

  // Legacy colors for compatibility
  text: '#333333',
  tint: '#673AB7',
  icon: '#666666',
  tabIconDefault: '#666666',
  tabIconSelected: '#673AB7',
};

const darkColors = {
  // Base colors
  primary: '#7C4DFF',
  secondary: '#66BB6A',
  danger: '#EF5350',
  warning: '#FFA726',
  info: '#42A5F5',
  success: '#66BB6A',
  
  // On colors (text/icons on colored backgrounds)
  onPrimary: '#FFFFFF',
  onSecondary: '#000000',
  onDanger: '#FFFFFF',
  onWarning: '#000000',
  onInfo: '#FFFFFF',
  onSuccess: '#000000',
  
  // Surface colors
  background: '#121212',
  surface: '#1E1E1E',
  surfaceVariant: '#2C2C2C',
  
  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textTertiary: '#999999',
  
  // Border and divider colors
  border: '#333333',
  divider: '#2C2C2C',

  // Highlight colors
  highlight: '#2C2C2C',

  // Legacy colors for compatibility
  text: '#FFFFFF',
  tint: '#7C4DFF',
  icon: '#CCCCCC',
  tabIconDefault: '#CCCCCC',
  tabIconSelected: '#7C4DFF',
};

export function useThemeColors() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkColors : lightColors;
}
