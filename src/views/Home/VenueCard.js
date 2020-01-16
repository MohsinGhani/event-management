import React, { Fragment } from 'react';
import RatingSystem from "./RatingSystem";
import { Carousel } from "react-responsive-carousel";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

const VenueCard = ({ venue, i, combineRating, goto, isPopup }) => {
    return (
        <GridItem md={isPopup ? 12 : 4} key={i}>
            <Card
                children={
                    <Fragment>
                        <CardHeader
                            style={{
                                position: "inherit",
                                opacity: 0.9,
                                display: "flex"
                            }}
                            color={"primary"}
                        >
                            <p
                                title={venue.name}
                                style={{
                                    width: "100%",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    margin: "5px 0 5px 0"
                                }}
                            >
                                {venue.name}
                            </p>
                        </CardHeader>
                        <CardBody
                            className="card-body"
                            style={{ color: "gray", marginTop: 10 }}
                        >
                            <Carousel
                                showThumbs={false}
                                showIndicators={false}
                                autoPlay={true}
                                infiniteLoop={true}
                            >
                                {venue.url.map(source => (
                                    <img
                                        src={source}
                                        alt="some-img"
                                        width="100%"
                                        height="160px"
                                        style={{
                                            // marginTop: "-36px",
                                            borderTopLeftRadius: 5,
                                            borderTopRightRadius: 5
                                        }}
                                    />
                                ))}
                            </Carousel>
                            <div className="card-body-info">
                                <div>
                                    <div
                                        className="address"
                                        style={{ display: "flex", paddingTop: "5px" }}
                                    >
                                        <i
                                            class="fas fa-map-marker-alt"
                                            style={{ padding: "10px 5px 0 0" }}
                                        ></i>
                                        <p
                                            title={venue.address}
                                            style={{
                                                width: "100%",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                                margin: "5px 0 0 0"
                                            }}
                                        >
                                            {venue.address}
                                        </p>
                                    </div>

                                    <div className="contact">
                                        <i
                                            class="fas fa-phone"
                                            style={{ padding: "10px 5px 0 0" }}
                                        ></i>
                                        {venue.phone}
                                    </div>
                                    <div className="email">
                                        <i
                                            class="fas fa-envelope"
                                            style={{ padding: "10px 5px 0 0" }}
                                        ></i>
                                        {venue.email}
                                    </div>
                                    <div className="type">
                                        <i
                                            class="fas fa-list-ul"
                                            style={{ padding: "10px 5px 0 0" }}
                                        ></i>
                                        {venue.objType.title}
                                    </div>
                                </div>

                                <div className="right-panel">
                                    <div
                                        className="dtl-btn-wrapper"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <div style={{ marginTop: "8px" }}>
                                            <RatingSystem combineRating={combineRating} />
                                            {/* <Feedback vid={venue.vid} getRating={getRating} feedbacked={feedbacked} /> */}
                                        </div>

                                        <Button
                                            color="warning"
                                            size="sm"
                                            round
                                            onClick={() => goto(`/venue-detail/${venue.vid}`)}
                                        >
                                            Detail
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Fragment>
                }
            />

        </GridItem>
    )
}

export default VenueCard