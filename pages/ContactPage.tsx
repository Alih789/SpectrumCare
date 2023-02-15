import React from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


function HomePage(): JSX.Element {

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}> Staff Contact List </Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.cell}>
          <Image source={require("../assets/images/placeholderImage.jpeg")} style={styles.placeholderImg} />
          <Text>Staff Contact Info Here</Text>
        </View>
        <View style={styles.cell}>
          <Image source={require("../assets/images/placeholderImage.jpeg")} style={styles.placeholderImg} />
          <Text>Staff Contact Info Here</Text>
        </View>
        <View style={styles.cell}>
          <Image source={require("../assets/images/placeholderImage.jpeg")} style={styles.placeholderImg} />
          <Text>Staff Contact Info Here</Text>
        </View>
        <View style={styles.cell}>
          <Image source={require("../assets/images/placeholderImage.jpeg")} style={styles.placeholderImg} />
          <Text>Staff Contact Info Here</Text>
        </View>
        <View style={styles.cell}>
          <Image source={require("../assets/images/placeholderImage.jpeg")} style={styles.placeholderImg} />
          <Text>Staff Contact Info Here</Text>
        </View>
        <View style={styles.cell}>
          <Image source={require("../assets/images/placeholderImage.jpeg")} style={styles.placeholderImg} />
          <Text>Staff Contact Info Here</Text>
        </View>
        <View style={styles.cell}>
          <Image source={require("../assets/images/placeholderImage.jpeg")} style={styles.placeholderImg} />
          <Text>Staff Contact Info Here</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#003A5D",
  },
  scrollView: {
    marginHorizontal: 25,
  },
  headerText: {
    paddingTop: 30,
    paddingBottom: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 36,
  },
  cell: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 2,
    height: 200,
    padding: 20,
  },
  placeholderImg: {
    width: "40%",
    height: 150,
  },
});

export default HomePage;