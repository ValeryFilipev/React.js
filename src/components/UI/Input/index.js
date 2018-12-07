import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.css';

const input = (props) => {
  let inputElement = null;
  
  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}/>;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}/>;
      break;
    default:
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}/>
  }
  
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
};

input.proptypes = {
  elementType: PropTypes.string.isRequired,
  inputElement: PropTypes.object.isRequired
};

export default input;