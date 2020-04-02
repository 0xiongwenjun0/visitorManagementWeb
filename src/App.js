import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import Login from "./page/login"
import Sign from "./page/sign"
import AdminLogin from "./page/adminLogin"
import Home from "./page/home"


import './App.less';
import 'antd-mobile/dist/antd-mobile.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
          <Route exact path="/admin/Login" component={AdminLogin}></Route>
          <Route exact path="/sign" component={Sign} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
