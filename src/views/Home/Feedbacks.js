import React, { Component } from "react";

import RatingSystem from "./RatingSystem";

export default class Feedbacks extends Component {
  componentDidMount() {
    const { getRating, vid } = this.props;
    getRating({ vid: vid && vid });
  }

  //   getRating = feedbacks => {
  //     let rating = 0;
  //     if (feedbacks && feedbacks.length) {

  //         feedbacks.map(f => {
  //         rating += f.combineRating;
  //       });

  //       rating = rating/feedbacks.length;
  //     }
  //     return rating;
  //   };

  getStarRating = feedback => {
      console.log(feedback)
    //   feedback &&
    //     feedback.length &&
    //     feedback.map(f => {
    //       return <li>{f.combineRating}</li>;
    //     });
  };

  render() {
    const { vid, feedbacked } = this.props;
    // console.log("feedback=> ", feedbacked)
    return (
      <div>
        <RatingSystem
          combineRating={() => {
            this.getStarRating(feedbacked);
          }}
        />
        {/* {feedbacked &&
          feedbacked.length &&
          feedbacked.map((feedbacks, index) => {
            console.log("feed back: ", feedbacks.combineRating);
            return
               (
             <div key={index}>
              {" "}
              {/* <RatingSystem combineRating={feedbacks.combineRating} /> 
               <li>{feedbacks.combineRating}</li>
              {" "}
            </div>;
            );
          })} */}
        {/* <RatingSystem combineRating={} /> */}
        {/* <li>{vid}</li> */}
      </div>
    );
  }
}
