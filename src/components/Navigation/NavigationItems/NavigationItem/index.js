import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.css';

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <a
      href={props.link}
      className={props.active
        ?
        classes.active
        :
        null}>{props.children}</a>
  </li>
);

navigationItem.propTypes = {
  children: PropTypes.string
};

export default navigationItem;