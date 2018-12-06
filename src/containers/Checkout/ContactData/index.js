import React, {Component} from 'react';

import Button from '../../../components/UI/Button';
import classes from './index.css';

class ContactData extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      email: '',
      address: {
        street: '',
        postalCode: ''
      }
    }
  }
  
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
          <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
          <input className={classes.Input} type="text" name="street" placeholder="Street"/>
          <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    )
  }
}

export default ContactData;