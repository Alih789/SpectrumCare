import {Image, StyleSheet, Text, View, Pressable, Linking} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react'

type itemProps ={name: string, imagePath: string, jobTitle: string, department: string, onPress: (isPressed: boolean) => void, hyperlink: string}

function StaffContactEntry({name, imagePath, jobTitle, department, onPress, hyperlink}: itemProps): JSX.Element {

  const [isPressed, setIsPressed] = useState(false);
  
  const handleFavPress = () => {
    setIsPressed(!isPressed);
    if (onPress) {
      onPress(!isPressed);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: imagePath}} style={styles.image}/>
      <View style={styles.detailsContainer}>
        <Pressable style={styles.favPostioning} onPress={handleFavPress}>
          <Ionicons name="heart" style={[styles.defaultFav, isPressed && styles.favButtonPressed]} size={22}/>
        </Pressable>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
        <Text style={styles.department}>{department}</Text>
        <Pressable onPress={() => Linking.openURL(hyperlink)}>
          <View style={styles.box}>
            <Text style={styles.linkText}>View Full Profile {">"} </Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flexDirection: 'column',
    flexShrink: 1,
    // position: 'relative',
  },
  favPostioning:{
    top: -25,
    right: 0,
    position: "absolute",

  },
  defaultFav: {
    color: 'grey',
  },
  favButtonPressed: {
    color: 'red',
  },
  name: {
    flexWrap: "wrap",
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 3,
  },
  jobTitle: {
    flexWrap: "wrap",
    fontWeight: "600",
    fontSize: 10,
  },
  department: {
    flex: 0.5,
    flexWrap: "wrap",
    fontSize: 9,
  },
  box: {
    borderWidth: 2,
    borderColor: '#003A5D',
    padding: 10,
    borderRadius: 8,
  },
  linkText: {
    textAlign: 'center',
    fontWeight: "bold",
    color: "#003A5D",
  },
})
export default StaffContactEntry