import React from 'react';
import { StyleSheet, Text, SafeAreaView} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import StaffContactEntry from '../components/StaffContactEntry';
import SearchBar from "react-native-dynamic-search-bar";


function HomePage(): JSX.Element {

  const images = [
    "../assets/images/staffImages/Victoria_R_Immunolgy.jpeg",
  ]

  const names = [
    "Victoria R. Dimitriades, M.D.",
  ]
  const jobTitle = [
    "Chief, Division of Pediatric Allergy, Immunology",
  ]

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Staff Contact List </Text>
      <SearchBar
        placeholder="Search"
        onChangeText={(text) => console.log(text)}
        style={styles.searchBar}
      />
        <ScrollView style={styles.scrollView}>
          <StaffContactEntry />
          <StaffContactEntry />
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
    marginHorizontal: 20,
  },
  headerText: {
    paddingTop: 30,
    paddingBottom: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 36,
  },
  searchBar:{
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
});

export default HomePage;