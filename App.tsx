import React from 'react';
import { StyleSheet } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName:string = "";

              if (route.name === 'Home') {
                iconName = 'home-outline';
              } else if (route.name === 'Contact') {
                iconName =  'people-circle-outline'
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#00b2e3',
            tabBarInactiveTintColor: '#999999',
          })}>
        <Tab.Screen
          name="Home"
          component={HomePage}
        />
        <Tab.Screen
          name="Contact"
          component={ContactPage}
        />
      </Tab.Navigator>
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