import React from 'react';
import { Image, Modal } from 'semantic-ui-react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { dbCampaigns } from '../../firebase';

export default class ShowCampaign extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: props.campaign.title,
      description: props.campaign.description,
      neededAmount: props.campaign.needed_amount,
      picture: props.campaign.picture,
      pictureURL: props.campaign.image,
      campaign: props.campaign,
      currentAmount: props.campaign.current_amount,
      amount: 10
    }
  }
  inputAmount=(e)=>{
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({amount: e.target.value})
    }
  }
  
  onCancel = (data) => {
    alert("The donate was canceled!", data);
  }	

  onSuccess = (payment) => {
    alert("The donate was succeeded!");
    const campaign = {
      id: this.props.campaign.id,
      currentAmount: this.state.currentAmount + this.state.amount
    }
    dbCampaigns.doMakeDonate(campaign.id, campaign.currentAmount)
      .then(() => {
        this.close();
      })
  }

  onError = (err) => {
    alert("Error", err);	
  }			
  
 render(){
    
  let env = 'sandbox';
  let currency = 'USD';
  
  const client = {
    sandbox: 'AawwEFkpqkM87pOatvnKXcJzWB50af1F9c4mBvUEhWzEOT4X6FxGG1vz1pK1sFuOpT2h9bVI5uSEu3X_',
    production: 'EPqdAXhPYINeRTeqJXms3oCCYeg591pVooi8uQeB7KZIwqzhHaPnFrh0Zt02usE5E9C_PvWrso0U8EqI',
  }
   return(
    <Modal key='modal' closeIcon open={this.props.openModal} onClose={this.props.onCloseModal}>
      <Modal.Header className="ui teal header">
        {this.props.campaign.title}
      </Modal.Header>
      <Modal.Content>
        <div className="ui grid">
          <Image wrapped className="eight wide column">
            <div className="image-wrapper">
              <div className="campaign-image-box" style={this.props.background}></div>
              <div className="campaign-image-box" style={{backgroundImage: `url('${this.props.campaign.image}')`}}></div>
            </div>
          </Image>
          <Modal.Description className="eight wide column">
            <div className="ui grid">
              <div className="three column row">
                <div className="left floated column">
                  <span>Collected:</span>
                  <br/>
                  <span>{this.props.campaign.current_amount} UAH</span>
                </div>
                <div className="column center aligned middle aligned content">{this.props.progress}%</div>
                <div className="right floated column right aligned">
                  <span>Needed:</span>
                  <br/>
                  <span>{this.props.campaign.needed_amount} UAH</span>
                </div>
              </div>
            </div>
          <div className="ui teal progress">
            <div className="bar" style={{width: `${this.props.progress}%`}}></div>
          </div>
          <p>{this.props.campaign.description}</p>
        
        <span>Enter amount: </span>
        <input className='inputAmount' onChange={this.inputAmount} value={this.state.amount}/>
        <br/>
        <span className='donateText'>Donate with</span>
        <div className='paypalBtn'>
          <PaypalExpressBtn
            style={{
              color: 'blue',
              shape: 'rect',
              label:'paypal',
              tagline: false,
              fundingicons:true
            }}
            env={env} 
            client={client}
            currency={currency}
            total={this.state.amount}
            onError={this.onError} 
            onSuccess={this.onSuccess} 
            onCancel={this.onCancel} />
        </div>
        </Modal.Description>
      </div>
    </Modal.Content>
    </Modal>
   )
  }
}