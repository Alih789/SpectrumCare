import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

function BackButton() {
  const navigation = useNavigation();

  return (
    <View style={styles.buttonContainer}>
      <TouchableNativeFeedback
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons name="arrow-back-outline" color={'white'} size={40} />
      </TouchableNativeFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 10,
    width: '12%',
  },
});

export default BackButton;
