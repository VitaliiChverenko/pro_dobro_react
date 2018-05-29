import React, { Component } from 'react';
import CampaignItem from './item';
import { dbCampaigns } from '../../firebase';
import CreateCampaign from './CreateCampaign';
import ItemsPagination, {paginate} from '../ItemsPagination';
import './campaigns-style.css';
import { Dimmer, Loader } from 'semantic-ui-react';

export default class CampaignsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: {},
      loading: false,
      activePage: 1,
      campaignsPerPage: 6,
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
  handleActivePage = (activePage) => {
    this.setState({
      activePage
    })
  }
  render() {
    const campaignKeys = Object.keys(this.state.campaigns);
    const paginatedKeys = paginate(campaignKeys, this.state.activePage, this.state.campaignsPerPage)    
    const renderCampaigns = paginatedKeys.map( key =>
      <CampaignItem onEdit={this.updateData} 
                    key={key} 
                    campaign={this.state.campaigns[key]} />
    )
    return (
      <div className="ui container padding-vertical">
        <CreateCampaign onCreated={this.updateData} items={this.state.campaigns} />
        <Dimmer active={this.state.loading} inverted>
          <Loader>Loading</Loader>
        </Dimmer>
        <div className="ui stackable three column grid">
          {renderCampaigns}
        </div>
          <ItemsPagination itemsPerPage={this.state.campaignsPerPage} 
                           itemsArray={campaignKeys}
                           updActivePage={this.handleActivePage}/>
      </div>
    );
  }
}
