import React, {Component} from 'react';
import {Route} from "react-router-dom";
import PropTypes from 'prop-types';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends Component {
  // ToDo: replace this dummy data

  constructor(props) {
    super(props);

    this.state = {
      ingredients: {
        salad: 1,
        meat: 1,
        cheese: 1,
        bacon: 1
      }
    }
  }
  
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients: ingredients});
  }
  
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
        <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
      </div>
    );
  }
}

Checkout.propTypes = {
  ingredients: PropTypes.object,
  salad: PropTypes.number,
  meat: PropTypes.number,
  cheese: PropTypes.number,
  bacon: PropTypes.number
};

export default Checkout;