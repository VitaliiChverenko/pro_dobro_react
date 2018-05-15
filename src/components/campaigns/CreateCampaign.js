import React, { Component } from 'react';
import { firebase, dbCampaigns } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { Button, Form , Modal, Segment, Progress } from 'semantic-ui-react'

class CreateCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      title: '',
      description: '',
      neededAmount: '',
      picture: '',
      isUploading: false,
      progress: 0,
      pictureURL: '',
      campaigns: this.props.items
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername = (event) => this.setState({username: event.target.value});
  handleUploadStart = () => {
    if (this.state.picture) {
      firebase.storage.ref('images').child(this.state.picture).delete()
    }
    this.setState({isUploading: true, progress: 0});
  }
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({picture: filename, progress: 100, isUploading: false});
    firebase.storage.ref('images').child(filename).getDownloadURL().then(url => this.setState({pictureURL: url}));
  };

  handleSubmit(event) {
    event.preventDefault();
    const campaign = {
      id: this.props.items.length,
      title: this.state.title,
      description: this.state.description,
      currentAmount: 10,
      neededAmount: this.state.neededAmount,
      image: this.state.pictureURL
    }
    dbCampaigns.doCreateCampaigns(campaign.id, campaign.title,campaign.description,campaign.currentAmount,campaign.neededAmount, campaign.image)
      .then(() => {
        this.close();
        this.props.onCreated();
      })
  }

  close = () => {
    this.setState({ showModal: false });
  }
  render() {
    const {title, description, neededAmount} = this.state;
    const isEnabled = title.length && description.length && neededAmount.length;
    const btnStyle = {marginBottom: 10};
    return (
      <Modal trigger={<Button className="ui teal button" style={btnStyle} onClick={() => this.setState({showModal: true})}>Create Campaign</Button>}
        open={this.state.showModal} onClose={this.close}>
        <Modal.Header>
          <h1>Create Campaign</h1>
        </Modal.Header>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="Title" type="text" value={this.state.value} onChange={event => this.setState({title: event.target.value})} />
              <Form.Input label="Needed Amount" type="number" value={this.state.value} onChange={event => this.setState({neededAmount: event.target.value})} />
            </Form.Group>
            <Form.TextArea label="Description" value={this.state.value} onChange={event => this.setState({description: event.target.value})} />
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
    );
  }
}

export default CreateCampaign;
