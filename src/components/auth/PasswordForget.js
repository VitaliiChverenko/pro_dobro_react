import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { auth } from '../../firebase';
import { connect } from 'react-redux';

class PasswordForget extends Component {
  render () {
    return (
      !this.props.user ?
      <div className="ui three column centered grid">
        <div className="column">
          <h1>Password Forget</h1>
          <PasswordForgetForm />
        </div>
      </div>
      : <Redirect to="/news" />
    );
  }
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit} className="ui form">
        <div className="field">
          <label>Email Address</label>
          <input
            value={this.state.email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <button disabled={isInvalid} type="submit" className="ui button">
          Reset My Password
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const PasswordForgetLink = () =>
  <div className="style-link">
    <Link to="/pw-forget" className="ui small grey header">Forgot Password?</Link>
  </div>

export default connect(
  state=>({
    user: state.auth
  })
)(PasswordForget);

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
