import React, { Component } from 'react'
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
import BookingStepper from "./../BookingStepper/BookingStepper"

class BookingStep extends Component {
    render() {
        return (
          <div>
            <AuthenticatedNavbar />
            <BookingStepper />
          </div>
        );
    }
}
export default BookingStep