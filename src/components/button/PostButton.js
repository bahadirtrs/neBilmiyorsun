import React, {useState, useEffect} from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
    const PostButton = props => {   
        return(
        <View>
        <TouchableOpacity onPress={props.onclick}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <FontAwesome name={props.icon} size={20} color="#118ab2"  />
                {
                props.yorumsayisi!=null ?
                <Text style={{fontSize:12, paddingHorizontal:5, fontWeight:'500', color:'#118ab2'}} >{props.name}({props.yorumsayisi})</Text>
                    :
                <Text style={{fontSize:12, paddingHorizontal:5, fontWeight:'500', color:'#118ab2'}} >{props.name}</Text>
                } 
                </View>
            </TouchableOpacity>
        </View>
        )
    }
export default PostButton;