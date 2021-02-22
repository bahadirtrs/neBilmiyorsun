import React, {useState, useEffect} from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,Dimensions,Image,TouchableOpacity,FlatList,Alert, Modal, TouchableHighlight} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { LogBox } from 'react-native';
import Menu from '../components/Flex/menu'
import TopBar from '../components/Flex/topBar'
import DeleteModal from '../components/modal/DeleteModal'
import PostModal from '../components/modal/PostModal'
import InformationModal from '../components/modal/InformationModal'
import CommentsModal from '../components/modal/CommentsModal'
import PostButton from '../components/button/PostButton'
import CategoryButton from '../components/button/categoryButton'
import PostProfile from '../components/button/PostProfile'
import PostAll from '../components/button/PostAll'
import PostInfo from '../components/button/PostInfo'
import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')

const ProfilePage= ({route, navigation}) => {

  const {value}=route.params;
  const [liste, setListe]=useState([]);
  const [post, setPost]=useState([]);
  const [tetik, setTetik]=useState(false);
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [yorumModal,setYorumModal]=useState(false);
  const [informationModal, setInformationModal]=useState(false)
  const [deleteModal, setDeleteModal]=useState(false)
  const [yorum,setYorum]=useState([]);
  const [yorumValue,setYorumValue]=useState([]);
  const [yorumKey,setYorumKey]=useState([]);
  const [allYorum,setAllYorum]=useState([]);
  const [yorumSayisi,setYorumSayisi]=useState();
  const [search, setSearch]=useState()
  const [desc, setDesc]=useState()
  const [information, setInformation]=useState([])
  const [keyApp, setKeyApp]=useState()
  const [postApp, setPostApp]=useState()
  const [sahip, setSahip]=useState()
  const [valueKey, setValueKey]=useState()
  const [isimKey, setIsimKey]=useState()
  const [itemPost, setItemPost]=useState()
  
  useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
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
  }, [tetik])  

  const Comments = ( key, telefon, post) => {
    setYorumModal(!yorumModal);
    setYorumKey(key);
    setYorumValue(telefon)
    setItemPost(post)
    const subscriber = firestore()
    .collection('Comments').doc(telefon)
    .collection(key)
    .orderBy('tarih', 'asc')
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
      });
    }

  useEffect(() => {
    const subscriber = firestore()
    .collection('Post').doc(value)
    .collection('Shipment')
    .orderBy('date', 'desc')
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
  }, []);
  
  const BildiklerimdenCıkarExp= (key,sahip)=> {
    setSahip(sahip),
    setKeyApp(key),
    setDeleteModal(!deleteModal);
  }

  const BildiklerimdenCıkar= ()=> {
   firestore()
    .collection('Post').doc(value)
    .collection('Shipment').doc(keyApp)
    .delete()
    .then(() => {
      console.log('post silindi');    
    });
    setDeleteModal(!deleteModal);
      if(!sahip){
        const postReference = firestore().doc(`Know/${keyApp}`);
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
        <SafeAreaView/> 
     

          <View style={styles.container} >
            <StatusBar barStyle="dark-content" />
             <TopBar modalVisible={() => {setModalVisible(!modalVisible);}} Reflesh={() => navigation.push('Search', {value:value, misafir:'5054520754'} )}  />
             <Modal animationType="fade" transparent={true} visible={informationModal}  onRequestClose={() => {setInformationModal(!informationModal)}}>
               <InformationModal desc={desc} liste={liste} information={information} onClick={() => {setInformationModal(!informationModal)}}
                 value= {value} valueKey={valueKey} postApp={postApp} keyApp={keyApp} valueKey={valueKey} isimKey={isimKey} sahip={sahip}/>
             </Modal>
             <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
               <PostModal value={value} onClick={() => {setModalVisible(!modalVisible)}}  
                 liste={liste} setPost= {(text) => {setPost(text)}}/>
             </Modal>
             <Modal animationType="slide" transparent={true}visible={yorumModal} onRequestClose={() => {setYorumModal(!yorumModal);}}>
               <CommentsModal onClick={() => setYorumModal(!yorumModal)} allYorum={allYorum} yorumSayisi={yorumSayisi} yorum={yorum} setYorum={setYorum}
                 yorumKey={yorumKey}  itemPost={itemPost} value={value} yorumValue={yorumValue} setYorum={(text) => {setYorum(text)}} liste={liste} />
             </Modal>
             <Modal animationType="fade" transparent={true} visible={deleteModal} onRequestClose={() => {setDeleteModal(!deleteModal);}}>
               <DeleteModal onClick={() => setDeleteModal(!deleteModal)} funcTab= {() => BildiklerimdenCıkar()}/>
             </Modal>
              <View style={{flex:25}} >
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                  <View>
                    <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center'}} >
                        <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center'}} >
                          <Image source={require('../img/banner.jpeg')} style={{width:Dimensions.get('window').width, height:150}} />
                          <Image source={require('../img/profile.png')} style={{ position:'absolute', top:70,borderWidth:5, borderColor:'#fff', width:140, height:140, borderRadius:75}}  />
                          <View style={{height:60}} />
                        </View>
                      <View>
                      <Text style={{ color:'#333', fontSize:28, fontWeight:'600'}}> {liste.isim} </Text>
                    </View>
                      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', textAlign:'center'}} >
                          <TouchableOpacity  onPress={() => navigation.navigate('Profili Düzenle', {value:value})} style={styles.buton} >
                            <Text style={{fontSize:16, fontWeight:'600', color:'#f8f8f8'}}>Profili düzenle </Text>                  
                          </TouchableOpacity> 
                          <TouchableOpacity  style={styles.buton2} >
                            <Text style={{fontSize:16, color:'#000'}}>...</Text>                  
                          </TouchableOpacity>   
                      </View>
                    </View> 
                    <View style={{flexDirection:'column', paddingHorizontal:20, paddingVertical:20, justifyContent:'flex-start', alignItems:'flex-start', alignContent:'flex-start'}} >
                      <TouchableOpacity onPress={() => navigation.navigate('Bilgi Düzenle', {value:value, par:liste, box:'bio'} )} >
                        <View style={{flexDirection:'row', width:Dimensions.get('screen').width-40, justifyContent:'flex-start', alignItems:'center', paddingBottom:15}} >
                          <Text style={{fontSize:15, color:'#333'}} >{liste.bio}</Text>
                        </View> 
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate('Bilgi Düzenle', {value:value, par:liste, box:'sehir'} )} >
                        <View style={{flexDirection:'row'}} >
                          <FontAwesome name="map-marker-alt" size={14} color="#000"/>
                          <Text style={{fontSize:16, color:'#555' }}>  {liste.sehir}, Türkiye</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                          <FontAwesome name="calendar-check" size={14} color="#000"/>
                          <Text style={{fontSize:16, color:'#555'}} >  Ocak 2021 de katıldı.</Text>
                      </View>         
                    </View>
                    <View style={{flex:1, width:'100%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                      <TouchableOpacity style={{width:'50%'}} onPress={() => navigation.navigate('Arkadaşlık İstekleri', {value:value, par:liste, box:'bio'} )} >
                        <View style={{width:'100%', flexDirection:'row', justifyContent:'center', alignItems:'center', paddingVertical:10, backgroundColor:'#118ab2',borderRightColor:'#f8f8f8', borderRightWidth:1 }} >
                          <FontAwesome name="users" size={14} color="#f8f8f8"/>
                          <Text  style={{color:'#f8f8f8', fontWeight:'600'}}> Arkadaşlar</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={{width:'50%'}} onPress={() => navigation.push('Numara Gir', {value:value, par:liste, box:'bio'} )} >
                        <View style={{width:'100%', flexDirection:'row', justifyContent:'center', alignItems:'center', paddingVertical:10, backgroundColor:'#118ab2' }} >
                          <FontAwesome name="camera-retro" size={14} color="#f8f8f8"/>
                          <Text style={{color:'#f8f8f8', fontWeight:'600'}} > Çıkış Yap</Text>
                          </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', paddingVertical:20, width: Dimensions.get('window').width, justifyContent:'space-between', alignItems:'center', paddingHorizontal:10}}>   
                      <TouchableHighlight onPress={() => {setModalVisible(true);}}>
                        <View style={{flexDirection:'row'}} > 
                          <Text style={{ color: '#555' ,fontSize:19, width:Dimensions.get('window').width-40, borderRadius:20, borderWidth:1,borderColor:'#aaa', paddingHorizontal:20, paddingVertical:5, marginHorizontal:10}} >Bugün ne öğrendin?</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                    <View style={{backgroundColor:'#eee', width:Dimensions.get('window').width, height:10}}/>                      
                    <FlatList
                      data={users}
                      renderItem={({ item }) => (
                        <View style={{flex:1, width:Dimensions.get('window').width }} >
                        <View style={{ justifyContent:'center',  backgroundColor:'#f8f8f8', paddingVertical:7, paddingHorizontal:15}}>
                          <View style={{flexDirection:'row',  backgroundColor:'#f8f8f8', justifyContent:'space-between', alignItems:'center', paddingVertical:10}}>
                            <PostProfile 
                                click={() => navigation.push('Search', {value:value, misafir:value})} type={item.type} value={value} telefon={item.telefon}
                                isim={item.isim} username={"@username"} time={item.date && moment(item.date.toDate()).fromNow()}/>
                            <CategoryButton  click={()=>BildiklerimdenCıkarExp(item.key,item.sahiplik)} icon={'trash-alt'} value={value} item={item}/>
                          </View>
                          <PostAll post={item.post}  butonPress={() => navigation.navigate('Detaylar', {value:value, isim:liste.isim, telefon:item.telefon, key:item.key})} />
                            <PostInfo sahipisim={item.sahipisim} isim={item.isim} />
                            <View style={{ flexDirection:'row', justifyContent:'space-around', paddingLeft:0, paddingTop:10, paddingBottom:5}} >
                                <PostButton onclick={() => Alert.alert("Gelecek sürümlerde, bu buton yardımıyla bilginin doğruluğunu test edebileceksiniz!")} icon={"feather"} name={"Kontrol Et"}  yorumsayisi={null} />
                                <PostButton onclick={() => PostInformation(item.key, item.post,item.telefon,item.sahipisim)}  value={value} telefon={item.telefon} icon={"info-circle"}  name={"Bilgiler"} yorumsayisi={null}  />
                                <PostButton onclick={() => Comments(item.key, item.telefon, item.post)} yorumsayisi={item.yorumSayisi} icon={"comment-dots"} name={"Yorum"}/>
                            </View>                          
                        </View>
                        <View style={{backgroundColor:'#eee',  height:10}}/>     
                      </View>
                      )}
                    />
                    <View style={{  flexDirection:'column',  padding:20, justifyContent:'center', alignItems:'center', alignContent:'center'}} >
                          <Text style={{backgroundColor:'#fff', padding:10}} >{liste.isim} neBilmiyorsun'a katıldı.</Text>
                    </View>
                  </View>
                </ScrollView>   
              </View>    
              <Menu
                oneItem={() => navigation.push('Anasayfa', {value:value, misafir:search} )}  colorOne={'#118ab2'}
                twoItem={() => navigation.push('Arkadaşlık İstekleri', {value:value, misafir:'5054520754'} )}  colorTwo={'#118ab2'}
                threeItem={() => navigation.push('Bildirimler', {value:value, misafir:search} )}  colorThree={'#118ab2'}
                fourthItem={() => navigation.push('Mesajlar', {value:value, misafir:search} )}  colorFourth={'#118ab2'}
                fiveItem={() => navigation.push('Profil', {value:value, misafir:search} )}  colorFive={'#118ab2'}
              />
          </View>
          <SafeAreaView/>
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
    
    export default ProfilePage;