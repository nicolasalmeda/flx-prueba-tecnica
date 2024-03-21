import { AudioOutlined } from '@ant-design/icons';
import {Input,Space} from 'antd'
import React from 'react'
const {Search} = Input
const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
    );
const SearchBar = () => {
  return (
    <Space direction="vertical">
      <Search
        placeholder='Buscar usuario'
      />
    </Space>
  )
}

export default SearchBar