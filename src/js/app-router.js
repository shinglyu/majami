import React from 'react';
import Router from 'react-router';
import AppRouter from './app-router';

import App from './components/app';
import Home from './components/home';
import HelpMeTake from './components/help-me-take';
import Pickup from './components/pickup';

let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;

export default (
  <Route name='root' path='/' handler={App}>
    <DefaultRoute handler={Home}/>
    <Route name='home' handler={Home} />
    <Route name='help-me-take' handler={HelpMeTake} />
    <Route name='pickup' handler={Pickup} />
  </Route>
);
