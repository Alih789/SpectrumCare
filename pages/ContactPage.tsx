import React, { useEffect, useState } from 'react';
import {ActivityIndicator, View, StyleSheet, Text, SafeAreaView, useWindowDimensions, FlatList, Pressable} from 'react-native';
import StaffContactEntry from '../components/StaffContactEntry';
import SearchBar from "react-native-dynamic-search-bar";
import NotesButton from '../components/NotesButton';
import Fuse from 'fuse.js';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {storage as storageLocal}from "../components/storageConst";

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
  const [searchFullData, setSearchFullData] = useState(fullData);

  const [loading, setLoading] = useState(true);
  const [loadMoreInProgress, setLoadMoreInProgress] = useState(false);
  const [lastVisible, setLastVisible] = useState<FirebaseFirestoreTypes.DocumentSnapshot>();

  const [userFavDocArray, setUserFavDocArray] = useState<itemProps[]>([]);

  //used to store Favorite Staff data source
  const [favData, setFavData] = useState<itemProps[]>([]);

  //used to store Fav filtered data based on the search
  const [searchFavData, setSearchFavData] = useState(favData);

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

    if(loadMoreInProgress){
      //request has already been made, do nothing
      return;
    }
    //fetches the next set of data from the database
    //lastVisible carries the last entry from the loaded batch recorded by the fetch
    try {
      setLoadMoreInProgress(true);
      //Creating a ref for the collection we are trying to query
      const collectionRef = firestore().collection('staff-list');

      //query the next set of results
      let query = collectionRef.orderBy('name');

      //if we havent reached the end of the list
      if(lastVisible){
        query = query.startAfter(lastVisible);
      }else{
        return;
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
      setFullData((prevData) => [...prevData, ...newData]);
      //updates the last document fetched from the db and starts the next batch from that point
      setLastVisible(snapshot.docs[snapshot.docs.length-1])
    } catch(error) {
      console.log('Error fetching next set of results: ', error);
    }finally{
      setLoadMoreInProgress(false);
    }
  }

  //Handles query to database
  // let userFavDocArray:any = [];
  useEffect(()=> {

    async function storageFavList(){
      //getting previous save favourited list
      try{
          // We have data!!
          const stringArray = await storageLocal.getString('userFavoritedDocsArray')!;
          // userFavDocArray =JSON.parse(stringArray);
          setUserFavDocArray(JSON.parse(stringArray));

      } catch (error) {
        // Error retrieving data
        setUserFavDocArray([]);
        console.log("Error: ", error);
      }
    }
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
    storageFavList();
    getStaffList();
  }, []);

  //favData is appended and removed in this function

  useEffect(() => {

    let stringDocsArray = JSON.stringify(userFavDocArray);
    storageLocal.set("userFavoritedDocsArray",stringDocsArray);

  },[userFavDocArray])

  const handleFavPress = (staffID: string, name: string) => {
    const staff: any = fullData.find((s) => s.id === staffID);

    if(!userFavDocArray.includes(staff)){
      setUserFavDocArray(userFavDocArray.concat([staff]));
    } else {
      //Delete object from the local storage
      setUserFavDocArray(userFavDocArray.filter((s) => s.id !== staffID));
    }


    //if the staff isnt in the list add them to favData
    if(!favData.includes(staff)){
      //add to async array
      setFavData(favData.concat(staff));
    } else {
      //Staff is in the list, remove them
      //remove from asyn array
      setFavData(favData.filter((s) => s.id !== staffID));
    }

    //async store save array
  }

  const handleSearch = (text: string) => {

    const options = {
      keys: ["department", "name"],
      //search score for how close the match is to the actual string
      includeScore: true,
      threshold: 0.3,
      //min number of char required to in search to make sure matcb is valid
      minMatchCharLength: 3,
      //max length of the search
      maxPatternLength: 32,
    };

    if(text.length === 0){
      if(activeTab === "AllStaff"){
        //No Search has occured
        setSearchFullData(fullData);
      }//TODO : Add else if favorites return full favorites array
      else{
        setSearchFavData(userFavDocArray);
      }
    } else {
      //TODO : Add if else for when its in AllStaff and Favorites
      if(activeTab === "AllStaff"){
        const fuseFull = new Fuse(fullData, options);
        const fullResults = fuseFull.search(text);
        const filteredFullData = fullResults.map((result) => result.item);
        setSearchFullData(filteredFullData);
      }
      else{
        const fuseFav = new Fuse(userFavDocArray, options);
        const favResults = fuseFav.search(text);
        const filteredFavData = favResults.map((result) => result.item);
        setSearchFavData(filteredFavData);
      }
    }
    setSearchTerm(text);
  };


  const handleTabToggle = (tab: string) => {
    setActiveTab(tab);
  }
  //Displays original full data
  const renderAllStaffTab = () => {
    return (
    <FlatList
        data={searchFullData.length != 0 ? searchFullData : fullData}
        renderItem={({ item, index}) =>
        <StaffContactEntry
        key={item.id + '_' + index}
        onPress={() => handleFavPress(item.id,item.name)}
        name={item.name}
        imagePath={item.imagePath}
        jobTitle={item.jobTitle}
        department={item.department}
        phoneNumber={item.phoneNumber}
        hyperlink={item.hyperlink}
        isFavorited={userFavDocArray.filter((s) => s.id === item.id).length > 0}
        />}
        keyExtractor={(item, index) => item.id + '_' + index}
        onEndReached={loadMore}
        onEndReachedThreshold={5}
        ListFooterComponent={() => (loading ? <ActivityIndicator size='large' color="#0000ff"/> : null)}
        style={[styles.list, { height: height - 150 }]}
      />
    )
  };

  //Displays only the favorites data
  const renderFavoriteTab = () => {
    return (
    <FlatList
        data={searchFavData.length != 0 ? searchFavData : userFavDocArray}
        renderItem={({ item, index}) =>
          <StaffContactEntry
            onPress={() => handleFavPress(item.id,item.name)}
            key={item.id + '_' + index}
            name={item.name}
            imagePath={item.imagePath}
            jobTitle={item.jobTitle}
            department={item.department}
            phoneNumber={item.phoneNumber}
            hyperlink={item.hyperlink}
            isFavorited={userFavDocArray.filter((s) => s.id === item.id).length > 0}
            />}
            keyExtractor={(item, index) => item.id + '_' + index}
            style={[styles.list, { height: height - 150 }]}
      />
    )
  };

  //Handles which data is displayed when tabs are clicked
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
          if (activeTab == 'Favorite'){setSearchFavData(userFavDocArray);}
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
    color: "black",
    fontFamily: 'Figtree-SemiBold',
    fontSize: 18,
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
    fontSize: 36,
    fontFamily: 'Figtree-SemiBold',
  },
  searchBar: {
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ContactPage;