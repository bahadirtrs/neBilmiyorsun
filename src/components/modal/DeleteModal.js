
import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    Button,
    Alert, Modal, TouchableHighlight,KeyboardAvoidingView
  } from 'react-native';
    import FontAwesome from 'react-native-vector-icons/FontAwesome5';


    const DeleteModal = props => {
    const [deleteModal, setDeleteModal]=useState(false)
    
    return(
        <View style={{backgroundColor:'#00000090', width:'100%', height:'100%', }} >
        <View style={styles.centeredViewInfo}>
          <View style={styles.modalViewInfo}>
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.keyContainer}>   
              <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                
              <View style={{flexDirection:'column', width:'100%', justifyContent:'center',alignItems:'center'}} >
                <View style={{flexDirection:'column', justifyContent:'center', paddingTop:30, paddingHorizontal:20, alignItems:'center'}} >
                    <FontAwesome name='flushed' size={80} color="#118ab2" />
                    <Text style={{fontSize:24, paddingVertical:5, color:'#118ab2', fontWeight:'700', textAlign:'center'}} >Kaldırıyoruz!!</Text>

                    <Text style={{fontSize:14, paddingVertical:5, color:'#333', textAlign:'center'}} >Bu gönderiyi bildiklerinizden çıkartmak istediğinizden emin misiniz? </Text>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', padding:5, maxWidth:500}} >                             
                      <TouchableOpacity onPress={props.funcTab} style={styles.butonClas1} >
                        <Text style={{color:'#f8f8f8', fontSize:17}} >Çıkar</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity onPress={props.onClick} style={styles.butonClas1} >
                        <Text style={{color:'#f8f8f8', fontSize:17}} >İptal</Text>
                    </TouchableOpacity> 
                  </View>
                  </View>
              </ScrollView>
          </KeyboardAvoidingView>
        </View>
        </View>
        </View>

    )
}
const styles = StyleSheet.create({
  
    
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent:'space-between',
      alignItems: 'center',
      alignContent: 'space-between',
     
    
    },
    
    Logo: {
      fontSize:42,
      fontWeight:'600',
      color:'#118ab2',
      textAlign:'center'
    },
    LogoPic:{
      height:30,
      width:30,
      marginBottom:0,
      
    },

    profilePic:{
      height:50,
      width:50,
      borderRadius:30,
      
    },

    funcPic:{
      height:20,
      width:20,
      marginHorizontal:1,
      borderRadius:0,
      
    },
    
    ok: {
      width: 300,
      height: 250,
      marginVertical:50,
    },
    
    LogoDes: {
    textAlign:'center',
    fontSize:17,
    color:'#118ab2',
    paddingBottom:20,
    },
    
    textIn: {
      width: 300,
      borderBottomWidth: 1,
      borderColor: '#bbb',
      borderRadius: 5,
      padding: 15,
      margin: 10,
      color:'#000',
      fontSize:17, 
    },
    
    buton: {
      paddingHorizontal: 8,
      paddingVertical: 8,
      alignItems: 'center',
      marginTop: 10,
      backgroundColor:'#118ab2',
      borderRadius: 10,
      width: 260,
      elevation:3,
      borderColor:'#dddddd50',
      borderWidth:1,
    },

    buton2: {
      paddingHorizontal: 8,
      paddingVertical: 8,
      alignItems: 'center',
      marginTop: 10,
      marginLeft:10,
      backgroundColor:'#ccc',
      borderRadius: 10,
      width: 70,
      elevation:3,
      borderColor:'#dddddd50',
      borderWidth:1,
    },
    butonClas1: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      alignItems: 'center',
      margin: 5,
      backgroundColor:'#118ab2',
      borderRadius: 10,
      width: 130,
      elevation:3,
      borderColor:'#118ab2',
      borderWidth:1,
      marginBottom:5,
    },
    
    butonText: {
      fontSize: 20,
      fontWeight:'400',
      color: '#fff'
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0,

      
    },
    modalView: {
      width:'100%',
      height:'100%',
      margin: 0,
      backgroundColor: "white",
      borderRadius: 10,
      paddingTop: 40,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },


    centeredViewInfo: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0,

      
    },
    modalViewInfo: {
      
      width:'85%',
      height:300,
      margin: 0,
      backgroundColor: "#f8f8f8",
      borderRadius: 10,
      justifyContent:'center',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButtonInfo: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyleInfo: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalTextInfo: {
      marginBottom: 15,
      textAlign: "center"
    },


    
    
    });
    

export default DeleteModal;