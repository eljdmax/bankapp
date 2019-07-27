import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import Gear from './Gear';
import Weapon from './Weapon';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <CookiesProvider>
  <Router>
    <Switch>
      <Redirect from="/" exact to="/gear/" />
      <Route path="/gear/"  component={Gear} />
      <Route path="/weapon/" component={Weapon} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
  </CookiesProvider>,
  document.getElementById('root'),
);

function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
