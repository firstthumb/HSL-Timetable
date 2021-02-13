import { DefaultTheme } from 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string;
    secondaryColor: string;
  }
}

export const lightTheme: DefaultTheme = {
  primaryColor: '#0080d0',
  secondaryColor: '#fff',
};

export const darkTheme: DefaultTheme = {
  primaryColor: '#0080d0',
  secondaryColor: '#fff',
};
