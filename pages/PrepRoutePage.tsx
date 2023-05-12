import React, { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import PrepCarousel from '../components/PrepCarousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PrepStackParamList} from '../assets/customTypes';
import BackButton from '../components/BackButton';

import firestore from '@react-native-firebase/firestore';
import { PrepInfoProps} from '../assets/customTypes';


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
      setPagesData(allProcedureCollectionObjects);
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
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default PrepRoutePage;
