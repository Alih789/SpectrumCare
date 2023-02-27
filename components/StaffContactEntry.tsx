import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// type ContactListProps = {
//   imageURLs: string[];
//   name: string[];
//   jobTitle: string[];
// };

function StaffContactEntry(): JSX.Element {

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/staffImages/Victoria_R_Immunolgy.jpeg")} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>Victoria R. Dimitriades, M.D.</Text>
        <Text style={styles.jobTitle}>Chief, Division of Pediatric Allergy, Immunology</Text>
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
  name: {
    fontWeight: 'bold',

  },
  detailsContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  jobTitle: {
    fontSize: 9,
  },
})
export default StaffContactEntry