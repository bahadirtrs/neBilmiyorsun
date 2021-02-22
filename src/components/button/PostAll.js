import React, {useState, useEffect} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PostAll = props => {
  return(
    <View style={styles.container} >
      <TouchableOpacity onPress={props.butonPress} >
        <Text style={styles.textIn}>{props.post}</Text>
      </TouchableOpacity>
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
    textIn: {
      fontSize:24, 
      fontWeight:'300', 
      textAlign:'left', 
      color:'#333'}
    });
export default PostAll;