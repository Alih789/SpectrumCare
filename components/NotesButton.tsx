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
import { storage } from './storageConst';




const storeData = async (value :any) => {
  try {
    await storage.set('notesData', value)
  } catch (e) {
    // saving error
  }
}






function NotesButton(): JSX.Element {

    const [collapsed,setCollapsed] = useState(true)



    const getData = async () => {
      try {
        const savedNotes  = await storage.getString('notesData')
        if(savedNotes !== "undefined") {
          onChangeText(String(savedNotes))
          
        }
      } catch(e) {
        
        // error reading value
      }
    }

    
    const [text, onChangeText] = React.useState('Useless Multiline Placeholder');

    
  function onCollapseHandler(textToSave:any){
    storeData(textToSave);
    setCollapsed(true)
    
  }
  function onExpandHandler(){
    getData();
    setCollapsed(false);
  }


    return (

        collapsed?
      <SafeAreaView style={styles.parentViewButtonStyle}>

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
    parentViewButtonStyle:{
      position:'absolute',
      bottom:10,
      right:10
    },
    touchableOpacityStyle: {
      width: 50,
      height: 50,
      
    },
    floatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
      
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