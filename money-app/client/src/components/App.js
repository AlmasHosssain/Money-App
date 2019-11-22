import React from 'react';
import { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Navigation from './navigation/Navigation';

class App extends Component{
  render() {
    return(
      <BrowserRouter>
        <div className= "container">
        <Navigation />
          <Switch>
            <Route path = '/' exact component={Home} />
            <Route path = '/Login' exact component={Login} />
            <Route path = '/Register' exact component={Register} /> 
            <Route path = '/Dashboard' exact component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
