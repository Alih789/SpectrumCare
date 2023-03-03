import React, {useState} from 'react';
import {Text, SafeAreaView, StyleSheet, Platform} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import {PrepInfoProps} from '../assets/customTypes';
import ProcedureList from '../components/ProcedureList';
import prepInfo from '../assets/testData/procedureMenuData.json';

function PrepPage(): JSX.Element {
  const [searchData, setSearchData] = useState('');

  const handleSearch = (text: string) => {
    setSearchData(text);
  };

  const filteredData = prepInfo.data.filter((item: PrepInfoProps) => {
    const title = item.title.toLowerCase();
    const query = searchData.toLowerCase();
    return title.includes(query);
  });

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Explore Visits </Text>
      <SearchBar
        placeholder="Search"
        onChangeText={handleSearch}
        style={styles.searchBar}
      />
      <ProcedureList data={filteredData} />
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
