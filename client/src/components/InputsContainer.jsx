import React, {useState} from 'react'
import {Button, Select} from 'antd'
import SearchBar from './SearchBar';
import { useDispatch } from 'react-redux';
import { filterByStatus } from '../Redux/actions/actions';
import '../css/inputContainer.css'
import UserFormModal from './UserFormModal';

const InputsContainer = () => {
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)

  const handleAddUserClick = () => {
    setModalVisible(true)
  }

  const handleModalCancel = () => {
    setModalVisible(false)
  };


  const handleChange = (value) => {
    dispatch(filterByStatus(value))
    console.log(`selected ${value}`);
  }
  return (
    <div className='input__container'>
      <p className='nav'>Usuarios  /  <strong>Listado de Usuarios</strong></p>
      <div className='input__container--container'>
        <div className='input__container--inputs'>
          <SearchBar />
          <Select 
            placeholder="Filtrar por estado"
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              {value: 'active', label: 'Activos'},
              {value: 'inactive', label: 'Inactivos'},
              {value: 'all', label: 'Todos'}
            ]}
            allowClear
            />
        </div>
        <Button type='primary' onClick={handleAddUserClick}>Agregar Usuario</Button>
      </div>
            <UserFormModal 
              open={modalVisible}
              onCancel={handleModalCancel}
              isEdit={false}
            />
    </div>
  )
}

export default InputsContainer