import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";
import { db } from "./../../../firebase/FireBase";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Warning from "@material-ui/icons/Warning";

class WorkSection extends React.Component {
  state = {
    name: "",
    email: "",
    msg: "",
    error: "",
    loading: false,
    sendMsgSuccess: false
  };

  inputHandler = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value, error: "" });
  };

  sendMessage = () => {
    const { name, email, msg } = this.state;
    this.setState({ loading: true });
    if (!name) {
      return this.setState({ error: "Name is Required" });
    }
    if (!email) {
      return this.setState({ error: "Email is Required" });
    }
    if (!msg) {
      return this.setState({ error: "Message is Required" });
    }
    let payload = { name, email, msg };
    db.collection("adminFeedback")
      .doc()
      .set(payload)
      .then(data => {
        this.setState({
          loading: false,
          sendMsgSuccess: true,
          name: "",
          email: "",
          msg: ""
        });
      })
      .catch(error => {
        this.setState({ loading: false, error: error.message });
      });
  };

  render() {
    const { classes } = this.props;
    const { name, email, msg, loading, sendMsgSuccess } = this.state;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>Contact Us</h2>
            <h4 className={classes.description}>
              Our Team is Ready to Resolve your Queries. Kindly Feel Free to ask
              Anything Regarding Event On Services
            </h4>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Your Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.inputHandler,
                      value: name,
                      name: "name"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Your Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.inputHandler,
                      value: email,
                      name: "email"
                    }}
                  />
                </GridItem>
                <CustomInput
                  labelText="Your Message"
                  id="message"
                  formControlProps={{
                    fullWidth: true,
                    className: classes.textArea
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                    onChange: this.inputHandler,
                    name: "msg",
                    value: msg
                  }}
                />
                <GridContainer justify="center">
                  <GridItem
                    xs={12}
                    sm={12}
                    md={4}
                    className={classes.textCenter}
                  >
                    <Button color="primary" onClick={this.sendMessage}>
                      {loading ? "...sending" : "Send Message"}
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>

        {sendMsgSuccess && (
          <div style={{ height: 50, width: "100%" }}>
            <SnackbarContent
              message={
                <span>
                  <b>SUCCESS:</b> Your Message has been successfully sent...
                </span>
              }
              color="success"
              icon={Warning}
              close
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(workStyle)(WorkSection);
