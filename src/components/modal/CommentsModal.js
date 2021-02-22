
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
    import firestore from '@react-native-firebase/firestore';
    import moment from 'moment'
    import 'moment/locale/tr'  
    moment.locale('tr')


    const CommentsModal = props => {


  const yorumEkle = ()=> {
    if(props.yorum!=""){
      firestore()
        .collection('Comments')
        .doc(props.yorumValue)
        .collection(props.yorumKey)
        .doc()
        .set({
          isim:props.liste.isim,
          yorum:props.yorum,
          kategori: 'Müzik',
          telefon:props.value,
          tarih:firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
         props.setYorum("")
        });

      if(props.yorumValue!=props.value){
        firestore()
        .collection('Notification').doc(props.yorumValue)
        .collection('AllNotification').doc()
        .set({
          isim:props.liste.isim,
          sub:props.yorum,
          this:props.itemPost,
          keyTwo:props.yorumKey,
          telefon:props.value,
          type:'yorum',
          tarih:firestore.FieldValue.serverTimestamp(),
        })
        }
      
      }
    else{
      Alert.alert("Lütfen mantıklı bir şeyler yaz");
    }

    firestore().collection('Post').doc(props.yorumValue)
    .collection('Shipment').doc(props.yorumKey)
    .update({yorumSayisi:props.yorumSayisi+1,})
    .then(() => {  
    });
  }

  const yorumSil = (key)=> {
    firestore()
    .collection('Comments').doc(props.yorumValue)
    .collection(props.yorumKey).doc(key)
    .delete()
    .then(() => {
      console.log('Yorum silindi');
    });

    firestore()
    .collection('Post').doc(props.yorumValue)
    .collection('Shipment').doc(props.yorumKey)
    .update({
      yorumSayisi:props.yorumSayisi-1, 
    })
    .then(() => {
    });
  }


    return(
      <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.keyContainer}>   
        <View style={{flex:1,  justifyContent:'space-between', alignItems:'flex-end' }} > 
          <View style={{flexDirection:'column', justifyContent:'space-between',}} >   
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
            <View>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'space-around',borderBottomColor:'#ddd', borderBottomWidth:1, }} >
              <TouchableHighlight onPress={props.onClick}>
              
                <View style={{flexDirection:'row',  justifyContent:'space-around', alignItems:'space-around', padding:10}} >
                  <FontAwesome name='arrow-left' size={25} color="#118ab2" />
                  <Text style={{paddingLeft:10, fontSize:20}} >Yorumlar</Text>
                </View>
              </TouchableHighlight>
              <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', paddingRight:30, fontSize:18, paddingBottom:10 }} >
                <FontAwesome name='comments' size={20} color="#118ab2" />
                <Text style={{color:'#118ab2', textAlign:'center', fontWeight:'600', fontSize:14 }}  >  {props.yorumSayisi} Yorum</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', padding:5}} >
            <View>
             {!props.allYorum[0]=='' ?
                  <FlatList
                  data={props.allYorum}
                  renderItem={({ item }) => (
                    <View style={{}}>
                      <View style={{ flexDirection:'row', maxWidth:Dimensions.get('screen').width, minWidth:Dimensions.get('screen').width-130, justifyContent:'space-between', alignItems:'flex-start'}} >
                      <View style={{ flexDirection:'row', maxWidth:Dimensions.get('screen').width, justifyContent:'flex-start', alignItems:'flex-start'}} >
                        <View style={{marginTop:10}} >
                          <Image source={require('../../img/profile.png')} style={styles.profilePic} />   
                        </View>
                        <View style={{ flexDirection:'column',margin:5, padding:8, width:'78%', borderRadius:15,backgroundColor:'#f1f1f1',}} >
                          <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}} >
                           <Text style={{fontSize:18, padding:2, fontWeight:'500',}}  >{item.isim} </Text>    
                           <Text style={{fontSize:11, paddingHorizontal:2 ,fontWeight:'300', borderRadius:10}}  >{ item.tarih ? moment(item.tarih.toDate()).fromNow() : null} </Text> 
                          </View>
                          <Text style={{fontSize:16, padding:2 ,fontWeight:'400', borderRadius:10}}  >{item.yorum}</Text> 
                        </View>
                        <View style={{ flexDirection:'column', justifyContent:'center', paddingVertical:20, alignItems:'center'}}>
                          {
                            item.telefon==props.value ?
                          <TouchableOpacity  onPress={()=>yorumSil(item.key)}>
                            <FontAwesome name='trash-alt' size={20} color="#118ab2"/>
                          </TouchableOpacity>
                          : 
                          <TouchableOpacity  onPress={()=>Alert.alert("Bu yorum sana ait değil")}>
                            <FontAwesome name='circle-notch' size={20} color="#118ab2"/>
                          </TouchableOpacity>
                          }
                       
                        </View>
                      </View>
                        
                      </View>
                    </View>
                  )}
                  />
                :
                <View style={{ width:Dimensions.get('screen').width, height:Dimensions.get('screen').height/2, flexDirection:'column', justifyContent:'center', alignItems:'center'}} >
                  <Text style={{fontSize:29, color:'#888', fontWeight:'600'}} >Buralar çok sessiz</Text>
                  <Text style={{fontSize:14, color:'#888', fontWeight:'500', padding:5}}>İlk yorumu sen yapmaya ne dersin?</Text>
                </View>
             }
            </View>
            </View>
          </View>
          </ScrollView>
          <View style={{ flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center', paddingBottom:30}} > 
            <TextInput
                  style={{fontSize:18,paddingHorizontal:10, position:'relative', marginRight:10, paddingVertical:10, borderColor:'#bbb', borderRadius:10, borderWidth:1, width:Dimensions.get("window").width-70}}
                  placeholder="Yorum Yap!"
                  value={String(props.yorum)}
                  onChangeText={props.setYorum}
                  fontSize={16}
                  textAlignVertical='center'
                  multiline={true}
                  scrollEnabled={true}  
                />
                <TouchableOpacity  onPress={()=>yorumEkle()} >
                     <FontAwesome name='arrow-up' size={30} color="#118ab2" />
                </TouchableOpacity>                         
          </View>     
        </View>                        
      </View>
      </KeyboardAvoidingView>
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
      paddingTop: 10,
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
    

export default CommentsModal;