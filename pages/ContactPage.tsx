import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, SafeAreaView, useWindowDimensions, FlatList, Pressable} from 'react-native';
import firestore from '@react-native-firebase/firestore';

type itemProps ={id: string, name: string, imagePath: any, jobTitle: string, department: string, onPress: (isPressed: boolean) => void, hyperlink: string}

function ContactPage(): JSX.Element {

  //used to store All Staff data source
  const [fullData, setFullData] =  useState<itemProps[]>([])
  const [searchFullData, setSearchFullData] = useState<itemProps[]>([]);


  //Handles query to database
  useEffect( ()=> {

    async function getStaffList(){
      const allStaffCollections = (await firestore().collection('staff-list').get()).docs;
      let  strippedAllStaffCollection :any = []

      allStaffCollections.forEach(doc => strippedAllStaffCollection.push(doc.data()))

      let allStaffCollectionObjects :itemProps[] = strippedAllStaffCollection

      setFullData(allStaffCollectionObjects)

    }

    getStaffList();

  }, [])


  //handles updating the display based on what we get from the database
  useEffect( ()=>{
    setSearchFullData(fullData)
  }, [fullData])

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Staff Contact List </Text>
      {
          fullData.map((item) =>
          <Text key={item.id}>
            {item.name}
          </Text>)
        }
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