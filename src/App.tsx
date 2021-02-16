import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, DepartureItem } from './components';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './themes';
import { DepartureScreen } from './screens/DepartureScreen';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <DepartureScreen />
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
