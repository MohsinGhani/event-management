import React from "react";
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

// actions
import { authAction } from "./../../store/actions";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      userEmail: null,
      userPass: null,
      showPass: false,
      isSigninButtonDisabled: true,
      error: {
        userEmail: null,
        userPass: null
      }
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

  componentDidUpdate(prevProps, prevState) {
    const { isLoggedIn } = this.props;
    if (prevProps.isLoggedIn !== isLoggedIn && isLoggedIn) {
      this.goto("/");
    }

    if (
      prevState.userEmail !== this.state.userEmail ||
      prevState.userPass !== this.state.userPass
    ) {
      this.validateSignupForm();
    }
  }

  validateSignupForm = () => {
    let { userEmail, userPass, error } = this.state;

    if (userPass && userPass.length >= 8 && userEmail) {
      error = { userEmail: null, userPass: null };
      this.setState({ isSigninButtonDisabled: false, error });
    } else if (userPass && userPass.length < 8) {
      error.userPass = "password does not meet the requirements";
      this.setState({ isSigninButtonDisabled: true, error });
    } else {
      error = { userEmail: null, userPass: null };
      this.setState({ isSigninButtonDisabled: true, error });
    }
  };

  handleSignIn = () => {
    let { userEmail, userPass } = this.state;
    this.props.signInAction({ userEmail, userPass });
  };

  toggleShowPass = () => {
    this.setState({ showPass: !this.state.showPass });
  };

  render() {
    const { classes, authError, authLoader, ...rest } = this.props;
    const {
      userEmail,
      userPass,
      isSigninButtonDisabled,
      showPass
    } = this.state;

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
                      <h4>Login</h4>
                    </CardHeader>
                    <p
                      className={classes.divider}
                      style={{ width: "80%", color: "red", margin: "0 auto" }}
                    >
                      {authError}
                    </p>
                    <CardBody>
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
                        onClick={() => this.goto("/register")}
                      >
                        I want to Register
                      </Button>
                      <Button
                        simple
                        style={{ cursor: "pointer" }}
                        color="primary"
                        size="lg"
                        disabled={isSigninButtonDisabled || authLoader}
                        onClick={() => {
                          this.handleSignIn();
                        }}
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
