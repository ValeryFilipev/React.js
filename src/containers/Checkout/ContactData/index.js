import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner';
import classes from './index.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input';

class ContactData extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
          },
          value: ''
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: ''
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code'
          },
          value: ''
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value: ''
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your E-Mail'
          },
          value: ''
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
              ]
          },
          value: ''
        }
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
        <Input elementType="..." elementConfig="..." value="..."/>
        <Input inputtype="input" type="email" name="email" placeholder="Your Mail"/>
        <Input inputtype="input" type="text" name="street" placeholder="Street"/>
        <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>
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
  orderForm: PropTypes.objectOf(PropTypes.object),
  name: PropTypes.object,
  street: PropTypes.object,
  zipCode: PropTypes.object,
  country: PropTypes.object,
  email: PropTypes.object,
  deliveryMethod: PropTypes.object,
  loading: PropTypes.bool,
  orderHandler: PropTypes.func
};

export default ContactData;