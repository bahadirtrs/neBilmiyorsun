
import React, {useState, useEffect} from 'react';
import { StyleSheet, View,Text,Image,TouchableOpacity} from 'react-native';
  const postProfile = props => {
      return(
      <TouchableOpacity onPress={ props.value!=props.telefon ? props.click : null}  >
        <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',}} >
          <Image source={require('../../img/profile.png')} style={styles.profilePic} />   
          <View style={{flexDirection:'column', justifyContent:'center', alignItems:'flex-start', paddingHorizontal:10}}>                   
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
              <Text style={{fontSize:18,paddingTop:3, fontWeight:'bold', color:'#444'}} >{props.isim} </Text>
              <Text style={{fontSize:12,paddingTop:3, fontWeight:'400', color:'#444'}} >{props.username}</Text>                                     
            </View>        
            <Text style={{fontSize:12, paddingTop:3, fontWeight:'400'}} >{props.time} </Text>    
          </View>
        </View> 
      </TouchableOpacity>
      )
  }
const styles = StyleSheet.create({
  profilePic:{
    height:50,
    width:50,
    borderRadius:30,
  }, 
});
export default postProfile;