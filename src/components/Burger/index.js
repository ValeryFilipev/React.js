import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.css';
import BurgerIngredient from './BurgerIngredient';

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
    transformedIngredients = <p>Please, start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

burger.propTypes = {
  transformedIngredients: PropTypes.arrayOf(PropTypes.string)
};

export default burger;