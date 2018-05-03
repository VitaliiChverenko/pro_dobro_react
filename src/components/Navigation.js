import React, {Component} from 'react';
import { Link, BrowserRouter} from 'react-router-dom';
import * as routes from '../constants/routes';
import{Button} from 'semantic-ui-react';


const Navigation = () =>
<BrowserRouter>
  <ul>
    <li><Link to={routes.NEWS}>News</Link></li>
    <li><Link to={routes.CONTACTS}>Contacts</Link></li>
    <li><Link to={routes.ABOUT_US}>About us</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign in</Link></li>
    <li><Link to={routes.SIGN_UP}>Sign up</Link></li>
  </ul>
</BrowserRouter>
export default Navigation;