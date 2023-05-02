import React, { useState, useEffect } from 'react';
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




const storeData = async (value :any, page :any) => {
  try {

    if(page == 0){
      storage.set('notesData0', value)
    }else if (page == 1){
      storage.set('notesData1', value)
    }else if (page == 2){
      storage.set('notesData2', value)
    } else{
      storage.set('notesData3', value)
    }

    
  } catch (e) {
    // saving error
  }
}






function NotesButton(): JSX.Element {

    const [collapsed,setCollapsed] = useState(true)
    const [page, setPage] = useState(0)



    useEffect( ()=> {
      const getData = async () => {

        try {
          let savedNotes;
          if(page == 0){
            savedNotes  =  storage.getString('notesData0');
          }else if (page == 1){
            savedNotes  =  storage.getString('notesData1');
          }else if (page == 2){
            savedNotes  =  storage.getString('notesData2');
          } else{
            savedNotes  =  storage.getString('notesData3');
          }

          console.log("PRINNTING NOTES: ",savedNotes,page, typeof(savedNotes))

          if(typeof(savedNotes) === 'string' && savedNotes !="undefined") {
            onChangeText(String(savedNotes))
            
          } else{
            onChangeText("Create your first note!")
          }
          
        } catch(e) {
          
          // error reading value
        }
      }
      getData();
    },[page])

    
    const [text, onChangeText] = React.useState('Useless Multiline Placeholder');

    
  function onCollapseHandler(textToSave:any){
    storeData(textToSave, page);
    setPage(0)
    setCollapsed(true)
  }
  function onExpandHandler(){
    //getData();
    setCollapsed(false);
  }

  function onChangePageHandler(pageArg:any){
    console.log("PAGE SWAPPING TO: ", pageArg)
    storeData(text,page);
    console.log("page before set is ", page)
    setPage(pageArg);
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
            source={require("../assets/images/extraIcons/notesIconPhotoshoped.png")}
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
            <Text onPress={()=> onCollapseHandler(text)} style = {{textAlignVertical:"center",paddingLeft:10, paddingTop:10, color:"black"}}>Collapse</Text>
            <Text style = {[styles.text,{marginLeft:"20%"}]}>Notes</Text>
          </View>
          <View style = {{borderBottomLeftRadius:10, borderBottomRightRadius:10,overflow: 'hidden'}}>
            <TextInput
              editable
              multiline
              numberOfLines={25}
              maxLength={1000}
              onChangeText={text => onChangeText(text)}
              value={text}
              style={{padding: 10,backgroundColor:"grey",textAlignVertical:"top",height:"80%"}}
            />
            <View style = {{flexDirection:"row", justifyContent:"space-between",backgroundColor:"#FFF", height:"7.5%", alignItems:"center",padding:5}}>
              <Text onPress={() => onChangePageHandler(0) } style={{backgroundColor: (page ==0)? "#ADD8E6" : "#FFF" }} >Button 1</Text>
              <Text onPress={() => onChangePageHandler(1) } style={{backgroundColor: (page ==1)? "#ADD8E6" : "#FFF" }} >Button 2</Text>
              <Text onPress={() => onChangePageHandler(2) } style={{backgroundColor: (page ==2)? "#ADD8E6" : "#FFF" }} >Button 3</Text>
              <Text onPress={() => onChangePageHandler(3) } style={{backgroundColor: (page ==3)? "#ADD8E6" : "#FFF" }} >Button 4</Text>
            </View>

            <Text style={styles.warningBanner}>DISCLAIMER: These notes are unique for each device -- they do not transfer over!</Text>
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
      height:"60%",
      width:"80%",
      backgroundColor:"#FFF",
      alignSelf:"center",
      borderRadius:10,
      elevation:7,
      shadowRadius:10,
      shadowColor:"black",
      marginTop:"30%"    
    },
    text: {
      color: "black",
      fontSize: 30,
    },
    collapsedBanner:{
      padding: 10,
      flexDirection:'row',
      justifyContent:"flex-start",
    },
    warningBanner:{
      color: "black",
      fontSize: 14,
      backgroundColor:"#ff9800",
      padding:10,
      height:60,
      textAlignVertical:'bottom',
    }
  });


  export default NotesButton;