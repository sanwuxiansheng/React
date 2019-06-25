# React后台管理项目
### git管理
* 创建本地仓库
  * 通过create-react-app创建，会自动生成本地仓库（git init）
  * 本地版本控制
    * 删除多余文件
    * 添加了.idea的忽略
    * git add .
    * git commit -m 'xxx'
* 创建远程仓库
  * 上github创建仓库
* 本地仓库的内容提交到远程仓库去
  * git remote add origin xxx 关联仓库
  * git push -u(首次) origin master/dev  
* 本地分支操作
  * git checkout -b dev 新建并切换到dev分支
  * git checkout master 切换到master分支
  * git merge dev 合并dev分支的内容  
* 克隆仓库
  * git clone xxx 
  * 只能克隆master，需要dev
    * git fetch origin dev:dev
  * 后面更新：git pull origin dev
  * 产生冲突：
    * 版本回退：git reset --hard HEAD^  然后在更新
    * 删库，重新克隆
* 初始化一个react脚手架
  * create-react-app react-admin(文件名)
* git 的一些常用命令
  * git add . 将本地仓库添加到暂存区
  * git commit -m '提交到本地仓库'
  * git remote add origin url 关联到远程仓库
  * git push origin master 推送本地master分支到远程master分支
  * git checkout -d dev 创建一个开发分支并切换到新分支
  * git push origin dev 推送本地dev分支到远程dev分支
  * git pull origin dev 从远程dev分支拉去到本地dev分支
  * git clone url 将远程仓库克隆下载到本地
  * git checkout -b dev origin/dev 克隆仓库后切换到dev分支
* 创建项目基本结构
* 代理服务器：
  * 用来解决开发环境时的跨域问题
  * 在package.json中添加代理服务器的发送地址"proxy": "http://localhost:5000" 
* 路由组件：
* 路由组件都有的三大属性
  * history:
  * location:
  * match:
* 如果非路由组件想使用路由组件的三大属性可以通过withRouter
* ithRouter是一个高阶组件用来给非路由组件传递路由组件的三大属性(history,location,match)
  * 先通过引入import {withRouter} from 'react-router-dom';
  * 然后将要使用三大属性的非路由组件传进来并调用即可
    * export default withRouter(LeftNav);
* 生命周期函数
  * componentWillMount():
    * 一般用来做渲染之前只做一次的准备工作,在render之前只做一次
  * componentDidMount():
    * 一般用来做渲染之后只做一次的准备工作
  * componentWillUnmount():
    * 组件将要卸载时，清除定时器和ajax请求等只做一次
  * shouldComponentUpdate():
     * 组件在更新前，会自动被执行，这个钩子函数返回一个布尔值，来决定组件之后是否被更新。
  * componentWillUpdate()
    * 在组件更新之前，它会自动执行，但是他在shouldComponentUpdate之后执行。 如果shouldComponentUpdate返回true，它会执行，否则不会执行。
  * componentDidUpdate():
    * 组件更新之后立即执行
  * (props更新特有)componentWillRecieveProps:
    * 不过props更新了会另外执行一个生命周期函数componentWillRecieveProps,那么它在什么时候执行呢？
    * 如果一个组件从父组件接受了数据，只要父组件的render函数被重新执行了，那么这个componentWillRecieveProps才会被执行。这个生命周期函数不是太常用。
    