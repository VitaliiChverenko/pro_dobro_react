import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleAPIkey from '../../constants/google.config'
 
export class MapContainer extends React.Component {
  render() {
    return (
      <div className="map">
        <Map google={this.props.google}
          center={this.props.coords}
          zoom={15}
          style={{height:"500px"}}
          scrollwheel={false}>
          <Marker
            name={'softserve'}
            position={this.props.coords} />
        </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: GoogleAPIkey
})(MapContainer)
