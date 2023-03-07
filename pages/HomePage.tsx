import {StyleSheet, Text, SafeAreaView, Dimensions} from 'react-native';
import NotesButton from '../components/NotesButton';
import React from 'react';
import YoutubePlayer from '../components/YoutubePlayer';

const dimensions = Dimensions.get('screen');


function HomePage(): JSX.Element {

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.text}>Care Across the Spectrum</Text>
       <NotesButton/>
       <YoutubePlayer 
        videoId="fHkwkegRGDU"
        height={250}
        width={dimensions.width* .8}/>
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
