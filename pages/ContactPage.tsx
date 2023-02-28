import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import StaffContactEntry from '../components/StaffContactEntry';
import SearchBar from "react-native-dynamic-search-bar";


function HomePage(): JSX.Element {

  const images =[
    'https://physicians.ucdavis.edu/Custom/Photos/22079.jpg',
  ];

  const Names = [
  ];

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Staff Contact List </Text>
      <SearchBar
        placeholder="Search here"
        onChangeText={(text) => console.log(text)}
      />
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
    paddingTop: 10,
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