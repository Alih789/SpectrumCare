import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import PrepCarousel from '../components/PrepCarousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PrepStackParamList} from '../assets/customTypes';
import BackButton from '../components/BackButton';

type Props = StackScreenProps<PrepStackParamList, 'Route'>;

function PrepRoutePage({navigation, route}: Props): JSX.Element {
  const {routeID, routeTitle} = route.params;
  const procedureInfo = require('../assets/testData/ProcedureData.json');

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.background}>
        <View>
          <View style={styles.row}>
            <BackButton />
            <Text style={styles.header}>{routeTitle}</Text>
          </View>
          <PrepCarousel procedureInfo={procedureInfo[routeID]} />
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
