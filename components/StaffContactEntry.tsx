import {Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type itemProps ={name: string, imagePath: any, jobTitle: string, department: string}

function StaffContactEntry({name, imagePath, jobTitle, department}: itemProps): JSX.Element {

  console.log(imagePath)
  return (
    <View style={styles.container}>
      {/* <FastImage
        style={styles.image}
        source={{
          uri: imagePath,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      /> */}
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
  department: {
    fontSize: 9,
  },
})
export default StaffContactEntry