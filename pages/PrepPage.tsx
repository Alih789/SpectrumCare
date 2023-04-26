import React, {useState} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
// import prepInfo from '../assets/testData/procedureMenuData.json';

function PrepPage(): JSX.Element {

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Explore Visits </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#003a5d',
  },
  headerText: {
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 36,
  },
  searchBar: {
    borderRadius: 10,
    marginBottom: 10,
  },
});
export default PrepPage;
