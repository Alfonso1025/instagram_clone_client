
import {View, Text, TouchableOpacity,Image, TextInput} from 'react-native'
import { commentStyles } from './Styles'
interface Props{
    content : string
    setContent :  React.Dispatch<React.SetStateAction<string>>
    placeHolder : string
    fetchFunction() :  void
}
const TextArea: React.FC <Props>  = (props)=>{
    //props
    const content= props.content
    const setContent = props.setContent
    const fetchFunction = props.fetchFunction
    const placeHolder = props.placeHolder
 
     //local state
     
   
  
  return(
     
    <View style={commentStyles.textAreaMainContainer}>
      <TextInput  placeholder={placeHolder}
               multiline={true}
                numberOfLines={5}
                onChangeText = {(value)=>{setContent(value)}}
                value = {content}
                style = {commentStyles.textAreaInput}
                />
      <TouchableOpacity onPress={fetchFunction}><Text>Post</Text></TouchableOpacity>
    
    </View>
           
   )
  
 }
 
 export default TextArea