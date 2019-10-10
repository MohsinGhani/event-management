import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
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

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
      // firstName: "Aftab",
      // lastName: "Umer",
      // userEmail: "test@gmail.com",
      // userPass: "test12345",
      // showPass: false,
      // isSignupButtonDisabled: true,
      // error: {
      //   firstName: null,
      //   lastName: null,
      //   userEmail: null,
      //   userPass: null
      // }
    };
  }

  goto = path => {
    this.props.history.push(path);
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
    const { isLoggedIn } = this.props;
    if (prevProps.isLoggedIn !== isLoggedIn && isLoggedIn) {
      this.goto("/");
    }
  }

  toggleShowPass = () => {
    this.setState({ showPass: !this.state.showPass });
  };

  render() {
    const { classes, authLoader, authError, ...rest } = this.props;
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
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      confirmPassword: ""
                    }}
                    validationSchema={Yup.object().shape({
                      firstName: Yup.string()
                        .min(2, "Too Short!")
                        .max(50, "Too Long!")
                        .required("First Name is required"),
                      lastName: Yup.string()
                        .min(2, "Too Short!")
                        .max(50, "Too Long!")
                        .required("Last Name is required"),
                      email: Yup.string()
                        .email("Email is invalid")
                        .required("Email is required"),
                      password: Yup.string()
                        .min(6, "Seems a bit week...")
                        .max(
                          15,
                          "We prefer insecure system, try a shorter password."
                        )
                        // .matches(/[a-zA-Z]/, 'Password can contain Latin letters, Number, special charctors.')
                        .required("Password is required"),
                      confirmPassword: Yup.string()
                        .oneOf(
                          [Yup.ref("password"), null],
                          "Passwords must match"
                        )
                        .required("Confirm Password is required")
                    })}
                    onSubmit={({
                      firstName,
                      lastName,
                      email,
                      password,
                      confirmPassword
                    }) => {
                      this.props.signUpAction({
                        firstName,
                        lastName,
                        userEmail: email,
                        userPass: password,
                        confirmPassword
                      });
                    }}
                    render={({ errors, status, touched }) => (
                      <Form>
                        <CardHeader
                          color="primary"
                          className={classes.cardHeader}
                        >
                          <h4>Register</h4>
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
                              name="firstName"
                              render={({ field }) => (
                                <CustomInput
                                  labelText="First Name"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  name="firstName"
                                  inputProps={{
                                    ...field,
                                    type: "text",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <People
                                          className={classes.inputIconsColor}
                                        />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              )}
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="invalid-feedback"
                            />
                          </Fragment>
                          <Fragment>
                            <Field
                              name="lastName"
                              render={({ field }) => (
                                <CustomInput
                                  labelText="Last Name"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  name="lastName"
                                  inputProps={{
                                    ...field,
                                    type: "text",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <People
                                          className={classes.inputIconsColor}
                                        />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              )}
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="invalid-feedback"
                            />
                          </Fragment>
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
                          <Fragment>
                            <Field
                              name="confirmPassword"
                              render={({ field }) => (
                                <CustomInput
                                  labelText="Confirm Password"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  name="confirmPassword"
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
                              name="confirmPassword"
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
                            onClick={() => this.goto("/login")}
                          >
                            I Already Have Account
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
                              "Next"
                            )}
                          </Button>
                        </CardFooter>
                      </Form>
                    )}
                  />
                  {/* <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Register</h4>
                    </CardHeader>
                    <p
                      className={classes.divider}
                      style={{ width: "80%", color: "red", margin: "0 auto" }}
                    >
                      {authError}
                    </p>
                    <CardBody>
                      <CustomInput
                        labelText="First Name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          id: "firstName",
                          onChange: ev => this.handleInput(ev),
                          value: firstName ? firstName : "",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Last Name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          id: "lastName",
                          onChange: ev => this.handleInput(ev),
                          value: lastName ? lastName : "",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          id: "userEmail",
                          onChange: ev => this.handleInput(ev),
                          value: userEmail ? userEmail : "",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: showPass ? "text" : "password",
                          id: "userPass",
                          onChange: ev => this.handleInput(ev),
                          value: userPass ? userPass : "",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon
                                className={classes.inputIconsColor}
                                style={{ cursor: "pointer" }}
                                onClick={this.toggleShowPass}
                              >
                                {showPass ? "visibility" : "visibility_off"}
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        simple
                        style={{ cursor: "pointer" }}
                        color="primary"
                        size="lg"
                        onClick={() => this.goto("/login")}
                      >
                        I Already Have Account
                      </Button>
                      <Button
                        simple
                        style={{ cursor: "pointer" }}
                        color="primary"
                        size="lg"
                        // disabled={isSignupButtonDisabled || authLoader}
                        onClick={this.handleSignUp}
                      >
                        Next
                      </Button>
                    </CardFooter>
                  </form> */}
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
    authReducer: { signupUser, authLoader, authError, isLoggedIn }
  } = state;
  return {
    signupUser,
    authLoader,
    authError,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUpAction: payload => dispatch(authAction.signUp(payload)),
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(RegisterPage)));
