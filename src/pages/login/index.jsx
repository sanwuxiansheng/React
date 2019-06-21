import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import logo from './logo.png';
const Item = Form.Item;
export default class Login extends Component {
  render() {
    return <div>
      <header className='login-header'>
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
        <section className='login-content'>
          <h2>用户登录</h2>
          <Form>
            <Item>
              <Input className="login-input" placeholder="用户名" type="text" prefix={<Icon type="user" />}/>
            </Item>
            <Item>
              <Input className="login-input" placeholder="密码" type="password" prefix={<Icon type="lock" />}/>
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Item>
          </Form>
        </section>
      </header>
    </div>;
  }
}