import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Amplify from 'aws-amplify';
import awsConfig from './config/awsConfig'
import { Provider } from "react-redux";
import store from './store/store'
// import PrivateRoute from './components/common/PrivateRoute';
// import './index.css'
import "assets/scss/material-kit-react.scss?v=1.4.0";

// pages for this product
import Home from "views/Home";
import ListView from "views/Home/ListView.jsx";
import RegisterPage from "views/LoginPage/RegisterPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
// import ConfirmEmail from "views/LoginPage/ConfirmEmail.jsx";
// import Dashboard from 'views/Dashboard/Dashboard.jsx'
// import Admin from "layouts/Admin.jsx";
import VenueDetail from "./views/VenueDetail"
import AddVenue from "./views/AddVenue"
// import Components from "./views/Components/Components"

Amplify.configure(awsConfig);
var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <React.Fragment>
        <Switch>
          {/* <PrivateRoute exact path="/" component={Components} /> */}
          {/* <Route exact path="/" component={Components} /> */}

          {/* <PrivateRoute exact path="/" component={Home} /> */}
          <Route exact path="/" component={Home} />

          <Route exact path="/list-view" component={ListView} />
          <Route exact path="/venue-detail/:vid" component={VenueDetail} />
          <Route exact path="/add-venue" component={AddVenue} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/login" exact component={LoginPage} />
         {/*  <Route path="/verify-email" exact component={ConfirmEmail} />
          <Route path="/admin" component={Admin} /> */}
        </Switch>
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
