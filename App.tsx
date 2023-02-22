import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import PrepPage from './pages/PrepPage';
import WayfindingPage from './pages/WayfindingPage';
import WFRoutePage from './pages/WFRoutePage';

//todo: move to types file?
type WayfindingStackParamList = {
  WayfindingHome: undefined;
  Route: {
    routeID: string,
    routeTitle: string,
  }
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<WayfindingStackParamList>();

function Wayfinding() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}>
      <Stack.Screen
        name="WayfindingHome"
        component={WayfindingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Route"
        component={WFRoutePage}
        initialParams={{ routeID: "", routeTitle: "" }}
        // options={{header(props) {

        // },}}
      />
    </Stack.Navigator>
  )
}

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string = "";

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Contact') {
              iconName = 'people-circle-outline'
            } else if (route.name === 'Prep') {
              iconName = 'list-outline'
            } else if (route.name === 'Wayfinding') {
              iconName = 'map-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00b2e3',
          tabBarInactiveTintColor: '#999999',
          headerShown: false,

        })}>
        <Tab.Screen
          name="Home"
          component={HomePage}
        />
        <Tab.Screen
          name="Contact"
          component={ContactPage}
        />
        <Tab.Screen
          name="Prep"
          component={PrepPage}
        />
        <Tab.Screen
          name="Wayfinding"
          component={Wayfinding}
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