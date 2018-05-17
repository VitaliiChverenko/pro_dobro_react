import React, { Component } from 'react';
import { firebase, dbCampaigns } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { connect } from "react-redux";
import { Button, Form , Modal, Segment, Progress } from 'semantic-ui-react'

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
    console.log(this.state.createdBy)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  handleChangeUsername = (event) => this.setState({username: event.target.value});
  handleUploadStart = () => {
    this.setState({isUploading: true, progress: 0});
  }
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    if (this.state.picture) firebase.storage.ref('images').child(this.state.picture).delete()
    this.setState({picture: filename, progress: 100, isUploading: false});
    firebase.storage.ref('images').child(filename).getDownloadURL().then(url => this.setState({pictureURL: url}));
  };

  handleSubmit(event) {
    event.preventDefault();
    const campaign = {
      id: this.props.campaign.id,
      title: this.state.title,
      description: this.state.description,
      currentAmount: 10,
      neededAmount: this.state.neededAmount,
      image: this.state.pictureURL
    }
    dbCampaigns.doCreateCampaigns(campaign.id, campaign.title,campaign.description,campaign.currentAmount,campaign.neededAmount, campaign.image)
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
      this.props.user.email === this.state.createdBy ? 
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
                  {this.state.isUploading &&
                    <Progress percent={this.state.progress} autoSuccess />
                  }
                  {this.state.pictureURL &&
                    <img src={this.state.pictureURL} alt="news" />
                  }
                  <FileUploader
                    accept="image/*"
                    name="picture"
                    randomizeFilename
                    storageRef={firebase.storage.ref('images')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                </Form.Field>
              <Button type="submit" disabled={!isEnabled}>Submit</Button>
            </Form>
          </Segment>
        </Modal>
        :
        false
    );
  }
}

export default connect (
  state => ({
    user: state.auth
  })
)(EditCampaign);
