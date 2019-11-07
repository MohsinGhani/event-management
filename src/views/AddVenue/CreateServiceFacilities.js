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
import Button from "components/CustomButtons/Button.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class CreateServiceFacilities extends Component {
  render() {
    const { classes } = this.props;
    let {
      classicModal,
      handleClose,
      handleClickOpen,
      serviesFacilities,
      handleChangeOnServiceFacilites,
      handlerServicesFieldAdd,
      handlerServicesFieldDelete,
      isDetailsButtonDisable
    } = this.props;
    return (
      <div>
        <GridContainer
          style={{ padding: "0", maxWidth: "1024px", margin: "0 auto" }}
        >
          <Card style={{ padding: "15px", margin: 0, marginTop: "20px" }}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Facilities</h4>
            </CardHeader>
            <CardBody>
              <div>
                {serviesFacilities.map((ser, i) => {
                  return (
                    <GridContainer key={i} style={{ display: "flex" }}>
                      <GridItem xs={12} sm={1} md={1} lg={1}>
                        <img
                          src={star}
                          alt={"star"}
                          width="20px"
                          height="20px"
                        />
                      </GridItem>

                      <GridItem xs={12} sm={2} md={2} lg={2}>
                        {ser.title}
                      </GridItem>
                      <GridItem xs={12} sm={2} md={2} lg={2}>
                        Rs: {ser.price}
                      </GridItem>
                    </GridContainer>
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  color="primary"
                  block
                  onClick={() => handleClickOpen("classicModal")}
                >
                  <LibraryBooks className={classes.icon} />
                  Add Services
                </Button>

                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={classicModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => handleClose("classicModal")}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                >
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                  >
                    <IconButton
                      className={classes.modalCloseButton}
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={() => handleClose("classicModal")}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle}>Add Your Services</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    {serviesFacilities.map((ser, index) => {
                      return (
                        <div
                          style={{
                            display: "flex"
                          }}
                        >
                          <TextField
                            id="standard-name"
                            type="text"
                            label="Title"
                            className={classes.textField}
                            name="title"
                            value={ser.title}
                            onChange={event => {
                              handleChangeOnServiceFacilites(event, index);
                            }}
                            margin="normal"
                            style={{ marginRight: "5px" }}
                          />

                          <TextField
                            id="standard-name"
                            label="Price"
                            name="price"
                            type="number"
                            className={classes.textField}
                            value={ser.price}
                            onChange={event => {
                              handleChangeOnServiceFacilites(event, index);
                            }}
                            margin="normal"
                          />

                          <IconButton
                            aria-label="delete"
                            className={classes.margin}
                            onClick={event =>
                              handlerServicesFieldDelete(event, index)
                            }
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </div>
                      );
                    })}
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Button
                      color="transparent"
                      simple
                      onClick={event => {
                        handlerServicesFieldAdd(event);
                      }}
                      // disabled={!(serviesFacilities.title && serviesFacilities.price)}
                      disabled={isDetailsButtonDisable}
                    >
                      Add another field
                    </Button>
                    <Button
                      onClick={() => handleClose("classicModal")}
                      color="danger"
                      simple
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles({ ...basicsStyle, ...javascriptStyles })(
  CreateServiceFacilities
);
