import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select, notification, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';
import { postUser, putUser,getAllUsers } from '../Redux/actions/actions';
import { SmileOutlined, MehOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const UserFormModal = ({ open, onCancel, isEdit, initialValues}) => {
  const [form] = Form.useForm(); // Aquí se crea la instancia de formulario
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [submitText, setSubmitText] = useState('');

  const validateMessages = {
    required: 'El campo es obligatorio!',
    types: {
      email: 'No es un email válido!',
      number: 'No es un número válido!',
    },
    number: {
      range: 'El campo debe estar entre ${min} and ${max}',
    },
  };

  const validateAge = (rule, value) => {
    if (value && (isNaN(value) || value < 18 || value > 99)) {
      return Promise.reject('La edad debe ser un número entre 18 y 99.');
    }
    return Promise.resolve();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle('Editar usuario');
      setSubmitText('Actualizar Usuario');
      form.setFieldsValue(initialValues);
    } else {
      setTitle('Crear usuario');
      setSubmitText('Crear Usuario');
      form.resetFields();
    }
  }, [isEdit, form, initialValues]);

  const onFinish = async (values) => {
    try{
      if (!isEdit) {
        await dispatch(postUser({ ...values, id: uuidv4(), age: parseInt(values.age) }));
        openNotification(' Usuario creado',true);
      } else {
        await dispatch(putUser(initialValues.id, { ...values, age: parseInt(values.age) }));
        openNotification('Usuario actualizado',true);
      }
      await finish();
    } catch(err){
      openNotification( 'Hubo un problema',false);
    }
  };

  const finish =  () => {  
    onCancel();
    dispatch(getAllUsers());
  }

  const openNotification = ( message, icon) => {
    notification.success({
      message: `${message}!`,
      description:
      `El ${message} correctamente`,
      icon: (
        icon ? <SmileOutlined
          style={{
            color: '#00dc00',
          }} /> : 
          <MehOutlined
          style={{
            color: '#ff0000',
          }}
        />
      ),
    });
  };

  return (
    <Modal
      open={open}
      title={title}
      okText={submitText}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name="username" label="Usuario" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="lastname" label="Apellido" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Estado" rules={[{ required: true }]}>
          <Select>
            <Option value="active">Activo</Option>
            <Option value="inactive">Inactivo</Option>
          </Select>
        </Form.Item>
        <Form.Item name="age" label="Edad"  rules={[
          { required: true, message: 'Por favor ingresa la edad.' },
          { type: 'number', message: 'La edad debe ser un número.' },
          { validator: validateAge }
        ]}>
          <InputNumber min={18} max={99} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {submitText}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;