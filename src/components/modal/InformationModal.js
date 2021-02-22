
import React, {useState, useEffect} from 'react';
import {StyleSheet,View,Text,Dimensions, Image, TouchableOpacity,KeyboardAvoidingView,ScrollView, TouchableHighlight} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';

import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')
  
const InformationModal = props => { 

  const BildiklerimdenCıkarExp= ()=> {
   firestore()
    .collection('Post').doc(props.value)
    .collection('Shipment').doc(props.keyApp)
    .delete()
    .then(() => {
      console.log('post silindi');    
      
    });
    //SetKancaKi(!kancaKi)
      if(!props.sahip){
        const postReference = firestore().doc(`Know/${props.keyApp}`);
        return firestore().runTransaction(async transaction => {
        const postSnapshot = await transaction.get(postReference);
        if (!postSnapshot.exists) {
        }
        await transaction.update(postReference, {
          bilinenSayisi: postSnapshot.data().bilinenSayisi - 1,
        });
      });
      }
      
    }

   
    const BildiklerimeEkleExp = (key)=> {
      
      firestore()
      .collection('Post').doc(props.value)
      .collection('Shipment').doc(props.keyApp)
      .set({
        isim:props.liste.isim,
        bilinenSayisi:2,
        yorumSayisi:0,
        kategori: 'İlginç Bilgiler',
        post:props.postApp,
        date:firestore.FieldValue.serverTimestamp(),
        sahiplik: true,
        sahipisim:props.isimKey, 
        telefon:props.value,

      })
      .then(() => {
      //setPost("")
      //  SetKancaKi(!kancaKi)
      });
      //setTetik(!tetik);

      firestore()
      .collection('Notification').doc(props.valueKey)
      .collection('AllNotification').doc()
      .set({
        isim:props.liste.isim,
        sub:null,
        this:props.postApp,
        telefon:props.value,
        type:'bildiklerim',
        keyTwo:props.keyApp,
        tarih:firestore.FieldValue.serverTimestamp(),
      })


      const postReference = firestore().doc(`Know/${key}`);
      return firestore().runTransaction(async transaction => {
      const postSnapshot = await transaction.get(postReference);

      if (!postSnapshot.exists) {
        firestore()
        .collection('Know').doc(props.keyApp)
        .set({
          telefon:props.value,
          bilinenSayisi:2,
          isim:props.isimKey,
          date:firestore.FieldValue.serverTimestamp(),
          dogrulukOrani:'%97',
          kullaniciPuani:"67/100",
          post:props.postApp,
          key:props.keyApp,
          sahipisim:props.isimKey, 
          kaynak:'Google'
        })
      }else{
        await transaction.update(postReference, {
          bilinenSayisi: postSnapshot.data().bilinenSayisi + 1,
        });
      }
      
    });
    }


    return(
      <View style={{backgroundColor:'#00000090', width:'100%', height:'100%', }} >
                    <View style={styles.centeredViewInfo}>
                      <View style={styles.modalViewInfo}>
                      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.keyContainer}>   
                          <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                            
                            <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end', padding:15, paddingBottom:5,width:'100%' }} >
                           
                              <TouchableHighlight onPress={props.onClick}>
                                <View style={{flexDirection:'row',  justifyContent:'space-around', alignItems:'space-around', }} >
                                  <FontAwesome name='times' size={25} color="#118ab2" />
                                </View>
                              </TouchableHighlight>
                            </View>
                            {
                              

                              props.information.key ?
                             
                              <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'flex-start', paddingVertical:10, paddingHorizontal:30}} >
                               { props.desc ?
                               <View style={{width:'100%', justifyContent:'center', alignItems:'center', top:-20}} >
                                   <FontAwesome name='grin-hearts' size={100} color="#118ab2" />
                                   <Text style={{fontSize:25, fontWeight:'700', color:'#118ab2', paddingVertical:20}}> Harika! Bunu biliyorsun</Text>                  
                               </View>
                               :
                               <View style={{width:'100%', justifyContent:'center', alignItems:'center', top:-20}} >
                                  <FontAwesome name='sad-tear' size={100} color="#118ab2" />
                                  <Text style={{fontSize:25, fontWeight:'700', color:'#118ab2', paddingTop:20}}> Üzüldüm! Bunu bilmiyorsun</Text>  
                                  <Text style={{fontSize:16, fontWeight:'500',textAlign:'center', color:'#118ab2',paddingBottom:20}}>Hemen bildiklerine eklemelisin!!</Text>                  
                
                                </View>

                               }
                               
                               <View style={{width:'100%', justifyContent:'center', alignItems:'center', top:-20}} >
                                 
                              <Text style={{fontSize:14, fontWeight:'500',textAlign:'center', color:'#555'}}>{props.information.post}</Text>                  
                
                                </View>
                              <View style={{ width:'100%', flexDirection:'row', paddingVertical:5, borderBottomWidth:1, borderBottomColor:'#ccc'}} >
                                <FontAwesome name='user' size={16} color="#118ab2" />
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'500'}} >Gönderi Sahibi:</Text>
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'700'}} >{props.information.isim}</Text>
                              </View>
                               
                              <View style={{ width:'100%', flexDirection:'row', paddingVertical:5, borderBottomWidth:1, borderBottomColor:'#ccc'}} >
                                <FontAwesome name='calendar-week' size={16} color="#118ab2" />
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'500'}} >Yayın tarihi:</Text>
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'700'}} >{props.information.date ? moment(props.information.date.toDate()).format('LLL') : null}</Text>
                              </View>
  
                              <View style={{ width:'100%', flexDirection:'row', paddingVertical:5, borderBottomWidth:1, borderBottomColor:'#ccc'}} >
                                <FontAwesome name='people-arrows' size={16} color="#118ab2" />
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'500'}} >Bilen Sayısı:</Text>
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'700'}} >{props.information.bilinenSayisi} Kişi</Text>
                              </View>
  
  
                              <View style={{ width:'100%', flexDirection:'row', paddingVertical:5, borderBottomWidth:1, borderBottomColor:'#ccc'}} >
                               <FontAwesome name='sort-numeric-down' size={16} color="#118ab2" />
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'500'}} >Bilmeyen Sayısı:</Text>
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'700'}} >{100-props.information.bilinenSayisi} Kişi</Text>
                              </View>
  
  
                              <View style={{ width:'100%', flexDirection:'row', paddingVertical:5, borderBottomWidth:1, borderBottomColor:'#ccc'}} >
                                <FontAwesome name='percent' size={16} color="#118ab2" />
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'500'}} >Doğruluk Oranı:</Text>
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'700'}} >{props.information.dogrulukOrani}</Text>
                              </View>
  
                              <View style={{ width:'100%', flexDirection:'row', paddingVertical:5, borderBottomWidth:1, borderBottomColor:'#ccc'}} >
                               <FontAwesome name='hand-point-up' size={16} color="#118ab2" />
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'500'}} >Kullanıcı Puanı:</Text>
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'700'}} >{props.information.kullaniciPuani}</Text>
                              </View>
  
                              <View style={{ width:'100%', flexDirection:'row', paddingVertical:5, borderBottomWidth:1, borderBottomColor:'#ccc'}} >
                               <FontAwesome name='link' size={16} color="#118ab2" />
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'500'}} >Kaynak:</Text>
                                <Text style={{paddingLeft:10, fontSize:14, color:'#118ab2', fontWeight:'700'}} >İnternet Sitesi</Text>
                              </View>
                                {
                                  props.desc ?
                                  <View style={{ flexDirection:'column', width:'100%', justifyContent:'center', alignItems:'center',paddingVertical:10}} >
                                    <TouchableOpacity onPress={()=> BildiklerimdenCıkarExp()} style={styles.buton} >
                                       <Text style={{fontSize:18, fontWeight:'500', color:'#f8f8f8'}}>Bildiklerimden Çıkar</Text>  
                                    </TouchableOpacity> 
                                    <Text style={{fontSize:13, fontWeight:'400', color:'#333', textAlign:'center', paddingVertical:10}}>Bildiğin bir bilginin, bildiklerinden çıkarılması işlemi neBilmiyorsun tarafından pek önemsenmez.</Text>                  
                                  </View>
                                  :
                                  <View style={{width:'100%', justifyContent:'center', alignItems:'center',paddingVertical:10}} >
                                    <TouchableOpacity onPress={()=> BildiklerimeEkleExp(props.information.key)} style={styles.buton} >
                                       <Text style={{fontSize:18, fontWeight:'500', color:'#f8f8f8'}}>Bildiklerime Ekle</Text>                  
                                    </TouchableOpacity> 
                                    <Text style={{fontSize:13, fontWeight:'400', color:'#333', textAlign:'center', paddingVertical:10}}>İlgi alanın dışında olan bir bilginin, bildiklerine eklenmesi neBilmiyorsun tarafından pek önemsenmez.</Text>                  
                                  </View>
                                }
                             
                             
                              </View>  
                              :
                              

                              <View style={{flexDirection:'column', justifyContent:'center', paddingVertical:0, paddingHorizontal:40, alignItems:'center'}} >
                                <FontAwesome name='frown' size={90} color="#118ab2" />
                                <Text style={{fontSize:24, paddingVertical:5, color:'#118ab2', fontWeight:'700', textAlign:'center'}} >Şuana kadar bu bilgiyi kimse bildiklerine eklememiş!</Text>
                               
                               
                                <Text style={{fontSize:14, paddingVertical:5, color:'#333', textAlign:'center'}} >Hemen Bildiklerime ekle butonuna tıklayarak bu bilgiyi profiline ekleyebilirsin.</Text>
                                <TouchableOpacity onPress={()=> BildiklerimeEkleExp(props.information.key)} style={styles.buton} >
                                   <Text style={{fontSize:18, fontWeight:'500', color:'#f8f8f8'}}>Bildiklerime Ekle</Text>                  
                                </TouchableOpacity> 
                              
  
                              </View>
                            }
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
      width: '100%',
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
      
      width:'100%',
      height:'100%',
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
    

export default InformationModal;