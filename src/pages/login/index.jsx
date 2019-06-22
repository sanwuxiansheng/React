import React, {Component} from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import {reqLogin} from '../../api';
import logo from '../../assets/images/logo.png'; // 引入图片资源：在React脚手架中图片必须引入才会打包
import './index.less' // import 必须在最上面
const Item = Form.Item; // 缓存一下
class Login extends Component {
  login = (e) => {
    e.preventDefault();
    // validateFields这个方法有三个参数，第一个参数用来提示错误，第二个参数为输入的值，第三个参数为空，一般不传
    this.props.form.validateFields(async (error, values) => {
      console.log(values);
      if (!error) {
        // 校验通过
        const {username, password} = values;
        console.log(username, password);
        console.log('登陆表单验证成功~');
        const result = await reqLogin(username, password);
        if (result) {
          // 登陆成功
          this.props.history.replace('/');
        } else {
          // 登陆失败 清空密码
          this.props.form.resetFields(['password'])
        }
      } else {
        // 校验失败
        console.log('登陆表单验证失败~');
      }
    })
  }
  validator = (rule, value, callback) => {
    // console.log(rule, value)
    const name = rule.fullField === 'username' ? '用户名' : '密码';
    if (!value) {
      callback(`请输入${name}!`)
    } else if (value.length < 4) {
      callback(`${name}必须大于4位`)
    } else if (value.length > 10) {
      callback(`${name}必须小于10位`)
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback(`${name}只能包含英文字母数字下划线`)
    } else {
      callback(); // 不传参代表校验通过，传参代表校验失败
    }

  }

  render() {
    // getFieldDecorator也是一个高阶组件
    const {getFieldDecorator} = this.props.form;
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
                    /*{ required: true, message: '请输入用户名!' },
                    { max: 10, message: '用户名必须小于10位'},
                    { min: 4, message: '用户名必须大于4位'},
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含英文字母数字下划线'}*/
                    {
                      validator: this.validator
                    }
                  ],
                }
              )(<Input className="login-input" placeholder="请输入用户名" type="text" prefix={<Icon type="user"/>}/>)
            }

          </Item>
          <Item>
            {
              getFieldDecorator(
                'password', {
                  rules: [
                    /*{ required: true, message: '请输入密码！'},
                    { max: 15, message: '密码必须小于15位'},
                    { min: 4, message: '密码必须大于4位'},
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '密码只能包含英文字母数字下划线'}*/
                    {
                      validator: this.validator
                    }
                  ],
                }
              )(<Input className="login-input" placeholder="请输入密码" type="password" prefix={<Icon type="lock"/>}/>)
            }

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