import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const UserFormModal = ({ open, onCreate, onCancel, isEdit, initialValues }) => {
  const [form] = Form.useForm(); // Aquí se crea la instancia de formulario

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

  const onFinish = (values) => {
    if (!isEdit) {
      onCreate({ ...values, id: uuidv4(), age: parseInt(values.age) });
    } else {
      onCreate(values);
    }
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
            <Option value="activo">Activo</Option>
            <Option value="inactivo">Inactivo</Option>
          </Select>
        </Form.Item>
        <Form.Item name="age" label="Edad" rules={[{ required: true, validator: validateAge, }]}>
          <Input type="number" />
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