import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import styled from 'styled-components/native';
import { darkTheme, lightTheme } from './themes';
import { DepartureScreen, StationScreen } from './screens';
import store from './store';
import { Clock } from './components';

const ClockContainer = styled.View(({}) => ({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
}));

const Stack = createStackNavigator();

const App: React.FC = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={StationScreen}
                options={{
                  title: 'HSL TimeTable',
                  headerStyle: {
                    backgroundColor: `${theme.primaryColor}`,
                  },
                  headerTintColor: `${theme.secondaryColor}`,
                }}
              />
              <Stack.Screen
                name="Details"
                component={DepartureScreen}
                options={{
                  headerTitle: () => (
                    <ClockContainer>
                      <Clock />
                    </ClockContainer>
                  ),
                  headerStyle: {
                    backgroundColor: `${theme.primaryColor}`,
                    elevation: 0,
                  },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
