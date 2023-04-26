import {StyleSheet, Text, SafeAreaView, Dimensions} from 'react-native';
import React from 'react';


function HomePage(): JSX.Element {
  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.text}>Care Across the Spectrum</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#003A5D',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
});

export default HomePage;
