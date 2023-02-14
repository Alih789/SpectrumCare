import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

function HomePage({navigation}:any): JSX.Element { 
  
    return (
      <View>
        <Text style = {{alignSelf:'center'}}>Home Page Placeholder</Text>
        <Button title='Hello' onPress={() =>
            navigation.navigate('Contact')}/>
      </View>
    );
  
}

// ...

export default HomePage;