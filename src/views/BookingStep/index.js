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
    address: "",
    perHead: 100,
  };

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  childToParent = childData => {
    this.setState({
      countryName: childData.countryName,
      stateName: childData.stateName,
      cityName: childData.cityName
    });
  };

  render() {
    const {
      name,
      email,
      contactNumber,
      countryName,
      stateName,
      cityName,
      address,
      perHead
    } = this.state;
    return (
      <div>
        <AuthenticatedNavbar navBgColor={'rose'} />
        <BookingStepper
          name={name}
          email={email}
          contactNumber={contactNumber}
          countryName={countryName}
          stateName={stateName}
          cityName={cityName}
          address={address}
          perHead={perHead}
          childToParent={this.childToParent}
          handleOnChange={this.handleOnChange}
        />
      </div>
    );
  }
}
export default BookingStep;
