import React, { useState, useRef, useEffect} from 'react';
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
};

const MAX_WIDTH = Dimensions.get('screen').width;

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void | null>();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });
  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback?.current !== 'undefined') {
        savedCallback?.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// indicators
// automatic shuffling of images

function WFCarousel({ images}: WFCarouselProps): JSX.Element {

  const animation = useRef(new Animated.Value(0));
  const [currentImage, setCurrentImage] = useState(0);
  // useInterval(() => handleAnimation(), 5000);

  // handle image changes
  const handleAnimation = () => {
    let newCurrentImage = currentImage + 1;

    if (newCurrentImage >= images.length) {
      newCurrentImage = 0;
    }

    Animated.spring(animation.current, {
      toValue: -(MAX_WIDTH * newCurrentImage),
      useNativeDriver: true,
    }).start();

    setCurrentImage(newCurrentImage);
  };

  return (
    <React.Fragment>
      <View>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{translateX: animation.current}],
            },
          ]}>
          {images.map((image) => (
            <Image key={image} source={{uri: image}} style={styles.image} />
          ))}

        </Animated.View>

        <View style={styles.indicatorContainer}>
          {images.map((image, index) => (
            <View
              key={`${image}_${index}`}
              style={[
                styles.indicator,
                index === currentImage ? styles.activeIndicator : undefined,
              ]}
            />
          ))}
        </View>

        <Pressable
            style={styles.nextSlideButton}
            onPress={() => handleAnimation()}>
            <Text >Route Steps</Text>
        </Pressable>

      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    height: 500,
    width: MAX_WIDTH,
  },
  container: {
    flexDirection: 'row',
  },
  indicatorContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: MAX_WIDTH,
    bottom: 10,
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
  nextSlideButton: {
    borderRadius: 20,
    elevation: 2,
    alignSelf: 'flex-end',
    padding: 20,
    backgroundColor: '#00b2e3',
  }
});

export default WFCarousel;