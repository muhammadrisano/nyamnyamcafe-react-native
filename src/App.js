import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
// import Login from '../src/Screens/Login'
import Home from '../src/screens/home/Home'
// import Prosesdelivery from '../src/Screens/Prosesdelivery'
// import Waitdelivery from '../src/Screens/Waitdelivery'
import { connect } from 'react-redux'
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/home" />
            {/* <Route path='/login' exact component={Login} /> */}
            <Route path='/home' exact component={Home} />
            {/* <Route path='/waiting' exact component={Waitdelivery} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.users.token,
    role_id: state.users.role_id
  }

}
export default connect(mapStateToProps)(App);
