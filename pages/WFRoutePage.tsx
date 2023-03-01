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

  var images: any[] = [];
  var text: string[] = [];
  var modalText: string[] = [];

  if (routeID === 'parking-lot-to-peds-surg') {
    // todo: Use routeID and/or routeTitle to "gather" (load from files and/or firebase) image and text data to pass to slideshow component
    images = [
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
      require("../assets/images/wfImages/01-parking-clinic/16.png"),
      require("../assets/images/wfImages/01-parking-clinic/17.png"),
      require("../assets/images/wfImages/01-parking-clinic/18.png"),
    ];

    text = [
      "Welcome! This is the parking lot for the UC Davis Children's Surgery clinic building.",
      "Additional patient parking.",
      "Exterior of clinic building. Walk from parking lot to entrance of this building.",
      "You will walk past this sign on your way to the entrance.",
      "Keep walking towards the sign and to the left for the entrance.",
      "Through the main entry door, you will see this desk. Walk to the right for elevators.",
      "This is the elevator bay.",
      "Take any elevator up to the 4th floor.",
      "Coming out of the elevator, you will see this view.",
      "On one side is an OB office - don't go there!",
      "On the other side as you exit the elevator, is the Children's Surgery clinic, suite 4100. This is the right way!",
      "Enter here.",
      "Check in at reception, and you will wait in this waiting room to be seen.",
      "When they call you, you will enter to have your vitals taken.",
      "Then you will walk down this hall to be roomed.",
      "This is the clinic room, where you can sit on the bed and meet with your care team.",
      "This is the other side of the clinic room. Your doctor will sit on the black stool, and your family can sit in the chairs by the window.",
      "After your visit, check out at this desk before exiting to the waiting room and out of the building.",
    ];

    modalText = [
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
      "16",
      "17",
      "18",
    ];

  } else if (routeID === 'parking-lot-to-lab') {
    images = [
      require("../assets/images/wfImages/02-parking-labs/1.png"),
      require("../assets/images/wfImages/02-parking-labs/2.png"),
      require("../assets/images/wfImages/02-parking-labs/3.png"),
      require("../assets/images/wfImages/02-parking-labs/4.png"),
      require("../assets/images/wfImages/02-parking-labs/5.png"),
      require("../assets/images/wfImages/02-parking-labs/6.png"),
      require("../assets/images/wfImages/02-parking-labs/7.png"),
      require("../assets/images/wfImages/02-parking-labs/8.png"),
      require("../assets/images/wfImages/02-parking-labs/9.png"),
      require("../assets/images/wfImages/02-parking-labs/10.png"),
      require("../assets/images/wfImages/02-parking-labs/11.png"),
      require("../assets/images/wfImages/02-parking-labs/12.png"),
      require("../assets/images/wfImages/02-parking-labs/13.png"),
      require("../assets/images/wfImages/02-parking-labs/14.png"),
      require("../assets/images/wfImages/02-parking-labs/15.png"),
    ];

    text = [
      "Welcome! This is the parking lot for the UC Davis Children's Surgery clinic building.",
      "Additional patient parking.",
      "Exterior of clinic building. Walk from parking lot to entrance of this building.",
      "You will walk past this sign on your way to the entrance.",
      "Keep walking towards the sign and to the left for the entrance.",
      "Through the main entry door, you will see this desk. Walk to the right for elevators.",
      "This is the elevator bay.",
      // "Take any elevator up to the 4th floor.",
      // "Coming out of the elevator, you will see this view.",
      // "On one side is an OB office - don't go there!",
      // "On the other side as you exit the elevator, is the Children's Surgery clinic, suite 4100. This is the right way!",
      // "Enter here.",
      // "Check in at reception, and you will wait in this waiting room to be seen.",
      // "When they call you, you will enter to have your vitals taken.",
      // "Then you will walk down this hall to be roomed.",
    ];

    modalText = [
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
    ];
  } else if (routeID === 'h-enter-radiology') {
    images = [
      require("../assets/images/wfImages/03-hosp-enter-radiology/1.png"),
      require("../assets/images/wfImages/03-hosp-enter-radiology/2.png"),
      require("../assets/images/wfImages/03-hosp-enter-radiology/3.png"),
      require("../assets/images/wfImages/03-hosp-enter-radiology/4.png"),
      require("../assets/images/wfImages/03-hosp-enter-radiology/5.png"),
      require("../assets/images/wfImages/03-hosp-enter-radiology/6.png"),
      require("../assets/images/wfImages/03-hosp-enter-radiology/7.png"),
      require("../assets/images/wfImages/03-hosp-enter-radiology/8.png"),
      require("../assets/images/wfImages/03-hosp-enter-radiology/9.png"),
      require("../assets/images/wfImages/03-hosp-enter-radiology/10.png"),
      require("../assets/images/wfImages/03-hosp-enter-radiology/11.png"),
      require("../assets/images/wfImages/03-hosp-enter-radiology/12.png"),
    ];

    text = [
      // "Welcome! This is the parking lot for the UC Davis Children's Surgery clinic building.",
      // "Additional patient parking.",
      // "Exterior of clinic building. Walk from parking lot to entrance of this building.",
      // "You will walk past this sign on your way to the entrance.",
      // "Keep walking towards the sign and to the left for the entrance.",
      // "Through the main entry door, you will see this desk. Walk to the right for elevators.",
      // "This is the elevator bay.",
      // "Take any elevator up to the 4th floor.",
      // "Coming out of the elevator, you will see this view.",
      // "On one side is an OB office - don't go there!",
      // "On the other side as you exit the elevator, is the Children's Surgery clinic, suite 4100. This is the right way!",
      // "Enter here.",
    ];

    modalText = [
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
    ];

  } else if (routeID === 'h-enter-or') {
    images = [
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/1.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/2.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/3.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/4.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/5.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/6.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/7.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/8.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/9.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/10.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/11.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/12.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/13.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/14.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/15.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/16.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/17.png"),
      require("../assets/images/wfImages/04-hosp-enter-OR-checkin/18.png"),
    ];

    text = [
      // "Welcome! This is the parking lot for the UC Davis Children's Surgery clinic building.",
      // "Additional patient parking.",
      // "Exterior of clinic building. Walk from parking lot to entrance of this building.",
      // "You will walk past this sign on your way to the entrance.",
      // "Keep walking towards the sign and to the left for the entrance.",
      // "Through the main entry door, you will see this desk. Walk to the right for elevators.",
      // "This is the elevator bay.",
      // "Take any elevator up to the 4th floor.",
      // "Coming out of the elevator, you will see this view.",
      // "On one side is an OB office - don't go there!",
      // "On the other side as you exit the elevator, is the Children's Surgery clinic, suite 4100. This is the right way!",
      // "Enter here.",
      // "Check in at reception, and you will wait in this waiting room to be seen.",
      // "When they call you, you will enter to have your vitals taken.",
      // "Then you will walk down this hall to be roomed.",
      // "This is the clinic room, where you can sit on the bed and meet with your care team.",
      // "This is the other side of the clinic room. Your doctor will sit on the black stool, and your family can sit in the chairs by the window.",
      // "After your visit, check out at this desk before exiting to the waiting room and out of the building.",
    ];

    modalText = [
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
      "16",
      "17",
      "18",
    ];

  } else {

  }



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