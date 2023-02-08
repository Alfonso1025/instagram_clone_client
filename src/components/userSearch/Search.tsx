import {View, Text, TextInput, StyleSheet} from 'react-native'
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
            <View>
                <TextInput placeholder='search'
                            onChangeText={(value)=>{setCharToSearch(value)}}
                            value = {charToSearch}
                            style = {styles.textInput}/>
            </View>
    )
}

export default Search