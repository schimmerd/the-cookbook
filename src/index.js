import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

// core component
import RecipeWorld from "./layouts/RecipeWorld.js"

// css
//import 'antd/dist/antd.css'
import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory()

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/recipes" component={RecipeWorld} />
      <Redirect from="/" to="/recipes/search" />
    </Switch>
  </Router>,
  document.getElementById('root')
);