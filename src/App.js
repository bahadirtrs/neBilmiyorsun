import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import Number from './Screens/Number'; 
import SingUp from './Screens/SingUp';
import NumberApprove from './Screens/NumberApprove';
import AccountApprove from './Screens/AccountApprove';
import Hobbys from './Screens/Hobbys';
import HobbyFilter from './Screens/HobiFilter';
import Control from './Screens/Control';
import ProfilePage from './Screens/ProfilePage';
import Search from'./Screens/Search.js';
import ProfileEdit from './Screens/ProfileEdit';
import ProfileEditDesc from './Screens/ProfileEditDesc';
import FriendsCliam from './Screens/FriendsCliam';
import Homepage from './Screens/Homepage';
import Messages from './Screens/Messages';
import Bildirimler from './Screens/Bildirimler';
import PostDetails from './Screens/PostDetails';
import OutIn from './Screens/outIn';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
export default function App() {
  const [isFirstLauncher, setIsFirstLauncher]= useState(null);
  
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value =>{
      if(value==null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLauncher(true);
      } else {
        setIsFirstLauncher(false)
      }
    });
  }, []);

  if(isFirstLauncher== null){
    return null;
  } else if( isFirstLauncher== true ){
    return (
      <NavigationContainer>
      <StatusBar hidden={true} barStyle="dark-content" backgroundColor="#f1f1f1" />
      <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="OutIn" component={OutIn} />
         <Stack.Screen options={{headerShown: false}} name="Numara Gir" component={Number} />
         <Stack.Screen name="Kontrol" component={Control} />
         <Stack.Screen name="Kayıt Ol" component={SingUp} />
         <Stack.Screen name="Numarayı Onayla" component={NumberApprove} />
         <Stack.Screen name="Hesabı Onayla" component={AccountApprove} />
         <Stack.Screen name="Hobiler" component={Hobbys} />
         <Stack.Screen name="İlgi Alanı" component={HobbyFilter} />
         <Stack.Screen options={{headerShown: false}} name="Profil" component={ProfilePage} />
         <Stack.Screen  name="Search" component={Search} />
         <Stack.Screen  name="Profili Düzenle" component={ProfileEdit} />
         <Stack.Screen  name="Bilgi Düzenle" component={ProfileEditDesc} />
         <Stack.Screen  name="Arkadaşlık İstekleri" component={FriendsCliam} />
         <Stack.Screen  name="Mesajlar" component={Messages} />
         <Stack.Screen  options={{headerShown: false}} name="Bildirimler" component={Bildirimler} />
         <Stack.Screen  options={{headerShown: false}}  name="Anasayfa" component={Homepage} />
       </Stack.Navigator>
    </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <StatusBar hidden={false} barStyle="dark-content" backgroundColor="#fff" />
        <Stack.Navigator >  
        <Stack.Screen options={{headerShown: false}} name="OutIn" component={OutIn} />
          <Stack.Screen options={{headerShown: false}} name="Numara Gir" component={Number} />
          <Stack.Screen name="Kontrol" component={Control} />
          <Stack.Screen  name="Mesajlar" component={Messages} />
          <Stack.Screen name="Kayıt Ol" component={SingUp} />
          <Stack.Screen name="Numarayı Onayla" component={NumberApprove} />
          <Stack.Screen name="Detaylar" component={PostDetails} />
          <Stack.Screen name="Hesabı Onayla" component={AccountApprove} />
          <Stack.Screen name="Hobiler" component={Hobbys} />
          <Stack.Screen name="İlgi Alanı" component={HobbyFilter} />
          <Stack.Screen options={{headerShown: false}} name="Profil" component={ProfilePage} />
          <Stack.Screen options={{headerShown: false}}  name="Search" component={Search} />
          <Stack.Screen  name="Profili Düzenle" component={ProfileEdit} />
          <Stack.Screen  name="Bilgi Düzenle" component={ProfileEditDesc} />
          <Stack.Screen  name="Arkadaşlık İstekleri" component={FriendsCliam} />
          <Stack.Screen  options={{headerShown: false}} name="Bildirimler" component={Bildirimler} />
          <Stack.Screen  options={{headerShown: false}}  name="Anasayfa" component={Homepage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

