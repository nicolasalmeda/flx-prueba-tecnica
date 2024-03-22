import {Input,Space} from 'antd'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { searchUsers } from '../Redux/actions/actions'
const {Search} = Input

const SearchBar = () => {
  const dispatch = useDispatch()
  const [name,setName] = useState('')

  const handleInputChange = (e) => {
    setName(e.target.value)
  }

  const handleSearch = () => {
    dispatch(searchUsers(name))
  }
  return (
    <Space direction="vertical">
      <Search
        placeholder='Buscar usuario'
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
    </Space>
  )
}

export default SearchBar