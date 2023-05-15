import React, { useEffect, useState } from 'react';
import {ActivityIndicator, View, StyleSheet, Text, SafeAreaView, useWindowDimensions, FlatList, Pressable} from 'react-native';
import StaffContactEntry from '../components/StaffContactEntry';
import SearchBar from "react-native-dynamic-search-bar";
import NotesButton from '../components/NotesButton';
import Fuse from 'fuse.js';
import AllStaffInfo from "../assets/AllStaffInfo.js";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


type itemProps = {
  id: string,
  name: string,
  imagePath: any,
  jobTitle: string,
  department: string,
  phoneNumber: string,
  onPress: (isPressed: boolean) => void,
  hyperlink: string
}


function ContactPage(): JSX.Element {

  //used to store All Staff data source
  const [fullData, setFullData] =  useState<itemProps[]>([]);
  const [searchFullData, setSearchFullData] = useState<itemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<FirebaseFirestoreTypes.DocumentSnapshot>();

  //used to store Favorite Staff data source
  const [favData, setFavData] = useState<itemProps[]>([]);
  const [favColors, setFavColors] = useState({});

  //used to store Fav filtered data based on the search
  const [searchFavData, setSearchFavData] =  useState<itemProps[]>([]);

  //stores current searched term
  const [searchTerm, setSearchTerm] = useState('');
  //adjust the background to appear when searching for specific names
  const { height } = useWindowDimensions();

  //determines which tab you are on
  const [activeTab, setActiveTab] = useState('AllStaff')

  async function getImageUrl(imagePath: string){
    const imageRef = storage().ref(imagePath);
    try {
      const downloadUrl = await imageRef.getDownloadURL();

      if(downloadUrl){
        return downloadUrl;
      }
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async function loadMore(){
    //fetches the next set of data from the database
    //lastVisible carries the last entry from the loaded batch recorded by the fetch
    try {
      //Creating a ref for the collection we are trying to query
      const collectionRef = firestore().collection('staff-list');

      //query the next set of results
      let query = collectionRef.orderBy('name');

      //if we havent reached the end of the list
      if(lastVisible){
        query = query.startAfter(lastVisible);
      }

      const snapshot = await query.get();

      const newData = await Promise.all(snapshot.docs.map(async (doc) => {
        const data = doc.data();

        //imagePath is then turned into a url with google token
        const downloadUrl = await getImageUrl(data.imagePath);
        //creating new objects with updated information

        return {
          id: doc.id,
          name: data.name,
          imagePath: downloadUrl,
          jobTitle: data.title,
          department: data.department,
          phoneNumber: data.phoneNumber,
          onPress: (isPressed: boolean) => {},
          hyperlink: data.hyperlink,
        };
      }));
      //updates the fullData array by appending the new Data to it
      setFullData([...fullData, ...newData]);
      //updates the last document fetched from the db and starts the next batch from that point
      setLastVisible(snapshot.docs[snapshot.docs.length-1])
    } catch(error) {
      console.log('Error fetching next set of results: ', error);
    }
  }

  //Handles query to database
  useEffect( ()=> {
    async function getStaffList(){
      const staffSnapshot = (await firestore().collection('staff-list').orderBy('name').limit(5).get());
      const newData = await Promise.all(staffSnapshot.docs.map(async (doc) => {
        const data = doc.data();

        const downloadUrl =  await getImageUrl(data.imagePath);

        return {
          id: doc.id,
          name: data.name,
          imagePath: downloadUrl,
          jobTitle: data.title,
          phoneNumber: data.phoneNumber,
          department: data.department,
          onPress: (isPressed: boolean) => {},
          hyperlink: data.hyperlink,
        };
      }));

      setFullData(newData);
      setLastVisible(staffSnapshot.docs[staffSnapshot.docs.length-1]);
      //setloading lets us know that the data has finished loading on screen
      setLoading(false);
    }
    getStaffList();
  }, [])

  //handles updating the display based on what we get from the database
  useEffect( ()=>{
    setSearchFullData(fullData)
  }, [fullData])



    //handles updating the display based on what we get from the favData
  useEffect( ()=>{
    setSearchFavData(favData)
  }, [favData])

  const handleFavPress = (staffId: string) => {
    const staff:any = fullData.find((s) => s.id === staffId);

    //If the staff isnt in the list add them
    if(!favData.includes(staff)) {
      setFavData(favData.concat(staff));
      setFavColors({...favColors, [staffId]: "red"});
    //Staff is in the list, remove them
    } else {
      setFavData(favData.filter((s) => s.id !== staffId));
      setFavColors({...favColors, [staffId]: "gray"});
    }
  }

  const options = {
    keys: ["department"],
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
      if (activeTab == 'AllStaff'){
        setSearchFullData(fullData);
      }
      if (activeTab == 'Favorite'){
        setSearchFavData(favData);
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


  const handleTabToggle = (tab: string) => {
    setActiveTab(tab);
  };

  const renderAllStaffTab = () => {

    return (
    <FlatList
        data={searchFullData}
        renderItem={({ item }) =>
          <StaffContactEntry
            onPress={() => handleFavPress(item.id)}
            name={item.name}
            imagePath={item.imagePath}
            jobTitle={item.jobTitle}
            department={item.department}
            phoneNumber={item.phoneNumber}
            hyperlink={item.hyperlink}
          />}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={1.5}
        ListFooterComponent={() => (loading ? <ActivityIndicator size='large' color="#0000ff"/> : null)}
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
            onPress={() => handleFavPress(item.id)}
            name={item.name}
            imagePath={item.imagePath}
            jobTitle={item.jobTitle}
            department={item.department}
            phoneNumber={item.phoneNumber}
            hyperlink={item.hyperlink}
            />}
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
          if (activeTab == 'Favorite'){setSearchFavData(favData);}
          setSearchTerm('')
        }}
        style={styles.searchBar}
      />
      <View style={styles.toggleContainer}>
        <Pressable style={[styles.tabButton, activeTab === "AllStaff" && styles.selectedTabButton]} onPress={() => handleTabToggle('AllStaff')}>
          <Text style={styles.tabText}>All Staff</Text>
        </Pressable>
      <View style={styles.seperator}></View>
        <Pressable  style={[styles.tabButton, activeTab === "Favorite" && styles.selectedTabButton]} onPress={() => handleTabToggle('Favorite')}>
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
    paddingRight: 48,
    paddingLeft: 48,
    padding: 5,
  },
  selectedTabButton: {
    backgroundColor: "lightblue",
  },
  tabText:{
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
    fontFamily: "Figtree-Bold"
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
    fontFamily: "Figtree-Bold"
  },
  searchBar: {
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ContactPage;