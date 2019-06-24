import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import { reqLogin } from '../../api';
import { setItem } from '../../utils/login-tools';
import logo from '../../assets/images/logo.png'; // 引入图片资源：在React脚手架中图片必须引入才会打包
import './index.less' // import 必须在最上面

const Item = Form.Item; // 缓存一下

function Login(props) {

  {
    const login = (e) => {
      e.preventDefault();
      // validateFields这个方法有三个参数，第一个参数用来提示错误，第二个参数为输入的值，第三个参数为空，一般不传
      props.form.validateFields(async (error, values) => {
        console.log(values);
        if (!error) {
          // 校验通过
          const {username, password} = values;
          console.log('登陆表单验证成功~');
          const result = await reqLogin(username, password);
          if (result) {
            // 登陆成功
            // 只有在登录成功的时候才能拿到用户信息
            setItem(result);
            props.history.replace('/');
            console.log('wowowow');
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
    const validator = (rule, value, callback) => {
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
    // getFieldDecorator也是一个高阶组件
    const {getFieldDecorator} = props.form;
    return <div className="login">
      <header className='login-header'>
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className='login-content'>
        <h2>用户登录</h2>
        <Form className="login-form" onSubmit={login}>
          <Item>
            {
              getFieldDecorator(
                'username', {
                  rules: [
                    {
                      validator: validator
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
                    {
                      validator: validator
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