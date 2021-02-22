import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar, Dimensions, Image, TouchableOpacity, FlatList, Alert, Modal, TouchableHighlight, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { LogBox } from 'react-native';
import DeleteModal from '../components/modal/DeleteModal'
import PostModal from '../components/modal/PostModal'
import InformationModal from '../components/modal/InformationModal'
import CommentsModal from '../components/modal/CommentsModal'
import TopBar from '../components/Flex/topBar'
import Menu from '../components/Flex/menu'
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
  const [tetik, setTetik]=useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [yorumModal,setYorumModal]=useState(false);
  const [informationModal, setInformationModal]=useState(false)
  const [deleteModal, setDeleteModal]=useState(false)
  const [yorum,setYorum]=useState([]);
  const [yorumKey,setYorumKey]=useState([]);
  const [yorumValue,setYorumValue]=useState([]);
  const [allYorum,setAllYorum]=useState([]);
  const [yorumSayisi,setYorumSayisi]=useState();
  const [search, setSearch]=useState()
  const [desc, setDesc]=useState()
  const [information, setInformation]=useState([])
  const [keyApp, setKeyApp]=useState()
  const [postApp, setPostApp]=useState()
  const [sahip, setSahip]=useState()
  const [anasayfa,setAnasayfa]=useState([])
  const [kanca,SetKanca]=useState()
  const [kancaKi,SetKancaKi]=useState(true)
  const [refreshing,setRefresing]=useState(false)
  const [session,setSession]=useState(false)
  const [scroll, setScroll] = useState(true)
  const [activityIndicator, setActivityIndicator]=useState(true)
  const [valueKey, setValueKey]=useState()
  const [isimKey, setIsimKey]=useState()
  const [itemPost, setItemPost]=useState()
  const [itemIsim, setItemIsim]=useState()
  

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    setSession([])
    firestore()
    .collection('Friends').doc(value)
    .collection('FriendsAll')
    .onSnapshot(querySnapshot => {
       let user = [];
        querySnapshot.forEach(documentSnapshot => {
          user.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        let userTing = [];
        let coins=0
        for (let index = 0; index < user.length; index++) {
          firestore()
          .collection('Post').doc(user[index].key)
          .collection('Shipment')
          .orderBy('date', 'desc')
          .get()
          .then(querySnapshot => {
           querySnapshot.forEach(documentSnapshot => {
             coins++
             userTing.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
              keytwo: String(coins)
            });
            setActivityIndicator(false)
          });
        });
        } 
        setSession(userTing)
        
        for(let i = 0; i < session.length; i++){  
          for(let j = 0; j < session.length-1; j++){  
            if(session[i].date.seconds > session[j].date.seconds){  
              let tmp;  
              tmp = session[j];  
              session[j] = session[i];  
              session[i] = tmp;  
            }  
          }  
        } 
        setAnasayfa(session)
        SetKancaKi(false)
      });
  },[kanca,kancaKi])

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

  const Comments = ( key, telefon, post,isim) => {
    setYorumModal(!yorumModal);
    setYorumKey(key);
    setYorumValue(telefon)
    setItemPost(post)
    setItemIsim(isim)
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

  const Reflesh = ()=>{
    setRefresing(false)
    setScroll(false)
    SetKanca(!kanca)   
  }

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

  const ListHeader = () => {
    return (
      <View style={{backgroundColor:'#f8f8f8',justifyContent:'center', alignItems:'center', }} >
        {scroll ? 
        <View style={{ width:Dimensions.get('screen').width, backgroundColor:'#118ab2', justifyContent:'center', alignItems:'center', paddingVertical:3, marginBottom:10}} > 
          <Text style={{color:'white'}} >Yenilemek için aşağı doğru kaydırın</Text>
        </View>:null}
      </View>
    );
  };

    return ( 
  <>
    <SafeAreaView/> 
      <View style={styles.container} > 
        <StatusBar barStyle="dark-content"  backgroundColor='#118ab2'/>
          <TopBar modalVisible={() => {setModalVisible(!modalVisible);}} Reflesh={() => navigation.push('Search', {value:value, misafir:'5054520754'} )} />
          
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
            <PostModal value={value} onClick={() => {setModalVisible(!modalVisible)}}  onRefresh={() => {navigation.replace('Anasayfa', {value:value})}}
               liste={liste} setPost= {(text) => {setPost(text)}}/>
          </Modal>
          <Modal animationType="fade" transparent={true} visible={informationModal}  onRequestClose={() => {setInformationModal(!informationModal)}}>
            <InformationModal desc={desc} liste={liste} information={information} onClick={() => {setInformationModal(!informationModal)}}
              value= {value} valueKey={valueKey} postApp={postApp} keyApp={keyApp} valueKey={valueKey} isimKey={isimKey} sahip={sahip}/>
          </Modal>
          <Modal animationType="fade" transparent={true} visible={deleteModal} onRequestClose={() => {setDeleteModal(!deleteModal);}}>
            <DeleteModal onClick={() => setDeleteModal(!deleteModal)} funcTab= {() => BildiklerimdenCıkar()}/>
          </Modal>
          <Modal animationType="slide" transparent={true}visible={yorumModal} onRequestClose={() => {setYorumModal(!yorumModal);}}>
            <CommentsModal onClick={() => setYorumModal(!yorumModal)} allYorum={allYorum} yorumSayisi={yorumSayisi} yorum={yorum} setYorum={setYorum}
              yorumKey={yorumKey} yorumValue={yorumValue} itemIsim={itemIsim} itemPost={itemPost} value={value}  setYorum={(text) => {setYorum(text)}} liste={liste} />
          </Modal>

          <View style={{flex:25}}>    
          { activityIndicator ?
           <ActivityIndicator size="large" color="#118ab2"/>
           :
            <FlatList
              data={anasayfa}
              refreshing={refreshing}
              onRefresh={Reflesh}
              scrollEnabled={true}
              ListHeaderComponent={ListHeader}
              keyExtractor={item => item.keytwo}
              renderItem={({ item }) => (
                <View style={{flex:1, width:Dimensions.get('window').width }} >
                  <View style={{ justifyContent:'center',  backgroundColor:'#f8f8f8', paddingVertical:7, paddingHorizontal:15}}>
                    <View style={{flexDirection:'row',  backgroundColor:'#f8f8f8', justifyContent:'space-between', alignItems:'center', paddingVertical:10}}>
                      <PostProfile 
                          click={() => navigation.push('Search', {value:value, misafir:item.telefon})} type={item.type} value={value} telefon={item.telefon}
                          isim={item.isim} username={"@username"} time={moment(item.date.toDate()).fromNow()}/>
                      <CategoryButton value={value} click={()=>BildiklerimdenCıkarExp(item.key,item.sahiplik)} icon={'trash-alt'} value={value} item={item}/>
                    </View>
                      <PostAll post={item.post}  butonPress={() => navigation.navigate('Detaylar', {value:value, isim:liste.isim, telefon:item.telefon, key:item.key})} />
                      <PostInfo sahipisim={item.sahipisim} isim={item.isim} />
                      <View style={{ flexDirection:'row', justifyContent:'space-around', paddingLeft:0, paddingTop:10, paddingBottom:5}} >
                          <PostButton onclick={() => Alert.alert("Gelecek sürümlerde, bu buton yardımıyla bilginin doğruluğunu test edebileceksiniz!")} icon={"feather"} name={"Kontrol Et"}  yorumsayisi={null} />
                          <PostButton onclick={() => PostInformation(item.key, item.post,item.telefon,item.sahipisim)}  value={value} telefon={item.telefon} icon={"info-circle"}  name={"Bilgiler"} yorumsayisi={null}  />
                          <PostButton onclick={() => Comments(item.key, item.telefon, item.post, item.isim)} yorumsayisi={item.yorumSayisi} icon={"comment-dots"} name={"Yorum"}/>
                      </View>                          
                  </View>
                  <View style={{backgroundColor:'#eee',  height:10}}/>     
                </View>
              )}
            />
          }
          </View>
          <Menu
              oneItem={() => navigation.push('Anasayfa', {value:value, misafir:search} )}  colorOne={'#118ab2'}
              twoItem={() => navigation.push('Arkadaşlık İstekleri', {value:value} )}  colorTwo={'#118ab2'}
              threeItem={() => navigation.push('Bildirimler', {value:value, misafir:search} )}  colorThree={'#118ab2'}
              fourthItem={() => navigation.push('Mesajlar', {value:value, misafir:search} )}  colorFourth={'#118ab2'}
              fiveItem={() => navigation.push('Profil', {value:value, misafir:search} )}  colorFive={'#118ab2'}
            />
        </View>
      <SafeAreaView style={{backgroundColor:'#f1f1f1'}} /> 
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
    },
    });
    
    export default ProfilePage;