import React, {useState} from 'react';
import { StyleSheet, Text, SafeAreaView, useWindowDimensions, FlatList} from 'react-native';
import StaffContactEntry from '../components/StaffContactEntry';
import SearchBar from "react-native-dynamic-search-bar";

// const staffInfo = require('../assets/staffDirectory/staffContactData.json');

function HomePage(): JSX.Element {


  const staffInfo = [
    {
        "id": "01-Pediatric-Allergy-Immunology-and-Rheumatology",
        "name": "Victoria R. Dimitriades, M.D.",
        "image": "../assets/images/staffImages/Victoria_R_Immunolgy.jpeg",
        "department": "Chief, Division of Pediatric Allergy, Immunology and Rheumatology",
        "jobTitle": "Clinical Professor, Department of Pediatrics"
    },
    { 
        "id": "02-Pediatric-Allergy-Immunology-and-Rheumatology",
        "name": "Sheryl J. Boon, M.D., M.S.P.H.",
        "image": "../assets/images/staffImages/Sheryl_Rheumatology.jpeg",
        "department": "Division of Pediatric Allergy, Immunology and Rheumatology",
        "jobTitle": "Clinical Professor"
    },
    { 
        "id": "03-Pediatric-Allergy-Immunology-and-Rheumatology",
        "name": "Angel Alberto Herrera Guerra, M.D.",
        "image": "../assets/images/staffImages/Angel_Rheumatology.jpeg",
        "department": "Division of Pediatric Allergy, Immunology and Rheumatology",
        "jobTitle": "Associate Professor"
    },
    { 
        "id": "04-Pediatric-Allergy-Immunology-and-Rheumatology",
        "name": "Anh Phuong Nguyen, M.D., M.P.H.",
        "image": "../assets/images/staffImages/Anh_Rheumatology.jpeg",
        "department": "Division of Pediatric Allergy, Immunology and Rheumatology",
        "jobTitle": "Assistant Clinical Professor"
    }
];
  //used to store full data source
  const [fullData, setFullData] = useState(staffInfo);
  //used to store filtered data based on the search
  const [searchData, setSearchData] = useState(staffInfo);
  //adjust the background to appear when searching for specific names
  const {height} = useWindowDimensions();

  const handleSearch = (text: string) => {
    const filteredData = fullData.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
          );
          setSearchData(filteredData);
  };

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Staff Contact List </Text>
      <SearchBar
        placeholder="Search"
        onChangeText={handleSearch}
        onClearPress={()=>{
          setSearchData(fullData);
        }}
        style={styles.searchBar}
      />
      <FlatList
        data={searchData}
        renderItem={({item}) => <StaffContactEntry name={item.name} image={item.image} jobTitle={item.jobTitle} />}
        keyExtractor={item => item.id}
        style={[styles.list, {height: height - 150}]}
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
  searchBar:{
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
});

export default HomePage;