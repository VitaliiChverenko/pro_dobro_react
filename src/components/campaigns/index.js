import React, { Component } from 'react';
import CampaignItem from './item';
import { dbCampaigns } from '../../firebase';

export default class CampaignsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campaigns: []
    }
  }
  componentDidMount(){
    dbCampaigns.onceGetCampaigns().then(snapshot => {
      this.setState(() => ({campaigns: snapshot.val()}));
    })
  }
  render() {
    return (
      <div className="ui container">
        <div className="ui stackable three column grid">
          {
            this.state.campaigns.map((campaign, key) =>
              <CampaignItem key={key} campaign={campaign} />
          )}
        </div>
      </div>
    );
  }
}
