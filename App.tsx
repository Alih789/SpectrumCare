import React from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <WelcomeScreen />
  );
}

const styles = StyleSheet.create({

});

export default App;
