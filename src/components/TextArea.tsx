
import {View, Text, Button,Image, TextInput} from 'react-native'

interface Props{
    content : string
    setContent :  React.Dispatch<React.SetStateAction<string>>
    fetchFunction() :  void
}
const TextArea: React.FC <Props>  = (props)=>{
    //props
    const content= props.content
    const setContent = props.setContent
    const fetchFunction = props.fetchFunction
 
     //local state
     
   
  
  return(
     
    <View>
    <TextInput  multiline={true}
                numberOfLines={5}
                onChangeText = {(value)=>{setContent(value)}}
                value = {content}
                
                />
    <Button title='Send' onPress={fetchFunction}/>
</View>
           
   )
  
 }
 
 export default TextArea