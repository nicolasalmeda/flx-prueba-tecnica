import React, {useState} from 'react'
import {Button, Select} from 'antd'
import SearchBar from './SearchBar';
import '../css/inputContainer.css'
import UserFormModal from './UserFormModal';

const InputsContainer = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleAddUserClick = () => {
    setModalVisible(true)
  }

  const handleModalCancel = () => {
    setModalVisible(false)
  };

  const handleModalCreate = (values) => {
    console.log('Received values of form: ', values);
    setModalVisible(false)
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  return (
    <div className='input__container'>
      <p>Usuarios  /  <strong>Listado de Usuarios</strong></p>
      <div className='input__container--container'>
        <div className='input__container--inputs'>
          <SearchBar />
          <Select 
            // defaultValue="active"
            placeholder="Filtrar por estado"
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              {value: 'active', label: 'Activos'},
              {value: 'inactive', label: 'Inactivos'}
            ]}
            allowClear
            />
        </div>
        <Button type='primary' onClick={handleAddUserClick}>Agregar Usuario</Button>
      </div>
            <UserFormModal 
              open={modalVisible}
              onCreate={handleModalCreate}
              onCancel={handleModalCancel}
              isEdit={false}
            />
    </div>
  )
}

export default InputsContainer