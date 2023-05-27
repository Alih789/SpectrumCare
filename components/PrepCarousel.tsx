import React, { useState, useEffect } from 'react';
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
import { PrepInfoProps } from '../assets/customTypes';
import YoutubePlayer from './YoutubePlayer';

interface PrepCarouselProps {
  procedureInfo: PrepInfoProps;
}

const { width, height } = Dimensions.get('window');

// Subtract 20 for margins, 20% for header and bottom navigator
let carouselWidth = width - 20;
const carouselHeight = height * 0.8;

interface FullWidthPictureProps {
  uri: string;
}

const FullWidthPicture = ({uri}: FullWidthPictureProps) => {
  const [ratio, setRatio] = useState(1);
  useEffect(() => {
    if (uri) {
      Image.getSize(uri, (width, height) => {
         setRatio(width / height);
      });
   }
  }, [uri]);

  return (
   <Image
     style={{
      width: '100%',
      // maxWidth: carouselWidth - 30,
      height: undefined,
      aspectRatio: ratio,
    }}
     resizeMode="contain"
     source={{ uri }}
   />
 );
};

export default function PrepCarousel({
  procedureInfo,
}: PrepCarouselProps): JSX.Element {
  const [playing, setPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  let JSXData = [];
  for (const page of procedureInfo.pages) {
    var media = null;
    var text = null;
    var accessibility = null;

    // pages must have a header. A page can have only bodyText, only media, or both. A page can also have an accessibility component with info.

    if (page.header) {
      if (page.media) {
        if (page.media.contentType == 'video') {
          media = <YoutubePlayer
            videoId={page.media.content}
            height={styles.video.height}
            width={styles.video.width}
            playing={playing}
            setPlaying={setPlaying}
          />;

        } else if (page.media.contentType == 'image') {
          media = <FullWidthPicture uri={page.media.content}/>
        }
      }

      if (page.bodyText) {
        text = <Text selectable={true} key={page.bodyText} style={styles.text}>
          {/* {page.bodyText} */}
          {page.bodyText.replaceAll("\\n", "\n")}
        </Text>
      }

      if (page.accessibilityText) {
        accessibility = <View style={styles.accessibilityContainer}>
          <Text selectable={true} style={styles.accessibilityText}>
            {page.accessibilityText}
          </Text>
        </View>
      }

      JSXData.push(
        <>
          <Text style={styles.header}>{page.header}</Text>
          <ScrollView style={styles.scrollView}>
            {media}
            {text}
            {accessibility}
          </ScrollView>

        </>,);
    }
  }

  return (
    <View style={styles.background}>
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
          renderItem={({ item }) => <View style={styles.page}>{item}</View>}
          onSnapToItem={(index) => {
            setCurrentSlide(index);
          }}
        />
      </View>
      <View style={styles.navigationContainer}>
        {
          procedureInfo.pages.length > 1 &&
          <View style={styles.indicatorContainer}>
            {procedureInfo.pages.map((header, index) => (
              <View
                key={`${header}_${index}`}
                style={[
                  styles.indicator,
                  index === currentSlide ? styles.activeIndicator : undefined,
                ]}
              />
            ))}
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    // height: '80%',
  },
  header: {
    fontSize: 24,
    color: 'white',
    fontFamily: "Figtree-Bold"
    // flex: 1,
    // flexWrap: 'wrap'
  },
  page: {
    width: carouselWidth,
    height: carouselHeight,
  },
  scrollView: {
    marginTop: 5,
    marginBottom: 70,
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: "Figtree-Medium",
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
  },
  video: {
    height: 250,
    width: carouselWidth,
  },
  background: {
    width: width,
    height: "100%",
  },
  navigationContainer: {
    alignItems: 'center',
    width: width,
    padding: 20,
    zIndex: 2,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: width,
    height: 100,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 5.5,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginHorizontal: 4,
    marginTop: 10,
    marginBottom: 8,
  },
  activeIndicator: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  accessibilityContainer: {
    backgroundColor: '#00c4b3',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:4,
    shadowRadius: 2.22,
    elevation: 3,
  },
  accessibilityText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    padding: 15,
    fontFamily: "Figtree-Bold"
  },
});