import React, { useState } from 'react';
import {View, StyleSheet, Text, SafeAreaView, useWindowDimensions, FlatList, Pressable} from 'react-native';
import StaffContactEntry from '../components/StaffContactEntry';
import SearchBar from "react-native-dynamic-search-bar";
import NotesButton from '../components/NotesButton';
import Fuse from 'fuse.js';
import AllStaffInfo from "../assets/AllStaffInfo.js";


type itemProps ={id: string, name: string, imagePath: any, jobTitle: string, department: string, onPress: (isPressed: boolean) => void, hyperlink: string}


function ContactPage(): JSX.Element {

  //used to store All Staff data source
  const [fullData, setFullData] = useState(AllStaffInfo);
  //used to store Favorite Staff data source
  const [favData, setFavData] = useState<String[]>([]);

  //some use state containing an array template like fulldata item: {id,name,specialty...}
  const [favDataItems,setFavDataItems] = useState<itemProps[]>([])

  //used to store Full filtered data based on the search
  const [searchFullData, setSearchFullData] = useState(fullData);
  //used to store Fav filtered data based on the search
  const [searchFavData, setSearchFavData] = useState(favDataItems);
  //stores current searched term 
  const [searchTerm, setSearchTerm] = useState('');
  //adjust the background to appear when searching for specific names
  const { height } = useWindowDimensions();
  //stores current state of favorite button: red or gray
  const [isPressed, setIsPressed] = useState(false);
  //determines which tab you are on
  const [activeTab, setActiveTab] = useState('AllStaff')

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
  const fuseFav = new Fuse(favDataItems, options);

  const handleSearch = (text: string) => {
    if (text.length == 0) {
      if (activeTab == 'AllStaff'){
        setSearchFullData(fullData);
      } 
      if (activeTab == 'Favorite'){
        setSearchFavData(favDataItems);
      }
    } else {
      if (activeTab == 'AllStaff'){
        const results = fuseFull.search(text);
        const filteredData = results.map((result) => result.item);
        setSearchFullData(filteredData);    
      }
      if (activeTab == 'Favorite') {
        const resultsFav = fuseFav.search(text);  
        const filteredFavData = resultsFav.map((result) => result.item);
        setSearchFavData(filteredFavData);   
      } 
    }
    setSearchTerm(text);
  };
  
  const handlePress = (docID,fullItem) => { () =>

    setIsPressed(!isPressed);
    favData.indexOf(docID) > -1 ? favData.splice(favData.indexOf(docID), 1):favData.push(docID);

    favDataItems.indexOf(fullItem) > -1 ? favDataItems.splice(favDataItems.indexOf(fullItem),1) : favDataItems.push(fullItem);
    
    setFavDataItems(favDataItems);
    setFavData(favData);
    console.log("FAVDATA: ", favData)
  };

  const handleTabToggle = (tab: string) => {
    setActiveTab(tab);
  };

  const renderAllStaffTab = () => {
    return (
    <FlatList
        data={searchFullData}
        renderItem={({ item }) =>
          <StaffContactEntry
            onPress={() => handlePress(item.id,item)}
            name={item.name}
            imagePath={item.imagePath}
            jobTitle={item.jobTitle}
            department={item.department}
            hyperlink={item.hyperlink}
          />}
        keyExtractor={(item) => item.id}
        style={[styles.list, { height: height - 150 }]}
      />
    )
  };

  const renderFavoriteTab = () => {
    return (

    <FlatList
        data={searchFavData} //data = {searchNewFavData, item array}
        renderItem={({ item }) =>
          favData.indexOf(item.id) > -1 ?
          <StaffContactEntry
            onPress={() => handlePress(item.id, item)}
            name={item.name}
            imagePath={item.imagePath}
            jobTitle={item.jobTitle}
            department={item.department}
            hyperlink={item.hyperlink}
          /> : console.log("ITEM ID NOT FOUND",item.id, " CURRENT ARRAY: ", favData)}
        keyExtractor={item => item.id}
        style={[styles.list, { height: height - 150 }]}
      />
    )
  };

  const renderActiveTab = () =>{
    if(activeTab == 'AllStaff') {
      return renderAllStaffTab();
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
          if (activeTab == 'AllStaff'){setSearchFullData(fullData);}  
          if (activeTab == 'Favorite'){setSearchFavData(favDataItems);}
          setSearchTerm('')
        }}
        style={styles.searchBar}
      />
      <View style={styles.toggleContainer}>
        <Pressable style={styles.tabButton} onPress={() => handleTabToggle('AllStaff')}>
          <Text style={styles.tabText}>All Staff</Text>
        </Pressable>
      <View style={styles.seperator}></View>
        <Pressable  style={styles.tabButton} onPress={() => handleTabToggle('Favorite')}>
          <Text style={styles.tabText}>Favorites</Text>
        </Pressable>
      </View>
      {renderActiveTab()}
      <NotesButton></NotesButton>
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
  tabButton: { 
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
    marginBottom: 10,
  },
});

export default ContactPage;