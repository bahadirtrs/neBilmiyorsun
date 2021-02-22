import React, {useState, useEffect} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
  
  const CategoryButton = props => {

    
      return(
          <View>
            {props.value==props.item.telefon 
        ?   <TouchableOpacity onPress={props.click}  style={{backgroundColor:'#f8f8f8', padding:5, borderRadius:7}} >
              <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <FontAwesome name={props.icon} size={22} color="#118ab2" />
              </View>
            </TouchableOpacity>
        :   <TouchableOpacity style={{backgroundColor:'#118ab2', padding:5, borderRadius:7}} >
              <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:12, fontWeight:'bold', color:'white'}} >{props.item.kategori}</Text>
              </View>
            </TouchableOpacity>
            } 
          </View>
      )
  }
export default CategoryButton;