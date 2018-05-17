import React, { Component } from 'react';
import { firebase, dbCampaigns } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { connect } from "react-redux";
import { Button, Form , Modal, Segment, Progress } from 'semantic-ui-react'
import ImageUploader from '../ImageUploader';
import placeholder from '../../media/images/pic-placeholder.png';

class EditCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      title: props.campaign.title,
      description: props.campaign.description,
      neededAmount: props.campaign.needed_amount,
      picture: props.campaign.picture,
      isUploading: false,
      progress: 0,
      pictureURL: props.campaign.image,
      campaign: props.campaign,
      createdBy: props.campaign.createdBy,
    };

    this.setUrl = this.setUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername = (event) => this.setState({username: event.target.value});

  setUrl(url){
    this.setState({pictureUrl: url});
  }

  handleSubmit(event) {
    event.preventDefault();
    const campaign = {
      id: this.props.campaign.id,
      title: this.state.title,
      description: this.state.description,
      currentAmount: 10,
      neededAmount: this.state.neededAmount,
      image: this.state.pictureURL,
      createdBy: this.state.createdBy
    }
    dbCampaigns.doCreateCampaigns(campaign.id, campaign.title,campaign.description,campaign.currentAmount,campaign.neededAmount, campaign.image, campaign.createdBy)
      .then(() => {
        this.close();
        this.props.onEdit();
      })
  }

  close = () => {
    this.setState({ showModal: false });
  }

  render() {
    const {title, description, neededAmount} = this.state;
    const isEnabled = title.length && description.length && neededAmount.length;
    return (
      this.props.user.email == this.state.createdBy &&
      <Modal trigger={<Button onClick={() => this.setState({showModal: true})}>EditCampaign</Button>} 
        open={this.state.showModal} onClose={this.close}>
        <Modal.Header>
          <h1>Edit Campaign</h1>
        </Modal.Header>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="Title" type="text" value={this.state.title} onChange={event => this.setState({title: event.target.value})} />
              <Form.Input label="Needed Amount" type="text" value={this.state.neededAmount} onChange={event => this.setState({neededAmount: event.target.value})} />
            </Form.Group>
            <Form.TextArea label="Description" value={this.state.description} onChange={event => this.setState({description: event.target.value})} />
            <Form.Field>
              <div className="campaign-image">
                <img src={this.state.pictureUrl} alt="Campaign-pic" />
              </div>
              <ImageUploader setUrl={this.setUrl}/>
              </Form.Field>
            <Button type="submit" disabled={!isEnabled}>Submit</Button>
          </Form>
        </Segment>
      </Modal>
    );
  }
}

export default connect (
  state => ({
    user: state.auth
  })
)(EditCampaign);
