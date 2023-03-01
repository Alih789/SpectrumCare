import React, {useState} from 'react';
import { StyleSheet, Text, SafeAreaView, useWindowDimensions} from 'react-native';
import {ScrollView } from 'react-native-gesture-handler';
import StaffContactEntry from '../components/StaffContactEntry';
import SearchBar from "react-native-dynamic-search-bar";

const staffInfo = require('../assets/staffDirectory/staffContactData.json');


function HomePage(): JSX.Element {
  const [searchData, setSearchData] = useState('');
  const {height} = useWindowDimensions();

  const handleSearch = (text: string) => {
    setSearchData(text);
  };

  const filteredData = staffInfo.data.filter((item) => {
    const name = item.name.toLowerCase();
    const query = searchData.toLowerCase();
    return name.includes(query)
  });

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Staff Contact List </Text>
      <SearchBar
        placeholder="Search"
        onChangeText={handleSearch}
        style={styles.searchBar}
      />
        <ScrollView style={[styles.scrollView, {height: height - 150}]}>
          {filteredData.map((item, index: number) => (
            <StaffContactEntry
              key={index}
              name={item.name}
              image={item.image}
              jobTitle={item.jobTitle}
            />

          ))}
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