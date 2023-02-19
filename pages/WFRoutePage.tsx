import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Alert, Modal, Pressable } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';

import WFCarousel from '../components/WFCarousel';

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

  // todo: "gather" (load from files) image and text data to pass to slideshow component
  const images = [
    'https://images.pexels.com/photos/2115695/pexels-photo-2115695.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/4159435/pexels-photo-4159435.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/5991465/pexels-photo-5991465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  ];

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.headerText}> {routeTitle}</Text>
          <Pressable
            style={[styles.modalButton]}
            onPress={() => setModalVisible(true)}>
            <Text >Route Steps</Text>
          </Pressable>
        </View>

        {/* <Text style={styles.headerText}> PUT SLIDESHOW COMPONENT HERE </Text> */}
        <WFCarousel images={images} />

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
                <Text >modal menu here</Text>
                <Pressable
                  style={[styles.modalButton]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text >Hide Modal</Text>
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
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    flex: 1,
    flexWrap: 'wrap'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 20,
    elevation: 2,
    alignSelf: 'flex-end',
    padding: 20,
    backgroundColor: '#00b2e3',
  },
});

export default WFRoutePage;