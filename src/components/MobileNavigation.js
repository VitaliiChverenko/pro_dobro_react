import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import SignOutButton from './auth/SignOut';
import * as routes from '../constants/routes';
import {connect} from 'react-redux';

const MobileNavigation = props => {
  return (
    <div>
      <Menu.Item name='campaigns'>
        <Link to={ routes.CAMPAIGNS } 
              onClick={props.toggleVisibility} 
              className="ui small inverted grey header">Campaigns</Link>
      </Menu.Item>
      <Menu.Item name='news'>
        <Link to={ routes.NEWS } 
              onClick={props.toggleVisibility} 
              className="ui small inverted grey header">News</Link>
      </Menu.Item>
      <Menu.Item name='contacts'>
        <Link to={ routes.CONTACTS } 
              onClick={props.toggleVisibility} 
              className="ui small inverted grey header">Contacts</Link>
      </Menu.Item>
      <Menu.Item name='about_us'>
        <Link to={ routes.ABOUT_US } 
              onClick={props.toggleVisibility} 
              className="ui small inverted grey header">About us</Link>
      </Menu.Item>
      { 
        props.auth ? 
          <div>
            <Menu.Item name='user_info'>
              <Link to={ routes.USERINFO } 
                    onClick={props.toggleVisibility} 
                    className="ui small inverted grey header">
                      Logged as : <br />
                      <span className="logged"> 
                        {props.auth.firstname} 
                      </span>
              </Link>
            </Menu.Item>
            <Menu.Item name='sign_out'>
              <SignOutButton />
            </Menu.Item>
          </div>
          :
          <div>
            <Menu.Item name='sign_in'>
              <Link to={ routes.SIGN_IN } 
                    onClick={props.toggleVisibility} 
                    className="ui inverted grey basic button">Sign in</Link>
            </Menu.Item>
            <Menu.Item name='sign_up'>
              <Link to={ routes.SIGN_UP } 
                    onClick={props.toggleVisibility} 
                    className="ui inverted grey basic button">Sign up</Link>
            </Menu.Item>
          </div>
        }
    </div> 
)}

export default connect(
  state => ({
    auth: state.auth
  })
)(MobileNavigation);
