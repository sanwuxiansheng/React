import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import logo from './logo.png';
import './index.less'
const Item = Form.Item;
class Login extends Component {
  login = (e) => {
    e.preventDefault();
  }
  render() {
    // getFieldDecorator也是一个高阶组件
    const { getFieldDecorator } = this.props.form;
    return <div className="login">
      <header className='login-header'>
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className='login-content'>
        <h2>用户登录</h2>
        <Form className="login-form" onSubmit={this.login}>
          <Item>
            {
              getFieldDecorator(
                'username', {
                  rules: [
                    { required: true, message: '请输入用户名!' },
                    { max: 10, message: '用户名必须小于10位'},
                    { min: 4, message: '用户名必须大于4位'},
                    { pattern: /^[a-zA-Z0-9_$]+$/, message: '用户名只能包含英文字母数字、下划线和$'}
                    ],
                }
              )(<Input className="login-input" placeholder="用户名" type="text" prefix={<Icon type="user" />}/>)
            }

          </Item>
          <Item>
            <Input className="login-input" placeholder="密码" type="password" prefix={<Icon type="lock" />}/>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
          </Item>
        </Form>
      </section>

    </div>;
  }
}
// 返回值是一个包装组件   <Form(Login)><Login><Form(Login)>
// 通过Form(Login)包装组件向Login组件中传递form属性
export default Form.create()(Login)