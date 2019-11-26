import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { authAction, venueAction } from "./../../store/actions";

import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// core components
import TextField from "@material-ui/core/TextField";
import ReactLoading from "react-loading";
import Button from "components/CustomButtons/Button.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import RatingSystem from "./RatingSystem";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class FeedBackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedBackModal: false,

      overAllRating: 0,
      recommendRating: 0,
      organizedRating: 0,
      friendlyRating: 0,
      futureRating: 0,

      privateSuggestion: "",
      publicSuggestion: ""
    };
  }

  handleClickOpen = modal => {
    var reviewModal = [];
    reviewModal[modal] = true;
    this.setState(reviewModal);
  };

  handleClose = modal => {
    var reviewModal = [];
    reviewModal[modal] = false;
    this.setState(reviewModal);
  };

  handlerChangeOnRating = (event, identifier) => {
    this.setState({
      [identifier]: event
    });
  };

  handlerChangeOnComment = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnSave = () => {
    const { feedbackDetails, user, eventId } = this.props;
    console.log("eventId: ", eventId)
    const {
      privateSuggestion,
      publicSuggestion,

      overAllRating,
      recommendRating,
      organizedRating,
      friendlyRating,
      futureRating
    } = this.state;
    let rating =
      (overAllRating +
        recommendRating +
        organizedRating +
        friendlyRating +
        futureRating) /
      5;
    const newFeedback = {
      overAllRating,
      recommendRating,
      organizedRating,
      friendlyRating,
      futureRating,
      combineRating: rating,
      privateSuggestion,
      publicSuggestion,
      userId: user && user.uid,
      eventId
    };
    feedbackDetails(newFeedback);
  };

  render() {
    const { classes, user, eventId } = this.props;
    const {
      feedBackModal,

      privateSuggestion,
      publicSuggestion,

      overAllRating,
      recommendRating,
      organizedRating,
      friendlyRating,
      futureRating
    } = this.state;
    return (
      <div>
        <Button
          color="info"
          size="sm"
          round
          // disabled={isDetailsButtonDisable}
          onClick={() => this.handleClickOpen("feedBackModal")}
        >
          FeedBack
        </Button>
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={feedBackModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleClose("feedBackModal")}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <div>
              <h4 style={{ fontWeight: 500, fontSize: "xx-large" }}>
                Feedback Form
              </h4>
            </div>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <div style={{ fontWeight: 500, fontSize: "larger" }}>
              We would love to hear your thoughts, concerns or problems with
              anything so we can improve!
            </div>
            <div style={{ margin: "30px 0px" }}>
              {" "}
              <div>
                <div style={{ fontWeight: 500 }}>
                  How organized was the event?
                </div>
                <div>
                  <RatingSystem
                    rating={organizedRating}
                    handleOnChange={this.handlerChangeOnRating}
                    identifier={"organizedRating"}
                  />
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 500 }}>
                  How likely are you to recommend this event to a friend?
                </div>
                <div>
                  <RatingSystem
                    rating={recommendRating}
                    handleOnChange={this.handlerChangeOnRating}
                    identifier={"recommendRating"}
                  />
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 500 }}>
                  How likely are you to attend one of our future events?
                </div>
                <div>
                  <RatingSystem
                    rating={futureRating}
                    handleOnChange={this.handlerChangeOnRating}
                    identifier={"futureRating"}
                  />
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 500 }}>
                  How friendly was the staff?
                </div>
                <div>
                  <RatingSystem
                    rating={friendlyRating}
                    handleOnChange={this.handlerChangeOnRating}
                    identifier={"friendlyRating"}
                  />
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 500 }}>
                  Please rate your thoughts on the event as a whole.
                </div>
                <div>
                  <RatingSystem
                    rating={overAllRating}
                    handleOnChange={this.handlerChangeOnRating}
                    identifier={"overAllRating"}
                  />
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 500 }}>
                What would you suggest as future growth opportunities for this
                event? OR Are there any other comments or suggestions you'd like
                to make?
              </div>
              <TextField
                id="outlined-multiline-static"
                className={classes.textField}
                rows="4"
                label="Private Suggestion"
                type="text"
                name="privateSuggestion"
                value={privateSuggestion}
                onChange={this.handlerChangeOnComment}
                margin="dense"
                variant="outlined"
                multiline
                fullWidth
              />
              <TextField
                id="outlined-multiline-static"
                className={classes.textField}
                rows="4"
                label="Public Suggestion"
                type="text"
                name="publicSuggestion"
                value={publicSuggestion}
                onChange={this.handlerChangeOnComment}
                margin="dense"
                variant="outlined"
                multiline
                fullWidth
              />
            </div>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button
              color="danger"
              simple
              onClick={() => this.handleClose("feedBackModal")}
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.handleOnSave(eventId)}
              color="transparent"
              simple
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    authReducer: { user, isLoggedIn },
    venueReducer: { venue, feedback, createFeedbackLoader, createFeedbackError }
  } = state;
  return {
    user,
    isLoggedIn,

    venue,

    feedback,
    createFeedbackLoader,
    createFeedbackError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    feedbackDetails: payload => dispatch(venueAction.createFeedback(payload))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles({
    ...basicsStyle,
    ...javascriptStyles
  })(FeedBackForm)
);
