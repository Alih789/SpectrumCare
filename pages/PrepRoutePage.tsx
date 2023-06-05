import React, { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import PrepCarousel from '../components/PrepCarousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PrepStackParamList} from '../assets/customTypes';
import BackButton from '../components/BackButton';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { PrepInfoProps} from '../assets/customTypes';
import { PageInfo } from '../assets/customTypes';


type Props = StackScreenProps<PrepStackParamList, 'Route'>;

function PrepRoutePage({navigation, route}: Props): JSX.Element {
  const {routeID, routeTitle} = route.params;
  // const procedureInfo = require('../assets/testData/ProcedureData.json');

  //used to store filtered data based on the search
  // TODO clean this up/find a diff solution
  const [pagesData, setPagesData] = useState<PrepInfoProps>({
    title: 'string',
    id: 'string',
    category: 'string',
    pages: []});

  //Handles query to database
  useEffect( ()=> {

    async function getProcedureData(){
      const procedureDoc = (await firestore().collection('procedures').doc(routeTitle).get());
      var allProcedureCollectionObjects = procedureDoc.data() as PrepInfoProps;
      var pagesDataAppReadyMediaContent: PageInfo[] = [];

      for(var page of allProcedureCollectionObjects.pages) {
        // modify the "media.content" of each page (if page has media)
        // to be in the correct format to display on the app
        if(page.media){
          if(page.media.contentType == 'image') {
            // get full image path from Firebase storage
            const downloadUrl  = (await storage().ref(page.media.content).getDownloadURL());
            pagesDataAppReadyMediaContent.push({
              header: page.header,
              media: {
                content: downloadUrl,
                contentType: page.media.contentType,
              },
              bodyText: page.bodyText,
              accessibilityText: page.accessibilityText,
            })
          } else if(page.media.contentType == 'video'){
            // strip video URL to just ID
            const videoID = page.media.content.trim().slice(page.media.content.indexOf("v=") + 2);
            pagesDataAppReadyMediaContent.push({
              header: page.header,
              media: {
                content: videoID,
                contentType: page.media.contentType,
              },
              bodyText: page.bodyText,
              accessibilityText: page.accessibilityText,
            })
          }
        } else {
          pagesDataAppReadyMediaContent.push(page);
        }
      }

      setPagesData({title: allProcedureCollectionObjects.title,
        id: allProcedureCollectionObjects.id,
        category: allProcedureCollectionObjects.category,
        pages:pagesDataAppReadyMediaContent
      });
    };

    getProcedureData();

  }, [])

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.background}>
        <View>
          <View style={styles.row}>
            <BackButton />
            <Text style={styles.header}>{routeTitle}</Text>
          </View>
          <PrepCarousel procedureInfo={pagesData} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#003a5d',
    height: '100%',
    display: 'flex',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  header: {
    color: 'white',
    fontSize: 30,
    fontFamily: "Figtree-SemiBold"
  },
});

export default PrepRoutePage;
