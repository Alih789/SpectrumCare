import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


function HomePage(): JSX.Element {

  return (
    <View style={styles.background}>
      <Text style={styles.HeaderText}> Staff Contact List </Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.Cells} />
        <View style={styles.Cells} />
        <View style={styles.Cells} />
        <View style={styles.Cells} />
        <View style={styles.Cells} />
        <View style={styles.Cells} />
        <View style={styles.Cells} />
        <View style={styles.Cells} />
        <View style={styles.Cells} />
        <View style={styles.Cells} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#003A5D",
  },
  scrollView: {
    marginHorizontal: 25,
  },
  HeaderText: {
    paddingTop:30,
    paddingBottom: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 36,
  },
  Cells: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
    height: 200,
    padding: 20,
  },
});

export default HomePage;