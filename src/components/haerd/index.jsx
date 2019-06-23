import React, { Component } from 'react';
import logo from '../../assets/images/logo.png'
import MyButton from '../my-button';
import './index.less'
export default class HeardMain extends Component {
  render() {
    return <div>
      <div className="header-main-top">
        <span>欢迎, admin</span>
        <MyButton>退出</MyButton>
      </div>
      <div className="header-main-bottom">
        <span className="header-main-left">首页</span>
        <div className="header-main-right">
          <span>{Date.now()}</span>
          <img src={logo} alt=""/>
          <span>多云</span>
        </div>
      </div>
    </div>;
  }
}