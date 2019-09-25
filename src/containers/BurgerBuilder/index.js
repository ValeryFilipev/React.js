import React, { useState, useEffect, useCallback } from "react";
import classes from "./index.css";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

const burgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  const [opened, setOpened] = useState(true);
  
  const dispatch = useDispatch();
  
  const ings = useSelector(state => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector(state => {
    return state.burgerBuilder.totalPrice;
  });
  const error = useSelector(state => {
    return state.burgerBuilder.error;
  });
  const isAuthenticated = useSelector(state => {
    return state.auth.token !== null;
  });
  
  const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = ingName => dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));
  
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum < 9
      ? sum > 0
      : alert(
          "Obviously, we can not serve such kind of burger. " +
            "Please, will re-choose and try it again, if you want to be served. " +
            "For now, we have to block the order-button. Sorry!"
        );
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const goOnHandler = () => {
    props.history.push("/");
    setOpened(false);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ings
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = error ? (
    <p>Ingredients can not be loaded!</p>
  ) : (
    <Spinner />
  );

  if (ings) {
    burger = (
      <>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          price={price}
        />
      </>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }
  // {salad: true, meat: false, ..}
  return (
    <>
      <Modal show={opened}>
        <div className={classes.container}>
          <span className={classes.headline}>Welcome!</span>
          <button className={classes.button} onClick={goOnHandler}>
            Go On!
          </button>
        </div>
      </Modal>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

burgerBuilder.propTypes = {
  purchasable: PropTypes.bool,
  purchasing: PropTypes.bool,
  purchaseHandler: PropTypes.func,
  purchaseCancelHandler: PropTypes.func,
  purchaseContinueHandler: PropTypes.func,
  updatePurchaseState: PropTypes.func
};

export default withErrorHandler(burgerBuilder, axios);
