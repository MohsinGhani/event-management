import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Card from "components/Card/Card";
import CardHeader from "dashboard-components/Card/CardHeader.jsx";
import CardBody from "dashboard-components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { DropzoneDialog } from "material-ui-dropzone";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

class ImageUploader extends Component {
  render() {
    const {
      classes,
      open,
      handleUploadSave,
      handleUploadClose,
      handleUploadOpen,
      files
    } = this.props;
    return (
      <div>
        <GridContainer
          style={{ padding: "0", maxWidth: "1024px", margin: "0 auto" }}
        >
          <Card style={{ padding: "15px", margin: 0, marginTop: "20px" }}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Upload Image</h4>
            </CardHeader>
            <CardBody>
              {files.map((file, i) => {
                return (
                  <div key={i}>
                    <img
                      src={`./${file.name}`}
                      alt="upload images"
                      width="100px"
                      height="100px"
                    />
                  </div>
                );
              })}
              <Button
                variant="outlined"
                color="primary"
                onClick={handleUploadOpen}
              >
                Add Image
              </Button>
              <DropzoneDialog
                open={open}
                onSave={handleUploadSave}
                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                showPreviews={true}
                filesLimit={10}
                maxFileSize={99999999999999999}
                onClose={handleUploadClose}
              />
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(ImageUploader);
