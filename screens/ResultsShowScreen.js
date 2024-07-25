import { FlatList, StyleSheet, Text, View, Image  } from 'react-native'
import React, { useEffect, useState } from 'react'
import yelp from '../api/yelp';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function ResultsShowScreen({route}) {
    const [result,setResult] = useState(null);
    const id = route.params.id;

    const getResult = async (id) =>{
       const response = await yelp.get(`/${id}`)
       setResult(response.data);
    }
    useEffect(()=>{
     getResult(id);
    },[])
    if(!result){
        return null;
    }
  return (
    <View>
      <Text style={styles.title}>{result.name}</Text>
      <Text style={styles.phone}>{result.phone}</Text>
      <View style={styles.icon}>
      {
        result.is_closed ?   (<AntDesign name="closecircleo" size={30} color="black" /> ): (<MaterialIcons name="delivery-dining" size={30} color="black" />)

      }
      </View>
     

      
      {/* <FlatList
       data={result.image_url}
       renderItem={({item}) =>{
         return <Image style={{width:50,height:50}} source={{uri : item}}/>
      }}
      />  */}
      <Image source={{ uri: result.image_url}} style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({
  image:{
    height:180,
    margin:10,
    borderRadius:20,
  },
  title:{
   alignSelf:'center',
   fontSize:25,
   marginVertical:10,
  },
  phone:{
    alignSelf:'center', 
    fontSize:20,
  },
  icon: {
    alignSelf:'center'
  }
})