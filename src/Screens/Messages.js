import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { LogBox } from 'react-native';
import Menu from '../components/Flex/menu'
import MessageModal from '../components/modal/MessageModal'
import {SafeAreaView,StyleSheet,View,Text,StatusBar,Dimensions,Image,TouchableOpacity,TextInput,FlatList,Modal} from 'react-native';
import 'moment/locale/tr'  
import moment from 'moment'
moment.locale('tr')

const Messages= ({route, navigation}) => {
    const {value} = route.params;
    const {valueX} = route.params;
    const [search, setSearch]=useState([])
    const [allClaim, setAllClaim]=useState()
    const [allFriends, setAllFriends]=useState([])
    const [allMessage, setAllMessage]=useState([])
    const [yorumSayisi,setYorumSayisi]=useState();
    const [yorumModal,setYorumModal]=useState(false);
    const [yorum,setYorum]=useState([]);
    const [yorumKey,setYorumKey]=useState([]);
    const [isim,setIsim]=useState([]);
    const [yorumValue,setYorumValue]=useState([]);
    const [allYorum,setAllYorum]=useState([]);
    const [liste, setListe]=useState([]);
    const [messageListModal, setMessageListModal]=useState(false);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      //  if(value==misafir){
      //    navigation.replace('Profil', {value:value, misafir:search} )
      //  }
    }, [])

    useEffect(() => {
        const subscriber = firestore()
        .collection('Friends').doc(value)
        .collection('FriendsAll')
        .where('valueAlan', '==', value)
          .onSnapshot(querySnapshot => {
            const user = [];
            querySnapshot.forEach(documentSnapshot => {
              user.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setAllFriends(user);
          });
      
      }, [])

      useEffect(() => {
        firestore()
        .collection('Users')
        .where('telefon', '==', value)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            setListe(documentSnapshot.data());
          });
        });
      }, [])

      useEffect(() => {
        const subscriber = firestore()
        .collection('MessageList').doc(value)
        .collection('MessageFriends')
        .orderBy('tarih', 'desc')
          .onSnapshot(querySnapshot => {
            const user = [];
            querySnapshot.forEach(documentSnapshot => {
              user.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setAllMessage(user);
          });
      }, [])

      const Comments = ( key,telefon,isim,count) => {
        setMessageListModal(false);
        setYorumModal(!yorumModal);
        setYorumKey(key);
        setYorumValue(telefon)
        setYorumSayisi(count)
        setIsim(isim)

        firestore().collection('MessageList').doc(value)
        .collection('MessageFriends').doc(key)
        .update({messageCount:0,})
        .then(() => {  
        });
      
        firestore()
        .collection('Message').doc(value)
        .collection(key)
        .orderBy('tarih', 'asc')
          .onSnapshot(querySnapshot => {
            const user = [];
            querySnapshot.forEach(documentSnapshot => {
              user.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setAllYorum(user);
          });
      }

      return (
          <>
          <StatusBar barStyle="dark-content" />
            <SafeAreaView/>
              <View style={styles.container} >
              <View style={{ flexDirection:'row', borderRadius:10, margin:10, backgroundColor:'#fff', width: Dimensions.get('window').width-30, justifyContent:'space-between', alignItems:'center', elevation:3}}>
                <TextInput
                  style={{paddingHorizontal:30,padding:10}}
                   placeholder="Kullanıcı Ara"
                   value={String(search)}
                   onChangeText={(text) => {setSearch(text)}}
                   fontSize={14}
                   textAlignVertical='center'
                   keyboardType='twitter'
                />
                <TouchableOpacity style={{flexDirection:'column', justifyContent:'center', alignItems:'center', marginRight:15}}  onPress={() => navigation.push('Search', {value:value, misafir:search} )}  >
                   <Image source={require('../img/search.png')} style={styles.LogoPic}  />
                </TouchableOpacity> 
                <Modal animationType="fade" transparent={true}visible={yorumModal} onRequestClose={() => {setYorumModal(!yorumModal);}}>
                    <MessageModal onClick={() => setYorumModal(!yorumModal)} allYorum={allYorum} isim={isim} yorumSayisi={null} yorum={yorum} setYorum={setYorum}
                    yorumKey={yorumKey} yorumValue={yorumValue} setYorum={(text) => {setYorum(text)}} value={value} liste={liste}/>
                </Modal>
              </View>
                <View style={{flex:25, justifyContent:'flex-end', alignItems:'flex-end'}} >
                  <FlatList
                    data={allMessage}
                    renderItem={({ item }) => (
                      <View>
                          {item.isim==''
                            ? <View>
                                <Text style={{fontSize:30, color:'#333'}} >Burada hiç mesaj yok</Text> 
                                <TouchableOpacity>
                                    <Text style={{fontSize:15,color:'#118ab2', padding:5}} >Bir mesaj oluşturmak için buraya tıkla</Text>   
                                </TouchableOpacity>  
                              </View>
                            :<View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end',borderBottomColor:'#ddd', borderBottomWidth:1}} >
                                <View style={{  flexDirection:'row', justifyContent:'space-between', alignItems:'center',paddingVertical:10, width:Dimensions.get('screen').width-15}} >
                                  <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {Comments(item.key, item.key, item.isim, item.messageCount)}}>
                                    <Image source={require('../img/profile.png')} style={styles.profilePic} />   
                                    <View style={{ flexDirection:'column'}} >
                                      <Text style={{fontSize:18, paddingLeft:10, width:150, fontWeight:'500',}}  >{item.isim}  </Text> 
                                      <View style={{flexDirection:'row', paddingLeft:10, paddingTop:4}} >
                                        <FontAwesome name='check' size={12} color="#333" />
                                        <Text style={{fontSize:12, paddingLeft:3,  fontWeight:'400',maxWidth:'92%',}}  >{item.endMessage.slice(0, 30)} </Text> 
                                      </View>
                                    </View>
                                  </TouchableOpacity>  
                                  <View style={{flexDirection:'column', justifyContent:'flex-end', alignItems:'center'}}>
                                  {item.messageCount!=0 
                                    ?<View style={{backgroundColor:'#118ab2', justifyContent:'center', alignItems:'center', padding:0, width:20,height:20, borderRadius:20 }} >
                                      <Text  style={{textAlign:'right', fontSize:14, color:'#fff', fontWeight:'bold' }} >{item.messageCount}</Text>
                                    </View>
                                    :null
                                  }
                                      <Text style={{textAlign:'center', fontSize:12, paddingTop:5}} >{item.tarih && moment(item.tarih.toDate()).format('LT')}</Text>
                                    </View>
                                </View>                     
                              </View>
                          }
                      </View>
                    )}
                  /> 
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={messageListModal}
                  >
                  <SafeAreaView/>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <FlatList
                        data={allFriends}
                        renderItem={({ item }) => (
                          <View>
                            {item.isim==''
                             ?<View>
                                <Text style={{fontSize:30, color:'#333'}} >Burada hiç mesaj yok</Text> 
                                <TouchableOpacity>
                                  <Text style={{fontSize:15,color:'#118ab2', padding:5}} >Bir mesaj oluşturmak için buraya tıkla</Text>   
                                </TouchableOpacity>  
                              </View>
                                : item.type=='2' 
                                  ? null
                                  :<View style={{ width:Dimensions.get('screen').width,flexDirection:'row', justifyContent:'space-between', alignItems:'center',  padding:10, borderBottomColor:'#ddd', borderBottomWidth:1}} >
                                    <TouchableOpacity onPress={() => {Comments(item.key, item.key,item.isim)}}>
                                      <View style={{  flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:Dimensions.get('screen').width-30,}} >
                                        <View style={{flexDirection:'row', alignItems:'center'}} >
                                          <Image source={require('../img/profile.png')} style={styles.profilePic} />   
                                          <Text style={{fontSize:18, paddingLeft:10, fontWeight:'500',minWidth:'40%' ,}}  >{item.isim}  </Text> 
                                        </View>
                                        <TouchableOpacity onPress={() => {Comments(item.key, item.key,item.isim, item.messageCount)}}  style={styles.butonDelete} >
                                          <Text style={{fontSize:12, fontWeight:'bold', color:'#f8f8f8'}}>Mesaj Gönder</Text>       
                                        </TouchableOpacity> 
                                       </View>  
                                    </TouchableOpacity>                             
                                  </View>
                              }
                           </View>
                        )}
                      />  
                      <TouchableOpacity
                        style={{ paddingBottom:30 }}
                        onPress={() => {
                          setMessageListModal(!messageListModal);
                        }}
                      >
                        <FontAwesome name='times-circle' size={50} color="#118ab2" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                </View>
                <View style={{flex:8,alignItems:'flex-end'}} >
                    <TouchableOpacity style={styles.openButton} onPress={() => {setMessageListModal(true) }}>
                        <Text style={{color:'#fff', fontWeight:'bold'}} >Mesaj Yaz</Text>
                    </TouchableOpacity>
                    <Menu
                        oneItem={() => navigation.push('Anasayfa', {value:value, misafir:search} )}  colorOne={'#118ab2'}
                        twoItem={() => navigation.push('Arkadaşlık İstekleri', {value:value, misafir:'5054520754'} )}  colorTwo={'#118ab2'}
                        threeItem={() => navigation.push('Bildirimler', {value:value, misafir:search} )}  colorThree={'#118ab2'}
                        fourthItem={() => navigation.push('Mesajlar', {value:value, misafir:search} )}  colorFourth={'#118ab2'}
                        fiveItem={() => navigation.push('Profil', {value:value, misafir:search} )}  colorFive={'#118ab2'}
                    />
                </View>
              </View>
        </>
      );
    }
  const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'space-between',
        alignItems: 'center',
        alignContent: 'space-between',
        width:Dimensions.get('screen').width,
      
    },
    
    Logo: {
      fontSize:42,
      fontWeight:'600',
      color:'#118ab2',
      textAlign:'center'
    },
    LogoPic:{
      height:100,
      width:100,
      marginBottom:50,
      
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

    profilePic:{
        height:50,
        width:50,
        borderRadius:20,
        
      },
    
    textIn: {
      width: 330,
      borderBottomWidth: 1,
      borderColor: '#bbb',
      borderRadius: 5,
      paddingVertical:15,
      margin: 10,
      color:'#000',
      fontSize:17, 
    },

    LogoPic:{
        height:20,
        width:20,
        marginBottom:0,
        
      },
      
      butonDelete: {
        paddingHorizontal: 5,
        paddingVertical: 7,
        alignItems: 'center',
        backgroundColor:'#118ab2',
        borderRadius: 10,
        width: 100,
        elevation:3,
        borderColor:'#dddddd50',
        borderWidth:1,
      },
    
    buton: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 10,
      backgroundColor:'#118ab2',
      borderRadius: 10,
      width: 350,
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
        width: 330,
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
        
      },
      modalView: {
        
        backgroundColor: "white",
        borderRadius: 20,
        
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
        backgroundColor: "#118ab2",
        borderRadius: 30,
        padding: 15,
        elevation: 2,
        flexDirection:'row',
        justifyContent:'flex-end',
        
        alignItems:'flex-end',
        margin:20
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:20
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }


    
    });
    
    export default Messages;