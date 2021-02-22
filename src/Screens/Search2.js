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
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')


const ProfilePage= ({route, navigation}) => {
  
  const {value}=route.params;
  const {misafir}=route.params;
  const [liste, setListe]=useState([]);
  const [listeMisafir, setListeMisafir]=useState([]);
  const [post, setPost]=useState();
  const [postlar, setPostlar]=useState([]);
  const [tetik, setTetik]=useState(false);
  const ref = firestore().collection('Users').doc(value);
  const [users, setUsers] = useState([]);
  
  const [likeModal,setLikeModal]=useState(false);
  const [yorumModal,setYorumModal]=useState(false);

  const [yorum,setYorum]=useState([]);
  const [yorumKey,setYorumKey]=useState([]);
  const [allYorum,setAllYorum]=useState([]);
  const [yorumSayisi,setYorumSayisi]=useState();
 
  const [likeKey,setLikeKey]=useState(0);
  const [bilenAll, setBilenAll]=useState([]);
  const [begeniSayisi, setBegeniSayisi]=useState(0);

  const [search, setSearch]=useState([])
  const [friendQuery, setFriendQuery]=useState(false);
  const [friendsOkey, setFriendsOkey]=useState(false);
  

  const  veriKaydet = async () =>{

    await AsyncStorage.getItem('phone').then((value)=>{
      console.log(value)
   }).done();
 }


  useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
     if(value==misafir){
      navigation.goBack();
     }
    
  }, [])


  useEffect(() => {
    
    firestore()
    .collection('Users')
    .where('telefon', '==', misafir)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        setListe(documentSnapshot.data());
      });
    });
    setLikeKey(0);
     setBegeniSayisi(0)
  }, [tetik])

  useEffect(() => {
    firestore()
    .collection('Users')
    .where('telefon', '==', value)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        setListeMisafir(documentSnapshot.data());
      });
    });
  
  }, [tetik])


  const Comments = ( key) => {
    setYorumModal(true);
    setYorumKey(key);
    const subscriber = firestore()
    .collection('Comments').doc(misafir)
    .collection(key)
      .onSnapshot(querySnapshot => {
        const user = [];
        setYorumSayisi(querySnapshot.size)
        querySnapshot.forEach(documentSnapshot => {
          user.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setAllYorum(user);
        console.log("allYorum")
      });
  }

  const Likes = (key) => {
    setLikeModal(true);
    const subscriber = firestore()
    .collection('Like').doc(key)
    .collection('Users')
      .onSnapshot(querySnapshot => {
        const user = [];
        setBegeniSayisi(querySnapshot.size)
        querySnapshot.forEach(documentSnapshot => {
          user.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setBegeniAll(user);
        console.log("begeniAll")
      });
  }

 
  useEffect(() => {
    const subscriber = firestore()
    .collection('Post').doc(misafir)
    .collection('Shipment')
      .onSnapshot(querySnapshot => {
        const user = [];
        querySnapshot.forEach(documentSnapshot => {
          user.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setUsers(user);
      });
  }, [tetik]);

 

  const yorumSil = (key)=> {
         
    firestore()
    .collection('Comments').doc(misafir)
    .collection(yorumKey).doc(key)
    .delete()
    .then(() => {
      console.log('Yorum silindi');  
 });
 firestore()
 .collection('Post').doc(misafir)
 .collection('Shipment').doc(yorumKey)
 .update({
   yorumSayisi:yorumSayisi-1,
 })
 .then(() => {
   setPost("")
 });
 setTetik(!tetik);
}

    const postSil = (key)=> {     
      firestore()
      .collection('Post').doc(misafir)
      .collection('Shipment').doc(key)
      .delete()
      .then(() => {
        console.log('post silindi');    
    });
       }

    const yorumEkle = ()=> {
      if(yorum!=""){
         firestore()
           .collection('Comments').doc(misafir).collection(yorumKey).doc()
           .set({
              
             isim:listeMisafir.isim,
             yorum:yorum,
             kategori: 'Müzik',
             yorum:yorum,
             telefon:value,
             tarih:firestore.FieldValue.serverTimestamp(),
           })
           .then(() => {setYorum("")});
           setTetik(!tetik);}
      else{
        Alert.alert("Lütfen mantıklı bir şeyler yaz");
      }

      firestore().collection('Post').doc(misafir)
      .collection('Shipment').doc(yorumKey)
      .update({yorumSayisi:yorumSayisi+1,})
      .then(() => {
        setPost("")
      });
        setTetik(!tetik);
    }

    const kayitEkle = (post,key)=> {
      
        firestore()
        .collection('Know')
        .where('key', '==', key)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            setBilenAll(documentSnapshot.data());
          });
        });
        
      
        firestore()
        .collection('Post').doc(value)
        .collection('Shipment').doc(key)
        .set({
          isim:listeMisafir.isim,
          bilinenSayisi:bilenAll.bilinenSayisi+1,
          yorumSayisi:0,
          kategori: 'Müzik',
          post:post,
          tarih:firestore.FieldValue.serverTimestamp(),
          sahiplik:false
        })
        setTetik(!tetik)
        Alert.alert("Bildiklerine eklendi")
        
      }
    
    const BildiklerimeEkle = (post, key, bilinenSayisi)=> {
        kayitEkle(post,key);
        const postReference = firestore().doc(`Know/${key}`);
        return firestore().runTransaction(async transaction => {
        const postSnapshot = await transaction.get(postReference);

        if (!postSnapshot.exists) {
          firestore()
          .collection('Know').doc(key)
          .set({
            bilinenSayisi:1,
            isim:liste.isim,
            tarih:firestore.FieldValue.serverTimestamp(),
            dogrulukOrani:'%97',
            kullaniciPuani:"67/100",
            post:post,
            key:key,
            kaynak:'Google'
          })
        }
        await transaction.update(postReference, {
          bilinenSayisi: postSnapshot.data().bilinenSayisi + 1,
        });
      });
      }
          
    const FriendsAdd = () =>{
            firestore()
              .collection('Friends').doc(misafir)
              .collection('FriendsAdd').doc(value)
              .set({
                isim:listeMisafir.isim,
                gonderenIsim:liste.isim,
                tarih:firestore.FieldValue.serverTimestamp(),
                valueGonderen:value,
                valueAlan:misafir
              })
            setTetik(!tetik)
            Alert.alert("İstek gönderildi")
    }

const FriendsDelete = () =>{
         firestore()
          .collection('Friends').doc(misafir)
          .collection('FriendsAdd').doc(value)
          .delete()
          .then(() => {
            console.log('Arkadaş silindi');    
        });
        setTetik(!tetik)
        Alert.alert("İstek iptal edildi")
}

const FriendsAllDelete = () =>{
  firestore()
   .collection('Friends').doc(misafir)
   .collection('FriendsAll').doc(value)
   .delete()
   .then(() => {
      
 });

 firestore()
   .collection('Friends').doc(value)
   .collection('FriendsAll').doc(misafir)
   .delete()
   .then(() => {
       
 });
 Alert.alert("Arkadaşlıktan çıkarıldı")
 setTetik(!tetik)
}





    useEffect(() => {
      firestore()
      .collection('Friends').doc(misafir)
      .collection('FriendsAdd').doc(value)
      
      .onSnapshot(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          setFriendQuery(true)
        }else{
          setFriendQuery(false)
        }
      });
    },[tetik]);


    useEffect(() => {

    
      firestore()
      .collection('Friends').doc(value)
      .collection('FriendsAll').doc(misafir)
      
      .onSnapshot(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          setFriendsOkey(true)
        }else{
          setFriendsOkey(false)
        }
      });
    },[tetik]);

