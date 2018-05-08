import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import CampaignsIndex from './campaigns/index';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import Footer from './Footer';

import * as routes from '../constants/routes';
import withAuthentication from './auth/withAuthentication';

const App = () =>
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path={ routes.CAMPAIGNS } component={CampaignsIndex} />
      <Route exact path={ routes.NEWS } component={() => <h1>news</h1>} />
      <Route exact path={ routes.CONTACTS } component={() => <h1>contacts</h1>} />
      <Route exact path={ routes.ABOUT_US } component={() => <h1>about us</h1>} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUp />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignIn />} />
      <Footer />
    </div>
  </BrowserRouter>

export default withAuthentication(App);
