import {Image, StyleSheet, Text, View, Pressable, Linking, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react'

type itemProps ={name: string, imagePath: string, jobTitle: string, department: string, phoneNumber: string, onPress: (isPressed: boolean) => void, isFavorited: boolean, hyperlink: string}

function StaffContactEntry({name, imagePath, jobTitle, department, phoneNumber, onPress, isFavorited, hyperlink}: itemProps): JSX.Element {

  const [isPressed, setIsPressed] = useState(isFavorited);

  const handleFavPress = () => {
    //Handles the favorite button color change
    setIsPressed(!isPressed);
    //Triggers the removal and appending into the favDAta
    if (onPress) {
      onPress(!isPressed);
    }
  }

  const callNumber = (phone: string) => {
    let phoneNumber = phone;
    phoneNumber = `tel:1-${phone}`;
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        // Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: imagePath}} style={styles.image}/>
      <Pressable style={styles.favPostioning} onPress={handleFavPress}>
        <Ionicons name="heart" style={[isPressed ? styles.Favorite : styles.unFavorite]} size={22}/>
      </Pressable>
      <View style={styles.detailsContainer}>
        <Text selectable={true} style={styles.name}>{name}</Text>
        <Text selectable={true} style={styles.jobTitle}>{jobTitle}</Text>
        <Text selectable={true} style={styles.department}>{department}</Text>
        <Pressable onPress={() => callNumber(phoneNumber)}>
          <Text  selectable={true} style={styles.phoneNumber}>Office: {phoneNumber}</Text>
        </Pressable>


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
    justifyContent: "space-between",
    padding: 10,
    height: 200,
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    flexShrink: 1,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:4,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flexDirection: 'column',
    maxWidth: 200,
    maxHeight: '100%',
    marginRight: 10,
    marginLeft: 10,
    paddingRight: 10,

  },

//Favoriting Button CSS -- Begin
  favPostioning:{
    position: "absolute",
    top: 5,
    right: 5,

  },
  unFavorite: {
    color: 'grey',
  },
  Favorite: {
    color: 'red',
  },
// Favorting Button CSS -- End

  name: {
    flexWrap: "wrap",
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 3,
    lineHeight: 17,
    fontFamily: 'Figtree-Medium'
  },
  jobTitle: {
    flexWrap: "wrap",
    fontWeight: "600",
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 17,
    fontFamily: 'Figtree-Medium'
  },
  department: {
    flexWrap: "wrap",
    fontSize: 13,
    marginBottom: 5,
    lineHeight: 17,
    fontFamily: 'Figtree-Medium'
  },
  box: {
    borderWidth: 2,
    borderColor: '#003A5D',
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:20,
    paddingRight:20,
    borderRadius: 8,
    marginRight:10,
  },
  linkText: {
    textAlign: 'center',
    fontWeight: "bold",
    color: "#003A5D",
    fontFamily: 'Figtree-Light'
  },
  phoneNumber: {
    color: "black",
    fontWeight: '500',
    fontSize: 13,
    marginBottom: 12,
    fontFamily: 'Figtree-Light'
  }
})
export default StaffContactEntry