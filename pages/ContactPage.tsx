import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, useWindowDimensions, FlatList } from 'react-native';
import StaffContactEntry from '../components/StaffContactEntry';
// import NotesButton from '../components/NotesButton';
import SearchBar from "react-native-dynamic-search-bar";
import Fuse from 'fuse.js';

// const staffInfo = require('../assets/staffDirectory/staffContactData.json');

function ContactPage(): JSX.Element {

  const staffInfo = [
    {
      "id": "01-Pediatric-Allergy-Immunology-and-Rheumatology",
      "name": "Victoria R. Dimitriades, M.D.",
      "imagePath": require("../assets/images/staffImages/Victoria_R_Immunolgy.jpeg"),
      "department": "Chief, Division of Pediatric Allergy, Immunology and Rheumatology",
      "jobTitle": "Clinical Professor, Department of Pediatrics"
    },
    {
      "id": "02-Pediatric-Allergy-Immunology-and-Rheumatology",
      "name": "Sheryl J. Boon, M.D., M.S.P.H.",
      "imagePath": require("../assets/images/staffImages/Sheryl_Rheumatology.jpeg"),
      "department": "Division of Pediatric Allergy, Immunology and Rheumatology",
      "jobTitle": "Clinical Professor"
    },
    {
      "id": "03-Pediatric-Allergy-Immunology-and-Rheumatology",
      "name": "Angel Alberto Herrera Guerra, M.D.",
      "imagePath": require("../assets/images/staffImages/Angel_Rheumatology.jpeg"),
      "department": "Division of Pediatric Allergy, Immunology and Rheumatology",
      "jobTitle": "Associate Professor"
    },
    {
      "id": "04-Pediatric-Allergy-Immunology-and-Rheumatology",
      "name": "Anh Phuong Nguyen, M.D., M.P.H.",
      "imagePath": require("../assets/images/staffImages/Anh_Rheumatology.jpeg"),
      "department": "Division of Pediatric Allergy, Immunology and Rheumatology",
      "jobTitle": "Assistant Clinical Professor"
    },
    {
      "id": "05-CAARE-Diagnostic-and-Treatment-Center",
      "name": "Victoria R. Dimitriades, M.D.",
      "imagePath": require("../assets/images/staffImages/Victoria_R_Immunolgy.jpeg"),
      "department": "Chief, Division of Pediatric Allergy, Immunology and Rheumatology",
      "jobTitle": "Clinical Professor, Department of Pediatrics"
    },
  ];



  //used to store full data source
  const [fullData, setFullData] = useState(staffInfo);
  //used to store filtered data based on the search
  const [searchData, setSearchData] = useState(staffInfo);
  //stores current searched term 
  const [searchTerm, setSearchTerm] = useState('');
  //adjust the background to appear when searching for specific names
  const { height } = useWindowDimensions();

  const options = {
    keys: ["name"],
    //search score for how close the match is to the actual string
    includeScore: true,
    threshold: 0.3,
    //min number of char required to in search to make sure matcb is valid
    minMatchCharLength: 3,
    //max length of the search
    maxPatternLength: 32,
  };

  const fuse = new Fuse(fullData, options);

  const handleSearch = (text: string) => {
    if (text.length == 0) {
      setSearchData(fullData);
    } else {
      const results = fuse.search(text);
      const filteredData = results.map((result) => result.item);
      setSearchData(filteredData);
    }
    setSearchTerm(text);
  };

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Staff Contact List </Text>
      <SearchBar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchTerm}
        onClearPress={() => {
          setSearchData(fullData);
          setSearchTerm('')
        }}
        style={styles.searchBar}
      />
      <FlatList
        data={searchData}
        renderItem={({ item }) =>
          <StaffContactEntry
            name={item.name}
            imagePath={item.imagePath}
            jobTitle={item.jobTitle}
            department={item.department}
          />}
        keyExtractor={item => item.id}
        style={[styles.list, { height: height - 150 }]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#003A5D",
  },
  list: {
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
  searchBar: {
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
});

export default ContactPage;