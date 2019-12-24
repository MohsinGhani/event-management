import React, { Component } from "react";
// pages for this product
import Home from "views/Home";
import ListView from "views/Home/ListView.jsx";
import ArchiveView from "views/Home/ArchiveView.jsx";
import RegisterPage from "views/LoginPage/RegisterPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import VenueDetail from "./views/VenueDetail";
import AddVenue from "./views/AddVenue";
import UpdateVenue from "./views/UpdateVenue";

import Admin from "layouts/Admin.jsx";

import PrivateRoute from "./components/common/PrivateRoute";
import { Router, Route, Switch } from "react-router-dom";

import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";

var hist = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer />

        <Router history={hist}>
          <React.Fragment>
            <Switch>
              {/* <Route exact path="/" component={Components} /> */}
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/list-view" component={ListView} />
              <PrivateRoute
                exact
                path="/archive-view"
                component={ArchiveView}
              />
              <PrivateRoute
                exact
                path="/venue-detail/:vid"
                component={VenueDetail}
              />
              <PrivateRoute exact path="/add-venue" component={AddVenue} />
              <PrivateRoute
                exact
                path="/update-venue/:vid"
                component={UpdateVenue}
              />
              <PrivateRoute path="/admin" component={Admin} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/login" exact component={LoginPage} />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    venueReducer: {
      changeObjStatus,
      changeObjStatusLoader,
      changeObjStatusError
    }
  } = state;
  return {
    changeObjStatus,
    changeObjStatusLoader,
    changeObjStatusError
  };
};

export default connect(mapStateToProps, null)(App);
