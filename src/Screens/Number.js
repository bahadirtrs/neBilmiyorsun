import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    TextInput
  } from 'react-native';

const Number= ({navigation}) => {
  const [value, onChangeText] = useState('');
  const [valueX, onChangeTextX] = useState('+90');
  const [warning, setWarning]= useState(' ');
  const [list, setList] = useState('');
  const [sayac,setSayac] = useState(1000);

  useEffect(() => {
    database()
    .ref("telNo")
    .once("value")
    .then(snapshot=> {
    setList(Object.values(snapshot.val()));
  });
  }, []);

  const Redirect = () => {
    if(value.length === 10){
      for (let index = 0; index < 1000; index++) {
        if(list[index] === value){
          setSayac(1); 
          break; 
        }else{
          setSayac(2);            
        }   
      }  
    }else{     
      setWarning('Lütfen geçerli bir telefon numarası giriniz.')
    }  
  };
  
  useEffect(() => {
    if(sayac===1){   
      navigation.replace('Numarayı Onayla',{value: value, valueX:valueX, page:'kayitli'}); 
      setSayac(0);   
    }
    if(sayac===2){
      navigation.push('Kontrol',{value: value, valueX:valueX, page:'kayitsiz'});    
    }
  }, [sayac]);
    return (
    <>
    <StatusBar barStyle="dark-content" />
      <View style={styles.container} >
        <View style={styles.containerTab} >
          <Text style={styles.titleText} >hey hoşgeldin!</Text>
          <Text style={styles.LogoDes} >kullanmaya başlamak için telefon numaranı gir!</Text>
          <Text style={{paddingBottom:20}} >{warning} </Text>
          <View style={{flexDirection:'row'}}>
            <TextInput style={styles.textInSmall}  value={valueX}  keyboardType="number-pad" onChangeText={(text) => onChangeTextX(text)} />
            <TextInput style={styles.textIn}  placeholder='Telefon Numarası' keyboardType="number-pad" onChangeText={(text) => onChangeText(text)} />
          </View>
          <TouchableOpacity onPress={Redirect}   style={styles.buton} >
            <Text style={styles.butonText}>Devam Et</Text>                  
          </TouchableOpacity>  
          <Text style={styles.infoText}>Bu numaranın kullanıldığından emin ol. Sana onay için SMS'i göndereceğiz.</Text>
        </View>                   
      </View>
    </>
    );
  }

  const styles = StyleSheet.create({
    container: {
     flex:1,
     borderWidth:1,
     flexDirection:'column',
     justifyContent:'space-around',
     alignItems:'center',
     backgroundColor:'#f8f8f8'
    },

    containerTab:{
      flexDirection:'column', 
      justifyContent:'center', 
      alignItems:'center'
    },

    titleText:{
      fontSize:50, 
      textAlign:'center', 
      fontWeight:'700', 
      color:'#118ab2'
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

    infoText: {
      fontSize:15, 
      padding:30, 
      textAlign:'center', 
      color:'#118ab2'
    },
    
    butonText: {
      fontSize:18, 
      color:'#f8f8f8'
    },
    
    });
    
    export default Number;