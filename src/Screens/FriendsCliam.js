import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,Dimensions,Image,TouchableOpacity,FlatList} from 'react-native';
  
const FriendsCliam= ({route, navigation}) => {
  const {value} = route.params;
  const [allClaim, setAllClaim]=useState()
  const [allFriends, setAllFriends]=useState([])

  useEffect(() => {
    const subscriber = firestore()
    .collection('Friends').doc(value)
    .collection('FriendsAll')
    .where('valueAlan', '==', value)
      .onSnapshot(querySnapshot => {
        const user = [];
        querySnapshot.forEach(documentSnapshot => {
          user.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setAllFriends(user);
      });
    }, [])

    useEffect(() => {
      const subscriber = firestore()
      .collection('Friends').doc(value)
      .collection('FriendsAdd')
      .where('valueAlan', '==', value)
        .onSnapshot(querySnapshot => {
          const user = [];
          querySnapshot.forEach(documentSnapshot => {
            user.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setAllClaim(user);
          console.log(allClaim)
        });
    
    }, [])

    const FriendsAdd = (isim,gonderenIsim, valueAlan, valueGonderen) =>{
      firestore()
       .collection('Friends').doc(valueGonderen)
       .collection('FriendsAll').doc(valueAlan)
       .set({
         isim:gonderenIsim,
         tarih:firestore.FieldValue.serverTimestamp(),
         valueGonderen:valueAlan,
         valueAlan:valueGonderen,
       })

       firestore()
       .collection('Friends').doc(valueAlan)
       .collection('FriendsAll').doc(valueGonderen)
       .set({
         isim:isim,
         tarih:firestore.FieldValue.serverTimestamp(),
         valueGonderen:valueGonderen,
         valueAlan:valueAlan,
       })

       firestore()
       .collection('Notification').doc(valueGonderen)
       .collection('AllNotification').doc()
       .set({
        isim:gonderenIsim,
        telefon:value,
        type:'arkadas',
        tarih:firestore.FieldValue.serverTimestamp(),
       })

      firestore()
      .collection('Friends').doc(valueAlan)
      .collection('FriendsAdd').doc(valueGonderen)
      .delete()
      .then(() => {
       console.log('Arkadaş isteği silindi');    
      });
    }

    const FriendsDelete = (isim, valueAlan, valueGonderen) =>{
      firestore()
      .collection('Friends').doc(valueAlan)
      .collection('FriendsAdd').doc(valueGonderen)
      .delete()
      .then(() => {});
    }

    const FriendsDeleteExp = (isim, valueAlan, valueGonderen) =>{
      firestore()
      .collection('Friends').doc(valueAlan)
      .collection('FriendsAll').doc(valueGonderen)
      .delete()
      .then(() => {
        console.log('Arkadaş silindi');    
      });

      firestore()
      .collection('Friends').doc(valueGonderen)
      .collection('FriendsAll').doc(valueAlan)
      .delete()
      .then(() => {});
      }
      return (
          <>
          <StatusBar barStyle="dark-content" />
            <SafeAreaView> 
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
              <View style={styles.container} >
              {allClaim && !allClaim[0]=='' 
                ?<FlatList
                    data={allClaim}
                    renderItem={({ item }) => (
                      <View>
                        <View style={{ width:Dimensions.get('screen').width, flexDirection:'row', justifyContent:'space-around', alignItems:'center', paddingVertical:20}} >
                          <Text style={{fontSize:18, padding:2, fontWeight:'500',minWidth:'50%' ,}}  >{item.isim}  </Text> 
                          <TouchableOpacity onPress={()=>FriendsAdd(item.isim, item.gonderenIsim, item.valueAlan, item.valueGonderen)} style={styles.buton} >
                            <Text style={{fontSize:14,  color:'#f8f8f8'}}>Kabul Et</Text>                  
                          </TouchableOpacity> 
                          <TouchableOpacity onPress={()=>FriendsDelete(item.isim, item.valueAlan, item.valueGonderen)} style={styles.butonExp} >
                            <Text style={{fontSize:14,  color:'#f8f8f8'}}>Yoksay</Text>                  
                          </TouchableOpacity> 
                        </View>
                      </View>
                      )}
                    />  
                  : <View style={{ width:'100%',paddingVertical:20, flexDirection:'column', justifyContent:'center', alignItems:'center' }} >
                      <FontAwesome name='grin-beam-sweat' size={80} color="#118ab2" />
                      <Text style={{fontSize:20, paddingVertical:20, fontWeight:'600', color:'#118ab2'}} > Hiç arkadaşlık isteği görünmüyor</Text>
                    </View>
                }
                    <View style={{ width:Dimensions.get('screen').width, flexDirection:'row', justifyContent:'center', alignItems:'center', padding:8, marginBottom:10, backgroundColor:'#118ab2'}} >
                      <Text style={{fontSize:20, fontWeight:'600', color:'#f8f8f8'}} >Tüm Arkadaşlar</Text>
                    </View>
                    <FlatList
                      data={allFriends}
                      renderItem={({ item }) => (
                        <View >
                          <View style={{ width:Dimensions.get('screen').width,flexDirection:'row', justifyContent:'space-between', alignItems:'center',  padding:10, borderBottomColor:'#ddd', borderBottomWidth:1}} >
                            <View style={{  flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}} >
                                <Image source={require('../img/profile.png')} style={styles.profilePic} />   
                                <TouchableOpacity onPress={() => navigation.navigate('Search', {value:item.valueAlan, misafir:item.valueGonderen})}   >
                                  <Text style={{fontSize:18, paddingLeft:10, fontWeight:'500',minWidth:'40%' ,}}  >{item.isim}  </Text> 
                                </TouchableOpacity> 
                            </View>
                              {item.type=="2" 
                               ?<TouchableOpacity onPress={() => navigation.push('Hobiler' , {value:value, res:'3'})}  style={styles.butonDelete} >
                                  <Text style={{fontSize:14, fontWeight:'bold', color:'#f8f8f8'}}>Düzenle</Text>       
                                </TouchableOpacity> 
                              : <TouchableOpacity onPress={()=>FriendsDeleteExp(item.isim, item.valueAlan, item.valueGonderen)} style={styles.butonDelete} >
                                  <Text style={{fontSize:14, fontWeight:'bold', color:'#f8f8f8'}}>Çıkar</Text>       
                                </TouchableOpacity>       
                              }
                          </View>
                         </View>
                      )}
                  />  
              </View>
            </ScrollView>
          </SafeAreaView>
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
    

    profilePic:{
      height:35,
      width:35,
      borderRadius:20,
      
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
      paddingHorizontal: 5,
      paddingVertical: 7,
      alignItems: 'center',
      backgroundColor:'#1f9376',
      borderRadius: 10,
      width: 70,
      elevation:3,
      borderColor:'#dddddd50',
      borderWidth:1,
    },

    butonExp: {
      paddingHorizontal: 5,
      paddingVertical: 7,
      alignItems: 'center',
      backgroundColor:'#cc3333',
      borderRadius: 10,
      width: 70,
      elevation:3,
      borderColor:'#dddddd50',
      borderWidth:1,
    },

    butonDelete: {
      paddingHorizontal: 5,
      paddingVertical: 7,
      alignItems: 'center',
      backgroundColor:'#118ab2',
      borderRadius: 10,
      width: 100,
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
      fontSize: 14,
      fontWeight:'400',
      color: '#fff'
    },
    
    });
    
    export default FriendsCliam;