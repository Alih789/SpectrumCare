// import React, { useState, useRef } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Image,
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity
// } from 'react-native';

// import Ionicons from 'react-native-vector-icons/Ionicons';

import React, { useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

type WFCarouselProps = {
  imageURLs: any[];
  text: string[];
};

// const MAX_WIDTH = Dimensions.get('screen').width;

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
        <Text key={text[i]} style={styles.text}>
          {text[i]}
        </Text>
      </>,
    );
  }

  const ref: any  = React.createRef();

  const handleNextSlide = () => {
    ref.current.next()
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
        ref={ref}

        scrollAnimationDuration={1000}
        // onSnapToItem={(index: number) => console.log('current index:', index)}
        renderItem={({ item }) => <View>{item}</View>}
      />
      {/* <View style={styles.navigationContainer}>
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
      </View> */}
      <TouchableOpacity
        onPress={() => handleNextSlide()}
          style={[styles.slideButton, styles.nextSlideButton]}

      >
        <Ionicons name={'arrow-forward-outline'} size={45} color={'white'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    height: 500,
    width: width,
  },
  scrollView: {
    alignSelf: 'center',
    borderColor: 'black',
    margin: 15,
  },
  text: {
    width: width,
    height: 100,
    padding: 10,
    backgroundColor: 'white',
    fontSize: 18
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
    position: 'absolute',
    bottom: 400,
    height: 70,
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


// function WFCarousel({ images, text }: WFCarouselProps): JSX.Element {

//   const animation = useRef(new Animated.Value(0));
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // handle image and text changes
//   const handleNextSlide = () => {
//     let newCurrentSlide = currentSlide + 1;

//     if (newCurrentSlide >= images.length) {
//       newCurrentSlide = images.length - 1;
//     }

//     Animated.spring(animation.current, {
//       toValue: -(MAX_WIDTH * newCurrentSlide),
//       useNativeDriver: true,
//     }).start();

//     setCurrentSlide(newCurrentSlide);
//   };

//   const handlePrevSlide = () => {
//     let newCurrentSlide = currentSlide - 1;

//     if (newCurrentSlide <= 0) {
//       newCurrentSlide = 0;
//     }

//     Animated.spring(animation.current, {
//       toValue: -(MAX_WIDTH * newCurrentSlide),
//       useNativeDriver: true,
//     }).start();

//     setCurrentSlide(newCurrentSlide);
//   };

//   return (
//     <React.Fragment>
//       <View style={{ height: '100%' }}>
//         <View style={styles.slidesContainer}>
//           <Animated.View
//             style={[
//               styles.slide,
//               {
//                 transform: [{ translateX: animation.current }],
//               },
//             ]}>
//             {images.map((image: any) => (
//               <Image key={image} source={image} style={styles.image} />
//             ))}
//           </Animated.View>
//           <Animated.View
//             style={[
//               styles.slide,
//               {
//                 transform: [{ translateX: animation.current }],
//               },
//             ]}>
//             {text.map((text) => (
//               <Text key={text} style={styles.text}>{text}</Text>
//             ))}
//           </Animated.View>
//         </View>



//         <TouchableOpacity
//           onPress={() => handlePrevSlide()}
//           style={[styles.slideButton, styles.prevSlideButton]}
//         >
//           <Ionicons name={'arrow-back-outline'} size={45} color={'white'} />
//         </TouchableOpacity>


//         <TouchableOpacity
//           onPress={() => handleNextSlide()}
//           style={[styles.slideButton, styles.nextSlideButton]}
//         >
//           <Ionicons name={'arrow-forward-outline'} size={45} color={'white'} />
//         </TouchableOpacity>

//         <View style={styles.navigationContainer}>
//           <View style={styles.indicatorContainer}>
//             {images.map((image, index) => (
//               <View
//                 key={`${image}_${index}`}
//                 style={[
//                   styles.indicator,
//                   index === currentSlide ? styles.activeIndicator : undefined,
//                 ]}
//               />
//             ))}
//           </View>
//         </View>
//       </View>
//     </React.Fragment>
//   );
// };

// const styles = StyleSheet.create({
//   slidesContainer: {
//     height: 600,
//     width: MAX_WIDTH,
//   },
//   slide: {
//     flexDirection: 'row',
//   },
//   image: {
//     resizeMode: 'cover',
//     height: 500,
//     width: MAX_WIDTH,
//   },
//   text: {
//     width: MAX_WIDTH,
//     height: 100,
//     padding: 10,
//     backgroundColor: 'white',
//     fontSize: 18
//   },
//   navigationContainer: {
//     alignItems: 'center',
//     width: MAX_WIDTH,
//     padding: 10,
//     backgroundColor: '#003a5d',
//   },
//   indicatorContainer: {
//     // position: 'absolute',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: MAX_WIDTH,
//     // bottom: 10,
//     // top: 10,
//     zIndex: 2,
//   },
//   indicator: {
//     width: 15,
//     height: 15,
//     borderRadius: 7.5,
//     borderColor: 'white',
//     borderWidth: 1,
//     marginHorizontal: 10,
//     marginBottom: 10,
//   },
//   activeIndicator: {
//     backgroundColor: 'white',
//   },
//   slideButton: {
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 70,
//     position: 'absolute',
//     bottom: 400,
//     height: 70,
//     backgroundColor: '#00b2e3',
//     borderRadius: 100,
//   },
//   nextSlideButton: {
//     right: 20,
//   },
//   prevSlideButton: {
//     left: 20,
//   }
// });

// export default WFCarousel;