import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './auth/SignOut';
import * as routes from '../constants/routes';
import AuthUserContext from './auth/AuthUserContext';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <ul>
    <li><Link to={ routes.CAMPAIGNS }>Campaigns</Link></li>
    <li><Link to={ routes.NEWS }>News</Link></li>
    <li><Link to={ routes.CONTACTS }>Contacts</Link></li>
    <li><Link to={ routes.ABOUT_US }>About us</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={ routes.CAMPAIGNS }>Campaigns</Link></li>
    <li><Link to={ routes.NEWS }>News</Link></li>
    <li><Link to={ routes.SIGN_IN }>Sign in</Link></li>
  </ul>

export default Navigation;
