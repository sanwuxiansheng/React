/*
  index.js是脚手架的入口文件。webpack会以该文件为入口开始打包项目：
    1. 引入App应用主组件
    2. 渲染App组件
 */
// 只要使用jsx语法，就要引入React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));