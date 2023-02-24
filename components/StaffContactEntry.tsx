import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'


function StaffContactEntry(): JSX.Element {
  return (
    <View style={styles.cell}>
          <Image source={require("../assets/images/staffImages/Victoria_R_Immunolgy.jpeg")} style={styles.placeholderImg} />
          <Text>Victoria R. Dimitriades, M.D.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    cell: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 2,
        height: 200,
        padding: 20,
        borderRadius: 15,
      },
      Text:{
        width: "100%",
      },
      placeholderImg: {
        width: "40%", 
        height: 150,
      },
})
export default StaffContactEntry