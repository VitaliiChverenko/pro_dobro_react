import React, {Component} from 'react';
import { dbContacts } from '../../firebase';
import MapContainer from './MapContainer';
import ContactForm from './ContactForm';
import { Dimmer, Loader } from 'semantic-ui-react'

class ContactsPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      contacts: {    
        email: '',
        phone: '',
        address: {
          address: '',
          coords:{
            lat: '',
            lng: ''
          }
        },
      }
    }
    this.onUpdateContacts = this.onUpdateContacts.bind(this);
  }

  componentDidMount(){
    this.onUpdateContacts();
  }
  onUpdateContacts(){
      this.setState({loading: true})
      dbContacts.onceGetContacts().then(snapshot => {
          this.setState(() => ({
              loading: false,
              contacts: {...snapshot.val()}
          }));
      })

  }
  render(){
    return(
      <Dimmer.Dimmable dimmed={this.state.loading}>
        <Dimmer active={this.state.loading}>
          <Loader>Loading</Loader>
        </Dimmer>
        <div>
          <h1>Contacts</h1>
          <p>email: {this.state.contacts.email}</p>
          <p>phone: {this.state.contacts.phone}</p>
          <p>address: {this.state.contacts.address.address}</p>
          <ContactForm contactsData = {this.state.contacts} onUpdateContacts = {this.onUpdateContacts}/>
          <MapContainer coords={this.state.contacts.address.coords}
          />
        </div>
      </Dimmer.Dimmable>
    )
  }
}

export default ContactsPage;
