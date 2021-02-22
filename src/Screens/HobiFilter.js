import React, {useState, useEffect} from 'react';
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
const HobbysFilter= ({route, navigation}) => {
  const {value}=route.params;
  const [soru, setSoru]=useState('Daha önce hiç yazılım ile ilgilendiniz mi?');
  const [soruNumber, setSoruNumber]=useState(1);

  const Redirect = () => {
    switch(soruNumber){
      case 1: setSoru("Alternatif müzik dinlemekten hoşlanır mısınız?");
      break;
      case 2: setSoru("Gökyüzünü izlemekten hoşlanır mısınız?");
      break
      case 3: setSoru("Yeşilçam filmlerini izlemeyi sever misiniz?");
      break
      case 4: setSoru("Cem Karacanın 65 yaşında Lösemi olduğunu biliyor muydunuz?");
      break
      case 5: setSoru("Kemal Sunalın çok ciddi bir kişiliği olduğunu biliyor muydunuz?");
      break
      case 6: setSoru("Günde 3 milyon kişinin hayatını kaybettiğinni biliyor muydunuz?");
      break
      case 7: setSoru("Türkiye de 44.597 köy olduğunu biliyor muydunuz?");
      break
      case 8: setSoru("Bu bilgilerin hepsinin sallama olduğunu tahmin ettiniz mi?");
      break
    }
    setSoruNumber(soruNumber+1);
};
    return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView > 
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
              <View style={styles.container} >
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:50 }} > 
                <Image source={require('../img/tanimak.png')} style={styles.LogoPic}  />
                <Text style={styles.LogoDes} >Size birkaç soru sormamız gerekiyor!</Text>
                </View>
                   <View>
                     <Text style={{paddingHorizontal:40, paddingBottom:40, textAlign:'center', fontSize:16,}} >Sizi daha iyi tanımamız sizlere sunacağımız bilgilerin ilgi alanlarınızla uyumlu olması için oldukça önemli bir durumdur.</Text>
                   </View>
                { soruNumber<10 ?
                   <View style={{marginVertical:60}} >
                      <Text style ={{fontSize:28, paddingHorizontal:30, textAlign:'center', color:'#118ab2'}} >{soru}</Text>    
                      <View style={{  flexDirection:'row', justifyContent:'center', marginVertical:30}}>
                        <TouchableOpacity onPress={Redirect} style={styles.butonClas1} >
                          <Text style={{color:'#f8f8f8', fontSize:17}} >Evet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={Redirect} style={styles.butonClas2} >
                          <Text style={{color:'#118ab2', fontSize:17}} >Hayır</Text>
                        </TouchableOpacity>
                      </View>     
                    <Text style={styles.LogoDes2}>{soruNumber}/10</Text>
                    <TouchableOpacity onPress={() => navigation.replace('Anasayfa', {value:value, gelen:'kayit'})} >
                      <Text style={styles.LogoDes}>Bu bilgileri daha sonra paylaşmak istiyorum.</Text>
                    </TouchableOpacity>
                 </View>
                :
                <View style={{marginVertical:60}} >
                      <Text style ={{fontSize:24, paddingHorizontal:30, textAlign:'center', color:'#118ab2'}} >Verdiğiniz cevaplar için teşekkür ederiz. Bu cevaplara göre bilgi sunmaya çalışacağız.</Text>    
                      <View style={{  flexDirection:'row', justifyContent:'center', marginVertical:30}}>
                        <TouchableOpacity onPress={() => navigation.replace('Anasayfa', {value:value, gelen:'kayit'})} style={styles.butonClas1} >
                          <Text style={{color:'#f8f8f8', fontSize:17}} >Tamamlandı</Text>
                        </TouchableOpacity>
                      </View>     
                    <Text style={styles.LogoDes2}>{soruNumber}/10</Text>
                 </View>
                  }
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
     height: Dimensions.get('screen').height,
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
      height:100,
      width:110,
      marginBottom:0,
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
    paddingVertical:20,
    },
    
    LogoDes2: {
      textAlign:'center',
      fontSize:25,
      color:'#118ab2',
      paddingVertical:5,
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
      elevation:3,
      borderColor:'#dddddd50',
      borderWidth:1,
      marginBottom:20
    },
    butonClas: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      alignItems: 'center',
      margin: 5,
      backgroundColor:'#f8f8f8',
      borderRadius: 10,
      width: 100,
      elevation:3,
      borderColor:'#118ab2',
      borderWidth:1,
      marginBottom:20,
    },
    
    butonClas1: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      alignItems: 'center',
      margin: 5,
      backgroundColor:'#118ab2',
      borderRadius: 10,
      width: 120,
      elevation:3,
      borderColor:'#118ab2',
      borderWidth:1,
      marginBottom:20,
    },
    
    butonClas2: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      alignItems: 'center',
      margin: 5,
      backgroundColor:'#f8f8f8',
      borderRadius: 10,
      width: 120,
      elevation:3,
      borderColor:'#118ab2',
      borderWidth:1,
      marginBottom:20,
    },
    
    butonClas3: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      alignItems: 'center',
      margin: 5,
      backgroundColor:'#118ab2',
      borderRadius: 10,
      width: 100,
      elevation:3,
      borderColor:'#118ab2',
      borderWidth:1,
      marginBottom:20,
    },
    butonText: {
      fontSize: 20,
      fontWeight:'400',
      color: '#fff'
    },
    
    butonTextClas: {
      fontSize: 20,
      fontWeight:'400',
      color: '#118ab2'
    },
    
  });
export default HobbysFilter;