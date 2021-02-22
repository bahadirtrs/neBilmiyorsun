import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
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
  } from 'react-native';

  const Hobbys= ({route,navigation}) => {
  const{value} =route.params;
  const{res} =route.params;
  const [hobbys,setHobbys]=useState([])
  const [teknoloji, setTeknoloji]=useState(false);
  const [muzik, setMuzik]=useState(false);
  const [sanat, setSanat]=useState(false);
  const [spor, setSpor]=useState(false);
  const [uzay, setUzay]=useState(false);
  const [edebiyat, setEdebiyat]=useState(false);
  const [tarih, setTarih]=useState(false);
  const [yazilim, setYazilim]=useState(false);
  const [felsefe, setFelsefe]=useState(false);
  const [icatlar, setIcatlar]=useState(false);
  const [psikoloji, setPsikoloji]=useState(false);
  const [saglik, setSaglik]=useState(false);
  const [hobi, setHobi]=useState(false);
  const [biyoloji, setBiyoloji]=useState(false);
  const [matematik, setMatematik]=useState(false);

  useEffect(() => {
   firestore().collection('Hobbys').doc(value)
   .onSnapshot(documentSnapshot => {
      setHobbys(documentSnapshot.data());
   });
}, []);

   useEffect(() => {
      if(hobbys!=null){
         setTeknoloji(hobbys.teknoloji)
         setMuzik(hobbys.muzik)
         setSanat(hobbys.sanat)
         setSpor(hobbys.spor)
         setUzay(hobbys.uzay)
         setEdebiyat(hobbys.edebiyat)
         setTarih(hobbys.tarih)
         setYazilim(hobbys.yazilim)
         setFelsefe(hobbys.felsefe)
         setIcatlar(hobbys.icatlar)
         setPsikoloji(hobbys.psikolji)
         setSaglik(hobbys.saglik)
         setHobi(hobbys.hobi)
         setBiyoloji(hobbys.biyoloji)
         setMatematik(hobbys.matematik)
      }
   }, [hobbys]);

  const kayitEkle = ()=> {
    firestore()
      .collection('Hobbys')
      .doc(value)
      .set({
        teknoloji:teknoloji,
        muzik:muzik,
        sanat:sanat,
        spor:spor,
        uzay:uzay,
        edebiyat:edebiyat,
        tarih:tarih,
        yazilim:yazilim,
        felsefe:felsefe,
        icatlar:icatlar,
        psikolji:psikoloji,
        saglik:saglik,
        hobi:hobi,
        biyoloji:biyoloji,
        matematik:matematik
      })
      .then(() => {
        console.log('Başarılı!');
        if(res=='1'){
         navigation.navigate('İlgi Alanı', {value:value})
        }else if(res=='2'){
         navigation.navigate('Anasayfa', {value:value})
        }else{
         navigation.navigate('Anasayfa', {value:value})
        }
      });
   }

   const HobbysAdd = (a,b) =>{
      firestore()
      .collection('Friends').doc(value)
      .collection('FriendsAll').doc(a)
      .set({
      isim:b,
      tarih:firestore.FieldValue.serverTimestamp(),
      valueGonderen:a,
      valueAlan:value,
      type:'2',
      });
   }
  
   const HobbysDelete = (a) =>{
      firestore()
      .collection('Friends').doc(value)
      .collection('FriendsAll').doc(a)
      .delete()
   }

    return (
        <>
         <StatusBar barStyle="dark-content" />
          <SafeAreaView > 
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
              <View style={styles.container} >
                <View style={styles.containerTab} > 
                <Image source={require('../img/hobi.png')} style={styles.LogoPic}  />
                <Text style={styles.LogoDes} >Lütfen ilgi alanlarınızı seçiniz.</Text>
                </View>
                   <View>
                     <Text style={styles.InfoText} >İlgi alanlarınızı belirtmeniz sizlere doğru bilgiyi suna bilmemiz için önemli bir etkendir</Text>
                   </View>
                 <View>
                   <View style={{  flexDirection:'row'}} >
                   { teknoloji 
                   ?
                      <TouchableOpacity onPress={() => {setTeknoloji(!teknoloji); HobbysDelete('1001001001');}} style={styles.butonClas1b}>
                        <Text style={{color:'#f8f8f8', fontSize:17}}>Teknoloji  </Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setTeknoloji(!teknoloji); HobbysAdd('1001001001', 'Teknoloji');}} style={styles.butonClas1}>
                         <Text style={{color:'#118ab2', fontSize:17}}>Teknoloji</Text>
                      </TouchableOpacity> 
                   }
{ muzik 
                   ?
                      <TouchableOpacity onPress={() => {setMuzik(!muzik); HobbysDelete('1001001002');}} style={styles.butonClas2b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >Müzik</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setMuzik(!muzik); HobbysAdd('1001001002', 'Müzik');}}  style={styles.butonClas2} >
                         <Text style={{color:'#118ab2', fontSize:17}} >Müzik</Text>
                      </TouchableOpacity> 
                   }
{ sanat 
                   ?
                      <TouchableOpacity onPress={() => {setSanat(!sanat); HobbysDelete('1001001003');}} style={styles.butonClas3b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >Sanat</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setSanat(!sanat); HobbysAdd('1001001003', 'Sanat');}}  style={styles.butonClas3} >
                         <Text style={{color:'#118ab2', fontSize:17}} >Sanat</Text>
                      </TouchableOpacity> 
                   }
                   </View>
                   <View style={{  flexDirection:'row'}} >
                   { spor 
                   ?
                      <TouchableOpacity onPress={() => {setSpor(!spor); HobbysDelete('1001001004');}} style={styles.butonClas2b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >Spor</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setSpor(!spor); HobbysAdd('1001001004', 'Spor');}}  style={styles.butonClas2} >
                         <Text style={{color:'#118ab2', fontSize:17}} >Spor</Text>
                      </TouchableOpacity> 
                   }

