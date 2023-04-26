import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import 'react-native-reanimated';
import {Procedure} from '../assets/customTypes';
import YoutubePlayer from './YoutubePlayer';

interface PrepCarouselProps {
  procedureInfo: Procedure;
}

const {width, height} = Dimensions.get('window');

// Subtract 20 for margins, 20% for header and bottom navigator
let carouselWidth = width - 20;
const carouselHeight = height * 0.8;

export default function PrepCarousel({
  procedureInfo,
}: PrepCarouselProps): JSX.Element {
  const [playing, setPlaying] = useState(false);

  let JSXData = [];
  for (const page of procedureInfo.pages) {
    JSXData.push(
      <>
        <Text style={styles.header}>{page.header}</Text>
        {page.media.isVideo ? (
          <YoutubePlayer
            videoId={page.media.content}
            height={styles.video.height}
            width={styles.video.width}
            playing={playing}
            setPlaying={setPlaying}
          />
        ) : (
          <Image
            key={page.media.content}
            source={{uri: page.media.content}}
            style={styles.image}
          />
        )}

        <View style={styles.scrollView}>
          <ScrollView>
            <Text key={page.bodyText} style={styles.text}>
              {page.bodyText}
            </Text>
          </ScrollView>
        </View>
      </>,
    );
  }

  return (
    <View style={styles.contentContainer}>
      <Carousel
        loop={false}
        width={carouselWidth}
        height={carouselHeight}
        data={JSXData}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        scrollAnimationDuration={1000}
        onScrollEnd={() => setPlaying(false)}
        renderItem={({item}) => <View style={styles.page}>{item}</View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  header: {
    maxHeight: 40,
    color: 'white',
    fontSize: 25,
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    maxHeight: height / 2,
    width: carouselWidth,
    flex: 1.5,
  },
  page: {
    width: carouselWidth,
    height: carouselHeight,
  },
  scrollView: {
    marginTop: 5,
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  video: {
    height: 250,
    width: Dimensions.get('screen').width,
  },
});
