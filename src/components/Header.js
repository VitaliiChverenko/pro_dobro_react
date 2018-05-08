import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../media/images/prodobro2.png';
import Navigation from './Navigation'

const Header = props =>
  <div className="ui inverted segment">
    <div className="ui container">
      <Link to="/news"><img src={ logo } alt="logo" /></Link>
      <Navigation authUser={ props.authUser } />
    </div>
  </div>

export default Header;
