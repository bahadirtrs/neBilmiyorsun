import React, {useState, useRef, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Alert
  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const NumberApprove=({route, navigation}) => {
  const {value} = route.params;
  const {valueX}= route.params;
  const {page}= route.params;
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [value4, setValue4] = useState();
  const [value5, setValue5] = useState();
  const [random, setRandom] = useState(Math.floor(Math.random() * 10000) + 10000);
  const [pinKodu, setPinKodu] = useState();
  const [info, setInfo]=useState("numaralı telefona gönderilen 5 haneli onay kodunu giriniz.");
  const pinRef1 = useRef();
  const pinRef2 = useRef();
  const pinRef3 = useRef();
  const pinRef4 = useRef();
  const pinRef5 = useRef();
  
  useEffect(() => {
    database().ref("onayKodu/"+value)
    .set({
      PinKodu: random,
    })

    AsyncStorage.getItem('phone').then(deger =>{
      if(deger==null){
        AsyncStorage.setItem('phone', value);
      } else {
        AsyncStorage.setItem('phone', value);
      }
    });

  }, []);

  useEffect(() => {
    setPinKodu(value1+value2+value3+value4+value5);
  }, [value5,value2,value3,value4]);

  const Kontrol = () => {
    if(pinKodu==random ){
      if( page === 'kayitli' ){
         navigation.replace('Anasayfa',{value: value, valueX:valueX, gelen:'giris' });    
      }else{
         navigation.replace('Kayıt Ol', {value: value, valueX:valueX } );
      }
    }else{
      setValue1(""), setValue2(""), setValue3(""), setValue4(""), setValue5("")
     if(pinKodu==""){
      Alert.alert("Lütfen cep telefonunuza gönderilen onay kodunu giriniz.");
     }else{
      Alert.alert('Onay kodunuz yanlış. Lütfen kodunuzu kontrol edin ve tekrar giriniz.');
     }
    }
  };
    return (
    <>
    <StatusBar barStyle="dark-content" />
      <View style={styles.container} >
        <View>
          <View>
          <Text style={styles.randomNumber}>Onay Kodu: {random}</Text>
            <Text style={styles.LogoDes2}>{valueX} {value}</Text>
              <Text style={styles.LogoDes}>{info}</Text>
          </View>
          <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}} >
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}  >
              <TextInput ref={pinRef1} style={styles.textIn} maxLength={1} value={value1} onChangeText={(text) => {setValue1(text), !value1 ? pinRef2.current.focus() : null}} keyboardType="number-pad" />
              <TextInput ref={pinRef2} style={styles.textIn} maxLength={1} value={value2} onChangeText={(text) => {setValue2(text), !value2 ? pinRef3.current.focus() : null}} keyboardType="number-pad" />
              <TextInput ref={pinRef3} style={styles.textIn} maxLength={1} value={value3} onChangeText={(text) => {setValue3(text), !value3 ? pinRef4.current.focus() : null}} keyboardType="number-pad" />
              <TextInput ref={pinRef4} style={styles.textIn} maxLength={1} value={value4} onChangeText={(text) => {setValue4(text), !value4 ? pinRef5.current.focus() : null}} keyboardType="number-pad" />
              <TextInput ref={pinRef5} style={styles.textIn} maxLength={1} value={value5} onChangeText={(text) => {setValue5(text), !value5 ? pinRef5.current.focus() : null}} keyboardType="number-pad" />
            </View>
          <TouchableOpacity onPress={Kontrol} style={styles.buton} >
            <Text style={styles.butonText} >Onayla</Text>
          </TouchableOpacity>
          <Text>sms için kalan süre:89 saniye</Text>
          </View>            
        </View>       
      </View>
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

randomNumber:{
  fontSize:24, 
  fontWeight:'600', 
  textAlign:'center', 
  marginTop:100, 
  marginBottom:100, 
  color:'#118ab2'
},

LogoDes: {
  textAlign:'center',
  fontSize:17,
  color:'#118ab2',
  paddingBottom:20,
  paddingHorizontal:20,
  },
  
LogoDes2: {
  textAlign:'center',
  fontSize:24,
  color:'#333',
  paddingBottom:10,
  paddingHorizontal:20,
  fontWeight:'600',
},

textIn: {
  width: 50,
  borderBottomWidth: 1,
  borderColor: '#555555',
  borderRadius: 9,
  padding: 10,
  margin: 8,
  color:'#555555',
  fontSize:24, 
  textAlign:'center',
},

buton: {
  paddingHorizontal: 10,
  paddingVertical: 15,
  alignItems: 'center',
  marginVertical: 30,
  backgroundColor:'#118ab2',
  borderRadius: 10,
  width: 350,
  elevation:3,
  borderColor:'#dddddd50',
  borderWidth:1,
},

butonText: {
  fontSize:20, 
    color:'#fff', 
    fontWeight:'500'
 },
    
});
    
export default NumberApprove;