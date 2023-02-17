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
          {/* <Ionicons name={'arrow-forward-circle-outline'} size={30} /> */}
          <Text style={styles.routetitle}>{title}</Text>

            </View>
        </TouchableHighlight>
      </View>
    </View>
  );

    return (
      <SafeAreaView style={styles.container}>
        <Text style = {{alignSelf:"center"}}> Wayfinding Page Placeholder</Text>

        <FlatList
          data={DATA}
          renderItem={({item}) => <Route title={item.title} />}
          keyExtractor={item => item.id}
          style={{height:'100%'}}
        />
      </SafeAreaView>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003A5D",
    // marginTop: StatusBar.currentHeight || 0,
  },
  route: {
    backgroundColor: '#E5E5E5',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',
  },
  routetitle: {
    fontSize: 18,
  },
  routebutton: {
    alignSelf:'flex-end',
    padding: 20
  }
});

export default WayfindingPage;