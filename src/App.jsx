import 'styles/app.scss';

import React, {Fragment} from 'react';
import ReactDom from 'react-dom';
import {Redirect, Switch} from "react-router";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from "react-redux";
import Store from "./Store";
import NotFound from "./components/NotFound";
import LandingScreen from "./screens/LandingScreen";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      localStorage.getItem('user')
        ? Store.getState().auth.isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
        : <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
    )} />
  );
};

const Root = ({ store }) => (
  <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route path="/" exact component={LandingScreen} />

            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
  </Provider>
);

ReactDom.render(<Root store={Store}/>, document.getElementById('app'));
