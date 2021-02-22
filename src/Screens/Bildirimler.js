import React, {useState, useEffect} from 'react';
import {SafeAreaView,StyleSheet,View,Text,StatusBar,Dimensions,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { LogBox } from 'react-native';
import Menu from '../components/Flex/menu';
import NofiFriends from '../components/button/NofiFriends';
import NofiTech from '../components/button/NofiTech';
import NofiQuen from '../components/button/NofiQuen';
import 'moment/locale/tr';  
import moment from 'moment';
moment.locale('tr')

  const Bildirimler= ({route, navigation}) => {
    const {value} = route.params;
    const [search, setSearch]=useState([])
    const [allMessage, setAllMessage]=useState([])
    const [yorumModal,setYorumModal]=useState(false);
    const [refreshing,setRefresing]=useState(false)
    const [liste, setListe]=useState([]);
    const [activityIndicator, setActivityIndicator]=useState(true)
 
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
    }, [])

    useEffect(() => {
        const subscriber = firestore()
        .collection('Notification').doc(value)
        .collection('AllNotification')
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
            setActivityIndicator(false)
          });
      }, [])

    const Reflesh = ()=>{
      setRefresing(false)
    }
    return ( 
      <>
        <SafeAreaView/> 
          <View style={styles.container} > 
            <StatusBar barStyle="dark-content"  backgroundColor='#118ab2'/>
            <View style={styles.containerTab} >
              <TouchableOpacity onPress={() => navigation.goBack()}  >
                <FontAwesome name='chevron-left' size={25} color='#118ab2' />  
              </TouchableOpacity>
              <Text style={{fontSize:20, fontWeight:'bold'}} >  Tüm bildirimler</Text>
            </View>
            <View style={{flex:25}}>    
              {activityIndicator 
              ? <ActivityIndicator size="large" color="#118ab2"/>
              : <FlatList
                  data={allMessage}
                  scrollEnabled={true}
                  refreshing={refreshing}
                  onRefresh={Reflesh}
                  renderItem={({ item }) => (
                    item.type=='arkadas'
                    ? <NofiFriends  butonPress={() => navigation.navigate('Search', {value:value, misafir:item.telefon})}  value={value} isim={item.isim} telefon={item.telefon} tarih={item.tarih} />
                    :item.type=='yorum' 
                      ? <NofiTech  butonPress={() => navigation.navigate('Detaylar', {value:value, key:item.keyTwo, isim:liste.isim, telefon:value })}  value={value} isim={item.isim} telefon={item.telefon} tarih={item.tarih} sub={item.sub} this={item.this}/>
                      : <NofiQuen  butonPress={() => navigation.navigate('Detaylar', {value:value, key:item.keyTwo, isim:liste.isim, telefon:value  })}  value={value} isim={item.isim} telefon={item.telefon} tarih={item.tarih} sub={item.sub} this={item.this}/>
                  )}
              />  
              }
            </View>
            <View style={{flex:2}} >
            <Menu
                oneItem={() => navigation.push('Anasayfa', {value:value, misafir:search} )}  colorOne={'#118ab2'}
                twoItem={() => navigation.push('Arkadaşlık İstekleri', {value:value} )}  colorTwo={'#118ab2'}
                threeItem={() => navigation.push('Bildirimler', {value:value, misafir:search} )}  colorThree={'#118ab2'}
                fourthItem={() => navigation.push('Mesajlar', {value:value, misafir:search} )}  colorFourth={'#118ab2'}
                fiveItem={() => navigation.push('Profil', {value:value, misafir:search} )}  colorFive={'#118ab2'}
              />
            </View>
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
        paddingTop:10
    },

    containerTab:{ 
      flex:1, 
      width:Dimensions.get('screen').width,  
      flexDirection:'row', 
      justifyContent:'flex-start', 
      alignItems:'flex-start', 
      borderBottomWidth:1, 
      borderBottomColor:'#ccc', 
      paddingHorizontal:20, 
      paddingVertical:5
    },
  });

export default Bildirimler;