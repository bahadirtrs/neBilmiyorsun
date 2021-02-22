import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import React, {useState, useEffect} from 'react';
import { SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
const SingUp= ({route, navigation}) => {
  const {value} = route.params;
  const {valueX}= route.params;
  const [isim, setIsim]=useState('');
  const [cinsiyet, setCinsiyet]=useState('');
  const [mail, setMail]=useState('');
  const [parola, setParola]=useState('');

  const kayitEkle = ()=> {
    firestore()
      .collection('Users').doc(value)
      .set({
        isim: isim,
        cinsiyet:cinsiyet,
        mail:mail,
        parola:parola,
        telefon:value,
      })
      .then(() => {
        database().ref('telNo').push(value); 
        navigation.push('Hesabı Onayla',{value:value, name:isim})
      });
      }

    return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView > 
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.container} >
            <View style={styles.containerTab} > 
            <Image source={require('../img/profile.png')} style={styles.LogoPic}  />
            <Text style={styles.LogoDes} >Profil resmi ekle</Text>
            </View>
            <View>
              <TextInput style={styles.textIn} value={isim} onChangeText={setIsim} placeholder="Adın ve Soyadın"  />
              <TextInput style={styles.textIn} value={cinsiyet} onChangeText={setCinsiyet} placeholder="Cinsiyetin"  />
              <TextInput style={styles.textIn} value={mail} onChangeText={setMail} placeholder="Mail adresin"  />
              <TextInput style={styles.textIn} secureTextEntry={true} require={true}  value={parola} onChangeText={setParola} placeholder="Parolan" keyboardType='default'   />
              <TextInput style={styles.textIn} secureTextEntry={true}  placeholder="Parolanın tekrarı"  keyboardType='default' />
              <TouchableOpacity onPress={() => kayitEkle()} style={styles.buton} >
                <Text style={styles.butonText}>Kaydol</Text>
              </TouchableOpacity>
              <Text style={styles.LogoDes} >Bir hesabın var mı? Oturum Aç</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
    );
  }
const styles = StyleSheet.create({

container: {
  flex:1,
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
  flexDirection:'column',
  justifyContent:'flex-start',
  alignItems:'center',
  backgroundColor:'#f8f8f8'
},

containerTab:{
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  marginTop:50 
},

LogoPic:{
  height:100,
  width:100,
  marginBottom:0,
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
  padding: 8,
  margin: 10,
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
  marginBottom:20
},

butonText: {
  fontSize: 18,
  fontWeight:'400',
  color: '#fff'
},

});
    
export default SingUp;