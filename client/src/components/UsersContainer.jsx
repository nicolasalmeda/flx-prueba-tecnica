import React, { useState } from 'react'
import {Space, Table, Tag, Button, Modal} from 'antd'
import UserFormModal from './UserFormModal'


const UsersContainer = () => {
  const [modalVisible,setModalVisible] = useState(false)
  const [userData,setUserData] = useState(null)
  const data = [];

for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    username: `John Brown ${i}`,
    name: `Edward King ${i}`,
    lastname: `Edward Rey ${i}`,
    status: i % 2 === 0 ? 'activo' : 'inactivo',
  });
}

const Columns = [
  { 
    title: 'Usuario',
    dataIndex: 'username',
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
  },
  {
    title: 'Apellido',
    dataIndex: 'lastname',
  },
  {
    title: 'Etado',
    dataIndex: 'status',
    render: (status) => (
      <Tag color={status === 'activo' ? 'green' : 'red'}>{status}</Tag>
    )
    },
  {
    title: 'Acciones',
    dataIndex: 'Acciones',
    render: (text, record) => (
      <Space size="small">
        <Button type='primary' 
        ghost
        onClick={() =>showModal(record)}
        >
          Editar
        </Button>
        <Button
          danger
          onClick={() => {
            Modal.confirm({
              title: 'Eliminar usuario',
              content: '¿Está seguro que quiere eliminar el usuario?',
              okText: 'Eliminar',
              okType: 'danger',
              onOk() {
                console.log('OK');
              },
              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn type="primary" danger >Eliminar</OkBtn>
                </>
              ),
            });
          }}
        >
          Eliminar
        </Button>
      </Space>
    )
  }
]

const showModal = (record) =>{
  setUserData(record)
  setModalVisible(true)
}


const handleCancel = () =>{
  setModalVisible(false)
}

  return (
    <div className='main__container'>
      <Table 
        columns={Columns} 
        dataSource={data}
        responsive
        bordered
        size='middle'
        scroll={{
          x: 1000,
        }}
      />
      <UserFormModal 
        open={modalVisible}
        initialValues={userData}
        onCancel={handleCancel}
        isEdit={true}
      />
    </div>
  )
}

export default UsersContainer