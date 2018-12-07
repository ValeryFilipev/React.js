import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classes from './index.css';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer';

class Layout extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showSideDrawer: false
    };
  }
  
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  };
  
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    })
  };
  
  render() {
    return (
      <>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </>
    )
  }
}

Layout.proptypes = {
  sideDrawerClosedHandler: PropTypes.func,
  sideDrawerToggleHandler: PropTypes.func
};

export default Layout;