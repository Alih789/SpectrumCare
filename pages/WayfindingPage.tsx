import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, FlatList, Button, TouchableHighlight} from 'react-native';

import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

// type Props = NativeStackScreenProps<RootStackParamList, 'Profile', 'MyStack'>;

// function WayfindingPage({ route, navigation }: Props): JSX.Element {
  function WayfindingPage(): JSX.Element {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Main Parking Lot to Pediatric Surgery Clinic',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Hospital Entrance to MRI Scan',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Hospital Entrance to CT Scan',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-iuhijnboiubwe',
      title: 'Main Parking Lot to Lab',
    },

  ];

  type RouteProps = {title: string};


  const Route = ({title}: RouteProps) => (
    <View style={styles.route}>
      <Text style={styles.routetitle}>{title}</Text>
      <View style={styles.routebutton}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          // onPress={() => alert('Pressed!')}
          >
            <View>
          <Ionicons name={'arrow-forward-circle-outline'} size={30} />

            </View>
        </TouchableHighlight>
      </View>
    </View>
  );

    return (
      <SafeAreaView style={styles.background}>
        <Text style = {styles.headerText}> Wayfinding </Text>

        <FlatList
          data={DATA}
          renderItem={({item}) => <Route title={item.title} />}
          keyExtractor={item => item.id}
          style={styles.list}
        />
      </SafeAreaView>
    );

}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#003A5D",
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
    backgroundColor: '#E5E5E5',
    paddingLeft: 12,
    marginVertical: 5,
    marginHorizontal: 12,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  routetitle: {
    fontSize: 18,
    alignSelf: 'center',
    flex: 1,
    flexWrap: 'wrap'
  },
  routebutton: {
    alignSelf:'flex-end',
    padding: 20
  }
});''

export default WayfindingPage;