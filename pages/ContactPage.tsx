import React from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import StaffContactEntry from '../components/StaffContactEntry';


function HomePage(): JSX.Element {
  
  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Staff Contact List </Text>
      <ScrollView style={styles.scrollView}>
        <StaffContactEntry />
        <StaffContactEntry />
        <StaffContactEntry />
        <StaffContactEntry />
        <StaffContactEntry />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#003A5D",
  },
  scrollView: {
    marginHorizontal: 25,
  },
  headerText: {
    paddingTop: 30,
    paddingBottom: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 36,
  },
  
});

export default HomePage;