import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';



function WelcomeScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View style={styles.appTitle}>
        <Text style={styles.text}>Care Across the Spectrum</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={{ color: "black" }} >Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={{ color: "black" }} >Staff</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={{ color: "black" }} >Way</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={{ color: "black" }} >Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#003A5D",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuContainer: {
    flexDirection: 'row',
    backgroundColor: "white",
    width: "80%",
    height: 50,
    bottom: 25,
    borderRadius: 15,
  },
  menuItem: {
    width: "25%",
    height: "100%",
    color: "black",
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: "white",
    fontSize: 30,
    textAlign: "center",

  },

});

export default WelcomeScreen;
