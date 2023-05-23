import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  SectionList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PrepInfoProps} from '../assets/customTypes';

type ProcedureListProps = {data: PrepInfoProps[]};

function ProcedureList({data}: ProcedureListProps) {
  let categories: any[] = [...new Set(data.map(p => p.category))].sort(); // unique categories

  // construct "sections" object for SectionList
  let sections = categories.map((category) => ({
    title: category,
    data: data.filter(procedure => { if(procedure.category == category) return procedure})
  }))

  return (
    <SectionList
      sections={sections}
      renderItem={({item}) => <Route title={item.title} routeID={item.id} />}
      renderSectionHeader={({section: {title}}) => (
        <View style={styles.category}>
          <Text style={styles.categoryHeader}>{title}</Text>
        </View>
      )}
    />
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
  touchable: {
    backgroundColor: '#00b2e3',
    marginHorizontal: 12,
    borderRadius: 10,
  },
  category: {
    marginHorizontal: 12,
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
  },
  categoryHeader: {
    fontSize: 28,
    color: 'white',
    alignSelf: 'center',
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: "Figtree-Bold",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    marginBottom: 15,
  },
  route: {
    backgroundColor: '#003a5d',
    paddingLeft: 20,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
  },
  routetitle: {
    fontSize: 22,
    color: 'white',
    alignSelf: 'center',
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: "Figtree-Medium"
  },
  routebutton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
});
export default ProcedureList;

