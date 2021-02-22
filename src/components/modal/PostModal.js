
import React, {useState, useEffect} from 'react';
import {StyleSheet,View,Text,Dimensions, Image, TouchableOpacity,TextInput, TouchableHighlight} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';

  
const PostModel = props => { 
  const [post, setPost]=useState([]);

  const kayitEkle = ()=> {
    if(post!=""){
    firestore()
      .collection('Post').doc(props.value)
      .collection('Shipment').doc()
      .set({
        isim:props.liste.isim,
        bilinenSayisi:1,
        yorumSayisi:0,
        kategori: 'İlginç Bilgiler',
        post:post,
        date: new Date(), 
        sahiplik: true,  
        sahipisim:props.liste.isim,
        telefon:props.value,
      })
      .then(() => {
        setPost("")
       props.onClick()
       props.onRefresh ? props.onRefresh() : null
      });
      //setTetik(!tetik);
      
      }else{
        Alert.alert("Lütfen mantıklı bir şeyler yaz");
      }
    }
    return(
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flex:1, justifyContent:'flex-start'}} >    
            <View style={{flexDirection:'column', justifyContent:'flex-start'}} >   
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',borderBottomColor:'#ddd', borderBottomWidth:1, }} >
                <TouchableHighlight onPress={props.onClick}>
                  <View style={{flexDirection:'row',  justifyContent:'flex-start', alignItems:'center', padding:10}} >
                    <FontAwesome name='arrow-left' size={25} color="#118ab2" />
                    <Text style={{paddingLeft:10, fontSize:18}} >Gönderi Oluştur</Text>
                  </View>
                </TouchableHighlight>
                <View>
                  {post ?
                  <TouchableOpacity  onPress={()=>kayitEkle()} >
                    <View style={{color:'#118ab2', textAlign:'center', fontWeight:'600',paddingRight:20, fontSize:18 }}  >
                      <FontAwesome name='google-play' size={28} color="#118ab2" />
                    </View>        
                  </TouchableOpacity>
                  :
                  <TouchableOpacity >
                      <Text style={{color:'#999', textAlign:'center',  paddingRight:30, fontSize:18 }} >PAYLAŞ</Text>            
                  </TouchableOpacity>
                  }
                </View>
              </View>
              <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', padding:10}} >
                <Image source={require('../../img/profile.png')} style={styles.profilePic} /> 
                <View>
                  <Text style={{paddingLeft:10, fontSize:16, fontWeight:'600'}} >{props.liste.isim}</Text>
                  <Text style={{paddingLeft:10, fontSize:9}} >Kategori seçiniz</Text>
                </View> 
              </View>
              <TextInput
                    style={{fontSize:14,paddingHorizontal:20, width: Dimensions.get('window').width-10 }}
                    placeholder="Bugün ne öğrendin?"
                    value={String(post)}
                    onChangeText={(text) => {setPost(text)}}
                    fontSize={25}
                    textAlignVertical='top'
                    multiline={true}
                    keyboardType='twitter'
                  />
            </View>     
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
      height:280,
      margin: 0,
      backgroundColor: "#f8f8f8",
      borderRadius: 10,
      alignItems: 'flex-start',
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
    

export default PostModel;