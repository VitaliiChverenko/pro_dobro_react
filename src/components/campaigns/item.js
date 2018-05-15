import React, { Component } from 'react';
import ShowCampaign from './Show';
import placeholder from '../../media/images/pic-placeholder.png';

export default class CampaignItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }
  render() {
    const progress = this.props.campaign.current_amount/this.props.campaign.needed_amount*100;
    const background = this.props.campaign.image ? (
      {backgroundColor: 'white'}
    ) : (
      {backgroundImage: `url('${placeholder}')`}
    )
    return(
      <div key={this.props.campaign.id} className="column">
        <div className="ui segment" onClick={() => this.setState({open: true})}>
          <div className="image-wrapper">
            <div className="campaign-image-box" style={background}></div>
            <div className="campaign-image-box" style={{backgroundImage: `url('${this.props.campaign.image}')`}}></div>
          </div>
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
          <p className="campaign-description">{this.props.campaign.description}</p>
        </div>
        <ShowCampaign openModal={this.state.open} onCloseModal={() => this.setState({open: false})} campaign={this.props.campaign} progress={progress} background={background}/>
      </div>
    );
  }
}
