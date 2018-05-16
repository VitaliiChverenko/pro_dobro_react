import React, {Component} from 'react';
import { Form, Button, Modal, Checkbox } from 'semantic-ui-react'
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types'; 
import avatar from '../media/images/avatar.jpeg';
import { dbUsers } from '../firebase';

import {connect} from 'react-redux';

export class UserInfo extends Component{
  constructor(props){
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      imageUrl: '',
      sex: '',
      openModal: false
    }
    this.setInitialData = this.setInitialData.bind(this)
    this.phoneValid = this.phoneValid.bind(this)
    this.changeInfo = this.changeInfo.bind(this)
  }

  closeModal = () => this.setState({ openModal: false })
  handleChangeInfo = () => this.setState({openModal:true})
  handleChangeSex = (e, { sex }) => this.setState({ sex })

  setInitialData(props){
    if (props.user) {
      this.setState({
        firstname: props.user.firstname,
        lastname: props.user.lastname,
        phone: props.user.phone,
        email: props.user.email,
        imageUrl: props.user.imageUrl,
        sex: props.user.sex
      });
    }
  }

  changeInfo() {
    var userInfo = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
      sex: this.state.sex
    }
    let onChangeUser = dbUsers.doChangeUser(userInfo);
    if (onChangeUser) onChangeUser.then(() => {
      this.props.onUpdateInfo(userInfo);
      this.setState({openModal:false})
    })
  }
  
  phoneValid(event){
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
       this.setState({phone: event.target.value})
    }
  }

  componentDidMount() {
    this.setInitialData(this.props);
  }
  componentWillReceiveProps(props) {
    this.setInitialData(props)
  }
  

  render() {
    const { firstname, lastname, openModal, phone, sex } = this.state;
    const enabled = firstname.length && lastname.length && phone.length === 12;

    return this.props.user ?
      <div className="ui five wide column grid">
        <div className='one column'>
        </div>
        <div className='four wide column'>
          <Form>
            <Form.Field>
              <label>First Name</label>
              <input onChange={event => this.setState({firstname: event.target.value})} 
                value = {firstname} placeholder='First Name' />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input onChange={event => this.setState({lastname: event.target.value})}
              value = {lastname} placeholder='Last Name' />
            </Form.Field>
            <Form.Field>
              <label>Phone number</label>
              <input onChange={this.phoneValid}
              value = {phone} placeholder='Phone number' />
            </Form.Field>
            <Form.Field>
            <label>Choose sex</label>
              <Checkbox
                radio
                label='Male'
                name='checkboxRadioGroup'
                sex='Male'
                checked={sex === 'Male'}
                onChange={this.handleChangeSex}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='Female'
                name='checkboxRadioGroup'
                sex='Female'
                checked={sex === 'Female'}
                onChange={this.handleChangeSex}
              />
            </Form.Field>
            <Modal size='tiny' open={openModal}>
              <Modal.Header>
              <p>Do you want to change user info?</p>
              </Modal.Header>
              <Modal.Actions>
                <Button onClick={this.closeModal} negative content='No' />
                <Button onClick={this.changeInfo} positive icon='checkmark' labelPosition='right' content='Yes' />
              </Modal.Actions>
            </Modal>
            <Button disabled={!enabled} inverted color='green' type='submit' onClick={this.handleChangeInfo}>Submit</Button>
            <Button inverted color='red' onClick={() => this.setInitialData(this.props)}>Reset</Button>
          </Form>
        </div>
        <div className='four wide column'>
        </div>
          <Form.Field>
            <br />
            <div className='avatar' style={{backgroundImage: `url('${avatar}')` }}>
              <img className='avatar' src={this.state.imageUrl} alt=''/>
            </div>
            <br />
            <Button>Change photo</Button>
          </Form.Field>
        </div>
        : <Redirect to='/news' />
  }
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    phone: PropTypes.string,
    sex: PropTypes.string,
    imageUrl: PropTypes.string
  })
}

export default connect(
  state => ({
    user: state.auth
  }),
  dispatch => ({
    onUpdateInfo: user => dispatch({type: 'SET_USER', payload: user}),
  })
)(UserInfo);
