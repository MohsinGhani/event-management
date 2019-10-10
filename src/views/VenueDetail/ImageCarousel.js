import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export default class ImageCarousel extends Component {
  render() {
    const { venue } = this.props;
    return (
      <div>
        <AliceCarousel
          autoPlay={true}
          autoPlayInterval={3000}
          responsive={true}
          showSlideInfo={true}
          fadeOutAnimation={true}
          mouseDragEnabled={true}
        >
          {venue.url.map(source => (
            <img src={source} alt="venues" width="100%" height="480px" />
          ))}
        </AliceCarousel>
      </div>
    );
  }
}
