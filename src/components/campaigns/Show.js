import React from 'react';
import { Image, Modal } from 'semantic-ui-react';

const ShowCampaign = props => (
  <Modal key='modal' closeIcon open={props.openModal} onClose={props.onCloseModal}>
    <Modal.Header className="ui teal header">
      {props.campaign.title}
    </Modal.Header>
    <Modal.Content>
      <div className="ui grid">
        <Image wrapped className="eight wide column">
          <div className="image-wrapper">
            <div className="campaign-image-box" style={props.background}></div>
            <div className="campaign-image-box" style={{backgroundImage: `url('${props.campaign.image}')`}}></div>
          </div>
        </Image>
        <Modal.Description className="eight wide column">
          <div className="ui grid">
            <div className="three column row">
              <div className="left floated column">
                <span>Collected:</span>
                <br/>
                <span>{props.campaign.current_amount} UAH</span>
              </div>
              <div className="column center aligned middle aligned content">{props.progress}%</div>
              <div className="right floated column right aligned">
                <span>Needed:</span>
                <br/>
                <span>{props.campaign.needed_amount} UAH</span>
              </div>
            </div>
          </div>
         <div className="ui teal progress">
           <div className="bar" style={{width: `${props.progress}%`}}></div>
         </div>
         <p>{props.campaign.description}</p>
       </Modal.Description>
     </div>
   </Modal.Content>
  </Modal>
)

export default ShowCampaign
