import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import auth from "./../../firebase/FireBase";
import { authAction } from "./../../store/actions";

class PrivateRoute extends Component {
//   state = {
//     isAuthenticated: this.props
//   };

//   componentDidMount() {
//     debugger;
//     auth.onAuthStateChanged(user => {
//       debugger;
//       if (user) {
//           console.log(user)
//         this.setState({
//           isAuthenticated: true
//         });
//       } else {
//         this.setState({
//           isAuthenticated: false
//         });
//       }
//     });
//   }
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

// PrivateRoute.propTypes = {
//   isAuthenticated: PropTypes.bool.isRequired
// };

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
      // logout: () => dispatch(authAction.logout())
    };
  };

export default connect(mapStateToProps)(PrivateRoute);

// const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
//     return (
//         <Route
//             {...rest}
//             render={props =>
//                  isAuthenticated ? (
//  //               true ? (
//                     <div>
//                         <Component {...props} />
//                     </div>
//                 ) : (
//                         <Redirect to="/login" />
//                     )
//             }
//         />
//     )
// }

// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import firebase from '../Config/config.js'
// import Loader from 'react-loader-spinner'

// class PrivateRoute extends React.Component {
// state = {
//     loading: true,
//     isAuthenticated: false
// }

// componentDidMount() {
//     debugger
//     firebase.auth().onAuthStateChanged((user) => {
//         debugger
//         if (user) {
//             this.setState({
//                 loading: false,
//                 isAuthenticated: true
//             })
//         } else {
//             this.setState({
//                 loading: false,
//                 isAuthenticated: false
//             })
//         }
//     });
// }

//     render() {
//         const { component: Component, ...rest } = this.props
//         const { loading, isAuthenticated } = this.state
//         return (
//             loading ?
//             <Loader
//             type="ThreeDots"
//             color="green"
//             height={100}
//             width={100}
//             visible={this.state.loading}
//             //3 secs
//             ></Loader>:
//                 <Route
//                     {...rest}
//                     render={props =>
//                         isAuthenticated ? (
//                             <div>
//                                 <Component {...props} />
//                             </div>
//                         ) : (
//                                 <Redirect to="/login" />
//                             )
//                     }
//                 />
//         )
//     }
// }

// const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
//     return (
//         <Route
//             {...rest}
//             render={props =>
//                 isAuthenticated ? (
//                     <div>
//                         <Component {...props} />
//                     </div>
//                 ) : (
//                         <Redirect to="/login" />
//                     )
//             }
//         />
//     )
// }

// PrivateRoute.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired
// };

// export default PrivateRoute;
