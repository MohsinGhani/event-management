import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";

import star from "../../../src/assets/icons/star.svg";

// core components
import Card from "components/Card/Card";
import CardHeader from "dashboard-components/Card/CardHeader.jsx";
import CardBody from "dashboard-components/Card/CardBody.jsx";
import TextField from "@material-ui/core/TextField";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ReactLoading from "react-loading";
import Button from "components/CustomButtons/Button.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class FeedBackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedBackModal: false
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

  render() {
    const { classes } = this.props;
    const { feedBackModal } = this.state;
    return (
      <div>
        <Button
          color="info"
          size="sm"
          round
          // disabled={isDetailsButtonDisable}
          onClick={() => this.handleClickOpen("feedBackModal")}
        >
          {/* {saveVenueLoader ? (
            <ReactLoading
              type={"spin"}
              color={"#ffff"}
              height={"20px"}
              width={"20px"}
            />
          ) : (
            <>
              <LibraryBooks className={classes.icon} />
              "Submit"
            </>
          )} */}
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
            <div className={classes.typo}>
              <h4>The Life of Material Kit</h4>
            </div>
          </DialogTitle>

          <DialogActions className={classes.modalFooter}>
            <Button
              color="danger"
              simple
              onClick={() => this.handleClose("feedBackModal")}
            >
              Cancel
            </Button>
            <Button
              // onClick={() => goto("/admin/pending-venue-status")}
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
export default withStyles({
  ...basicsStyle,
  ...javascriptStyles,
  ...typographyStyle
})(FeedBackForm);
