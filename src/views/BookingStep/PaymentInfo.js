import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

class PaymentInfo extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { complete: false };
  //     this.submit = this.submit.bind(this);
  //   }

  state = {
    complete: false
  };

  submit = async ev => {
    // User clicked submit
    let { token } = await this.props.stripe.createToken({
      name: "muhammad soban"
    });
    fetch("https://admin-server-2.herokuapp.com/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { complete } = this.state;
    if (complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}

export default injectStripe(PaymentInfo);
