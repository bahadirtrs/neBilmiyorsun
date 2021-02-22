import React, {useState, useEffect} from 'react';
import {StyleSheet,View,Text,Image, TouchableOpacity} from 'react-native';
import 'moment/locale/tr'  
import moment from 'moment'
moment.locale('tr')
const NofiTech = props => {
  return(
  <View style={{flex:1, flexDirection:'row', paddingHorizontal:20, paddingVertical:10, borderBottomWidth:1 , borderBottomColor:'#ccc'}} >
    <View style={{ width:'15%'}} >
      <Image source={require('../../img/profile.png')} style={styles.profilePic} />   
    </View>
    <View style={{  width:'85%', flexDirection:'row', justifyContent:'center', alignItems:'flex-start', flexDirection:'column'}}>
      <TouchableOpacity onPress={props.butonPress} >
        <View style={{flexDirection:'row', justifyContent:'flex-start'}} >
          <Text style={{fontSize:16}} ><Text style={{fontWeight:'bold'}}>{props.isim}</Text>  arkadaşlık isteğini kabul etti.</Text>
        </View>
        <Text style={{textAlign:'left',fontWeight:'500', fontSize:12, }} >{props.tarih && moment(props.tarih.toDate()).format('LLLL')}</Text>
      </TouchableOpacity> 
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingBottom:10, 
    paddingLeft:5, 
    borderBottomWidth:1, 
    borderBottomColor:'#ddd'
  },

  profilePic:{
    height:40,
    width:40,
    borderRadius:20,
  }
});
export default NofiTech;