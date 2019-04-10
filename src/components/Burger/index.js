import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.css';
import BurgerIngredient from './BurgerIngredient';

let dummyData = null;

let message = <h6>P.S. and remember that it is not the game -
  it's service and please don't play with ingredients!</h6>;

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...new Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient type={igKey} key={igKey + i}/>
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>
      Please, start adding ingredients!
    </p>;
    dummyData = message;
  }

  if (transformedIngredients.length >= 1) {
    dummyData = null;
  }
  
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      {dummyData}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

burger.propTypes = {
  transformedIngredients: PropTypes.arrayOf(PropTypes.string)
};

export default burger;