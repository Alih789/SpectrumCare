import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type itemProps ={name: string, image: string, jobTitle: string}

function StaffContactEntry({name, image, jobTitle}: itemProps): JSX.Element {

  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image}/>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
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