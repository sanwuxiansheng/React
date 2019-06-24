import React, { Component } from 'react';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import HeaderMain from '../../components/haerd';
import { getItem } from '../../utils/login-tools';
import { reqValidateUserInfo } from '../../api';
const { Header, Content, Footer, Sider } = Layout;
export default class Admin extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  async componentWillMount() {
    const user = getItem();
    if ( user || user._id) {
      // 发送请求验证 用户信息是否合法
      // 如果用户是通过登录进来的，就不需要跳转到登陆界面。如果用户是使用之前的值，刷新访问进行来，就需要跳转到登陆界面
      /*this.props.history.replace('/login');
      const result = reqValidateUserInfo(user._id)
      if (result) return;
      this.props.history.replace('/login');*/
      const result = await reqValidateUserInfo(user._id);
      if (result) return;
    }
    this.props.history.replace('/login');
  }

  render() {
    const {collapsed} = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
         <LeftNav collapsed={collapsed}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, minHeight: 100 }} >
            <HeaderMain/>
          </Header>
          <Content style={{ margin: '25px 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>欢迎使用硅谷后台管理系统</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    );
  }
}