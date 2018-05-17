import React, {Component} from 'react';
import {connect} from 'react-redux'
import { dbContacts } from '../../firebase';
import { List, Header } from 'semantic-ui-react'

class ContactsList extends Component{
  componentDidMount(){
    dbContacts.onceGetContacts().then(snapshot => {
      this.props.setContacts({...snapshot.val()});
    })
  }
  render(){
    return(
      <List>
        <Header size='small' color='teal' textAlign='left'>CONTACTS</Header>
        <List.Item icon='mail' content={this.props.contacts.email} />
        <List.Item icon='phone' content={this.props.contacts.phone} />
        <List.Item icon='home' content={this.props.contacts.address.address} />
      </List>
    )}
}


export default connect(
  state => ({
    contacts: state.contacts
  }),
  dispatch => ({
    setContacts: contacts => dispatch({type:"SET_CONTACTS", payload: contacts})
  })
)(ContactsList);
