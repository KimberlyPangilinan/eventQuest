import React,{useState} from 'react'
import { TextInput } from 'react-native';
const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
  return (
    <TextInput
  placeholder="Search events"
  value={searchQuery}
  onChangeText={text => setSearchQuery(text)}

/>

  )
}

export default SearchBar
