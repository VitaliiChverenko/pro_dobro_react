import React, {Component} from 'react';
import { Form, Button } from 'semantic-ui-react'

import { dbUsers } from '../firebase';

import {connect} from 'react-redux';
import * as routes from '../constants/routes';

export class UserInfo extends Component{
  constructor(props){
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      phone: null,
      email: ''
    }

    this.setInitialData = this.setInitialData.bind(this)
    this.changeInfo = this.changeInfo.bind(this)
  }
  
  setInitialData(props){
    if (props.user) {
      this.setState({
        firstname: props.user.firstname,
        lastname: props.user.lastname,
        phone: props.user.phone,
        email: props.user.email
      });
    }
  }

  changeInfo() {
    var userInfo = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone
    }
    dbUsers.doChangeUser(userInfo.firstname, userInfo.lastname, userInfo.email, userInfo.phone);
    this.props.history.push(routes.NEWS);
  }

  componentDidMount() {
    this.setInitialData(this.props);
  }
  componentWillReceiveProps(props) {
    this.setInitialData(props)
  }

  render() {
    const { firstname, lastname } = this.state;
    const enabled = firstname.length > 0 && lastname.length > 0;

    return (
      <div>{ this.props.user &&
        <Form>
          <Form.Field>
            <label>First Name</label>
            <input onChange={event => this.setState({firstname: event.target.value})} 
              value = {this.state.firstname} placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input onChange={event => this.setState({lastname: event.target.value})}
             value = {this.state.lastname} placeholder='Last Name' />
          </Form.Field>
          <Form.Field>
            <label>Phone number</label>
            <input onChange={event => this.setState({phone: event.target.value})}
             value = {this.state.phone} type='number' placeholder='Phone number' />
          </Form.Field>
          <Button disabled={!enabled} type='submit' onClick={this.changeInfo}>Submit</Button>
          <Button onClick={() => this.setInitialData(this.props)}>Reset</Button>
        </Form>}
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.auth
  }),
  dispatch => ({
    onLogIn: user => dispatch({type: 'SET_USER', payload: user}),

  })
)(UserInfo);
