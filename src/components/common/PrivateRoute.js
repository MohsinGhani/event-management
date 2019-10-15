import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authAction } from "./../../store/actions";

class PrivateRoute extends Component {
  // componentDidMount(){
  //   this.props.isLoggedInAction()
  // }
  render() {
    const {
      component: Component,
      loading,
      isLoggedIn,
      ...rest
    } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
            isLoggedIn ? (
            <div>
              <Component {...props} />
            </div>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => {
    const {
      authReducer: { user, isLoggedIn }
    } = state;
    return {
      user,
      isLoggedIn
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);