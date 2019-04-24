import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Order from '../../components/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner';

const orders = props => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, []);
  
  
    let orders = <Spinner/>;
    if (!props.loading) {
      orders = props.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}/>
          ))}
    return (
      <div>
        {orders}
      </div>
    );
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
};

orders.proptypes = {
  mapDispatchToProps: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));