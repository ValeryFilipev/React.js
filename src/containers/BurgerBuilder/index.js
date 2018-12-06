import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    };
  }

  componentDidMount () {
    axios.get('https://react-my-burger-65639.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data});
      })
      .catch(error => {
        this.setState({error: true});
      });
  };
  
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  };

  purchaseContinueHandler = () => {
    // //alert('You continue!');
    // this.setState({loading: true});
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Valery Filipev',
    //     address: {
    //       street: 'Reymonta 46',
    //       zipCode: '230029',
    //       country: 'Belarus'
    //     },
    //     email: 'valeranuzhdin1998@mail.ru'
    //   },
    //   deliveryMethod: 'fastest'
    // };
    // axios.post('/orders.json', order)
    //   .then(response => {
    //     this.setState({loading: false, purchasing: false});
    //   })
    //   .catch(error => {
    //     this.setState({loading: false, purchasing: false});
    //   });
    this.props.history.push('/checkout');
  };

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can not be loaded!</p> : <Spinner/>;

    if (this.state.ingredients) {
      burger = (
        <>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice} />
        </>
      );
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>;
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>;
    }
    // {salad: true, meat: false, ..}
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
      {burger}
      </>
    );
  }
}

BurgerBuilder.propTypes = {
  ingredients: PropTypes.object,
  totalPrice: PropTypes.number,
  purchasable: PropTypes.bool,
  purchasing: PropTypes.bool,
  loading: PropTypes.bool,
  INGREDIENT_PRICES: PropTypes.object,
  salad: PropTypes.number,
  cheese: PropTypes.number,
  meat: PropTypes.number,
  bacon: PropTypes.number,
  purchaseHandler: PropTypes.func,
  purchaseCancelHandler: PropTypes.func,
  purchaseContinueHandler: PropTypes.func,
  updatePurchaseState: PropTypes.func,
  addIngredientHandler: PropTypes.func,
  removeIngredientHandler: PropTypes.func
};

export default withErrorHandler(BurgerBuilder, axios);