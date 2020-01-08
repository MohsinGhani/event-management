import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
import CardHeader from "@material-ui/core/CardHeader";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { connect } from "react-redux";
import { authAction, venueAction } from "./../../store/actions";
import CircularProgress from "@material-ui/core/CircularProgress";

import loginStyle from "assets/jss/material-kit-react/views/componentsSections/loginStyle.jsx";

import "./index.css";

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryName: null,
      stateName: null,
      cityName: null,
      countryCode: null,
      stateCode: null,
      cityCode: null,
      address: ""
    };
  }
  componentDidMount() {
    this.props.getCountryAction();
  }

  // handleInputForCountry = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });

  //   if (name === "countryName") {
  //     this.props.getCountryAction({ countryName: value });
  //   }
  // };

  componentDidUpdate(prevProps, prevState) {
    const { countryCode, stateCode, cityCode } = this.state;
    console.log(countryCode);
    const { states, city, getStateAction, getCityAction } = this.props;
    if (prevState.countryCode !== countryCode && countryCode) {
      getStateAction({ countryCode: countryCode });
    }
    if (prevState.stateCode !== stateCode && stateCode) {
      getCityAction({ countryCode: countryCode, stateCode: stateCode });
    }
  }

  render() {
    const {
      classes,
      activeStep,
      handleNext,
      handleBack,
      country,
      getCountryLoader,
      getCountryError,
      states,
      getStateLoader,
      getStateError,
      city,
      getCityLoader,
      getCityError
    } = this.props;
    const {
      countryName,
      stateName,
      cityName,
      countryCode,
      stateCode,
      cityCode,
      address
    } = this.state;
    // const options =
    //   country &&
    //   country.map(option => {
    //     const firstLetter = option.name[0].toUpperCase();
    //     return {
    //       firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
    //       ...option
    //     };
    //   });
    return (
      <div>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader
                  className="card-header"
                  title={"Booking Addrees:"}
                  subheader={"Mailing Information"}
                  titleTypographyProps={{
                    style: {
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#00000"
                    }
                  }}
                  subheaderTypographyProps={{
                    style: {
                      fontSize: "1rem",
                      color: "#283238",
                      paddingTop: "5px"
                    }
                  }}
                />
                <CardBody>
                  <Autocomplete
                    id="country"
                    freesolo
                    options={country && country}
                    getOptionLabel={option => option.name}
                    loading={getCountryLoader ? true : false}
                    onChange={(event, value) =>
                      this.setState({
                        countryName: value.name,
                        countryCode: value.code
                      })
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Country"
                        fullWidth
                        margin="normal"
                      />
                    )}
                    renderOption={(option, { inputValue }) => {
                      const matches = match(option.name, inputValue);
                      const parts = parse(option.name, matches);
                      return (
                        <div>
                          {parts.map((part, index) => (
                            <span
                              key={index}
                              style={{ fontWeight: part.highlight ? 700 : 400 }}
                            >
                              {part.text}
                            </span>
                          ))}
                        </div>
                      );
                    }}
                  />
                  <Autocomplete
                    id="state"
                    freeSolo
                    options={states && states}
                    getOptionLabel={option => option.name}
                    loading={getStateLoader ? true : false}
                    onChange={(event, value) => {
                      this.setState({
                        stateName: value.name,
                        stateCode: value.code
                      });
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="States"
                        fullWidth
                        margin="normal"
                      />
                    )}
                    renderOption={(option, { inputValue }) => {
                      const matches = match(option && option.name, inputValue);
                      const parts = parse(option && option.name, matches);

                      return (
                        <div>
                          {parts.map((part, index) => (
                            <span
                              key={index}
                              style={{ fontWeight: part.highlight ? 700 : 400 }}
                            >
                              {part.text}
                            </span>
                          ))}
                        </div>
                      );
                    }}
                  />

                  <Autocomplete
                    id="city"
                    freeSolo
                    options={city && city}
                    getOptionLabel={option => option.name}
                    loading={getCityLoader ? true : false}
                    onChange={(event, value) => {
                      this.setState({
                        cityName: value.name,
                        cityCode: value.code
                      });
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="City"
                        fullWidth
                        margin="normal"
                      />
                    )}
                    renderOption={(option, { inputValue }) => {
                      const matches = match(option.name, inputValue);
                      const parts = parse(option.name, matches);

                      return (
                        <div>
                          {parts.map((part, index) => (
                            <span
                              key={index}
                              style={{ fontWeight: part.highlight ? 700 : 400 }}
                            >
                              {part.text}
                            </span>
                          ))}
                        </div>
                      );
                    }}
                  />
                  {/* 
                  <Autocomplete
                    id="countryName"
                    freeSolo
                    onChange={(event, value) =>
                      this.setState({
                        countryName: value.name,
                        countryCode: value.code
                      })
                    }
                    options={
                      options &&
                      options.sort(
                        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                      )
                    }
                    groupBy={option => option.firstLetter}
                    getOptionLabel={option => option.name}
                    loading={getCountryLoader ? true : false}
                    renderInput={params => (
                      <div style={{ display: "flex" }}>
                        <TextField
                          {...params}
                          label="Country"
                          fullWidth
                          margin="normal"
                        />
                        {getCountryLoader ? (
                          <CircularProgress
                            className={classes.loader}
                            size={20}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                    renderOption={(option, { inputValue }) => {
                      const matches = match(option.name, inputValue);
                      const parts = parse(option.name, matches);
                      return (
                        <div>
                          {parts.map((part, index) => (
                            <span
                              key={index}
                              style={{ fontWeight: part.highlight ? 700 : 400 }}
                            >
                              {part.text}
                            </span>
                          ))}
                        </div>
                      );
                    }}
                  />
                  <Autocomplete
                    id="stateName"
                    freeSolo
                    // onChange={
                    //   (event, value) =>
                    //   this.setState({ countryName: value })
                    // }
                    options={
                      options &&
                      options.sort(
                        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                      )
                    }
                    groupBy={option => option.firstLetter}
                    getOptionLabel={option => option.name}
                    loading={getCountryLoader ? true : false}
                    renderInput={params => (
                      <div style={{ display: "flex" }}>
                        <TextField
                          {...params}
                          label="State"
                          fullWidth
                          margin="normal"
                        />
                        {getCountryLoader ? (
                          <CircularProgress
                            className={classes.loader}
                            size={20}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                    renderOption={(option, { inputValue }) => {
                      const matches = match(option.name, inputValue);
                      const parts = parse(option.name, matches);
                      return (
                        <div>
                          {parts.map((part, index) => (
                            <span
                              key={index}
                              style={{ fontWeight: part.highlight ? 700 : 400 }}
                            >
                              {part.text}
                            </span>
                          ))}
                        </div>
                      );
                    }}
                  />
                  <Autocomplete
                    id="cityName"
                    freeSolo
                    // onChange={
                    //   (event, value) =>
                    //   this.setState({ countryName: value })
                    // }
                    options={
                      options &&
                      options.sort(
                        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                      )
                    }
                    groupBy={option => option.firstLetter}
                    getOptionLabel={option => option.name}
                    loading={getCountryLoader ? true : false}
                    renderInput={params => (
                      <div style={{ display: "flex" }}>
                        <TextField
                          {...params}
                          label="City"
                          fullWidth
                          margin="normal"
                        />
                        {getCountryLoader ? (
                          <CircularProgress
                            className={classes.loader}
                            size={20}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                    renderOption={(option, { inputValue }) => {
                      const matches = match(option.name, inputValue);
                      const parts = parse(option.name, matches);
                      return (
                        <div>
                          {parts.map((part, index) => (
                            <span
                              key={index}
                              style={{ fontWeight: part.highlight ? 700 : 400 }}
                            >
                              {part.text}
                            </span>
                          ))}
                        </div>
                      );
                    }}
                  /> */}

                  <CustomInput
                    labelText="Address"
                    id="forth"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      name: "address",
                      value: address,
                      // onChange: handleDetailInput,
                      endAdornment: (
                        <InputAdornment position="end">
                          <People className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                  />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card>Booking Details</Card>
              <div className="button">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  className="back-button"
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className="next-button"
                >
                  Next Step
                </Button>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    // authReducer: { user, isLoggedIn },
    venueReducer: {
      country,
      getCountryLoader,
      getCountryError,
      states,
      getStateLoader,
      getStateError,
      city,
      getCityLoader,
      getCityError
    }
  } = state;
  return {
    country,
    getCountryLoader,
    getCountryError,
    states,
    getStateLoader,
    getStateError,
    city,
    getCityLoader,
    getCityError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCountryAction: payload => dispatch(venueAction.getCountry(payload)),
    getStateAction: payload => dispatch(venueAction.getState(payload)),
    getCityAction: payload => dispatch(venueAction.getCity(payload))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(loginStyle)(Step2));

/* <Autocomplete
                    id="country"
                    freeSolo
                    onChange={(event, value) =>
                      this.setState({ countryName: value })
                    }
                    options={
                      ["Pak","ind","afg"]
                    }
                    loading={getCountryLoader ? true : false}
                    renderInput={params => (
                      <div style={{ display: "flex" }}>
                        <TextField
                          {...params}
                          label="Country"
                          margin="normal"
                          style={{ marginTop: "0px" }}
                          fullWidth
                          InputProps={{
                            type: "text",
                            name: "countryName",
                            value: countryName,
                            onChange: this.handleInputForCountry
                          }}
                        />
                        {getCountryLoader ? (
                          <CircularProgress
                            className={classes.loader}
                            size={20}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    )}
    /> */
