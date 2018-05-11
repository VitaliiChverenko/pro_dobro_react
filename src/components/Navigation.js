import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './auth/SignOut';
import * as routes from '../constants/routes';
import {connect} from 'react-redux';

const Navigation = (props) => {
  return props.auth
      ? <NavigationAuth email={props.auth.email}/>
      : <NavigationNonAuth />
}

const NavigationAuth = (props) =>
  <ul>
    <li><Link to={ routes.CAMPAIGNS }>Campaigns</Link></li>
    <li><Link to={ routes.NEWS }>News</Link></li>
    <li><Link to={ routes.CONTACTS }>Contacts</Link></li>
    <li><Link to={ routes.ABOUT_US }>About us</Link></li>
    <li><Link to={ routes.USERINFO }>{props.email}</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={ routes.CAMPAIGNS }>Campaigns</Link></li>
    <li><Link to={ routes.NEWS }>News</Link></li>
    <li><Link to={ routes.SIGN_IN }>Sign in</Link></li>
  </ul>

export default connect(
  state => ({
    auth: state.auth
  })
)(Navigation);
