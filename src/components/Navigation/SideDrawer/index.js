import React from 'react';

import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import classes from './index.css';
import Backdrop from '../../UI/Backdrop';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  
  return(
    <>
      <Backdrop
        show={props.open}
        clicked={props.closed}
      />
        <div className={attachedClasses.join(' ')}>
          <div className={classes.Logo}>
            <Logo/>
          </div>
          <nav>
            <NavigationItems/>
          </nav>
        </div>
    </>
  );
};

export default sideDrawer;