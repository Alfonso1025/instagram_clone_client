import {View, Text, TextInput, StyleSheet} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { searchStyles } from './Styles';
interface Props{
    setCharToSearch :  React.Dispatch<React.SetStateAction<string>>
    charToSearch : string
}
const styles = StyleSheet.create({
    textInput : {
        height :40,
        backgroundColor : 'grey'

    }
})
const Search : React.FC  <Props> = (props)=>{
    //props
    const setCharToSearch = props.setCharToSearch
    const charToSearch = props.charToSearch
    return(
            <View style={searchStyles.searchMainContainer}>
                <EvilIcons name="search" size={24} color="black" />
                <TextInput placeholder='search'
                            onChangeText={(value)=>{setCharToSearch(value)}}
                            value = {charToSearch}
                            style = {searchStyles.input}/>
            </View>
    )
}

export default Search