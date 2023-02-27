
import { Image, StyleSheet, Text, SafeAreaView } from 'react-native';
import NotesButton from '../components/Notepad';

import React from 'react';

function HomePage(): JSX.Element {

    return (

      <SafeAreaView style={styles.background}>
        <Text style={styles.text}>Care Across the Spectrum</Text>
        <NotesButton/>
        <Image source={require("../assets/images/homePageImage.png")} style={{width: "70%", height: 150}}/>
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
  text: {
    color: "white",
    fontSize: 30,
    textAlign: "center",

  },

});

export default HomePage;