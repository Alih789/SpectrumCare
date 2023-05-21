import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import ProcedureList from '../components/ProcedureList';
import prepInfo from '../assets/testData/procedureMenuData.json';
import Fuse from 'fuse.js';

import {PrepInfoProps} from '../assets/customTypes';
import firestore from '@react-native-firebase/firestore';
import NotesButton from '../components/NotesButton'; 

function PrepPage(): JSX.Element {

  //used to store All Procedures data source
  const [fullData, setFullData] =  useState<PrepInfoProps[]>([])
  //used to store filtered data based on the search
  const [searchData, setSearchData] = useState<PrepInfoProps[]>([])


  //Handles query to database
  useEffect( ()=> {

    async function getProceduresList(){
      const allProceduresCollections = (await firestore().collection('procedures').get()).docs;
      let  strippedAllProceduresCollection :any = []

      allProceduresCollections.forEach(doc => strippedAllProceduresCollection.push(doc.data()))

      let allProceduresCollectionObjects :PrepInfoProps[] = strippedAllProceduresCollection

      setFullData(allProceduresCollectionObjects)

    };

    getProceduresList();

  }, [])


  //handles updating the display based on what we get from the database
  useEffect( ()=>{
    setSearchData(fullData)
  }, [fullData])


  //used to store filtered data based on the search
  //stores current searched term
  const [searchTerm, setSearchTerm] = useState('');

  const options = {
    keys: ['id'],
    //search score for how close the match is to the actual string
    includeScore: true,
    threshold: 0.3,
    //min number of char required to in search to make sure matcb is valid
    minMatchCharLength: 3,
    //max length of the search
    maxPatternLength: 32,
  };

  // const fuse = new Fuse(prepInfo.data, options);
  const fuse = new Fuse(fullData, options); // set full data from database as initial search data

  const handleSearch = (text: string) => {
    if (text.length == 0) {
      // setSearchData(prepInfo.data);
      setSearchData(fullData);
    } else {
      const results = fuse.search(text);
      const filteredData = results.map(result => result.item);
      setSearchData(filteredData);
    }
    setSearchTerm(text);
  };

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Explore Visits </Text>
      <SearchBar
        placeholder="Search"
        value={searchTerm}
        onClearPress={() => {
          // setSearchData(prepInfo.data);
          setSearchData(fullData);
          setSearchTerm('');
        }}
        onChangeText={handleSearch}
        style={styles.searchBar}
      />
      <ProcedureList data={searchData} />
      <NotesButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#003a5d',
    flex: 1,
  },
  headerText: {
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 36,
    fontFamily: "Figtree-SemiBold"
  },
  searchBar: {
    borderRadius: 10,
    marginBottom: 10,
  },
});
export default PrepPage;
