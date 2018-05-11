import React from 'react';
import './auth-style.css';
import { auth } from '../../firebase';

const SignOutButton = () =>
  <button
    className="ui inverted grey basic button"
    type="button"
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>

export default SignOutButton;
