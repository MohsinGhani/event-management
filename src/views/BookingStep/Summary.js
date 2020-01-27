import React, { Component } from "react";
import Card from "components/Card/Card.jsx";
import { venueAction } from "./../../store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Summary extends Component {
    componentDidMount() {
        if (!this.props.savedBookingData) {
            // this.props.history.goBack()
            alert('Booking Data is Required to continue Booking Steps')
        }
    }

    render() {
        return (
            <Card>Booking Details</Card>
        )
    }
}

const mapStateToProps = state => {
    const {
        venueReducer: {
            savedBookingData
        }
    } = state;
    return {
        savedBookingData
    };
};
const mapDispatchToProps = dispatch => {
    return {
        saveBookingData: payload => dispatch(venueAction.saveBookingData(payload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Summary));