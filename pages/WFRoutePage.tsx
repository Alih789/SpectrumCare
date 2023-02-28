import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Alert, Modal, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';

import WFCarousel from '../components/WFCarousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

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

  const [modalVisible, setModalVisible] = useState(false);

  // todo: Use routeID and/or routeTitle to "gather" (load from files and/or firebase) image and text data to pass to slideshow component
  const images = [
    require("../assets/images/wfImages/01-parking-clinic/1.png"),
    require("../assets/images/wfImages/01-parking-clinic/2.png"),
    require("../assets/images/wfImages/01-parking-clinic/3.png"),
    require("../assets/images/wfImages/01-parking-clinic/4.png"),
    require("../assets/images/wfImages/01-parking-clinic/5.png"),
    require("../assets/images/wfImages/01-parking-clinic/6.png"),
    require("../assets/images/wfImages/01-parking-clinic/7.png"),
    require("../assets/images/wfImages/01-parking-clinic/8.png"),
    require("../assets/images/wfImages/01-parking-clinic/9.png"),
    require("../assets/images/wfImages/01-parking-clinic/10.png"),
    require("../assets/images/wfImages/01-parking-clinic/11.png"),
    require("../assets/images/wfImages/01-parking-clinic/12.png"),
    require("../assets/images/wfImages/01-parking-clinic/13.png"),
    require("../assets/images/wfImages/01-parking-clinic/14.png"),
    require("../assets/images/wfImages/01-parking-clinic/15.png"),
    // require("../assets/images/wfImages/01-parking-clinic/16.png"),
    // require("../assets/images/wfImages/01-parking-clinic/17.png"),
    // require("../assets/images/wfImages/01-parking-clinic/18.png"),
  ];

  const text = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    // "16",
    // "17",
    // "18",
  ];

  const modalText = [
    'Hospital Entry',
    'Entry Hallway',
    'Clinic Welcome Desk',
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    // "16",
    // "17",
    // "18",
  ];

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.headerText}> {routeTitle}</Text>
          <Pressable
            style={[styles.modalOpenButton]}
            onPress={() => setModalVisible(true)}>
            <Ionicons name={'list-outline'} size={45} color={'white'} />
          </Pressable>
        </View>

        <WFCarousel imageURLs={images} text={text} />

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalHeadingText}> Select Landmark to Jump to</Text>
                <ScrollView>
                  {modalText.map((item, index, key) => ((
                    <TouchableOpacity key={item} >
                      <View style={styles.modalItem}>
                        <Text
                          // onPress={() => this.setState({ indexSelect : index})}
                          style={[styles.modalItemText,
                            // { color: this.state.indexSelect === index ? '#ff0000' : '#000000' }
                          ]}
                        >
                          {item}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                  )}
                </ScrollView>
                <Pressable
                  style={[styles.modalButton]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text >Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#003a5d",
    height: '100%',
    display: 'flex',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: "#003a5d",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap'
  },
  modalOpenButton: {
    borderRadius: 20,
    elevation: 6,
    padding: 8,
    backgroundColor: '#00b2e3',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: Dimensions.get('screen').height,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 400,
  },
  modalButton: {
    borderRadius: 20,
    elevation: 6,
    alignSelf: 'flex-end',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#00b2e3',
  },
  modalHeadingText: {
    fontSize: 22,
    padding: 8,
  },
  modalItem: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    top: 0,
    left: 0,
    right: 0,
    // padding: 0,
    margin: 0,
    marginHorizontal: 0,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  modalItemText: {
    fontSize: 18,
    width: '100%',
  }
});

export default WFRoutePage;