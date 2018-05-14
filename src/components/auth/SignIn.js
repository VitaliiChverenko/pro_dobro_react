import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import { dbUsers } from '../../firebase';

const SignIn = ({ history }) =>
  <div className="ui three column centered grid">
    <div className="column">
      <h1>Sign In</h1>
      <SignInForm history={history} />
      <SignUpLink />
    </div>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then((user) => {
        dbUsers.doGetUser(user.uid).then(res => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.NEWS);
        })
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit} className="ui form">
        <div className="field">
          <label>Email</label>
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
            placeholder="Password"
          />
        </div>
        <button disabled={isInvalid} type="submit" className="ui button">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignIn);
