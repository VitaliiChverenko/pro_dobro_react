import React, { Component } from 'react';
import CampaignItem from './item';
import { dbCampaigns } from '../../firebase';
import CreateCampaign from './CreateCampaign';
import './campaigns-style.css';
import { Dimmer, Loader } from 'semantic-ui-react';

export default class CampaignsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: {},
      loading: false,
    }
  }
  componentDidMount(){
    this.updateData();
  }
  updateData = () => {
    this.setState({loading: true});
    dbCampaigns.onceGetCampaigns().then(snapshot => {
      this.setState(() => ({
        loading: false,
        campaigns: snapshot.val() || {}}));
    })
  }
  render() {
    return (
      <div className="ui container padding-vertical">
        <CreateCampaign onCreated={this.updateData} items={this.state.campaigns} />
        <Dimmer active={this.state.loading} inverted>
          <Loader>Loading</Loader>
        </Dimmer>
        <div className="ui stackable three column grid">
          {
            Object.keys(this.state.campaigns).map( key =>
              <CampaignItem key={key} campaign={this.state.campaigns[key]} />
          )}
        </div>
      </div>
    );
  }
}
