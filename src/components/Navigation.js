import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

const Navigation = () =>
  <div>
    <ul>
      <li><Link to={routes.NEWS}>News</Link></li>
      <li><Link to={routes.CONTACTS}>Contacts</Link></li>
      <li><Link to={routes.ABOUT_US}>About us</Link></li>
      <li><Link to={routes.SIGN_IN}>Sign in</Link></li>
      <li><Link to={routes.SIGN_UP}>Sign up</Link></li>
    </ul>
  </div>

export default Navigation;
