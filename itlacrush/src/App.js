import React, {Component} from 'react';
import Login from './component/login_component/login'
import './App.css';
import Navigation from './component/layout/Navigation'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Board from './component/TableBoard/Board'
import NewPublication from './component/Publications/NewPublication';
import SignOut from './component/login_component/SignOut'
import withAuthentication from './component/SessionManagement/withAuthentication'


class App extends Component{
  

  render() {
    return (
      <div className="App #fafafa grey lighten-5">
        <BrowserRouter>
        <Navigation/>
        <Switch>
          <Route exact path="/"  component={Board}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="sign-out" component={SignOut}></Route>
          <Route path="/new-publication" component={NewPublication}></Route>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default withAuthentication(App);
