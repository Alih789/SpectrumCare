import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  View,
  Pressable,
  Text
} from 'react-native';


type WFCarouselProps = {
  images: string[];
  text: string[];
};

const MAX_WIDTH = Dimensions.get('screen').width;

// indicators
// automatic shuffling of images

function WFCarousel({ images, text }: WFCarouselProps): JSX.Element {

  const animation = useRef(new Animated.Value(0));
  const [currentSlide, setCurrentSlide] = useState(0);
  // useInterval(() => handleAnimation(), 5000);

  // handle image and text changes
  const handleNextSlide = () => {
    let newCurrentSlide = currentSlide + 1;

    if (newCurrentSlide >= images.length) {
      newCurrentSlide = images.length - 1;
    }

    Animated.spring(animation.current, {
      toValue: -(MAX_WIDTH * newCurrentSlide),
      useNativeDriver: true,
    }).start();

    setCurrentSlide(newCurrentSlide);
  };

  const handlePrevSlide = () => {
    let newCurrentSlide = currentSlide - 1;

    if (newCurrentSlide <= 0) {
      newCurrentSlide = 0;
    }

    Animated.spring(animation.current, {
      toValue: -(MAX_WIDTH * newCurrentSlide),
      useNativeDriver: true,
    }).start();

    setCurrentSlide(newCurrentSlide);
  };

  return (
    <React.Fragment>
      <View>
        <Animated.View
          style={[
            styles.slide,
            {
              transform: [{ translateX: animation.current }],
            },
          ]}>
          {images.map((image) => (
            <Image key={image} source={{ uri: image }} style={styles.image} />
          ))}
        </Animated.View>
        <Animated.View
          style={[
            styles.slide,
            {
              transform: [{ translateX: animation.current }],
            },
          ]}>
          {text.map((text) => (
            <Text key={text} style={styles.text}>{text}</Text>
          ))}
        </Animated.View>

        <View style={styles.navigationContainer}>
          <Pressable
            style={[styles.slideButton, styles.prevSlideButton]}
            onPress={() => handlePrevSlide()}>
            <Text> Previous Slide</Text>
          </Pressable>
          <View style={styles.indicatorContainer}>
            {images.map((image, index) => (
              <View
                key={`${image}_${index}`}
                style={[
                  styles.indicator,
                  index === currentSlide ? styles.activeIndicator : undefined,
                ]}
              />
            ))}
          </View>
          <Pressable
            style={[styles.slideButton, styles.nextSlideButton]}
            onPress={() => handleNextSlide()}>
            <Text> Next Slide</Text>
          </Pressable>
        </View>



      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  slide: {
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'cover',
    height: 500,
    width: MAX_WIDTH,
  },
  text: {
    height: 100,
    width: MAX_WIDTH,
    padding: 10,
    backgroundColor: 'white',
    fontSize: 18
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: MAX_WIDTH,
    padding: 10,
  },
  indicatorContainer: {
    // position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width: MAX_WIDTH,
    bottom: 10,
    zIndex: 2,
    alignSelf: 'center'
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
    borderRadius: 20,
    elevation: 2,
    padding: 20,
    backgroundColor: '#00b2e3',
  },
  nextSlideButton: {
    alignSelf: 'flex-end',
  },
  prevSlideButton: {
    alignSelf: 'flex-start',
  }
});

export default WFCarousel;