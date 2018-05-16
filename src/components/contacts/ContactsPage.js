import React from 'react';
import { Grid } from 'semantic-ui-react';
import {connect} from 'react-redux';
import MapContainer from './MapContainer';
import ContactForm from './ContactForm';
import ContactList from './ContactsList';

const ContactsPage = props => {
    return(
        <Grid columns={2} container className="no-margin">
          <Grid.Column >
            <ContactList />
            <ContactForm 
              contactsData = {props.contacts}
              onUpdate={ contacts =>{props.setContacts(contacts)}}
            />
          </Grid.Column>

          <Grid.Column>
            <MapContainer coords={props.contacts.address.coords}/>
          </Grid.Column>
        </Grid>
    )
  };

export default connect(
  state => ({
    contacts: state.contacts
  }),
  dispatch => ({
    setContacts: contacts => dispatch({type:"SET_CONTACTS", payload: contacts})
  })
)(ContactsPage);
