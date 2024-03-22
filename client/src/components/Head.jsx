import {Layout} from 'antd'
import React from 'react'
import logo from '../assets/logo-flexxus-header.png'


const {Header} = Layout;

const Head = () => {
  return (
    <Header className='header__container'>
      <img className='logo' src={logo} alt="" />
    </Header>
  )
}

export default Head