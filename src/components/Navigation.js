import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './auth/SignOut';
import * as routes from '../constants/routes';
import {connect} from 'react-redux';

const Navigation = props => {
  return props.auth
      ? <NavigationAuth email={props.auth.email}/>
      : <NavigationNonAuth />
}

const NavigationAuth = props =>
  <div className="ui breadcrumb position-right">
    <Link to={ routes.CAMPAIGNS } className="ui small inverted grey header">Campaigns</Link>
    <span className="ui inverted grey divider header">|</span>
    <Link to={ routes.NEWS } className="ui small inverted grey header">News</Link>
    <span className="ui inverted grey divider header">|</span>
    <Link to={ routes.CONTACTS } className="ui small inverted grey header">Contacts</Link>
    <span className="ui inverted grey divider header">|</span>
    <Link to={ routes.ABOUT_US } className="ui small inverted grey header">About us</Link>
    <span className="ui inverted grey divider header">| Logged as : </span>
    <Link to={ routes.USERINFO } className="ui small inverted grey header">{props.email}</Link>
    <span className="position-btn"><SignOutButton /></span>
  </div>

const NavigationNonAuth = () =>
  <div className="ui breadcrumb position-right">
    <Link to={ routes.CAMPAIGNS } className="ui small inverted grey header">Campaigns</Link>
    <span className="ui inverted grey divider header">|</span>
    <Link to={ routes.NEWS } className="ui small inverted grey header">News</Link>
    <span className="ui inverted grey divider header">|</span>
    <Link to={ routes.CONTACTS } className="ui small inverted grey header">Contacts</Link>
    <span className="ui inverted grey divider header">|</span>
    <Link to={ routes.ABOUT_US } className="ui small inverted grey header">About us</Link>
    <span className="position-btn"><Link to={ routes.SIGN_IN } className="ui inverted grey basic button">Sign in</Link></span>
    <span className="position-btn"><Link to={ routes.SIGN_UP } className="ui inverted grey basic button">Sign up</Link></span>
  </div>

export default connect(
  state => ({
    auth: state.auth
  })
)(Navigation);
