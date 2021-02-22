import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaView, StyleSheet,ScrollView,View,Text,StatusBar,Dimensions,Image,TouchableOpacity,TextInput} from 'react-native';

const AccountApprove= ({route,navigation}) => {
  const {value}=route.params;
  const {name}=route.params;
  const [sehir, setSehir]=useState('');
  const [universiteBolum, setUniversiteBolum]=useState('');
  const [universite, setUniversite]=useState('');
  const [yas, setYas]=useState('');
  const [meslek, setMeslek]=useState('');

  const kayitEkle = ()=> {
    firestore()
      .collection('Users')
      .doc(value)
      .update({
        sehir: sehir,
        universiteBolum:universiteBolum,
        universite:universite,
        yas:yas,
        meslek:meslek,
      })
      .then(() => {
        navigation.push('Hobiler', {value:value, res:'1'} )
      });
      }
    return (
    <>
    <StatusBar barStyle="dark-content" />
      <SafeAreaView > 
        <ScrollView>
          <View style={styles.container} >
            <View style={styles.containerTab} > 
              <Image source={require('../img/okey.png')} style={styles.LogoPic}  />
              <Text style={styles.homeText} >Aramıza hoşgeldin {name}</Text>
            </View>        
            <View>
              <Text style={styles.infoText} >Sana, ilgi alanlarınıza yakın konularda bilgi sunabilmemiz için bizimle birkaç bilgi daha paylaşmalısınız.</Text>
            </View>
            <View>     
              <TextInput style={styles.textIn} value={sehir} onChangeText={setSehir} placeholder="Hangi şehirde yaşıyorsun?"   />
              <TextInput style={styles.textIn} value={universite} onChangeText={setUniversite}  placeholder="Hangi üniversitede okudun/okuyorsun?"  />
              <TextInput style={styles.textIn} value={universiteBolum} onChangeText={setUniversiteBolum} placeholder="Üniviversite de bölümün neydi/ne?"  />
              <TextInput style={styles.textIn} value={yas} onChangeText={setYas} placeholder="Yaşın kaç?" keyboardType="number-pad"  />
              <TextInput style={styles.textIn} value={meslek} onChangeText={setMeslek}  placeholder="Mesleğin nedir?"/>
              <TouchableOpacity onPress={() => kayitEkle()} style={styles.buton} >
                <Text style={styles.butonText} >Devam Et</Text>
              </TouchableOpacity>
              <Text style={styles.LogoDes} >Bu bilgileri daha sonra paylaşmak istiyorum.</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
    );
  };
  
const styles = StyleSheet.create({  
  container: {
    flex:1,
    width: Dimensions.get('screen').width,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'#f8f8f8',
  },

  containerTab:{
    flexDirection:'column', 
    justifyContent:'center', 
    alignItems:'center',
    marginTop:50 },

  LogoPic:{
    height:100,
    width:100,
    marginBottom:0,
  },

  homeText:{
    fontSize:21, 
    padding:20,
    fontWeight:'600', 
    color:'#118ab2'
  },

  infoText:{
    paddingHorizontal:40, 
    paddingBottom:40, 
    textAlign:'center', 
    fontSize:16
  },

  textIn: {
    width: 330,
    borderWidth: 1,
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
    color:'#fff', 
    fontSize:17
  },

  LogoDes: {
    textAlign:'center',
    fontSize:17,
    color:'#118ab2',
    paddingVertical:20,
    },  
});
    
export default AccountApprove;