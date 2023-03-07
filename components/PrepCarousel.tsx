import React from 'react';
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
import YoutubeIframe from 'react-native-youtube-iframe';

interface PrepCarouselProps {
  procedureInfo: Procedure;
}

const {width, height} = Dimensions.get('window');

export default function PrepCarousel({
  procedureInfo,
}: PrepCarouselProps): JSX.Element {
  let JSXData = [];
  for (const page of procedureInfo.pages) {
    JSXData.push(
      <>
        <Text style={styles.header}>{page.header}</Text>
        {page.media.isVideo ? (
          <YoutubeIframe
            videoId={page.media.content}
            height={styles.video.height}
            width={styles.video.width}
            webViewStyle={{opacity: 0.99}}
          />
        ) : (
          <Image
            key={page.media.content}
            source={{uri: page.media.content}}
            style={styles.image}
          />
        )}

        <Text key={page.bodyText} style={styles.text}>
          {page.bodyText}
        </Text>
      </>,
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}>
      <Carousel
        loop={false}
        width={width}
        height={height}
        data={JSXData}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
          activeOffsetY: [-10, 10],
        }}
        scrollAnimationDuration={1000}
        // onSnapToItem={(index: number) => console.log('current index:', index)}
        renderItem={({item}) => <View>{item}</View>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: 25,
  },
  image: {
    resizeMode: 'cover',
    height: height / 2,
    width: width,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    alignSelf: 'center',
    borderColor: 'black',
    margin: 10,
  },

  text: {
    color: 'white',
    fontSize: 15,
  },
  video: {
    height: 250,
    width: Dimensions.get('screen').width,
  },
});
