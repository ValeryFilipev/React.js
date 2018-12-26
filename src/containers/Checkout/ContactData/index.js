import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner';
import classes from './index.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actions from '../../../store/actions';

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
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code',
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 6,
            isNumeric: true
          },
          valid: false,
          touched: false
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your E-Mail'
          },
          value: '',
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
            ]
          },
          value: 'fastest',
          validation: {},
          valid: true
        }
      },
      formIsValid: false,
      loading: false
    }
  }
  
  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};

    for (let formElementIdentifier in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(formElementIdentifier)) {
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
      }
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };
  
    this.props.onOrderBurger(order);
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value,
      updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  };
  
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        formElementsArray.push({
          id: key,
          config: this.state.orderForm[key]
        });
      }
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  onOrderBurger: (orderData) => dispatch(actions.purchaseBurgerStart(orderData))
};

ContactData.propTypes = {
  orderForm: PropTypes.objectOf(PropTypes.object),
  name: PropTypes.object,
  street: PropTypes.object,
  zipCode: PropTypes.object,
  country: PropTypes.object,
  email: PropTypes.object,
  deliveryMethod: PropTypes.object,
  loading: PropTypes.bool,
  orderHandler: PropTypes.func,
  checkValidity: PropTypes.func,
  inputChangedHandler: PropTypes.func
};

export default connect(mapStateToProps)(withErrorHandler(ContactData, axios));