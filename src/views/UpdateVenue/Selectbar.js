import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
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

class SelectBar extends React.Component {
  render() {
    const {
      classes,
      categoryHandler,
      categorySelect,
      categories,
      objType
    } = this.props;
    return (
      <GridContainer
        style={{ padding: "0", maxWidth: "1024px", margin: "0 auto" }}
      >
        <Card style={{ padding: "15px", margin: 0 }}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Category Selector</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <FormControl
                  style={{ marginTop: "8px", display: "flex" }}
                  fullWidth
                >
                  <InputLabel htmlFor="age-simple">Form Category</InputLabel>
                  <Select
                    value={
                      categorySelect && categorySelect
                        ? categorySelect
                        : objType && objType.title
                        ? objType.title
                        : ""
                    }
                    onChange={categoryHandler}
                    inputProps={{
                      name: "categorySelect",
                      id: "age-simple"
                    }}
                  >
                    {categories.map((cat, i) => {
                      return (
                        <MenuItem key={i} value={cat}>
                          {cat.title}
                        </MenuItem>
                      );
                    })}
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
