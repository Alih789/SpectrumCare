import {Image, StyleSheet, Text, SafeAreaView, Dimensions} from 'react-native';
import React from 'react';
import YoutubeIframe from 'react-native-youtube-iframe';

const dimensions = Dimensions.get('screen');

function HomePage(): JSX.Element {
  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.text}>Care Across the Spectrum</Text>
      <Image
        source={require('../assets/images/homePageImage.png')}
        style={{width: '70%', height: 150}}
      />
      <YoutubeIframe
        videoId="Usa_M01f68o"
        height={500}
        width={dimensions.width}
      />
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
