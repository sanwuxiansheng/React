import React, { Component } from 'react';
import dayjs from 'dayjs';
import logo from '../../assets/images/logo.png';
import MyButton from '../my-button';
import { withRouter } from 'react-router-dom';
import { reqWeather } from '../../api';
import './index.less';
import { removeItem, getItem } from '../../utils/login-tools';
import menuList from '../../config/menu-config';
import { Modal } from 'antd';

const { confirm } = Modal;
class HeardMain extends Component {
  state = {
    sysTime: Date.now(),
    weather: '多云',
    dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/duoyun.png'
  }
  componentWillMount() {
    this.username = getItem().username;
  };
  componentWillReceiveProps(nextProps) {
    this.title = this.getTitle(nextProps)
  }

  // 获取当前所在的菜单项
  getTitle = (nextProps) => {
    console.log('getTile');
    const { pathname } = nextProps.location;
    for (let i = 0; i < menuList.length; i++) {
      const menu = menuList[i];
      if (menu.children) {
        for (let j = 0; j < menu.children.length; j++) {
          const item = menu.children[j]
          if (item.key === pathname) {
            return item.title;
          }
        }
      } else {
        if (menu.key === pathname) {
          return menu.title;
        }
      }
    }

  }
  async componentDidMount() {
    setInterval(() => {
      this.setState({
        sysTime: Date.now()
      })
    },1000);
    // 发送请求天气
    const result = await reqWeather();
    if (result) {
      this.setState(result)
    }
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
    const { sysTime, dayPictureUrl, weather} = this.state;
    return <div>
      <div className="header-main-top">
        <span>欢迎, {this.username}</span>
        <MyButton onClick={this.showConfirm}>退出</MyButton>
      </div>
      <div className="header-main-bottom">
        <span className="header-main-left">{this.title}</span>
        <div className="header-main-right">
          <span>{dayjs(sysTime).format('YYYY MM-DD-HH:mm:ss')}</span>
          <img src={dayPictureUrl} alt=""/>
          <span>{weather}</span>
        </div>
      </div>
    </div>;
  }
}
export default withRouter(HeardMain);