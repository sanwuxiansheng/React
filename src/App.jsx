import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login';
import Login from '../pages/admin';
export default class App extends Component {
  render() {
    return <div>
      <Route path='/login' component={Login}/>
      <Route path='/' component={Admin}/>
    </div>;
  }
}