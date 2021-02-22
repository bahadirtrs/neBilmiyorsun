import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {StyleSheet,ScrollView,View,Text,StatusBar,Dimensions,TouchableOpacity,TextInput} from 'react-native';

const ProfileEditDesc= ({navigation,route}) => {
  const {value}=route.params;
  const {par}=route.params;
  const {box}=route.params;
  const [liste, setListe]=useState(par);
  const [isim, setIsim]=useState(liste.isim)
  const [mail, setMail]=useState(liste.mail)
  const [sehir, setSehir]=useState(liste.sehir)
  const [meslek, setMeslek]=useState(liste.meslek)
  const [cinsiyet, setCinsiyet]=useState(liste.cinsiyet)
  const [yas, setYas]=useState(liste.yas)
  const [bio, setBio]=useState(liste.bio)
  const [universite, setUniversite]=useState(liste.universite)
  const [universiteBolum, setUniversiteBolum]=useState(liste.universiteBolum)
  
  useEffect(() => {
    setIsim(liste.isim)
    setMail(liste.mail)
    setSehir(liste.sehir)
    setMeslek(liste.meslek)
    setCinsiyet(liste.cinsiyet)
    setYas(liste.yas)
    setUniversite(liste.universite)
    setUniversiteBolum(liste.universiteBolum)
    setBio(liste.bio)
  },[])

const Edit = () => {
    firestore()
        .collection('Users').doc(value)
        .update({
          isim:isim,
          mail:mail,
          sehir:sehir,
          meslek:meslek,
          cinsiyet:cinsiyet,
          yas:yas,
          universite:universite,
          universiteBolum:universiteBolum,
          bio:bio
        })
        .then(() => {
          navigation.navigate('Profili Düzenle', {value:value});
        });
    }
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.container} >
           {box=='isim' ?
             <View style={{ width:Dimensions.get('screen').width}}>
              <View style={{ margin:10,  }}>
                <View style={{padding:5}}>
                  <Text style={{color:'#555'}}>Adın ve Soyadın</Text>
                  <TextInput
                    style={{fontSize:16,paddingVertical:3,borderBottomWidth:1, borderBottomColor:'#e1e1e1' }}
                    placeholder={liste.isim}
                    value={isim}
                    onChangeText={(text) => {setIsim(text)}}
                    textAlignVertical='top'
                    multiline={true}
                    fontSize={16}
                    keyboardType='twitter'
                  />
                  </View>
                <View style={{ padding:5}} >
                  <Text style={{color:'#555'}} >Ad ve Soyadını girerken insanların seni nasıl tanıdığına dikkat ederek girmelisin. Diğer kullanıcılar seninle iletişime geçebilmek için bu ismi arayacaklardır. </Text>
                </View>
              </View>
            </View>
          :null
          }{
          box=='mail' ?
      <View style={{ width:Dimensions.get('screen').width}}>
        <View style={{ margin:10,  }}>
          <View style={{padding:5}}>
            <Text style={{color:'#555'}} >Mail Adresin</Text>
            <TextInput
              style={{fontSize:16,paddingVertical:3, width:380, borderBottomWidth:1, borderBottomColor:'#e1e1e1' }}
              placeholder={liste.mail}
              value={mail}
              onChangeText={(text) => {setMail(text)}}
              textAlignVertical='top'
              multiline={true}
              keyboardType='twitter'
            />
          </View>
          <View style={{ padding:5}} >
            <Text style={{color:'#555'}} >Telefonuna erişimin olmadığı zamanlarda yeni bir numara kaydedebilmek için lütfen kullandığın e-mail adresiniz gir. </Text>
          </View>
         </View>
        </View>
        :null
      }{
        box=='sehir' ?
        <View style={{ width:Dimensions.get('screen').width}}>
        <View style={{ margin:10,  }}>
          <View style={{padding:5}}>
            <Text style={{color:'#555'}} >Yaşadığın Şehir</Text>
          
          <TextInput
              style={{fontSize:16,paddingVertical:3, borderBottomWidth:1, borderBottomColor:'#e1e1e1' }}
              placeholder={liste.sehir}
              value={sehir}
              onChangeText={(text) => {setSehir(text)}}
              textAlignVertical='top'
              multiline={true}
              keyboardType='twitter'
            />
            </View>
          <View style={{ padding:5}} >
            <Text style={{color:'#555'}} >Çevrendeki etkinlikleri duyurabilmemiz için lütfen yaşamını sürdürdüğün şehri güncel tut. </Text>
          </View>
        </View>
        </View>
        :null
      }{
        box=='meslek' ?
        <View style={{ width:Dimensions.get('screen').width}}>
          <View style={{ margin:10,  }}>
            <View style={{padding:5}}>
              <Text style={{color:'#555'}} >Mesleğin</Text>
              <TextInput
                  style={{fontSize:16,paddingVertical:3,borderBottomWidth:1, borderBottomColor:'#e1e1e1' }}
                  placeholder={liste.meslek}
                  value={meslek}
                  onChangeText={(text) => {setMeslek(text)}}
                  textAlignVertical='top'
                  multiline={true}
                  keyboardType='twitter'
                />
              <View style={{padding:5}} >
                <Text style={{color:'#555'}} >Mesleğin ile ilgili konularda sana bilgi vermeyi çok istediğimiz için sana mesleğini soruyoruz. </Text>
              </View>
            </View>
          </View>
        </View>
        :null
      }{
        box=='cinsiyet' ?
        <View style={{ width:Dimensions.get('screen').width}}>
          <View style={{ margin:10,   }}>
            <View style={{padding:5}}>
              <Text style={{color:'#555'}}>Cinsiyetin</Text>
              <TextInput
                  style={{fontSize:16,paddingVertical:3, borderBottomWidth:1, borderBottomColor:'#e1e1e1' }}
                  placeholder={liste.cinsiyet}
                  value={cinsiyet}
                  onChangeText={(text) => {setCinsiyet(text)}}
                  textAlignVertical='top'
                  multiline={true}
                  keyboardType='twitter'
                />
            </View>
            <View style={{ padding:5}} >
              <Text style={{color:'#555'}} >İlgi alanlarını cinsiyetine göre sınıflandırma gibi bir fikrimiz de var. Bunun için biraz beklemelisin. </Text>
            </View>
          </View>
        </View>
        :null
      }{
        box=='yas' ?
        <View style={{ width:Dimensions.get('screen').width}}>
          <View style={{ margin:10,   }}>
            <View style={{padding:5}}>
            <Text style={{color:'#555'}} >Yaşın</Text>  
            <TextInput
                style={{fontSize:16,paddingVertical:3, borderBottomWidth:1, borderBottomColor:'#e1e1e1' }}
                placeholder={liste.yas}
                value={yas}
                onChangeText={(text) => {setYas(text)}}
                textAlignVertical='top'
                multiline={true}
                keyboardType='twitter'
              />
            </View>
            <View style={{ padding:5}} >
              <Text style={{color:'#555'}} >Yaşını bilirsek nelerin hoşuna gidebileceğini de biliriz. O yüzden yaşın çok önemli. Lütfen yaşını doğru yaz. </Text>
            </View>
         </View>
        </View>
        :null
      }{
        box=='universite' ?
        <View style={{ width:Dimensions.get('screen').width}}>
          <View style={{ margin:10,   }}>
            <View style={{padding:5}}>
            <Text style={{color:'#555'}} >Üniversiten</Text>
          
          <TextInput
              style={{fontSize:16,paddingVertical:5, borderBottomWidth:1, borderBottomColor:'#e1e1e1' }}
              placeholder={liste.universite}
              value={universite}
              onChangeText={(text) => {setUniversite(text)}}
              textAlignVertical='top'
              multiline={true}
              keyboardType='twitter'
            />
            </View>
          <View style={{ padding:5}} >
            <Text style={{color:'#555'}} >Seninle aynı üniversitede eğitim alan insanların profillerini sana göstermekten onur duyuyoruz. </Text>
          </View>
        </View>
        </View>
        :null
      }{
        box=='bolum' ?
        <View style={{ width:Dimensions.get('screen').width}}>
          <View style={{ margin:10,   }}>
            <View style={{padding:5}}>
              <Text style={{color:'#555'}} >Üniversite Bölümün</Text>
              <TextInput
                  style={{fontSize:16,paddingVertical:3, borderBottomWidth:1, borderBottomColor:'#e1e1e1' }}
                  placeholder={liste.universiteBolum}
                  value={universiteBolum}
                  onChangeText={(text) => {setUniversiteBolum(text)}}
                  textAlignVertical='top'
                  multiline={true}
                  keyboardType='twitter'
                />
              </View>
              <View style={{ padding:5}} >
                <Text style={{color:'#555'}} >Üniversitendeki bölümü bilmek, sana sunacağımız bilgilerin ilgi alanlarını hitap etmesini sağlayacaktır.  </Text>
              </View>
            </View>
          </View>
        :null
      }{
        box=='bio' ?
        <View style={{ width:Dimensions.get('screen').width}}>
          <View style={{ margin:10}}>
            <View style={{padding:5}}>
              <Text style={{color:'#555'}} >Biografi</Text>
              <TextInput
                  style={{fontSize:16,paddingVertical:3, borderBottomWidth:1, borderBottomColor:'#e1e1e1'  }}
                  placeholder={liste.bio}
                  value={bio}
                  onChangeText={(text) => {setBio(text)}}
                  textAlignVertical='top'
                  multiline={true}
                  keyboardType='twitter'
                />
              </View>
              <View style={{ padding:5}} >
                <Text style={{color:'#555'}} >Diğer kullanıcılar seni buraya bakarak tanıyacaklardır. </Text>
              </View>
            </View>
          </View>
        :null
      }
          <View style={{ width:Dimensions.get('screen').width, justifyContent:'center', alignItems:'center'}} >  
            <TouchableOpacity  onPress={() => Edit()} style={styles.buton} >
              <Text style={{fontSize:16, color:'#f8f8f8'}}>Kaydet</Text>                  
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
     backgroundColor:'#f8f8f8',
      
    },
    
    Logo: {
      fontSize:42,
      fontWeight:'600',
      color:'#118ab2',
      textAlign:'center'
    },

    LogoPic:{
      height:80,
      width:80,
      marginBottom:0, 
    },
    
    ok: {
      width: 300,
      height: 250,
      marginVertical:50,
    },
    
    LogoDes: {
      textAlign:'center',
      fontSize:15,
      color:'#118ab2',
      paddingBottom:20,
      paddingTop:10
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
       
    },
    
    butonText: {
      fontSize: 20,
      fontWeight:'400',
      color: '#fff'
    },
    
    });
    
    export default ProfileEditDesc;
