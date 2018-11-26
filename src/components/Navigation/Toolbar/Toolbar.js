import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';

const toolbar = (props) => (
  <heeader className={classes.Toolbar}>
    <div>MENU</div>
    <Logo/>
    <nav>
      ...
    </nav>
  </heeader>
);

export default toolbar;