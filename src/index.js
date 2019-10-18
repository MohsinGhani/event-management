import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
// import Amplify from "aws-amplify";
// import awsConfig from "./config/awsConfig";
import { Provider } from "react-redux";
import store from "./store/store";
import PrivateRoute from './components/common/PrivateRoute';
// import './index.css'
import "assets/scss/material-kit-react.scss?v=1.4.0";

// pages for this product
import Home from "views/Home";
import ListView from "views/Home/ListView.jsx";
import RegisterPage from "views/LoginPage/RegisterPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import VenueDetail from "./views/VenueDetail";
import AddVenue from "./views/AddVenue";
import UpdateVenue from "./views/UpdateVenue/UpdateVenue"

import Dashboard from 'views/Dashboard/Dashboard.jsx'
import Admin from "layouts/Admin.jsx";

// import Components from "./views/Components/Components"

// Amplify.configure(awsConfig);
var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <React.Fragment>
        <Switch>
          {/* <Route exact path="/" component={Components} /> */}
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/list-view" component={ListView} />
          <PrivateRoute exact path="/venue-detail/:vid" component={VenueDetail} />
          <PrivateRoute exact path="/add-venue" component={AddVenue} />
          <PrivateRoute exact path="/update-venue/:vid" component={UpdateVenue} />
          <PrivateRoute path="/admin" component={Admin} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
