import React from "react";
// @material-ui/core dashboard-components
import withStyles from "@material-ui/core/styles/withStyles";
// core dashboard-components
import GridItem from "dashboard-components/Grid/GridItem.jsx";
import GridContainer from "dashboard-components/Grid/GridContainer.jsx";
import Table from "dashboard-components/Table/Table.jsx";
import Card from "dashboard-components/Card/Card.jsx";
import CardHeader from "dashboard-components/Card/CardHeader.jsx";
import CardBody from "dashboard-components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx"
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

function TableList(props) {
  const { classes } = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Your Venue Order</h4>
            <p className={classes.cardCategoryWhite}>
              Here You can manage your Venue Orders
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Venue Name", "Date", "Time Slot", "Package", ""]}
              tableData={[
                ["Saba Banquet Hall", "Tue Jun 25 2019 ", "8-12", "1", <Button color="rose" size="sm">Detail</Button>],
                ["Global Marque", "Tue Jun 25 2019 ", "8-12", "2", <Button color="rose" size="sm">Detail</Button>],
                ["Royal Place", "Tue Jun 25 2019 ", "8-12", "4", <Button color="rose" size="sm">Detail</Button>],
                ["Saba Banquet Hall", "Tue Jun 25 2019" , "8-12", "8", <Button color="rose" size="sm">Detail</Button>],
                ["Doris Greene", "Tue Jun 25 2019 ", "8-12", "2", <Button color="rose" size="sm">Detail</Button>],
                ["Mason Porter", "Tue Jun 25 2019 ", "8-12", "3", <Button color="rose" size="sm">Detail</Button>]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(TableList);
