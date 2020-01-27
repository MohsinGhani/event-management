import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
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

class ConfirmEmail extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: "cardHidden",
            verificationCode: null,
            btnDisabled: true
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
            700
        );

        let { signupUser } = this.props
        if (!signupUser) {
            this.goto('/')
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.verificationCode !== this.state.verificationCode) {
            this.validateSignupForm()
        }

        if (prevProps.confirmSignupLoader && !this.props.confirmSignupLoader && !this.props.confirmSignupError && this.props.confirmSignup) {
            this.goto('/login')
        }
    }

    validateSignupForm = () => {
        let { verificationCode } = this.state

        if (verificationCode && (verificationCode.length === 6)) {
            this.setState({ btnDisabled: false })
        }
        else {
            this.setState({ btnDisabled: true })
        }
    }

    confirmCodeHandler = () => {
        let { signupUser } = this.props
        let { verificationCode } = this.state
        this.props.confirmSignUpAction({ user: signupUser, code: verificationCode })
    }

    render() {
        const { classes, confirmSignupLoader, confirmSignupError, ...rest } = this.props;
        const { verificationCode, btnDisabled } = this.state;

        return (
            <div>
                <Header
                    absolute
                    color="transparent"
                    brand="Event On"
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
                                            <h4>Confirm Email</h4>
                                        </CardHeader>
                                        <p className={classes.divider} style={{ width: "80%", color: "red", margin: "0 auto" }}>{confirmSignupError}</p>
                                        <CardBody>
                                            <CustomInput
                                                labelText="Enter Verification Code"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    id: "verificationCode",
                                                    onChange: (ev) => this.handleInput(ev),
                                                    value: verificationCode ? verificationCode : "",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <People className={classes.inputIconsColor} />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </CardBody>
                                        <CardFooter className={classes.cardFooter}>
                                            <Button
                                                simple
                                                color="primary"
                                                size="lg"
                                                disabled={confirmSignupLoader || btnDisabled}
                                                onClick={this.confirmCodeHandler}
                                            >
                                                Verify
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
    const { authReducer: { signupUser, confirmSignup, confirmSignupLoader, confirmSignupError } } = state;
    return {
        signupUser, confirmSignup, confirmSignupLoader, confirmSignupError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        confirmSignUpAction: (payload) => dispatch(authAction.confirmSignUp(payload))
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(ConfirmEmail)));