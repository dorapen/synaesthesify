import React from 'react';
import {Switch, Route} from 'react-router-dom';

import MainTemplate from '../templates/MainTemplate/container';

import Home from './Home';
import Analysis from '../components/Analysis/container';

const Routes = () => (
  <Route
    path="/"
    render={({location}) => (
      <MainTemplate location={location}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/test" component={Analysis} />
          <Route
            render={() => (
              <div>
                Nothing found!
              </div>
            )}
          />
        </Switch>
      </MainTemplate>
    )}
  />
);

export default Routes;
