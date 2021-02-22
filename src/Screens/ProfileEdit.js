import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet,ScrollView,View,StatusBar,Dimensions,Image,TouchableOpacity,Text} from 'react-native';

const ProfileEdit= ({navigation,route}) => {
  const {value}=route.params;
  const [liste, setListe]=useState([]);
    const  removeItem = async () => {
      try {
        await AsyncStorage.removeItem("phone");
        navigation.replace('Numara Gir')
      }catch (exception) {
        return false;
      }
    };
    
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
    },)

    return (
      <>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.container} >
            <View>
              <View style={{ width:Dimensions.get('screen').width, flexDirection:'column', justifyContent:'center', alignItems:'center', borderBottomColor:'#e1e1e1', borderBottomWidth:1, padding:10}} >
                <Image source={require('../img/profile.png')} style={{ margin:20, borderWidth:5, borderColor:'#fff', width:100, height:100, borderRadius:60}}  />
                <Text>Profil Fotoğrafını Değiştir</Text>
              </View>
            <View style={{ marginTop:20, maxWidth:Dimensions.get('screen').width}} >      
              <View style={{  paddingHorizontal:30, flexDirection:'row',  }} >
                <View style={{ width:'40%', paddingVertical:5}} >
                  <Text>Adın ve Soyadın</Text>
                </View>
                <View style={{width:'60%',paddingVertical:5, borderBottomColor:'#e1e1e1', borderBottomWidth:1 }} >
                  <TouchableOpacity onPress={() => navigation.navigate('Bilgi Düzenle', {value:value, par:liste, box:'isim'} )} >
                    <Text>{liste.isim}</Text>
                  </TouchableOpacity> 
                </View>
              </View>
              <View style={{  paddingHorizontal:30, flexDirection:'row',  }} >
                <View style={{ width:'40%', paddingVertical:5}} >
                  <Text>Mail Adresin</Text>
                </View>
                <View style={{width:'60%',paddingVertical:5, borderBottomColor:'#e1e1e1', borderBottomWidth:1 }} >
                  <TouchableOpacity onPress={() => navigation.navigate('Bilgi Düzenle', {value:value, par:liste, box:'mail'} )} >
                    <Text>{liste.mail}</Text>
                  </TouchableOpacity> 
                </View>
              </View>
              <View style={{  paddingHorizontal:30, flexDirection:'row',  }} >
                <View style={{ width:'40%', paddingVertical:5}} >
                  <Text>Yaşadığın Şehir</Text>
                </View>
                <View style={{width:'60%',paddingVertical:5, borderBottomColor:'#e1e1e1', borderBottomWidth:1 }} >
                  <TouchableOpacity onPress={() => navigation.navigate('Bilgi Düzenle', {value:value, par:liste, box:'sehir'} )} >
                    <Text>{liste.sehir}</Text>
                  </TouchableOpacity> 
                </View>
              </View>
              <View style={{  paddingHorizontal:30, flexDirection:'row',  }} >
                <View style={{ width:'40%', paddingVertical:5}} >
                  <Text>Meslek</Text>
                </View>
                <View style={{width:'60%',paddingVertical:5, borderBottomColor:'#e1e1e1', borderBottomWidth:1 }} >
                  <TouchableOpacity onPress={() => navigation.navigate('Bilgi Düzenle', {value:value, par:liste, box:'meslek'} )} >
                    <Text>{liste.meslek}</Text>
                  </TouchableOpacity> 
                </View>
              </View>
              <View style={{  paddingHorizontal:30, flexDirection:'row',  }} >
                <View style={{ width:'40%', paddingVertical:5}} >
                  <Text>Cinsiyet</Text>
                </View>
                <View style={{width:'60%',paddingVertical:5, borderBottomColor:'#e1e1e1', borderBottomWidth:1 }} >
                  <TouchableOpacity onPress={() => navigation.navigate('Bilgi Düzenle', {value:value, par:liste, box:'cinsiyet'} )} >
                    <Text>{liste.cinsiyet}</Text>
                  </TouchableOpacity> 
                </View>
              </View>
              <View style={{  paddingHorizontal:30, flexDirection:'row',  }} >
                <View style={{ width:'40%', paddingVertical:5}} >
                  <Text>Yaş</Text>
                </View>
                <View style={{width:'60%',paddingVertical:5, borderBottomColor:'#e1e1e1', borderBottomWidth:1 }} >
                  <TouchableOpacity onPress={() => navigation.navigate('Bilgi Düzenle', {value:value, par:liste, box:'yas'} )} >
                    <Text>{liste.yas}</Text>
                  </TouchableOpacity> 
                </View>
              </View>
              <View style={{  paddingHorizontal:30, flexDirection:'row',  }} >
                <View style={{ width:'40%', paddingVertical:5}} >
                  <Text>Üniversite</Text>
                </View>
                <View style={{width:'60%',paddingVertical:5, borderBottomColor:'#e1e1e1', borderBottomWidth:1 }} >
                  <TouchableOpacity onPress={() => navigation.navigate('Bilgi Düzenle', {value:value, par:liste, box:'universite'} )} >
                    <Text>{liste.universite}</Text>
                  </TouchableOpacity> 
                </View>
              </View>

              <View style={{  paddingHorizontal:30, flexDirection:'row',  }} >
                <View style={{ width:'40%', paddingVertical:5}} >
                  <Text>Üni. Bölüm</Text>
                </View>
                <View style={{width:'60%',paddingVertical:5, borderBottomColor:'#e1e1e1', borderBottomWidth:1 }} >
                  <TouchableOpacity onPress={() => navigation.navigate('Bilgi Düzenle', {value:value, par:liste, box:'bolum'} )} >
                    <Text>{liste.universiteBolum}</Text>
                  </TouchableOpacity> 
                </View>
              </View>
              <View style={{  paddingHorizontal:30, flexDirection:'row',  }} >
                <View style={{ width:'40%', paddingVertical:5}} >
                  <Text>Biyografi</Text>
                </View>
                <View style={{width:'60%',paddingVertical:5, borderBottomColor:'#e1e1e1', borderBottomWidth:1 }} >
                  <TouchableOpacity onPress={() => navigation.navigate('Bilgi Düzenle', {value:value, par:liste, box:'bio'} )} >
                    <Text>{liste.bio}</Text>
                  </TouchableOpacity> 
                </View>
              </View>
              </View>
            </View>
            <View style={{ flexDirection:'column',  width:Dimensions.get('screen').width-20,  marginTop:20, paddingHorizontal:30}} >
              <View style={{flexDirection:'row',marginVertical:5,  justifyContent:'flex-start', alignItems:'center'}} >
                <Text style={{fontSize:16, fontWeight:'500',color:'#118ab2'}} >Parolayı değiştir</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.push('Hobiler' , {value:value, res:'2'})} >
              <View style={{flexDirection:'row',marginVertical:5,   justifyContent:'flex-start', alignItems:'center'}} >
                <Text style={{fontSize:16, fontWeight:'500',color:'#118ab2'}} >İlgi alanlarını düzenle</Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => removeItem()} >
              <View style={{flexDirection:'row',marginVertical:5,   justifyContent:'flex-start', alignItems:'center'}} >
                <Text style={{fontSize:16, fontWeight:'500',color:'#118ab2'}} >Çıkış Yap</Text>
              </View>
              </TouchableOpacity>
              <View style={{flexDirection:'row',marginVertical:5,  justifyContent:'flex-start', alignItems:'center'}} >
                <Text style={{fontSize:16, fontWeight:'500',color:'#118ab2'}} >Telefon numaranı değiştir</Text>
              </View>

              <TouchableOpacity  onPress={() => navigation.replace('Profil', {value:value})} style={styles.buton} >
                    <Text style={{fontSize:16, fontWeight:'600', color:'#f8f8f8'}}>Anasayfaya dön </Text>                  
              </TouchableOpacity> 
            </View>
            </View>
          </ScrollView>
        
    </>
    );
  }
  const styles = StyleSheet.create({
    container: {
     flex:1,
     flexDirection:'column',
     justifyContent:'flex-start',
     alignItems:'flex-start',
     backgroundColor:'#f8f8f8'
    },

    buton: {
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
    
  });
    
    export default ProfileEdit;