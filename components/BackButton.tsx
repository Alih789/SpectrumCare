import * as React from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
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
        <Ionicons name="arrow-back-outline" size={25} />
        <Text style={{fontSize: 20}}>Back</Text>
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
    backgroundColor: 'rgba(255,255,255, 0.8)',
    padding: 5,
    top: 5,
    left: 5,
    width: '20%',
  },
});

export default BackButton;
