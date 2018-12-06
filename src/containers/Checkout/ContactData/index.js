import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner';
import classes from './index.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      email: '',
      address: {
        street: '',
        postalCode: ''
      },
      loading: false
    }
  }
  
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Valery Filipev',
        address: {
          street: 'Reymonta 46',
          zipCode: '230029',
          country: 'Belarus'
        },
        email: 'valeranuzhdin1998@mail.ru'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false});
      });
  };
  
  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
        <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
        <input className={classes.Input} type="text" name="street" placeholder="Street"/>
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner/>;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

ContactData.propTypes = {
  loading: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.object,
  street: PropTypes.string,
  postalCode: PropTypes.string
};

export default ContactData;