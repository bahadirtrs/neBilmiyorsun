import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import PostButton from '../components/button/PostButton'
import CategoryButton from '../components/button/categoryButton'
import PostProfile from '../components/button/PostProfile'
import PostAll from '../components/button/PostAll'
import PostInfo from '../components/button/PostInfo';
import Menu from '../components/Flex/menu';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
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
    FlatList, Alert
  } from 'react-native';
  import moment from 'moment'
  import 'moment/locale/tr'  
import CommentsModal from '../components/modal/CommentsModal';
import { KeyboardAvoidingView } from 'react-native';
  moment.locale('tr')
const PostDetails= ({route,navigation}) => {
  const {value}=route.params;
  const {key}=route.params;
  const {telefon}=route.params;
  const {isim}=route.params;
  const [yorum,setYorum]=useState([]);
  const [liste, setListe]=useState([]);
  const [allYorum, setAllYorum]=useState([]);

 const PostList = async () => {

 }

  useEffect(() => {
    const subscriber = firestore()
    .collection('Post').doc(telefon)
    .collection('Shipment').doc(key)
      .onSnapshot(documentSnapshot => {
        setListe( documentSnapshot.data());
      });
      console.log(key)
    // Stop listening for updates when no longer required
    return () => subscriber();

  }, [])


  

  useEffect(() => {

    const allyorum = firestore()
    .collection('Comments').doc(telefon)
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

      return () => allyorum();
    }, [])


    const yorumEkle = ()=> {
      if(yorum!=""){
        firestore()
          .collection('Comments')
          .doc(telefon)
          .collection(key)
          .doc()
          .set({
            isim:isim,
            yorum:yorum,
            kategori: 'Müzik',
            telefon:value,
            tarih:firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
           setYorum("")
          });
  if(liste.telefon!=value){
    firestore()
    .collection('Notification').doc(telefon)
    .collection('AllNotification').doc()
    .set({
      isim:isim,
      sub:yorum,
      this:liste.post,
      keyTwo:key,
      telefon:value,
      type:'yorum',
      tarih:firestore.FieldValue.serverTimestamp(),
    })
  }
         

     
        }
      }

      
    const ListHeader = () => {
      return (
        <View style={{ width:Dimensions.get('window').width }} >
          <View style={{ justifyContent:'center',  backgroundColor:'#f8f8f8', paddingVertical:7, paddingHorizontal:15}}>
            <View style={{flexDirection:'row',  backgroundColor:'#f8f8f8', justifyContent:'space-between', alignItems:'center', paddingVertical:10}}>
             <PostProfile 
                click={() => navigation.push('Search', {value:value, misafir:liste.telefon})} type={ liste.type && liste.type} 
                isim={liste.isim} username={"@username"} time={liste.date && moment(liste.date.toDate()).fromNow()}/>
              <CategoryButton value={value} click={(null)} icon={'star'} value={value} item={liste}/>
             </View>
                <PostAll post={liste.post} />
                <PostInfo sahipisim={liste.sahipisim} isim={liste.isim} />
                <View style={{ flexDirection:'row', justifyContent:'space-around', paddingLeft:0, paddingTop:10, paddingBottom:5}} >
                  <PostButton onclick={() => Alert.alert("Gelecek sürümlerde, bu buton yardımıyla bilginin doğruluğunu test edebileceksiniz!")} icon={"feather"} name={"Kontrol Et"}  yorumsayisi={null} />
                  <PostButton onclick={null}  icon={"info-circle"}  name={"Bilgiler"}  />
              </View>  
          </View>
          <View style={{backgroundColor:'#eee',  height:10}}/>  
            <Text style={{fontSize:20, fontWeight:'500', paddingHorizontal:15, paddingVertical:10}} >Yorumlar</Text> 
          <View style={{backgroundColor:'#ccc',  height:1, marginBottom:10}}/>    
        </View>  

      );
    };



    return (
      <>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView style={{flex:1}} >
        <View style={styles.container} >
          <View style={{flex:0}} >
            
          </View>
          <View style={{flex:25}} >
           
          <FlatList
              data={allYorum}
              scrollEnabled={true}
              ListHeaderComponent={ListHeader}
              renderItem={({ item }) => (
                <View style={{ flexDirection:'row', maxWidth:Dimensions.get('screen').width, minWidth:Dimensions.get('screen').width, justifyContent:'space-between', paddingHorizontal:10, alignItems:'flex-start'}} >
                  <View style={{ flexDirection:'row', maxWidth:Dimensions.get('screen').width, justifyContent:'flex-start', alignItems:'flex-start'}} >
                    <View style={{ flexDirection:'column', justifyContent:'center', alignItems:'flex-start', margin:1, paddingBottom:1, borderRadius:5,backgroundColor:'#f6f6f6'}} >
                      <TouchableOpacity onPress={() => navigation.navigate('Search', {value:value, misafir:item.telefon})} >
                        <Text style={{ color:'#111', fontSize:18, padding:2, paddingLeft:5, paddingTop:1, fontWeight:'300', fontSize:14,textAlign:'left' }}><Text style={{fontWeight: "bold", fontSize:14}}>{item.isim}</Text> | {item.yorum}</Text>    
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />

          </View>
          <View style={{flex:2,justifyContent:'center', alignContent:'center',}} >
          <View style={{ flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center', paddingBottom:1}} > 
            <TextInput
                  style={{fontSize:18,paddingHorizontal:10, position:'relative', marginRight:10, paddingVertical:5, borderColor:'#bbb', borderRadius:10, borderWidth:1, width:Dimensions.get("window").width-70}}
                  placeholder="Yorum yap..."
                  fontSize={16}
                  value={String(yorum)}
                  onChangeText={(text) => {setYorum(text)}}
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
       <SafeAreaView/>
     </>
    );
  }

  const styles = StyleSheet.create({
    container: {
     flex:1,
     flexDirection:'column',
     justifyContent:'flex-start',
     alignItems:'center',
     backgroundColor:'#f8f8f8'   
    },   
    Logo: {
      fontSize:42,
      fontWeight:'600',
      color:'#118ab2',
      textAlign:'center'
    },
    LogoPic:{
      height:80,
      width:80,
      marginBottom:0,
      
    },
    
    ok: {
      width: 300,
      height: 250,
      marginVertical:50,
    },
    
    LogoDes: {
    textAlign:'center',
    fontSize:15,
    color:'#118ab2',
    paddingBottom:20,
    paddingTop:10
    },
    
    textIn: {
      width: 270,
      borderBottomWidth: 1,
      borderColor: '#bbb',
      borderRadius: 5,
      paddingVertical:15,
      margin: 10,
      color:'#000',
      fontSize:17, 
    },

    textInSmall: {
      width: 60,
      borderBottomWidth: 1,
      borderColor: '#bbb',
      borderRadius: 5,
      paddingVertical:15,
      marginVertical: 10,
      color:'#000',
      fontSize:17, 
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
    
    butonText: {
      fontSize: 20,
      fontWeight:'400',
      color: '#fff'
    },
    profilePic:{
      height:30,
      width:30,
      borderRadius:20,
    },
    
    });
    
    export default PostDetails;