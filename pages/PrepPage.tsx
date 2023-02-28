import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  View,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const prepInfo = require('../assets/testData/procedureMenuData.json');

type PrepProps = {title: string; id: string};

function PrepPage(): JSX.Element {
  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Explore Visits </Text>
      <FlatList
        data={prepInfo.data.sort(compareObjectTitles)}
        renderItem={({item}) => <Route title={item.title} routeID={item.id} />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

type RouteProps = {title: string; routeID: string};

function Route({title, routeID}: RouteProps) {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          navigation.navigate('Prep', {
            screen: 'Route',
            params: {
              routeID: routeID,
              routeTitle: title,
            },
          });
          // console.log("ROUTE ID IS: " + routeID)
        }}
        style={styles.touchable}>
        <View style={styles.route}>
          <Text style={styles.routetitle}>{title}</Text>
          <View style={styles.routebutton}>
            <Ionicons
              name={'arrow-forward-circle-outline'}
              size={40}
              color="white"
            />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#003a5d',
  },
  list: {
    height: '100%',
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
    borderRadius: 10,
  },
  route: {
    backgroundColor: '#003a5d',
    paddingLeft: 20,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',
    alignContent: 'center',
    borderRadius: 10,
    borderTopColor: 'white',
    borderTopWidth: 1,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  routetitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  routebutton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
});
export default PrepPage;

function compareObjectTitles(a: PrepProps, b: PrepProps) {
  const nameA = a.title.toUpperCase(); // ignore upper and lowercase
  const nameB = b.title.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}
