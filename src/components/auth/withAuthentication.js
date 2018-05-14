import React from 'react';
import {connect} from 'react-redux'
import { firebase, dbUsers } from '../../firebase';
import {Dimmer, Loader} from 'semantic-ui-react'

class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
            dbUsers.doGetUser(authUser.uid).then(user => {
              this.props.setUser(user.val());
              this.setState({loading: false});
            }, () => {
              this.setState({loading: false});
              this.props.setUser(null);
            });
        } else {
          this.setState({loading: false});
          this.props.setUser(null);
        };
      });
    }

    render() {
      return this.state.loading ? 
      <Dimmer active={this.state.loading} inverted>
        <Loader>Loading</Loader>
      </Dimmer>
     : this.props.children;
    }
}
export default connect(
  null,
  dispatch => ({
    setUser: user => dispatch({type:"SET_USER", payload: user})
  })
)(WithAuthentication);
