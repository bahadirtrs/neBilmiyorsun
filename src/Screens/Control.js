import * as React from 'react';
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
    TextInput
  } from 'react-native';
  const OutIn= ({route, navigation}) => {
    const {value} = route.params;
    const {valueX} = route.params;
      return (
          <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView > 
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
              <View style={styles.container} >
                <View style={{justifyContent:'center', alignItems:'center'}} >
                  <Image source={require('../img/phone.png')} style={styles.LogoPic}  />
                  <Text style={{paddingHorizontal:20, paddingVertical:5, fontSize:17, textAlign:'center'}}>Girdiğiniz numaraya ait bir hesap bulunamadı. </Text>
                    <Text style={{paddingHorizontal:20, paddingVertical:5, fontSize:25, textAlign:'center', color:'#118ab2', fontWeight:'600'}}>{valueX} {value}</Text>
                  <Text style={{paddingHorizontal:20, paddingVertical:5, fontSize:16, textAlign:'center'}}>numarasını kullanarak kayıt olmak ister misiniz?</Text>     
                </View>  
                <View style={{ flexDirection:'column', padding:30}} >  
                  <TouchableOpacity onPress={() => navigation.push('Numarayı Onayla', {value:value , valueX:valueX})} style={styles.butonClas1} >
                      <Text style={{color:'#f8f8f8', fontSize:17}} >Evet, yeni bir hesap oluştur.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.push('Numara Gir',)} style={styles.butonClas1} >
                      <Text style={{color:'#f8f8f8', fontSize:17}} >Başka numara kullanmak istiyorum.</Text>
                  </TouchableOpacity>  
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
     justifyContent:'center',
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
      height:100,
      width:100,
      marginBottom:50,
      
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
      width: 330,
      borderBottomWidth: 1,
      borderColor: '#bbb',
      borderRadius: 5,
      paddingVertical:15,
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
    },

    butonClas1: {
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
    
    butonText: {
      fontSize: 20,
      fontWeight:'400',
      color: '#fff'
    },
    
    });
    
    export default OutIn;