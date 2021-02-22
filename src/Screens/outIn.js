import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView,View,Text,StatusBar} from 'react-native';
  
  const Control= ({route, navigation})  => {
    useEffect(() => {
      AsyncStorage.getItem('phone').then((deger)=>{
        if(deger!=null){
          navigation.replace('Anasayfa', {value:deger , valueX:null})
        }else{
          navigation.push('Numara Gir', {value:deger , valueX:null})
        }
          console.log(deger)
      }).done();
    }, []);
    return (
      <>
      <StatusBar barStyle="dark-content" />
        <SafeAreaView> 
            <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}} >
              <Text>Uygulama Başlatılıyor...</Text>
            </View>
        </SafeAreaView>
      </>
      );
    } 
    export default Control;