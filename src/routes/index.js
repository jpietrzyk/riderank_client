//====================
// Import React and the dependencies we need to make react router work
//====================
import React from 'react';
import { Route, IndexRoute } from 'react-router';

//====================
// Import the different components that will represent the different pages
// of our website.
//====================
import App from '../components/App';
import DashBoard from '../components/Dashboard';
import Login from '../components/Login';

//====================
// Define our routes
//====================
export default (
  <Route path='/' component={App}>
    <IndexRoute component={DashBoard} />
    <Route path='dashboard' component={DashBoard} />
    <Route path='login' component={Login} />
  </Route>
);
