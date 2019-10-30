import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";

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
import CustomInput from "components/CustomInput/CustomInput.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class PackageModal extends Component {
  render() {
    const { classes } = this.props;
    let {
      goto,
      ConfirmModal,
      handleCreatePackageClose,
      handleClickCreatePackageOpen,
      packageCategories,
      handleChangeEnabled,
      venue,
      handleOnChange,
      packageObj,
      servicePackages,
      handleToggleOnServicePackages,
      discountAmount,
      packagePrice,
      afterDiscountPrice,
      saveCustomPackages
    } = this.props;
    // console.log("service Package =>", servicePackages);
    // let packagePrice = 0;
    // let afterDiscountPrice = 0;
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
              packageObj={packageObj}
            />
          </DialogTitle>

          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <h4 className={classes.modalTitle} style={{ fontWeight: "500" }}>
              Services List....!
            </h4>

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
                              onClick={() =>
                                handleToggleOnServicePackages(service)
                              }
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
            <div style={{ marginTop: "10px" }}>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
              >
                {servicePackages
                  ? servicePackages.map(p => {
                      packagePrice += parseInt(p.price);
                    })
                  : null}
                <div> Total Price: Rs:{packagePrice}</div>
              </Grid>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              <CustomInput
                labelText="Discount Percentage"
                id="material"
                formControlProps={{
                  fullWidth: false
                }}
                inputProps={{
                  name: "discountAmount",
                  value: discountAmount,
                  type: "text",
                  onChange: handleOnChange,

                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
              >
                Discount Price: Rs:
                {
                  (afterDiscountPrice +=
                    packagePrice - (packagePrice / 100) * discountAmount)
                }
              </Grid>
            </div>
          </DialogContent>

          <DialogActions className={classes.modalFooter}>
            <Button
              color="transparent"
              simple
              onClick={() => saveCustomPackages()}
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
