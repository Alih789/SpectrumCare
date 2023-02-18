import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';


// todo: move to types file?
type WayfindingStackParamList = {
  WayfindingHome: undefined;
  Route: {
    routeID: string,
    routeTitle: string,
  }
}

type Props = StackScreenProps<WayfindingStackParamList, 'Route'>;

function WFRoutePage({ navigation, route }: Props): JSX.Element {

  const { routeID, routeTitle } = route.params;

  // todo: "gather" (load from files) image and text data to pass to slideshow component

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <Text style={styles.headerText}> {routeTitle}</Text>

        <Text style={styles.headerText}> PUT SLIDESHOW COMPONENT HERE </Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#003a5d",
    height: '100%'
  },
  headerText: {
    paddingTop: 30,
    paddingBottom: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 36,
  },
});

export default WFRoutePage;