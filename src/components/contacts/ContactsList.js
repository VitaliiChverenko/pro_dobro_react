import React, {Component} from 'react';
import {connect} from 'react-redux'
import { dbContacts } from '../../firebase';
import { List, Header } from 'semantic-ui-react'

export const ContactsList = props => {
  return(
    <List>
      <Header size='small' color='teal' textAlign='left'>CONTACTS</Header>
      <List.Item icon='mail' content={props.contacts.email} />
      <List.Item icon='phone' content={props.contacts.phone} />
      <List.Item icon='home' content={props.contacts.address.address} />
    </List>
  )
}

class ContactsListContainer extends Component{
  componentDidMount(){
    dbContacts.onceGetContacts().then(snapshot => {
      this.props.setContacts({...snapshot.val()});
    })
  }
  render(){
    return <ContactsList contacts={this.props.contacts}/>
  }
}


export default connect(
  state => ({
    contacts: state.contacts
  }),
  dispatch => ({
    setContacts: contacts => dispatch({type:"SET_CONTACTS", payload: contacts})
  })
)(ContactsListContainer);
