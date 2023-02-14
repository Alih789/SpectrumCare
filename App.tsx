import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';


const Stack = createStackNavigator();

function App(): JSX.Element {
  
    return (
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
                headerShown: false
            }}>
        <Stack.Screen
            name="Home"
            component={HomePage}
          />
          <Stack.Screen
            name="Contact"
            component={ContactPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;