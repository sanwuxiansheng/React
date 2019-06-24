import React, { Component } from 'react';
import dayjs from 'dayjs';
import logo from '../../assets/images/logo.png'
import MyButton from '../my-button';
import { withRouter } from 'react-router-dom'
import './index.less';
import { removeItem, getItem } from '../../utils/login-tools';

import { Modal } from 'antd';

const { confirm } = Modal;
class HeardMain extends Component {
  state = {
    sysTime: Date.now()
  }
  componentWillMount() {
    this.username = getItem().username;
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        sysTime: Date.now()
      })
    },1000)
  }

  showConfirm() {
    confirm({
      title: '确定要退出登录吗?',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        // 确认退出登录就清空当前用户本地数据
        removeItem()
        // 跳转到登录界面
        this.props.hietory.replace('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    return <div>
      <div className="header-main-top">
        <span>欢迎, {this.username}</span>
        <MyButton onClick={this.showConfirm}>退出</MyButton>
      </div>
      <div className="header-main-bottom">
        <span className="header-main-left">首页</span>
        <div className="header-main-right">
          <span>{dayjs(this.state.sysTime).format('YYYY MM-DD-HH:mm:ss')}</span>
          <img src={logo} alt=""/>
          <span>多云</span>
        </div>
      </div>
    </div>;
  }
}
export default withRouter(HeardMain);