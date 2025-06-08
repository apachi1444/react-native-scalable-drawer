/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#3629B7';
const tintColorDark = '#4F3CF0';

export const Colors = {
  light: {
    background: '#F5F7FA',
    surface: '#FFFFFF',
    primary: '#3629B7',
    onPrimary: '#FFFFFF',
    secondary: '#29B736',
    onSecondary: '#FFFFFF',
    danger: '#B73629',
    onDanger: '#FFFFFF',
    textPrimary: '#212121',
    textSecondary: '#5E5E5E',
    border: '#D1D3E0',
    editorBackground: '#FFFFFF',
    editorText: '#212121',
    highlight: '#E3E5F9',
    cursor: '#3629B7',
    selection: '#BFC8FF',
    codeBackground: '#F0F2FF',
    // Legacy support
    text: '#212121',
    tint: tintColorLight,
    icon: '#5E5E5E',
    tabIconDefault: '#5E5E5E',
    tabIconSelected: tintColorLight,
  },
  dark: {
    background: '#1A1A2E',
    surface: '#252545',
    primary: '#4F3CF0',
    onPrimary: '#FFFFFF',
    secondary: '#32C165',
    onSecondary: '#000000',
    danger: '#FF5C5C',
    onDanger: '#000000',
    textPrimary: '#EAEAEA',
    textSecondary: '#B0B0B0',
    border: '#3A3A5A',
    editorBackground: '#1C1C3A',
    editorText: '#EAEAEA',
    highlight: '#2D2D80',
    cursor: '#4F3CF0',
    selection: '#4949A0',
    codeBackground: '#2A2A50',
    // Legacy support
    text: '#EAEAEA',
    tint: tintColorDark,
    icon: '#B0B0B0',
    tabIconDefault: '#B0B0B0',
    tabIconSelected: tintColorDark,
  },
};