const PostInformation = (key, post,telefon,isim)=>{
      setInformation([])
      setPostApp(post),
      setKeyApp(key),
      setValueKey(telefon)
      setIsimKey(isim)
      setSahip(sahip),
      firestore()
      .collection('Know')
      .where('key', '==', key)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setInformation(documentSnapshot.data());
        });
      });
  
      firestore()
      .collection('Post').doc(value)
      .collection('Shipment').doc(key)
      .onSnapshot(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);
        if (documentSnapshot.exists) {
          setDesc(true)
        }else{
          setDesc(false)
        }
      });
      setInformationModal(!informationModal);
    }

 
    return (
      <>
      <StatusBar barStyle="dark-content" />
        <SafeAreaView > 
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
            <View style={styles.container} >
              <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#ddd', width: Dimensions.get('window').width, justifyContent:'space-between', alignItems:'flex-start', padding:10}}>
                <TextInput
                   style={{fontSize:18,paddingHorizontal:20, width:200 }}
                   placeholder="Kullanıcı Ara"
                   value={String(search)}
                   onChangeText={(text) => {setSearch(text)}}
                   fontSize={18}
                   textAlignVertical='top'
                   multiline={true}
                   keyboardType='twitter'
                />
                <TouchableOpacity onPress={() => navigation.push('Search', {value:value, misafir:search} )}  >
                   <Image source={require('../img/search.png')} style={styles.LogoPic}  />
                </TouchableOpacity> 
              </View>
              <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center'}} >
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center'}} >
                  <Image source={require('../img/banner.jpeg')} style={{width:Dimensions.get('window').width, height:150}} />
                  <Image source={require('../img/profile.png')} style={{ position:'absolute', top:70,borderWidth:5, borderColor:'#fff', width:140, height:140, borderRadius:75}}  />
                  <View style={{height:60}} />
                </View>
              <View>
              <Text style={{ color:'#333', fontSize:30, fontWeight:'600'}}> {liste.isim} </Text>
            </View>
              <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', textAlign:'center'}} >
                { 
                  
                
              friendQuery ?
                <TouchableOpacity onPress={()=>FriendsDelete()} style={styles.buton} >
                  <Text style={{fontSize:18, fontWeight:'500', color:'#f8f8f8'}}>İstek Gönderildi</Text>                  
                </TouchableOpacity> 
              :   
                  friendsOkey ?  
                  <TouchableOpacity onPress={()=>FriendsAllDelete()}  style={styles.buton} >
                    <Text style={{fontSize:18,fontWeight:'500', color:'#f8f8f8'}}>Arkadaşlıktan Çıkar</Text>                  
                  </TouchableOpacity> 
                  : 
                  <TouchableOpacity onPress={()=>FriendsAdd()} style={styles.buton} >
                    <Text style={{fontSize:18,fontWeight:'500', color:'#f8f8f8'}}>Arkadaş Ekle</Text>                  
                  </TouchableOpacity> 
                }
          

                  <TouchableOpacity onPress={()=> navigation.push('Mesajlar', {value:value, misafir:search, type:'1'} )} style={styles.buton2} >
                  <FontAwesome name="envelope" size={20} color="#f8f8f8"/>
                  </TouchableOpacity>   
              </View>
            </View>
              <View style={{flexDirection:'column', paddingHorizontal:30, paddingVertical:20, justifyContent:'flex-start', alignItems:'flex-start', alignContent:'flex-start'}} >
                <View style={{flexDirection:'row'}} >
                <FontAwesome name="map-marker-alt" size={16} color="#000"/>
                  <Text style={{fontSize:16, color:'#333' }}>  {liste.sehir} ,Türkiye</Text>
                </View>
               <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
               <FontAwesome name="calendar-check" size={16} color="#000"/>
                  <Text style={{fontSize:16, color:'#333'}} >  Kasım 2020 de katıldı.</Text>
               </View>              
              </View>
              <View style={{backgroundColor:'#ddd', width:Dimensions.get('window').width, height:10}}/>
                <View style={{flexDirection:'row',  width: Dimensions.get('window').width, justifyContent:'space-between', alignItems:'center', }}>   
                  
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={yorumModal}
                    onRequestClose={() => {setYorumModal(!yorumModal);}}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.keyContainer}>   
                        <View style={{flex:1,  justifyContent:'space-between', alignItems:'flex-end' }} > 
                          <View style={{flexDirection:'column', justifyContent:'space-between',}} >   
                          <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                            <View>
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'space-around',borderBottomColor:'#ddd', borderBottomWidth:1, }} >
                              <TouchableHighlight onPress={() => {setYorumModal(!yorumModal);}}>
                                <View style={{flexDirection:'row',  justifyContent:'space-around', alignItems:'space-around', padding:10}} >
                                  <FontAwesome name='arrow-left' size={25} color="#118ab2" />
                                  <Text style={{paddingLeft:10, fontSize:20}} >Yorumlar</Text>
                                </View>
                              </TouchableHighlight>
                              <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', paddingRight:30, fontSize:18, paddingBottom:10 }} >
                                <FontAwesome name='comments' size={20} color="#118ab2" />
                                <Text style={{color:'#118ab2', textAlign:'center', fontWeight:'600', fontSize:14 }}  >  {yorumSayisi} Yorum</Text>
                              </View>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', padding:5}} >
                            <View>
                             {!allYorum[0]=='' ?
                                  <FlatList
                                  data={allYorum}
                                  renderItem={({ item }) => (
                                    <View style={{}}>
                                      <View style={{ flexDirection:'row', maxWidth:Dimensions.get('screen').width, justifyContent:'flex-start', alignItems:'flex-start'}} >
                                        <View style={{marginTop:10}} >
                                          <Image source={require('../img/profile.png')} style={styles.profilePic} />   
                                        </View>
                                        <View style={{ flexDirection:'column',margin:5, padding:5,maxWidth:Dimensions.get('screen').width-100, borderRadius:15,backgroundColor:'#f1f1f1',}} >
                                          <Text style={{fontSize:18, padding:2, fontWeight:'500',}}  >{item.isim}  </Text>    
                                          <Text style={{fontSize:14, padding:2 ,fontWeight:'300', borderRadius:10}}  >{item.yorum}</Text> 
                                        </View>
                                        <View style={{ flexDirection:'column', justifyContent:'center', paddingVertical:20, alignItems:'center'}} >
                                        <TouchableOpacity  onPress={() => yorumSil(item.key)} >
                                        <FontAwesome name='trash-alt' size={20} color="#118ab2" />
                                        </TouchableOpacity>
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
                                  value={String(yorum)}
                                  onChangeText={(text) => {setYorum(text)}}
                                  fontSize={16}
                                  textAlignVertical='center'
                                  multiline={true}
                                  scrollEnabled={true}  
                                />
                                <TouchableOpacity  onPress={yorumEkle} >
                                     <FontAwesome name='google-play' size={30} color="#118ab2" />
                                </TouchableOpacity>                         
                          </View>     
                        </View>                        
                      </View>
                      </KeyboardAvoidingView>
                    </View>
                    </View>
                  </Modal>

                  
                    <View style={{flexDirection:'row', backgroundColor:'#f8f8f8', width:'100%', justifyContent:'flex-start', paddingHorizontal:10, alignItems:'center', textAlign:'center'}} > 
                        <Text style={{ paddingVertical:10, color:'#118ab2', fontWeight:'600', fontSize:22, textAlign:'center'}} >{liste.isim}'ın Bildikleri</Text>
                    </View>
                </View>

                {
                  friendsOkey ?
                
                  <FlatList
                  data={users}
                  renderItem={({ item }) => (
                  <View>
                    <View style={{backgroundColor:'#f8f8f8',}}>
                      <View style={{flexDirection:'row', paddingVertical:15, width: Dimensions.get('window').width, backgroundColor:'#f8f8f8', justifyContent:'space-between', alignItems:'flex-start', paddingHorizontal:20,}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',}} >
                        <TouchableOpacity  onPress={() => navigation.navigate('Search', {value:value, misafir:item.telefon})} >
                    <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',}} >
                      <Image source={require('../img/profile.png')} style={styles.profilePic} />   
                      <View style={{flexDirection:'column', justifyContent:'center', alignItems:'flex-start', paddingHorizontal:10}}>                   
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                          <Text style={{fontSize:18,paddingTop:3, fontWeight:'bold', color:'#444'}} >{item.isim} </Text>
                          <Text style={{fontSize:12,paddingTop:3, fontWeight:'400', color:'#444'}} >@username </Text>          
                        </View>        
                        <Text style={{fontSize:12, paddingTop:3, fontWeight:'400'}} >{item.date && moment(item.date.toDate()).fromNow()} </Text>    
                      </View>
                    </View> 
                  </TouchableOpacity>
                        </View>
                        
                      </View>
                      <View style={{paddingHorizontal:20, paddingBottom:20, borderBottomWidth:1, borderBottomColor:'#ddd'}} >
                        <Text style={{fontSize:22, fontWeight:'300',}}  >{item.post}</Text>
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-around', paddingHorizontal:20, paddingVertical:10}} >
                        <View>
                          <TouchableOpacity onPress={()=>Alert.alert("Gelecek sürümlerde, bu buton yardımıyla bilginin doğruluğunu test edebileceksiniz!")} >
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                              <FontAwesome name='feather' size={20} color="#118ab2" />
                              <Text style={{fontSize:12, paddingHorizontal:5, fontWeight:'600', color:'#118ab2'}} >Kontrol Et</Text>
                            </View>
                          </TouchableOpacity>
                        </View>  
                        <View>
                        <TouchableOpacity onPress={()=>PostInformation(item.key, item.post,item.telefon,item.sahipisim)}  > 
                          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <FontAwesome name='info-circle' size={20} color="#118ab2"/> 
                            <Text style={{fontSize:12, paddingHorizontal:5, fontWeight:'500', color:'#118ab2'}} >Bilgiler</Text>
                          </View>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => {Comments(item.key, item.telefon)}}>
                          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <FontAwesome name='comment-dots' size={20} color="#118ab2"  />
                            <Text style={{fontSize:12, paddingHorizontal:5, fontWeight:'500', color:'#118ab2'}} >Yorum({item.yorumSayisi})</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{backgroundColor:'#eee', width:Dimensions.get('window').width, height:10}}/>
                    </View>
                  </View>
                  )}
                />    : null
                        }
                        </View>
                          <View style={{  flexDirection:'column',  padding:20, justifyContent:'center', alignItems:'center', alignContent:'center'}} >
                              <Text style={{backgroundColor:'#fff', padding:10}} >{liste.isim} neBilmiyorsun'a katıldı.</Text>
                          </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  const styles = StyleSheet.create({
  
    keyContainer: {
      flex: 1
    },
    container: {
     flex:1,
     flexDirection:'column',
     justifyContent:'flex-start',
     alignItems:'flex-start',
     backgroundColor:'#f8f8f8',
    
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
      height:40,
      width:40,
      borderRadius:20,
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
      backgroundColor:'#118ab2',
      borderRadius: 10,
      width: 70,
      elevation:3,
      borderColor:'#dddddd50',
      borderWidth:1,
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
    }

    
    
    });
    
    export default ProfilePage;