
import React, {useState, useEffect} from 'react';
import {StyleSheet,View,Dimensions,Image,TouchableOpacity,} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
  const DeleteModal = props => {
    return(
      <View style={styles.container} >
      <View style={styles.containerTab} >
          <TouchableOpacity onPress={props.oneItem}>
            <FontAwesome name='home' size={25} color={props.colorOne} />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.twoItem}  >
            <FontAwesome name='user-friends' size={25} color={props.colorTwo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.threeItem}  >
            <FontAwesome name='bell' size={30} color={props.colorThree} />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.fourthItem}  >
            <FontAwesome name='envelope' size={25} color={props.colorFourth}  />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.fiveItem}  >
          <Image source={require('../../img/profile.png')} style={{width:28,height:28}} />   
          </TouchableOpacity>                
      </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex:2,
      justifyContent:'center', 
      alignItems:'center', 
      elevation:1, 
      backgroundColor:'#f1f1f1' 
    },
    
    containerTab: { 
      width:Dimensions.get('screen').width, 
      flexDirection:'row', 
      justifyContent:'space-around', 
      alignItems:'center'
    },   
});
export default DeleteModal;