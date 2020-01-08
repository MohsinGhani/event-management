import React, { Component } from "react";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
import BookingStepper from "./../BookingStepper/BookingStepper";

class BookingStep extends Component {
  state = {
    name: "",
    email: "",
    contactNumber: "",
    countryName: "",
    stateName: "",
    cityName: "",
    address: ""
  };

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const {
      name,
      email,
      contactNumber,
      countryName,
      stateName,
      cityName,
      address
    } = this.state;
    return (
      <div>
        <AuthenticatedNavbar />
        <BookingStepper
          name={name}
          email={email}
          contactNumber={contactNumber}
          countryName={countryName}
          stateName={stateName}
          cityName={cityName}
          address={address}
          handleOnChange={this.handleOnChange}
        />
      </div>
    );
  }
}
export default BookingStep;
