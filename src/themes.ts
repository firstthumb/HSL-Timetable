import { DefaultTheme } from 'styled-components/native';
import { scale } from 'react-native-size-matters';

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string;
    secondaryColor: string;
    warningColor: string;
    successColor: string;
    fontSizes: {
      small: number;
      medium: number;
      large: number;
    };
  }
}

export const lightTheme: DefaultTheme = {
  primaryColor: '#0080d0',
  secondaryColor: '#fff',
  warningColor: '#ff6347',
  successColor: '#22bb33',
  fontSizes: {
    small: Math.round(scale(12)),
    medium: Math.round(scale(16)),
    large: Math.round(scale(20)),
  },
};

export const darkTheme: DefaultTheme = {
  primaryColor: '#0080d0',
  secondaryColor: '#fff',
  warningColor: '#ff6347',
  successColor: '#22bb33',
  fontSizes: {
    small: Math.round(scale(12)),
    medium: Math.round(scale(16)),
    large: Math.round(scale(20)),
  },
};
