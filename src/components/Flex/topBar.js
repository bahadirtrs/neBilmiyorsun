import React, {useState, useEffect} from 'react';
import {StyleSheet,View,Text,Dimensions,TouchableOpacity,TouchableHighlight} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const TopBar = props => {
  return(
      <View style={styles.container} >
      <View style={styles.containerTab} >
        <TouchableHighlight onPress={props.modalVisible}>
          <FontAwesome name='feather-alt' size={30} color="#118ab2"  />
        </TouchableHighlight>
        <Text style={{fontWeight:'bold', fontSize:20, color:'#118ab2'}} >neBilmiyorsun?</Text>
        <TouchableOpacity onPress={props.Reflesh}  >
          <FontAwesome name='search' size={25} color="#118ab2"  />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex:2,
      justifyContent:'center', 
      alignItems:'flex-start', 
    },
    
    containerTab:{ 
      flexDirection:'row', 
      width:Dimensions.get('window').width, 
      justifyContent:'space-between', 
      alignItems:'center', 
      paddingHorizontal:20, 
      paddingVertical:10,
      elevation:1
    },    
});
export default TopBar;