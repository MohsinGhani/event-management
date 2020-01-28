import React, { Component } from "react";
import Card from "components/Card/Card.jsx";
import { venueAction } from "./../../store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

class Summary extends Component {
    componentDidMount() {
        const { servicesBookingPrice, packageArray } = this.props.savedBookingData

        if (!servicesBookingPrice.length && !packageArray.length) {
            this.props.history.goBack()
            alert('Booking Data is Required to continue Booking Steps')
        }
    }

    render() {
        const { servicesBookingPrice, packageArray } = this.props.savedBookingData
        return (
            <Card>
                <CardHeader
                    style={{
                        position: "inherit",
                        opacity: 0.9,
                        display: "flex"
                    }}
                    color={"primary"}
                >
                    <p
                        title={'Booking Details'}
                        style={{
                            width: "100%",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            margin: "5px 0 5px 0"
                        }}
                    >
                        Booking Details
                    </p>
                </CardHeader>

                <CardBody>
                    {
                        (() => {
                            if (servicesBookingPrice && servicesBookingPrice.length) {
                                return (
                                    <div>
                                        <h5>Services</h5>
                                        {
                                            servicesBookingPrice && servicesBookingPrice.map((service) => {
                                                const { title, price } = service
                                                return (
                                                    <ul><li>{title} - (Rs.{price})</li></ul>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }

                            if (packageArray && packageArray.length) {
                                return (
                                    <div>
                                        <h5>Packages</h5>
                                        {
                                            packageArray[0].servicePackages && packageArray[0].servicePackages.map((service) => {
                                                const { title, price } = service
                                                return (
                                                    <ul><li>{title} - (Rs.{price})</li></ul>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        })()
                    }
                </CardBody>
            </Card>
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