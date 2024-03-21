import {Layout} from 'antd'
import React from 'react'


const {Header, Footer, Sider, Content } = Layout;

import './App.css'
import UsersContainer from './components/UsersContainer';
import Head from './components/Head';
import InputsContainer from './components/InputsContainer';

const App = () => {

  return (
    <>
      <Layout>
        <Head />
        <InputsContainer />
        <UsersContainer />
      </Layout>
    </>
  )
}

export default App
