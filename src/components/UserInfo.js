import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types'; 
import { dbUsers } from '../firebase';

import {connect} from 'react-redux';
import UserInfoForm from './UserInfoForm';

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
  }

  setInitialData = (props) => {
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

  changeInfo = () => {
    var userInfo = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
      sex: this.state.sex,
      imageUrl: this.state.imageUrl
    }
    let onChangeUser = dbUsers.doChangeUser(userInfo);
    if (onChangeUser) onChangeUser.then(() => {
      this.props.onUpdateInfo(userInfo);
      this.setState({openModal:false})
    })
  }

  phoneValid = (event) => {
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
    const { firstname, lastname, openModal, phone, sex, imageUrl } = this.state;
    const enableSubmit = firstname.length && lastname.length && phone.length === 12;

    return this.props.user ?
    <div>
      <UserInfoForm 
        handleChangeFirstName={(event) => this.setState({firstname: event.target.value})}
        handleChangeLastName={(event) => this.setState({lastname: event.target.value})}
        handleChangeSex={(e, {sex}) => this.setState({sex})}
        setUrl={(url) => { this.setState({imageUrl: url})}}
        handleChangeInfo={() => this.setState({openModal:!openModal})}
        firstname={firstname}
        lastname={lastname}
        phone={phone}
        sex={sex}
        imageUrl={imageUrl}
        phoneValid={this.phoneValid}
        userprops={this.props}
        setInitialData={this.setInitialData}
        enableSubmit={enableSubmit}
        changeInfo={this.changeInfo}
        openModal={openModal}
        />
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

const mapStateToProps = (state) => {
  return {user: state.auth}
}

const mapDispatchToProps = (dispatch) => {
  return {onUpdateInfo: user => dispatch({type: 'SET_USER', payload: user})}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
