import React, {useState, useEffect} from 'react';
import {StyleSheet, View,Text,} from 'react-native';
  const PostInfo = props => {
      return(
        <View>
          <Text 
            style={styles.container}>
              {props.sahipisim ? props.sahipisim : props.isim}{' '}  
              tarafından eklendi.
          </Text>
       </View>
      )
  }
const styles = StyleSheet.create({
  container: {
     fontSize:12,
     padding:5, 
     fontWeight:'400', 
     textAlign:'left', 
     color:'#333'
  },
});
export default PostInfo;