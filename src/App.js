import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Logout from "./containers/Auth/Logout";
import Spinner from "./components/UI/Spinner"
import * as actions from "./store/actions/index";

const Checkout = React.lazy(() => {
  return import("./containers/Checkout");
});

const Orders = React.lazy(() => {
  return import("./containers/Orders");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth");
});

const app = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  
    let routes = (
      <Switch>
        <Route path="/auth" render={() => <Auth/>} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth" render={() => <Auth/>} />
          <Route path="/checkout" render={() => <Checkout/>} />
          <Route path="/orders" render={() => <Orders/>} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          <Suspense fallback={<Spinner/>}>{routes}</Suspense>
        </Layout>
      </div>
    );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(app)
);
