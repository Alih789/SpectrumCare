import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

type WFCarouselProps = {
  imageURLs: any[];
  text: string[];
};

const { width, height } = Dimensions.get('window');

export default function WFCarousel({
  imageURLs,
  text
}: WFCarouselProps): JSX.Element {
  let JSXData = [];
  for (const i in imageURLs) {
    JSXData.push(
      <>
        <Image
          key={imageURLs[i]}
          source={imageURLs[i]}
          style={styles.image}
        />
        <ScrollView style={styles.scrollView}>
          <Text key={text[i]} style={styles.text}>
            {text[i]}
          </Text>
        </ScrollView>

      </>,
    );
  }

  const carouselRef: any = React.createRef();

  const handleNextSlide = () => {
    carouselRef.current.next()
  };

  const handlePrevSlide = () => {
    carouselRef.current.prev()
  };

  return (
    <View>
      <Carousel
        loop={false}
        width={width}
        height={height}
        data={JSXData}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
          activeOffsetY: [-10, 10],
        }}
        ref={carouselRef}

        scrollAnimationDuration={500}
        // onSnapToItem={(index: number) => console.log('current index:', index)}
        renderItem={({ item }) => <View style={styles.contentContainer}>{item}</View>}
      />
      <View style={styles.navigationContainer}>
        <View style={styles.indicatorContainer}>
          {imageURLs.map((image, index) => (
            <View
              key={`${image}_${index}`}
              style={[
                styles.indicator,
                // index === currentSlide ? styles.activeIndicator : undefined,
              ]}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handlePrevSlide()}
        style={[styles.slideButton, styles.prevSlideButton]}
      >
        <Ionicons name={'arrow-back-outline'} size={45} color={'white'} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNextSlide()}
        style={[styles.slideButton, styles.nextSlideButton]}
      >
        <Ionicons name={'arrow-forward-outline'} size={45} color={'white'} />
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: width,
    height: "100%"
  },
  image: {
    resizeMode: 'cover',
    maxHeight: 500,
    width: width,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  text: {
    width: width,
    height: 300,
    padding: 10,
    backgroundColor: 'white',
    fontSize: 18,
  },
  navigationContainer: {
    alignItems: 'center',
    width: width,
    padding: 10,
    backgroundColor: '#003a5d',
  },
  indicatorContainer: {
    // position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    // bottom: 10,
    // top: 10,
    zIndex: 2,
  },
  indicator: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  activeIndicator: {
    backgroundColor: 'white',
  },
  slideButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: "60%",
    backgroundColor: '#00b2e3',
    borderRadius: 100,
  },
  nextSlideButton: {
    right: 20,
  },
  prevSlideButton: {
    left: 20,
  }
});
