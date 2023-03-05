import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, FlatList, TouchableHighlight } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

type RouteProps = { title: string, routeID: string };

function Route({ title, routeID }: RouteProps) {

  const navigation = useNavigation();

  return (
    <View >
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          navigation.navigate('Wayfinding', {
            screen: 'Route',
            params: {
              routeID: routeID,
              routeTitle: title,
            }
          })
          // console.log("ROUTE ID IS: " + routeID)
        }}
        style={styles.touchable}
      >
        <View style={styles.route}>
          <Text style={styles.routetitle}>{title}</Text>
          <View style={styles.routebutton}>
            <Ionicons name={'arrow-forward-circle-outline'} size={40} />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  )
};

function WayfindingPage(): JSX.Element {

  // array of data, 1 object per route displayed
  const DATA = [
    {
      id: '01-parking-clinic',
      title: 'Main Parking Lot to Pediatric Surgery Clinic',
    },
    {
      id: '02-parking-labs',
      title: 'Main Parking Lot to Lab',
    },
    {
      id: '03-hosp-enter-radiology',
      title: 'Hospital Entrance to Radiology',
    },
    {
      id: '04-hosp-enter-OR-checkin',
      title: 'Hospital Entrance to OR Check In',
    }
  ];

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Wayfinding </Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) =>
          <Route title={item.title} routeID={item.id} />
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
  touchable: {
    backgroundColor: '#00b2e3',
    marginVertical: 5,
    marginHorizontal: 12,
    borderRadius: 10
  },
  route: {
    backgroundColor: '#00b2e3',
    paddingLeft: 20,
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