{ uzay 
                   ?
                      <TouchableOpacity onPress={() => {setUzay(!uzay); HobbysDelete('1001001005');}} style={styles.butonClas3b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >Uzay</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setUzay(!uzay); HobbysAdd('1001001005', 'Uzay');}} style={styles.butonClas3} >
                         <Text style={{color:'#118ab2', fontSize:17}} >Uzay</Text>
                      </TouchableOpacity> 
                   }
{ edebiyat 
                   ?
                      <TouchableOpacity onPress={() => {setEdebiyat(!edebiyat); HobbysDelete('1001001006');}} style={styles.butonClas1b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >Edebiyat</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setEdebiyat(!edebiyat); HobbysAdd('1001001006', 'Edebiyat');}}  style={styles.butonClas1} >
                         <Text style={{color:'#118ab2', fontSize:17}} >Edebiyat</Text>
                      </TouchableOpacity> 
                   }
                  
                   </View>
    
                   <View style={{  flexDirection:'row'}} >
                   { tarih 
                   ?
                      <TouchableOpacity onPress={() => {setTarih(!tarih); HobbysDelete('1001001007');}} style={styles.butonClas3b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >Tarih</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setTarih(!tarih); HobbysAdd('1001001007', 'Tarih');}}  style={styles.butonClas3} >
                         <Text style={{color:'#118ab2', fontSize:17}} >Tarih</Text>
                      </TouchableOpacity> 
                   }

{ yazilim 
                   ?
                      <TouchableOpacity onPress={() => {setYazilim(!yazilim); HobbysDelete('1001001008');}} style={styles.butonClas1b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >Yazılım</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setYazilim(!yazilim); HobbysAdd('1001001008', 'Yazılım');}}  style={styles.butonClas1} >
                         <Text style={{color:'#118ab2', fontSize:17}} >Yazılım</Text>
                      </TouchableOpacity> 
                   }
{ felsefe 
                   ?
                      <TouchableOpacity onPress={() => {setFelsefe(!felsefe); HobbysDelete('1001001009');}} style={styles.butonClas2b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >Felfese</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setFelsefe(!felsefe); HobbysAdd('1001001009', 'Felsefe');}}  style={styles.butonClas2} >
                         <Text style={{color:'#118ab2', fontSize:17}} >Felsefe</Text>
                      </TouchableOpacity> 
                   }
                  
                   </View>

                   <View style={{  flexDirection:'row'}} >
                   { icatlar 
                   ?
                      <TouchableOpacity onPress={() => {setIcatlar(!icatlar); HobbysDelete('1001001010');}}style={styles.butonClas2b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >İcatlar</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setIcatlar(!icatlar); HobbysAdd('1001001010', 'İcatlar');}}  style={styles.butonClas2} >
                         <Text style={{color:'#118ab2', fontSize:17}} >İcatlar</Text>
                      </TouchableOpacity> 
                   }

