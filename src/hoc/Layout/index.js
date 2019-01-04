import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

Layout.proptypes = {
  showSideDrawer: PropTypes.bool,
  sideDrawerClosedHandler: PropTypes.func,
  sideDrawerToggleHandler: PropTypes.func
};

export default connect(mapStateToProps)(Layout);