import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, FlatList, TouchableHighlight } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

type RouteProps = { title: string };

function Route({ title }: RouteProps) {

  const navigation = useNavigation();

  return (
    <View style={styles.route}>
      <Text style={styles.routetitle}>{title}</Text>
      <View style={styles.routebutton}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => navigation.navigate('Wayfinding', { screen: 'Route' })}
        >
          <View>
            <Ionicons name={'arrow-forward-circle-outline'} size={30} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
};

function WayfindingPage(): JSX.Element {

  const DATA = [
    {
      id: 'parking-lot-to-peds-surg',
      title: 'Main Parking Lot to Pediatric Surgery Clinic',
    },
    {
      id: 'h-enter-to-mri',
      title: 'Hospital Entrance to MRI Scan',
    },
    {
      id: 'h-enter-to-ct',
      title: 'Hospital Entrance to CT Scan',
    },
    {
      id: 'parking-lot-to-lab',
      title: 'Main Parking Lot to Lab',
    },
  ];

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Wayfinding </Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) =>
          <Route title={item.title} />
        }
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#003a5d",
  },
  list: {
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
  route: {
    backgroundColor: '#00b2e3',
    paddingLeft: 12,
    marginVertical: 5,
    marginHorizontal: 12,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',
    alignContent: 'center',
    borderRadius: 10
  },
  routetitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    flex: 1,
    flexWrap: 'wrap'
  },
  routebutton: {
    alignSelf: 'flex-end',
    padding: 20
  }
});

export default WayfindingPage;