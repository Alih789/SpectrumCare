import React, {useState} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import ProcedureList from '../components/ProcedureList';
import prepInfo from '../assets/testData/procedureMenuData.json';
import Fuse from 'fuse.js';


function PrepPage(): JSX.Element {
  //used to store full data source
  const [fullData, setFullData] = useState(prepInfo.data);
  //used to store filtered data based on the search
  const [searchData, setSearchData] = useState(prepInfo.data);
  //stores current searched term 
  const [searchTerm, setSearchTerm] = useState('');

  const options = {
    keys: ["id"],
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
      <Text style={styles.headerText}> Explore Visits </Text>
      <SearchBar
        placeholder="Search"
        value={searchTerm}
        onClearPress={() => {
          setSearchData(fullData);
          setSearchTerm('')
        }}
        onChangeText={handleSearch}
        style={styles.searchBar}
      />
      <ProcedureList data={searchData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#003a5d',
  },
  headerText: {
    paddingTop: 20,
    paddingBottom: 10,
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
export default PrepPage;
