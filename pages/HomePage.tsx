
import { Image, StyleSheet, Text, View } from 'react-native';

import React from 'react';

function HomePage(): JSX.Element {

    return (

      <View style={styles.background}>
        <Text style={styles.text}>Care Across the Spectrum</Text>
        <Image source={require("../homePageImage.png")} style={{width: "70%", height: 150}}/>
      </View>
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