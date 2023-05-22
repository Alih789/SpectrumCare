import {StyleSheet, Text, SafeAreaView, Dimensions, View} from 'react-native';
import NotesButton from '../components/NotesButton';
import React, {useState} from 'react';
import YoutubePlayer from '../components/YoutubePlayer';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';


const dimensions = Dimensions.get('screen');

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Contacts Directory',
    iconName: 'people-circle-outline',
    text: 'Use this searchable staff contacts directory to find contact information for pediatric surgeons, pediatric specialists, and DME equipment companies. Save doctors to the “favorites” tab by clicking the heart icon by their name. '
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Surgical Prep',
    iconName: 'list-outline',
    text: 'Not sure what to expect when you come to the hospital? Want more in-depth information on pre-and post surgery care? The prep library contains multimedia content to share with your patient so you both feel prepared for every step of the surgical process. '
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Wayfinding',
    iconName: 'map-outline',
    text: 'The interactive wayfinding feature can help you find your way to common pediatric surgery destinations at UC Davis health. The images can also be helpful to share with your patient prior to your visit so they know what different parts of the hospital look like.'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Notes',
    iconName: 'document-text-outline',
    text: 'Tap the floating notes icon to open the in-app notepad.'
  },
];

function HomePage(): JSX.Element {
  const [playing, setPlaying] = useState(false);
  return (
    <SafeAreaView style={styles.background}>
      <GestureHandlerRootView>
        <ScrollView style={{backgroundColor: '#003A5D'}}>
        <Text style={styles.appHeader}>Care Across the Spectrum</Text>
        <View style={styles.appWelcomeContainer}>
          <Text style={styles.appWelcomeText}>
            Welcome to the UC Davis Children's Surgery Center!
            This app was designed to be a source of helpful preparatory information for families.
            Scroll down to learn more about each of the features.
          </Text>
        </View>
        {
          DATA.map((item) => {
            return (
              <View key={item.id} style={styles.itemV}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.itemH}>
                  <Ionicons name={item.iconName} size={40} color={'#00b2e3'} style={styles.icon} />
                    <Text style={styles.itemText}>
                      {item.text}
                  </Text>
                </View>
              </View>
            )})
          }

          <View style={styles.appWelcomeContainer}>
            <Text style={styles.appWelcomeText}>
              Watch this welcome video from the children's surgery center:
            </Text>
          </View>
          <View style={styles.videoPlayer} >
            <YoutubePlayer
              videoId="fHkwkegRGDU"
              height={250}
              width={dimensions.width * 0.8}
              playing={playing}
              setPlaying={setPlaying}
            />
          </View>

        </ScrollView>
      </GestureHandlerRootView>
      <NotesButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#003A5D',
    // backgroundColor: '#00b2e3',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appHeader: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    fontFamily: "Figtree-SemiBold"
  },
  appWelcomeContainer: {
    backgroundColor: '#00b2e3',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 12,
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
  appWelcomeText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    padding: 15,
    fontFamily: "Figtree-SemiBold"
  },
  itemV: {
    marginLeft: 15,
    marginRight: 10,
    marginTop: 8,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#003A5D',
  },
  itemH:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 22,
    textAlign: 'left',
    color: '#00b2e3',
    paddingBottom: 10,
    fontFamily: "Figtree-Bold"
  },
  itemText: {
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    color: 'white',
    fontFamily: "Figtree-Medium"
  },
  icon: {
    paddingRight: 15,
  },
  videoPlayer: {
    alignSelf: 'center',
    justifySelf: 'center',
    padding: 20,
  }
});

export default HomePage;