{ psikoloji 
                   ?
                      <TouchableOpacity onPress={() => {setPsikoloji(!psikoloji); HobbysDelete('1001001011');}} style={styles.butonClas1b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >Psikoloji</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setPsikoloji(!psikoloji); HobbysAdd('1001001011', 'Psikoloji');}} style={styles.butonClas1} >
                         <Text style={{color:'#118ab2', fontSize:17}} >Psikoloji</Text>
                      </TouchableOpacity> 
                   }
{ saglik 
                   ?
                      <TouchableOpacity onPress={() => {setSaglik(!saglik); HobbysDelete('1001001012');}} style={styles.butonClas3b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >Sağlık</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setSaglik(!saglik); HobbysAdd('1001001012', 'Sağlık');}}  style={styles.butonClas3} >
                         <Text style={{color:'#118ab2', fontSize:17}} >Sağlık</Text>
                      </TouchableOpacity> 
                   }
                  
                   </View>

                   <View style={{  flexDirection:'row'}} >
                   { hobi 
                   ?
                      <TouchableOpacity onPress={() => {setHobi(!hobi); HobbysDelete('1001001013');}}style={styles.butonClas2b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >Hobi</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setHobi(!hobi); HobbysAdd('1001001013', 'Hobi');}}  style={styles.butonClas2} >
                         <Text style={{color:'#118ab2', fontSize:17}} >Hobi</Text>
                      </TouchableOpacity> 
                   }

{ biyoloji 
                   ?
                      <TouchableOpacity onPress={() => {setBiyoloji(!biyoloji); HobbysDelete('1001001014');}}style={styles.butonClas3b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >Biyoloji</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setBiyoloji(!biyoloji); HobbysAdd('1001001014', 'Biyoloji');}}  style={styles.butonClas3} >
                         <Text style={{color:'#118ab2', fontSize:17}} >Biyoloji</Text>
                      </TouchableOpacity> 
                   }
{ matematik 
                   ?
                      <TouchableOpacity onPress={() => {setMatematik(!matematik); HobbysDelete('1001001015');}} style={styles.butonClas1b} >
                         <Text style={{color:'#f8f8f8', fontSize:17}} >Matematik</Text>
                      </TouchableOpacity>
                   :
                      <TouchableOpacity onPress={() => {setMatematik(!matematik); HobbysAdd('1001001015', 'Matematik');}}  style={styles.butonClas1} >
                         <Text style={{color:'#118ab2', fontSize:17}} >Matematik</Text>
                      </TouchableOpacity> 
                   }
                   </View>
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
     backgroundColor:'#f8f8f8'
    },
   
   containerTab:{
      flexDirection:'column', 
      justifyContent:'center', 
      alignItems:'center', 
      marginTop:50 
   },

   LogoDes: {
      textAlign:'center',
      fontSize:17,
      color:'#118ab2',
      paddingVertical:20,
   },

   LogoPic:{
      height:100,
      width:100,
      marginBottom:0,
   },

   InfoText:{
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
    butonClas1b: {
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
    
    butonClas2b: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      alignItems: 'center',
      margin: 5,
      backgroundColor:'#118ab2',
      borderRadius: 10,
      width: 80,
      elevation:3,
      borderColor:'#118ab2',
      borderWidth:1,
      marginBottom:20,
    },
    
    butonClas3b: {
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

    butonClas1: {
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
    
    butonClas2: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      alignItems: 'center',
      margin: 5,
      backgroundColor:'#f8f8f8',
      borderRadius: 10,
      width: 80,
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
      backgroundColor:'#f8f8f8',
      borderRadius: 10,
      width: 100,
      elevation:3,
      borderColor:'#118ab2',
      borderWidth:1,
      marginBottom:20,
    },
    
    butonText: {
       color:'#fff', 
       fontSize:17
   },
    
    butonTextClas: {
      fontSize: 20,
      fontWeight:'400',
      color: '#118ab2'
    },
});
    
export default Hobbys;