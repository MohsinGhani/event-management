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
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ReactLoading from "react-loading";
import Button from "components/CustomButtons/Button.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import PackageRadioButton from "./PackageRadioButton";
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class PackageModal extends Component {
  render() {
    debugger;
    const { classes } = this.props;
    let {
      goto,
      ConfirmModal,
      handleCreatePackageClose,
      handleClickCreatePackageOpen,
      packageCategories,
      handleChangeEnabled,
      venue,
      handleToggle
    } = this.props;
    return (
      <div>
        <Button
          color="primary"
          block
          onClick={() => handleClickCreatePackageOpen("ConfirmModal")}
        >
          Create Package
        </Button>
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={ConfirmModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => handleCreatePackageClose("ConfirmModal")}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <h4 className={classes.modalTitle}>Select your package category</h4>
            <PackageRadioButton
              packageCategories={packageCategories}
              handleChangeEnabled={handleChangeEnabled}
            />
          </DialogTitle>

          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <h4 className={classes.modalTitle}>Services List....!</h4>

            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              {venue.serviesFacilities &&
                venue.serviesFacilities.map((service, index) => (
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={4} lg={3} key={index}>
                      <div
                        className={
                          classes.checkboxAndRadio +
                          " " +
                          classes.checkboxAndRadioHorizontal
                        }
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={() => handleToggle(service)}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{ checked: classes.checked }}
                            />
                          }
                          classes={{ label: classes.label }}
                          label={`${service.title} ${service.price}`}
                        />
                      </div>
                    </GridItem>
                  </GridContainer>
                ))}
            </Grid>
          </DialogContent>

          <DialogActions className={classes.modalFooter}>
            <Button
              color="transparent"
              simple
              onClick={() => handleCreatePackageClose("ConfirmModal")}
            >
              Yes
            </Button>
            <Button onClick={() => goto("/list-view")} color="danger" simple>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles({ ...basicsStyle, ...javascriptStyles })(
  PackageModal
);
