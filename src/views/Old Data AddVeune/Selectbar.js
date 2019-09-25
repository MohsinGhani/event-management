import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
import GridContainer from "components/Grid/GridContainer";
import Card from "components/Card/Card";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import CardHeader from "dashboard-components/Card/CardHeader.jsx";
import CardBody from "dashboard-components/Card/CardBody.jsx";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

class SelectBar extends React.Component {
  render() {
    const { classes, categoryHandler, categorySelect } = this.props;
    return (
      <GridContainer
        style={{ padding: "0", maxWidth: "1024px", margin: "0 auto" }}
      >
        <Card style={{ padding: "15px", margin: 0 }}>
          {/* <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Form Category</h4>
            </CardHeader> */}
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <FormControl
                  style={{ marginTop: "8px", display: "flex" }}
                  fullWidth
                >
                  <InputLabel htmlFor="age-simple">Form Category</InputLabel>
                  <Select
                    value={categorySelect}
                    onChange={categoryHandler}
                    inputProps={{
                      name: "categorySelect",
                      id: "age-simple"
                    }}
                  >
                    <MenuItem value={'venue_form'}>Venue From</MenuItem>
                    <MenuItem value={'decorators_form'}>Decorators From</MenuItem>
                    <MenuItem value={'food_caterers'}>Food and Caterers From</MenuItem>
                    <MenuItem value={'photographer'}>Photograhpher</MenuItem>
                  </Select>
                </FormControl>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridContainer>
    );
  }
}

export default withStyles(basicsStyle)(SelectBar);
