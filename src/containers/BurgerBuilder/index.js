import React, { useState, useEffect } from 'react';
import classes from './index.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const burgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  const [opened, setOpened] = useState(true);

  useEffect(() => {
    props.onInitIngredients();
  }, []);
  
  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum < 9 ? sum > 0 : alert('Obviously, we can not serve such kind of burger. ' +
      'Please, will re-choose and try it again, if you want to be served. ' +
      'For now, we have to block the order-button. Sorry!');
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
        props.onSetAuthRedirectPath('/checkout');
        props.history.push('/auth');
    }
  };
  
  const goOnHandler = () => {
    props.history.push('/');
    setOpened(false);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };
  
    const disabledInfo = {
      ...props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can not be loaded!</p> : <Spinner/>;

    if (props.ings) {
      burger = (
        <>
        <Burger ingredients={props.ings}/>
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
          price={props.price} />
        </>
      );
      orderSummary = <OrderSummary
        ingredients={props.ings}
        price={props.price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}/>;
    }
    // {salad: true, meat: false, ..}
    return (
      <>
        <Modal show={opened}>
          <div className={classes.container}>
            <span className={classes.headline}>Welcome!</span>
            <button
              className={classes.button}
              onClick={goOnHandler}>Go On!</button>
          </div>
        </Modal>
        <Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}>
          {orderSummary}
        </Modal>
      {burger}
      </>
    );
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
};

burgerBuilder.propTypes = {
  purchasable: PropTypes.bool,
  purchasing: PropTypes.bool,
  purchaseHandler: PropTypes.func,
  purchaseCancelHandler: PropTypes.func,
  purchaseContinueHandler: PropTypes.func,
  updatePurchaseState: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));