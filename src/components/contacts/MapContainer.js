import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleAPIkey from '../../constants/google.config'
 
export const MapContainer = props => {
  return (
    <div className="map">
      <Map google={props.google}
        center={props.coords}
        zoom={15}
        style={{height:"500px", width:'90%'}}>
        <Marker
          name={'softserve'}
          position={props.coords} />
      </Map>
    </div>
  );
}
 
export default GoogleApiWrapper({
  apiKey: GoogleAPIkey
})(MapContainer)
