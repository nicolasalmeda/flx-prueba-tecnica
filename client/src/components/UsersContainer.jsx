import React, { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getAllUsers,deleteUser } from '../Redux/actions/actions'
import {Space, Table, Tag, Button, Modal, notification} from 'antd'
import { SmileOutlined } from '@ant-design/icons';
import UserFormModal from './UserFormModal'
import { get } from '../utils/request';


const UsersContainer = () => {
  const dispatch = useDispatch()
  const [modalVisible,setModalVisible] = useState(false)
  const [userData,setUserData] = useState(null)
  const users = useSelector(state => state.users)

  //agregar la key a cada elemento de la lista
  const mappedUsers = users.map(user => ({
    ...user,
    key: user.id
  }));

useEffect(() => {
  dispatch(getAllUsers())
}, [dispatch])



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
      <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
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
              content: `¿Está seguro que quiere eliminar el usuario ${record.username}?`,
              okText: 'Eliminar',
              okType: 'danger',
              onOk() {
                dispatch(deleteUser(record.id))
                openNotification(record.username)
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

const openNotification = (username) => {
  notification.success({
    message: 'Usuario Eliminado',
    description:
    `El usuario ${username} ha sido eliminado correctamente`,
    icon: (
      <SmileOutlined
        style={{
          color: '#00dc00',
        }}
      />
    ),
  });
};

  return (
    <div className='main__container'>
      <Table 
        columns={Columns} 
        dataSource={mappedUsers}
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