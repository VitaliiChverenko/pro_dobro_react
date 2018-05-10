import React, { Component } from 'react';
import ShowCampaign from './Show';

export default class CampaignItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }
  render() {
    const progress = this.props.campaign.current_amount/this.props.campaign.needed_amount*100;
    return(
      <div key={this.props.campaign.id} className="column">
        <div className="ui segment" onClick={() => this.setState({open: true})}>
          <img className="ui fluid image" src={this.props.campaign.image} alt="campaign"/>
          <br/>
          <div className="ui grid">
            <div className="three column row">
              <div className="left floated column">
                <span>Collected:</span>
                <br/>
                <span>{this.props.campaign.current_amount} UAH</span>
              </div>
              <div className="column center aligned middle aligned content">{progress}%</div>
              <div className="right floated column right aligned">
                <span>Needed:</span>
                <br/>
                <span>{this.props.campaign.needed_amount} UAH</span>
              </div>
            </div>
          </div>
          <div className="ui teal progress">
            <div className="bar" style={{width: `${progress}%`}}></div>
          </div>
          <h3 className="ui teal header">{this.props.campaign.title}</h3>
          <p>{this.props.campaign.description}</p>
        </div>
        <ShowCampaign openModal={this.state.open} onCloseModal={() => this.setState({open: false})} campaign={this.props.campaign} progress={progress}/>
      </div>
    );
  }
}
