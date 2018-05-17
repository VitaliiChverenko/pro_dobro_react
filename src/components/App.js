import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './Header';
import CampaignsIndex from './campaigns/index';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import Footer from './Footer';
import News from './news/News';
import ContactsPage from './contacts/ContactsPage'
import UserInfo from './UserInfo';
import PasswordForget from './auth/PasswordForget';
import AboutUs from './AboutUs.js';

import * as routes from '../constants/routes';
import WithAuthentication from './auth/withAuthentication';

const App = () =>
<WithAuthentication>
  <BrowserRouter>
    <div className="all-content">
      <Header />
      <div className="main-content">
        <Route exact path={ routes.CAMPAIGNS } component={CampaignsIndex} />
        <Route exact path={ routes.NEWS } component={News} />
        <Route exact path={ routes.CONTACTS } component={ContactsPage} />
        <Route exact path={ routes.ABOUT_US } component={AboutUs} />
        <Route exact path={ routes.USERINFO } component={UserInfo} />
        <Route exact path={ routes.SIGN_UP } component={SignUp} />
        <Route exact path={ routes.SIGN_IN } component={SignIn} />
        <Route exact path={ routes.PASSWORD_FORGET } component={PasswordForget} />
        <Redirect from="*" to="/news" />
      </div>
      <Footer />
    </div>
  </BrowserRouter>
</WithAuthentication>

export default App;
