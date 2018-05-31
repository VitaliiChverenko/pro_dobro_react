import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'
import logo from '../media/images/prodobro2.png';
import Navigation from './Navigation'

const Header = props =>
  <div className="ui header-nav segment inverted no-margin">
    <div className="ui container">
      <Link to="/news"><img src={ logo } alt="logo" /></Link>
      <div className="descktop-menu position-right">
        <Navigation authUser={ props.authUser } />
      </div>
      <div className="mobile-menu position-right" onClick={props.menuToggle}>
        <Icon name='sidebar' size='big' />
      </div>
    </div>
  </div>

export default Header;
