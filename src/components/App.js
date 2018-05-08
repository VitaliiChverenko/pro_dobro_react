import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './Header'
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import Footer from './Footer'

import * as routes from '../constants/routes';
import withAuthentication from './auth/withAuthentication';

const App = () =>
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path={routes.SIGN_UP} component={() => <SignUp />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignIn />} />
      <Footer />
    </div>
  </BrowserRouter>

export default withAuthentication(App);
