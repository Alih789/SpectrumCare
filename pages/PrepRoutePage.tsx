import React from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions, Text} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import BackButton from '../components/BackButton';
import PrepCarousel from '../components/PrepCarousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PrepStackParamList} from '../assets/customTypes';

type Props = StackScreenProps<PrepStackParamList, 'Route'>;

function PrepRoutePage({navigation, route}: Props): JSX.Element {
  // const {routeID, routeTitle} = route.params;
  // ^^ will use routeID pass in by navigation when completed
  const routeID = 'mri';
  const procedureInfo = require('../assets/testData/ProcedureData.json');

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView>
        <View style={styles.background}>
          <BackButton />
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
});

export default PrepRoutePage;
