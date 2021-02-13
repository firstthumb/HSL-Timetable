import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, DepartureItem } from './components';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './themes';
import { DepartureScreen } from './screens/DepartureScreen';

const App: React.FC = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <DepartureScreen />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
