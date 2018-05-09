import AddressAutoComplete from './AddressAutoComplete';

import { dbContacts } from '../../firebase';
import React, {Component} from 'react';
import { Button, Header, Modal, Input, label } from 'semantic-ui-react';

class ContactForm extends Component {
    constructor(props) {
        super(props);
         this.state = {
            modalOpen: false,
            contacts:{
                email: '',
                phone: '',
                address: {
                    address: '',
                    coords:{
                        lat: '',
                        lng: ''
                    }
                }
            }
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleValue = this.handleValue.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({contacts: {...props.contactsData}});
    }
    onSubmit(){
        dbContacts.doChangeContacts({...this.state.contacts}).then(response => {
            this.props.onUpdateContacts();
            this.handleClose();
        });

    }

    handleOpen(){
      this.setState({ modalOpen: true });
    }

    handleValue(name, value){
        this.setState({
            contacts: {
                ...this.state.contacts,
                [name]: value
            }
        });
      }
    handleClose(){
         this.setState({ modalOpen: false });
    }

    render() {
        return  <Modal
                  trigger={<Button onClick={this.handleOpen}>Edit Contacts</Button>}
                  open={this.state.modalOpen}
                  closeOnEscape={true}
                  closeOnRootNodeClick={true}
                  onClose={this.handleClose}
                >
                    <Modal.Header>Contacts edit</Modal.Header>
                    <Modal.Content>
                        <div>
                            <Input
                              label='Email'
                              className='email-address-width'
                              fluid
                              value={this.state.contacts.email}
                              onChange={event => this.handleValue('email', event.target.value)}
                              type="text"
                              placeholder="email"
                            />
                            <Input
                              label='Phone'
                              className='email-address-width'
                              fluid
                              value={this.state.contacts.phone}
                              onChange={event => this.handleValue('phone', event.target.value)}
                              type="text"
                              placeholder="phone"
                            />
                            <AddressAutoComplete
                              onSelectAddress={address => this.handleValue('address', address)}
                              address = {this.props.contactsData.address.address}
                             />

                            <Modal.Actions>
                              <Button color='green' onClick={this.onSubmit}
                                  disabled={!this.state.contacts.email || !this.state.contacts.phone}>
                                  Edit contact
                              </Button>
                              <Button color='red' onClick={this.handleClose}>Cancel</Button>
                            </Modal.Actions>

                        </div>
                    </Modal.Content>
                </Modal>
    }
}

export default ContactForm