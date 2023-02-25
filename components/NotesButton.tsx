import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    Modal,
    TextInput,
  } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('notesData', value)
  } catch (e) {
    // saving error
  }
}






function NotesButton(): JSX.Element {

    const [collapsed,setCollapsed] = useState(true)



    const getData = async () => {
      try {
        const savedNotes  = await AsyncStorage.getItem('notesData')
        if(savedNotes !== null) {
          onChangeText(savedNotes)
          // console.log("IM HERE OP4 LAST OP STANDING")
        }
      } catch(e) {
        // console.log("MISSION FAILED WE'LL GET EM NEXT TIME")
        // error reading value
      }
    }


    const [text, onChangeText] = React.useState('Useless Multiline Placeholder');


  function onCollapseHandler(textToSave){
    storeData(textToSave);
    setCollapsed(true)

  }
  function onExpandHandler(){
    getData();
    setCollapsed(false);
  }


    return (

        collapsed?
      <SafeAreaView>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.touchableOpacityStyle }
          onPress={() => onExpandHandler()}
          >
          <Image
            // FAB using TouchableOpacity with an image
            // For online image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            // For local image
            //source={require('./images/float-add-icon.png')}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
      </SafeAreaView> :
      <Modal
      animationType="none"
      visible={!collapsed}
      transparent={true}>
        <SafeAreaView style={styles.modalBackgroundStyle}>
          <View style ={{flexDirection:'row',justifyContent:"flex-start"}}>
            <Text onPress={()=> onCollapseHandler(text)} style = {{textAlignVertical:"center",paddingLeft:10, color:"black"}}>Collapse</Text>
            <Text style = {[styles.text,{marginLeft:"20%"}]}>Notes</Text>
          </View>
          <View>
            <TextInput
              editable
              multiline
              numberOfLines={25}
              maxLength={1000}
              onChangeText={text => onChangeText(text)}
              value={text}
              style={{padding: 10,backgroundColor:"grey",textAlignVertical:"top"}}
            />
          </View>
        </SafeAreaView>
      </Modal>
    );


  }


  const styles = StyleSheet.create({
    touchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: -175,
      bottom: -325,
    },
    floatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
      //backgroundColor:'black'
    },
    modalBackgroundStyle:{
      position:"relative",
      height:"80%",
      width:"80%",
      backgroundColor:"#FFF",
      alignSelf:"center",
      borderRadius:10,
      elevation:7,
      shadowRadius:10,
      shadowColor:"black",
      marginTop:"10%"
    },
    text: {
      color: "black",
      fontSize: 30,
    },
  });


  export default NotesButton;