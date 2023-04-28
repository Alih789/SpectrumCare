import {StyleSheet, Text, SafeAreaView, Dimensions, View} from 'react-native';
import NotesButton from '../components/NotesButton';
import React, {useState} from 'react';
import YoutubePlayer from '../components/YoutubePlayer';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconProps } from '@rneui/base';


const dimensions = Dimensions.get('screen');

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    iconName: 'people-circle-outline'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    iconName: 'list-outline'

  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    iconName: 'map-outline'

  },
];

type ItemProps = {title: string, iconName: string};

const Item = ({title, iconName}: ItemProps) => (
  <View style={styles.item}>
    <Ionicons name={iconName} size={40} color={'#00b2e3'} />
    <Text style={styles.itemText}>{title}</Text>
  </View>
);


function HomePage(): JSX.Element {
  const [playing, setPlaying] = useState(false);
  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.appHeader}>Care Across the Spectrum</Text>

      <ScrollView >
        <View style={styles.appWelcomeContainer}>
          <Text style={styles.appWelcomeText}>
            Welcome to the UC Davis Children's Surgery Center!
            This app was designed to be a source of helpful preperatory information for families.
            Scroll down to learn more about each of the features.
          </Text>
        </View>
        <FlatList
                data={DATA}
                renderItem={({item}) => <Item title={item.title} iconName={item.iconName}/>}
                keyExtractor={item => item.id}>

        </FlatList>



      <YoutubePlayer
          videoId="fHkwkegRGDU"
          height={250}
          width={dimensions.width * 0.8}
          playing={playing}
          setPlaying={setPlaying}
        />
      </ScrollView>
      <NotesButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#003A5D',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appHeader: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
  },
  appWelcomeContainer: {
    backgroundColor: '#00b2e3',
    width: '100%'
  },
  appWelcomeText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    padding: 12
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 18,
  },
});

export default HomePage;
