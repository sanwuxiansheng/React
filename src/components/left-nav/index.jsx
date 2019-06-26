import React, {Component} from 'react';

import {Icon, Menu} from "antd";
import {Link, withRouter} from 'react-router-dom';
// withRouter是一个高阶组件用来给非路由组件传递路由组件的三大属性(history,location,match)
import logo from '../../assets/images/logo.png';
import './index.less'
import PropTypes from 'prop-types';
import menuList from '../../config/menu-config';

const {SubMenu} = Menu;
const {Item} = Menu;

class LeftNav extends Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired
  };
  addmenu = (menu) => {
    return <Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon}/>
        <span>{menu.title}</span>
      </Link>
    </Item>
  }
  // componentWillMount一般用来做渲染之前只做一次的准备工作,在render之前只做一次
  // 所以根据登录用户的不同生成不同的侧边列表在componentWillMount完成
  // componentDidMount一般用来做渲染之后只做一次的准备工作
  componentWillMount() {
    let {pathname} = this.props.location;
    const pathnameReg = /^\/product\//;
    if (pathnameReg.test(pathname)) {
      pathname = pathname.slice(0, 8);
    }
    let isHome = true;
    this.menus = menuList.map((menu) => {
      // 缓存
      const {children} = menu;
      // 判断菜单等级是一级菜单还是二级菜单
      if (children) {
        // 二级菜单
        return <SubMenu
          key={menu.key}
          title={
            <span>
                  <Icon type={menu.icon}/>
                  <span>{menu.title}</span>
            </span>
          }
        >
          {
            children.map((item) => {
              if (item.key === pathname) {
                // 说明当前地址是一个二级菜单，需要展开当前二级菜单所属的一级菜单,初始化展开的菜单
                this.openKey = menu.key;
                isHome = false
              }
              return this.addmenu(item)
            })
          }
        </SubMenu>
      } else {
          if (menu.key === pathname) isHome = false;
        // 一级菜单
        return this.addmenu(menu)
      }
    });
    // 初始化选中的菜单
    this.selectedKeys = isHome ? '/home' : pathname;
  }

  render() {

    const {collapsed} = this.props;
    return <div>
      <Link className="nav-logo" to='/home'>
        <img src={logo} alt=""/>
        <h1 style={{display: collapsed ? 'none' : 'block'}}>硅谷后台</h1>
      </Link>
      <Menu theme="dark" defaultSelectedKeys={[this.selectedKeys]} defaultOpenKeys={[this.openKey]} mode="inline">
        {
          this.menus
        }
      </Menu>
    </div>;
  }
}

export default withRouter(LeftNav)