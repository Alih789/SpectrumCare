import React from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions, Text} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import BackButton from '../components/BackButton';
import PrepCarousel from '../components/PrepCarousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// todo: move to types file?
type WayfindingStackParamList = {
  WayfindingHome: undefined;
  Route: {
    routeID: string;
    routeTitle: string;
  };
};

type Props = StackScreenProps<WayfindingStackParamList, 'Route'>;

function WFRoutePage({navigation, route}: Props): JSX.Element {
  const {routeID, routeTitle} = route.params;
  const singleProcedure = require('../assets/testData/singleProcedure.json');

  const headers = singleProcedure.mri.headers;

  const images = singleProcedure.mri.images;

  const text = singleProcedure.mri.bodyText;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView>
        <View style={styles.background}>
          <BackButton />
          <PrepCarousel bodyText={text} imageURLs={images} headers={headers} />
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

export default WFRoutePage;
