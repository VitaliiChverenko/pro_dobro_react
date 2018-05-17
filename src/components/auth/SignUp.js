import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { auth, dbUsers } from '../../firebase';
import * as routes from '../../constants/routes';
import { connect } from 'react-redux';

class SignUp extends Component {
  render () {
    return (
      !this.props.user ?
      <div className="ui three column centered grid">
        <div className="column">
          <h1>Sign Up</h1>
          <SignUpForm />
        </div>
      </div>
      : <Redirect to="/news" />
    );
  }
}

const INITIAL_STATE = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const {
      firstname,
      lastname,
      email,
      phone,
      passwordOne,
    } = this.state;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        dbUsers.doCreateUser(authUser.uid, firstname, lastname, email, phone)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      firstname,
      lastname,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      firstname === '' ||
      lastname === '';

    return (
      <form onSubmit={this.onSubmit} className="ui form">
        <div className="field">
          <label>First Name *</label>
          <input
              value={firstname}
              onChange={event => this.setState(byPropKey('firstname', event.target.value))}
              type="text"
              placeholder="First Name"
            />
        </div>
        <div className="field">
          <label>Last Name *</label>
          <input
            value={lastname}
            onChange={event => this.setState(byPropKey('lastname', event.target.value))}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <div className="field">
          <label>Email Address *</label>
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="field">
          <label>Password *</label>
          <input
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="field">
          <label>Confirm Password *</label>
          <input
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <button disabled={isInvalid} type="submit" className="ui button">
          Sign Up
        </button>
        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <div className="style-link">
    <Link to={routes.SIGN_UP} className="ui small grey header">Don't have an account?</Link>
  </div>

export default connect(
  state=>({
    user: state.auth
  })
)(SignUp);

export {
  SignUpForm,
  SignUpLink,
};
