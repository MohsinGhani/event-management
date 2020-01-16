import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";

import ReactLoading from "react-loading";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// actions
import { authAction } from "./../../store/actions";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }

  goto = path => {
    this.props.history.replace(path);
  };

  handleInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  componentDidMount() {
    const { isLoggedIn } = this.props;

    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(() => {
      this.setState({ cardAnimaton: "" });
    }, 500);

    // when this component render the check user is logged in or not
    this.props.isLoggedInAction();

    // if user is isLogged in then redirect it to home
    if (isLoggedIn) this.goto("/");
  }

  componentDidUpdate(prevProps) {
    const { isLoggedIn, location } = this.props;
    if (prevProps.isLoggedIn !== isLoggedIn && isLoggedIn) {
      debugger;
      this.goto("/");
      this.goto(location && location.search ? location.search.replace("?redirect=", "") : "/");
    }
  }

  toggleShowPass = () => {
    this.setState({ showPass: !this.state.showPass });
  };

  render() {
    const { classes, authError, authLoader, ...rest } = this.props;
    const { showPass } = this.state;

    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Event Management"
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <Formik
                    initialValues={{
                      email: "",
                      password: ""
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email("Email is invalid")
                        .required("Email is required"),
                      password: Yup.string()
                        .min(6, "Password must be at least 6 characters")
                        .required("Password is Required")
                    })}
                    onSubmit={({ email, password }) => {
                      this.props.signInAction({
                        userEmail: email,
                        userPass: password
                      });
                    }}
                    render={({ errors, status, touched }) => (
                      <Form>
                        <CardHeader
                          color="primary"
                          className={classes.cardHeader}
                        >
                          <h4>Login</h4>
                        </CardHeader>
                        <p
                          className={classes.divider}
                          style={{
                            width: "80%",
                            color: "red",
                            margin: "0 auto"
                          }}
                        >
                          {authError}
                        </p>
                        <CardBody>
                          <Fragment>
                            <Field
                              name="email"
                              render={({ field }) => (
                                <CustomInput
                                  labelText="Email"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  name="email"
                                  inputProps={{
                                    ...field,
                                    type: "email",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Email
                                          className={classes.inputIconsColor}
                                        />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              )}
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </Fragment>

                          <Fragment>
                            <Field
                              name="password"
                              render={({ field }) => (
                                <CustomInput
                                  labelText="Password"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  name="password"
                                  inputProps={{
                                    ...field,
                                    type: showPass ? "text" : "password",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Icon
                                          className={classes.inputIconsColor}
                                          style={{ cursor: "pointer" }}
                                          onClick={this.toggleShowPass}
                                        >
                                          {showPass
                                            ? "visibility"
                                            : "visibility_off"}
                                        </Icon>
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              )}
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                          </Fragment>
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                          <Button
                            simple
                            style={{ cursor: "pointer" }}
                            color="primary"
                            size="lg"
                            onClick={() => this.goto("/register")}
                          >
                            I want to Register
                          </Button>
                          <Button
                            simple
                            style={{ cursor: "pointer" }}
                            color="primary"
                            size="lg"
                            type="submit"
                          >
                            {authLoader ? (
                              <ReactLoading
                                type={"spin"}
                                color={"#ab47bc"}
                                height={"20px"}
                                width={"20px"}
                              />
                            ) : (
                              "Login"
                            )}
                          </Button>
                        </CardFooter>
                      </Form>
                    )}
                  />
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    authReducer: { user, authLoader, authError, isLoggedIn }
  } = state;
  return {
    user,
    authLoader,
    authError,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signInAction: payload => dispatch(authAction.signIn(payload)),
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(LoginPage)));
