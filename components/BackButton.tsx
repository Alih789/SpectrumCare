import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function BackButton() {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        navigation.goBack();
      }}>
      <Ionicons name="arrow-back-outline" />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BackButton;
