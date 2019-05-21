import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

// actions
import { authAction } from "./../../store/actions";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      firstName: null,
      lastName: null,
      userEmail: null,
      userPass: null,
      showPass: false,
      isSignupButtonDisabled: true,
      error: {
        firstName: null,
        lastName: null,
        userEmail: null,
        userPass: null,
      }
    };
  }

  goto = path => {
    this.props.history.push(path);
  };

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      500
    );
    this.props.isLoggedInAction();
    if (this.props.isLoggedIn) {
      this.goto('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn) {
      this.goto('/')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.firstName !== this.state.firstName || prevState.lastName !== this.state.lastName || prevState.userEmail !== this.state.userEmail || prevState.userPass !== this.state.userPass) {
      this.validateSignupForm()
    }

    if (prevProps.authLoader && !this.props.authLoader && !this.props.authError && this.props.signupUser) {
      this.goto('/verify-email')
    }
  }

  validateSignupForm = () => {
    let { firstName, lastName, userEmail, userPass, error } = this.state
    if ((firstName && firstName.length >= 3) && (lastName && lastName.length >= 3) && (userPass && userPass.length >= 8) && userEmail) {
      error = { firstName: null, lastName: null, userEmail: null, userPass: null }
      this.setState({ isSignupButtonDisabled: false, error })
    }
    else if (userPass && userPass.length < 8) {
      error.userPass = "password does not meet the requirements"
      this.setState({ isSignupButtonDisabled: true, error })
    }
    else {
      error = { firstName: null, lastName: null, userEmail: null, userPass: null }
      this.setState({ isSignupButtonDisabled: true, error })
    }
  }

  handleSignUp = () => {
    let { firstName, lastName, userEmail, userPass } = this.state
    this.props.signUpAction({ firstName, lastName, userEmail, userPass })
  }

  toggleShowPass = () => {
    this.setState({ showPass: !this.state.showPass })
  }

  render() {
    const { classes, authLoader, authError, ...rest } = this.props;
    const { firstName, lastName, userEmail, userPass, isSignupButtonDisabled, showPass } = this.state;

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
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Register</h4>
                    </CardHeader>
                    <p className={classes.divider} style={{ width: "80%", color: "red", margin: "0 auto" }}>{authError}</p>
                    <CardBody>
                      <CustomInput
                        labelText="First Name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          id: "firstName",
                          onChange: (ev) => this.handleInput(ev),
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
                          onChange: (ev) => this.handleInput(ev),
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
                          onChange: (ev) => this.handleInput(ev),
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
                          onChange: (ev) => this.handleInput(ev),
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
                        onClick={() => this.goto('/login')}
                      >
                        I Already Have Account
                      </Button>
                      <Button
                        simple
                        style={{ cursor: "pointer" }}
                        color="primary"
                        size="lg"
                        disabled={isSignupButtonDisabled || authLoader}
                        onClick={this.handleSignUp}
                      >
                        Next
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { authReducer: { signupUser, authLoader, authError, isLoggedIn } } = state;
  return {
    signupUser, authLoader, authError, isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpAction: (payload) => dispatch(authAction.signUp(payload)),
    isLoggedInAction: (payload) => dispatch(authAction.isLoggedIn(payload)),
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(RegisterPage)));