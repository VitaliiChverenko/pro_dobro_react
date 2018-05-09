import React from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import Autocomplete from 'react-google-autocomplete';
import GoogleAPIkey from '../../constants/google.config'
import './AddressAutoComplete.css';

const AddressAutoComplete = props =>{
  return (
  <div className='ui input address-autocomplete labeled'>
  <div class="ui label label">Address</div>
  <Autocomplete
    onPlaceSelected={place => {
      const address = {
        address: place.formatted_address,
        coords:{
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng() 
        }
      }
      props.onSelectAddress(address);
    }}
    placeholder={props.address}
    types={['address']}/>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: GoogleAPIkey,
  libraries: ['places']
})(AddressAutoComplete)
