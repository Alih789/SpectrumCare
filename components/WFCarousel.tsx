import React, { useState, useEffect } from 'react';
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

import { WFCarouselProps } from '../assets/customTypes';

const { width, height } = Dimensions.get('window');

// Subtract 20 for margins, 20% for header and bottom navigator
let carouselWidth = width;
const carouselHeight = height * 0.8;

export default function WFCarousel({ imageURLs, text, jumpToIndexFromModal }: WFCarouselProps): JSX.Element {

  let JSXData = [];
  for (const i in imageURLs) {
    JSXData.push(
      <>
        <ScrollView style={styles.scrollView} persistentScrollbar={true} indicatorStyle={'white'}>
          <Image
            key={imageURLs[i]}
            source={imageURLs[i]}
            style={styles.image}
          />
          <Text key={text[i]} style={styles.text}>
            {text[i]}
          </Text>
        </ScrollView>

      </>,
    );
  }

  const carouselRef: any = React.createRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  const refreshImage = () => {
    return new Promise((res: any) => setTimeout(res, 50));
  }
  const handleNextSlide = async() =>{
    carouselRef.current.next();
    await refreshImage(); // sleep for 50ms while image scroll animation runs
    setCurrentSlide(currentSlide + 1 >= imageURLs.length - 1 ? imageURLs.length - 1 : currentSlide + 1);
  };

  const handlePrevSlide = async() => {
    carouselRef.current.prev();
    await refreshImage(); // sleep for 50ms while image scroll animation runs
    setCurrentSlide(currentSlide - 1 >= 0 ? currentSlide - 1 : 0);
  };

  useEffect(() => {
    carouselRef.current.scrollTo({index: jumpToIndexFromModal});
    setCurrentSlide(jumpToIndexFromModal);
  }, [jumpToIndexFromModal]);

  return (
    <View style={styles.background}>
      <View style={styles.carouselContainer}>
        <Carousel
          loop={false}
          width={carouselWidth}
          height={carouselHeight}
          data={JSXData}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
            activeOffsetY: [-10, 10],
          }}
          ref={carouselRef}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => <View style={styles.contentContainer}>{item}</View>}
          onSnapToItem={(index) => {
            setCurrentSlide(index);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => handlePrevSlide()}
        style={[
          styles.prevSlideButton,
          styles.slideButton,
          currentSlide === 0 ? styles.inactiveSlideButton : undefined ]}
        disabled={(currentSlide === 0)}
      >
        <Ionicons name={'arrow-back-outline'} size={45} color={'white'} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNextSlide()}
        style={[
          styles.slideButton,
          styles.nextSlideButton,
          currentSlide === imageURLs.length - 1 ? styles.inactiveSlideButton : undefined ]}
        disabled={(currentSlide === imageURLs.length - 1)}
      >
        <Ionicons name={'arrow-forward-outline'} size={45} color={'white'} />
      </TouchableOpacity>

        <View style={styles.indicatorContainer}>
          {imageURLs.map((image, index) => (
            <View
              key={`${image}_${index}`}
              style={[
                styles.indicator,
                index === currentSlide ? styles.activeIndicator : undefined,
              ]}
            />
          ))}
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  background: {
    width: width,
    height: "100%",
    backgroundColor: 'white',
  },
  carouselContainer: {
    height: "80%",
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: width,
    height: carouselHeight,
  },
  image: {
    resizeMode: 'cover',
    maxHeight: carouselHeight / 1.5,
    width: carouselWidth,
    flex: 1.5,
  },
  page: {
    width: carouselWidth,
    height: carouselHeight,
    maxHeight: carouselHeight,
  },
  scrollView: {
    flex: 1,
  },
  text: {
    width: width,
    fontSize: 20,
    padding: 10,
    fontFamily: "Figtree-Light",
    flex: 1,
    paddingBottom: 35,
  },
  indicatorContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: width,
    zIndex: 2,
    height: 100,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 5.5,
    borderColor: '#00b2e3',
    backgroundColor: 'white',
    borderWidth: 1,
    marginHorizontal: 4,
    marginTop: 8,
    marginBottom: 8,
  },
  activeIndicator: {
    backgroundColor: '#00b2e3',
    borderColor: '#00b2e3',
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
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:1,
    shadowRadius: 2.22,
    elevation: 2,
  },
  inactiveSlideButton: {
    opacity: 0.7,
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  nextSlideButton: {
    right: 20,
  },
  prevSlideButton: {
    left: 20,
  }
});