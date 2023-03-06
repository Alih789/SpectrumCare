import React, { useState } from 'react';
import {View, StyleSheet, Text, SafeAreaView, useWindowDimensions, FlatList, Pressable} from 'react-native';
import StaffContactEntry from '../components/StaffContactEntry';
// import NotesButton from '../components/NotesButton';
import SearchBar from "react-native-dynamic-search-bar";
import Fuse from 'fuse.js';

function ContactPage(): JSX.Element {

  const fullStaffInfo = [
    {
      "id": "01-Pediatric-Allergy-Immunology-and-Rheumatology",
      "name": "Victoria R. Dimitriades, M.D.",
      "imagePath": require("../assets/images/staffImages/Victoria_R_Immunolgy.jpeg"),
      "department": "Chief, Division of Pediatric Allergy, Immunology and Rheumatology",
      "jobTitle": "Clinical Professor, Department of Pediatrics",
      "hyperlink": "https://health.ucdavis.edu/pediatrics/team/22079/victoria-dimitriades-internal_medicine-pediatric_allergy_immunology_and_rheumatology-sacramento",
    },
    {
      "id": "02-Pediatric-Allergy-Immunology-and-Rheumatology",
      "name": "Sheryl J. Boon, M.D., M.S.P.H.",
      "imagePath": require("../assets/images/staffImages/Sheryl_Rheumatology.jpeg"),
      "department": "Division of Pediatric Allergy, Immunology and Rheumatology",
      "jobTitle": "Clinical Professor",
      "hyperlink": "https://health.ucdavis.edu/pediatrics/team/43114/sheryl-boon-sacramento",
    },
    {
      "id": "03-Pediatric-Allergy-Immunology-and-Rheumatology",
      "name": "Angel Alberto Herrera Guerra, M.D.",
      "imagePath": require("../assets/images/staffImages/Angel_Rheumatology.jpeg"),
      "department": "Division of Pediatric Allergy, Immunology and Rheumatology",
      "jobTitle": "Associate Professor",
      "hyperlink": "https://health.ucdavis.edu/pediatrics/team/32290/angel_alberto-herrera_guerra-pediatric_infectious_diseases",
    },
    {
      "id": "04-Pediatric-Allergy-Immunology-and-Rheumatology",
      "name": "Anh Phuong Nguyen, M.D., M.P.H.",
      "imagePath": require("../assets/images/staffImages/Anh_Rheumatology.jpeg"),
      "department": "Division of Pediatric Allergy, Immunology and Rheumatology",
      "jobTitle": "Assistant Clinical Professor",
      "hyperlink": "https://health.ucdavis.edu/pediatrics/team/42636/anh-nguyen-internal_medicine-pediatric_allergy_immunology_and_rheumatology-sacramento",
    },
    {
      "id": "05-CAARE-Diagnostic-and-Treatment-Center",
      "name": "Victoria R. Dimitriades, M.D.",
      "imagePath": require("../assets/images/staffImages/Victoria_R_Immunolgy.jpeg"),
      "department": "Chief, Division of Pediatric Allergy, Immunology and Rheumatology",
      "jobTitle": "Clinical Professor, Department of Pediatrics",
      "hyperlink": "https://health.ucdavis.edu/pediatrics/team/22079/victoria-dimitriades-internal_medicine-pediatric_allergy_immunology_and_rheumatology-sacramento",
    },
  ];

  const favStaff =[
    {
      "id": "06-Pediatric-Allergy-Immunology-and-Rheumatology",
      "name": "Angel Alberto Herrera Guerra, M.D.",
      "imagePath": require("../assets/images/staffImages/Angel_Rheumatology.jpeg"),
      "department": "Division of Pediatric Allergy, Immunology and Rheumatology",
      "jobTitle": "Associate Professor",
      "hyperlink": "https://health.ucdavis.edu/pediatrics/team/32290/angel_alberto-herrera_guerra-pediatric_infectious_diseases",
    },
    {
      "id": "07-Pediatric-Allergy-Immunology-and-Rheumatology",
      "name": "Anh Phuong Nguyen, M.D., M.P.H.",
      "imagePath": require("../assets/images/staffImages/Anh_Rheumatology.jpeg"),
      "department": "Division of Pediatric Allergy, Immunology and Rheumatology",
      "jobTitle": "Assistant Clinical Professor",
      "hyperlink": "https://health.ucdavis.edu/pediatrics/team/42636/anh-nguyen-internal_medicine-pediatric_allergy_immunology_and_rheumatology-sacramento",
    },
    {
      "id": "08-CAARE-Diagnostic-and-Treatment-Center",
      "name": "Victoria R. Dimitriades, M.D.",
      "imagePath": require("../assets/images/staffImages/Victoria_R_Immunolgy.jpeg"),
      "department": "Chief, Division of Pediatric Allergy, Immunology and Rheumatology",
      "jobTitle": "Clinical Professor, Department of Pediatrics",
      "hyperlink": "https://health.ucdavis.edu/pediatrics/team/22079/victoria-dimitriades-internal_medicine-pediatric_allergy_immunology_and_rheumatology-sacramento",
    },
  ];

  //used to store Full data source
  const [fullData, setFullData] = useState(fullStaffInfo);
  //used to store Fav data source
  const [favData, setFavData] = useState(favStaff);
  //used to store Full filtered data based on the search
  const [searchFullData, setSearchFullData] = useState(fullData);
  //used to store Fav filtered data based on the search
  const [searchFavData, setSearchFavData] = useState(favData);
  //stores current searched term 
  const [searchTerm, setSearchTerm] = useState('');
  //adjust the background to appear when searching for specific names
  const { height } = useWindowDimensions();
  //stores current state of favorite button: red or gray
  const [isPressed, setIsPressed] = useState(false);
  //determines which tab you are on
  const [activeTab, setActiveTab] = useState('General')

  const options = {
    keys: ["name"],
    //search score for how close the match is to the actual string
    includeScore: true,
    threshold: 0.3,
    //min number of char required to in search to make sure matcb is valid
    minMatchCharLength: 1,
    //max length of the search
    maxPatternLength: 32,
  };

  const fuseFull = new Fuse(fullData, options);
  const fuseFav = new Fuse(favData, options);

  const handleSearch = (text: string) => {
    if (text.length == 0) {
      if (activeTab == 'General'){
        setSearchFullData(fullData);
      } 
      if (activeTab == 'Favorite'){
        setSearchFavData(favData);
      }
    } else {
      if (activeTab == 'General'){
        const results = fuseFull.search(text);
        const filteredData = results.map((result) => result.item);
        setSearchFullData(filteredData);    
      }
      if (activeTab == 'Favorite') {
        const resultsFav = fuseFav.search(text); //returns an empty array 
        const filteredFavData = resultsFav.map((result) => result.item);
        setSearchFavData(filteredFavData);   
      } 
    }
    setSearchTerm(text);
  };
  
  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  const handleTabToggle = (tab: string) => {
    setActiveTab(tab);
  };

  const renderGeneralTab = () => {
    return (
    <FlatList
        data={searchFullData}
        renderItem={({ item }) =>
          <StaffContactEntry
            onPress={handlePress}
            name={item.name}
            imagePath={item.imagePath}
            jobTitle={item.jobTitle}
            department={item.department}
            hyperlink={item.hyperlink}
          />}
        keyExtractor={item => item.id}
        style={[styles.list, { height: height - 150 }]}
      />
    )
  };

  const renderFavoriteTab = () => {
    return (
    <FlatList
        data={searchFavData}
        renderItem={({ item }) =>
          <StaffContactEntry
            onPress={handlePress}
            name={item.name}
            imagePath={item.imagePath}
            jobTitle={item.jobTitle}
            department={item.department}
            hyperlink={item.hyperlink}
          />}
        keyExtractor={item => item.id}
        style={[styles.list, { height: height - 150 }]}
      />
    )
  };

  const renderActiveTab = () =>{
    if(activeTab == 'General') {
      return renderGeneralTab();
    } else {
      return renderFavoriteTab();
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Staff Contact List </Text>
      <SearchBar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchTerm}
        onClearPress={() => {
          if (activeTab == 'General'){setSearchFullData(fullData);}  
          if (activeTab == 'Favorite'){setSearchFavData(favData);}
          setSearchTerm('')
        }}
        style={styles.searchBar}
      />
      <View style={styles.toggleContainer}>
        <Pressable style={styles.tabButton} onPress={() => handleTabToggle('General')}>
          <Text style={styles.tabText}>General</Text>
        </Pressable>
      <View style={styles.seperator}></View>
        <Pressable  style={styles.tabButton} onPress={() => handleTabToggle('Favorite')}>
          <Text style={styles.tabText}>Favorites</Text>
        </Pressable>
      </View>
      {renderActiveTab()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#003A5D",
    flex: 1,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
  },
  tabButton: { //used to customize the way the button looks - current pressed turn light blue
    backgroundColor: "white",
    borderRadius: 50,
    width: 165,
    padding: 5,
  },
  tabText:{
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  seperator: {
    marginHorizontal: 10,
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