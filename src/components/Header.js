import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from '../media/images/prodobro2.png';
import Navigation from './Navigation'
import SignUpPage from './auth/SignUp';
import SignInPage from './auth/SignIn';

import * as routes from '../constants/routes';

const Header = () =>
  <BrowserRouter>
    <div>
      <a href="#"><img src={ logo } alt="logo" /></a>
      <Navigation />
      <Route
        exact path={ routes.SIGN_UP }
        component={() => <SignUpPage />}
      />
      <Route
        exact path={ routes.SIGN_IN }
        component={ () => <SignInPage /> }
      />
    </div>
  </BrowserRouter>

export default Header;
