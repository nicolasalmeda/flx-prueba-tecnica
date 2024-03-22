import React, { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getAllUsers,deleteUser } from '../Redux/actions/actions'
import {Space, Table, Tag, Button, Modal, notification} from 'antd'
import { SmileOutlined } from '@ant-design/icons';
import UserFormModal from './UserFormModal'
import PaginationLimitOffset from './PaginationLimitOffset';


const UsersContainer = () => {
  const dispatch = useDispatch()
  const [modalVisible,setModalVisible] = useState(false)
  const [userData,setUserData] = useState(null)
  const users = useSelector(state => state.users)
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  //agregar la key a cada elemento de la lista
  const mappedUsers = currentUsers.map(user => ({
    ...user,
    key: user.id
  }));

useEffect(() => {
  dispatch(getAllUsers());
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
    ),
    width: 150,
    align: 'center',
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
                setCurrentPage(1)
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
    ),
    width: 150,
  }
]

const showModal = (record) =>{
  setUserData(record)
  setModalVisible(true)
}


const handleCancel = () =>{
  setModalVisible(false)
}

const handlePageChange = (page) => {
  setCurrentPage(page);
};

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
        className='table__container'
        columns={Columns} 
        dataSource={mappedUsers}
        responsive
        bordered
        size='middle'
        scroll={{
          x: 1000,
        }}
        pagination={false}
      />
      <UserFormModal 
        open={modalVisible}
        initialValues={userData}
        onCancel={handleCancel}
        isEdit={true}
      />
      <PaginationLimitOffset
        currentPage={currentPage}
        pageSize={usersPerPage}
        total={users.length}
        onChange={handlePageChange}
      />
    </div>
  )
}

export default UsersContainer