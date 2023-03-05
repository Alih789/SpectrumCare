import {Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type itemProps ={name: string, imagePath: any, jobTitle: string, department: string}

function StaffContactEntry({name, imagePath, jobTitle, department}: itemProps): JSX.Element {

  console.log(imagePath)
  return (
    <View style={styles.container}>
      <Image source={imagePath} style={styles.image}/>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
        <Text style={styles.department}>{department}</Text>
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
    flex: 0.7,
    flexWrap: "wrap",
    fontSize: 9,
  },
})
export default StaffContactEntry