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
import {Header} from 'react-native/Libraries/NewAppScreen';

type PrepCarouselProps = {
  imageURLs: string[];
  headers: string[];
  bodyText: string[];
};

const {width, height} = Dimensions.get('window');

export default function PrepCarousel({
  imageURLs,
  headers,
  bodyText,
}: PrepCarouselProps): JSX.Element {
  let JSXData = [];
  for (const i in imageURLs) {
    JSXData.push(
      <>
        <Text style={styles.header}>{headers[i]}</Text>
        <Image
          key={imageURLs[i]}
          source={{uri: imageURLs[i]}}
          style={styles.image}
        />
        <Text key={bodyText[i]} style={styles.text}>
          {bodyText[i]}
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
        onSnapToItem={(index: number) => console.log('current index:', index)}
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
  scrollView: {
    alignSelf: 'center',
    borderColor: 'black',
    margin: 15,
  },

  text: {
    color: 'white',
    fontSize: 15,
  },
});
