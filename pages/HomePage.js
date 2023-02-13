import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

class HomePage extends React.Component {
  render() {
    return (
      <View>
        <Text style = {{alignSelf:'center'}}>Home Page Placeholder</Text>
        <Button title='Hello' onPress={() =>
            this.props.navigation.navigate('Contact')}/>
      </View>
    );
  }
}

// ...

export default HomePage;