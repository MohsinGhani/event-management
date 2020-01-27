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

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ConfirmationModal extends Component {
  render() {
    const { classes } = this.props;
    let {
      goto,
      isDetailsButtonDisable,
      handelOnSaveAndUpload,
      localSaveVenueLoader,
      saveVenueLoader,
      confirmModal,
      handleAddVenueClose
    } = this.props;
    return (
      <div>
        <Button
          color="primary"
          block
          disabled={isDetailsButtonDisable}
          onClick={() => handelOnSaveAndUpload()}
        >
          {saveVenueLoader || localSaveVenueLoader ? (
            <ReactLoading
              type={"spin"}
              color={"#ffff"}
              height={"20px"}
              width={"20px"}
            />
          ) : (
              <>
                <LibraryBooks className={classes.icon} />
                Submit
            </>
            )}
        </Button>
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={confirmModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => handleAddVenueClose("confirmModal")}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <h4 className={classes.modalTitle}>Do you want another venue.?</h4>
          </DialogTitle>

          <DialogActions className={classes.modalFooter}>
            <Button
              color="transparent"
              simple
              onClick={() => handleAddVenueClose("confirmModal")}
            >
              Yes
            </Button>
            <Button
              onClick={() => goto("/admin/pending-venue-status")}
              color="danger"
              simple
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles({ ...basicsStyle, ...javascriptStyles })(
  ConfirmationModal
);
