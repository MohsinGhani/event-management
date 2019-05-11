import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Amplify from 'aws-amplify';
import awsConfig from './config/awsConfig'
import { Provider } from "react-redux";
import store from './store/store'
import PrivateRoute from './components/common/PrivateRoute';

import "assets/scss/material-kit-react.scss?v=1.4.0";

// pages for this product
import Dashboard from "views/Dashboard";
import RegisterPage from "views/LoginPage/RegisterPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import ConfirmEmail from "views/LoginPage/ConfirmEmail.jsx";

Amplify.configure(awsConfig);
var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <React.Fragment>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/verify-email" exact component={ConfirmEmail} />
        </Switch>
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
