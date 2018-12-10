import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Order from '../../components/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';

class Orders extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      orders: [],
      loading: true
    }
  }
  
  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({loading: false, orders: fetchedOrders})
      })
      .catch(err => {
        this.setState({loading: false})
      });
  }
  
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}/>
        ))}
      </div>
    );
  }
}

Orders.proptypes = {
  orders: PropTypes.array,
  loading: PropTypes.bool
};

export default withErrorHandler(Orders, axios);