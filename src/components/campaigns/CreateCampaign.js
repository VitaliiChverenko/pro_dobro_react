import React, { Component } from 'react';
import { dbCampaigns } from '../../firebase';
import { Button, Form , Modal, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import ImageUploader from '../ImageUploader';

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
      campaigns: this.props.items,
      createdBy: '',
    };

    this.setUrl = this.setUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername = (event) => this.setState({username: event.target.value});
  
  setUrl(url){
    this.setState({pictureURL: url});
  }

  handleSubmit(event) {
    event.preventDefault();
    const campaign = {
      id: this.props.items.length,
      title: this.state.title,
      description: this.state.description,
      currentAmount: 10,
      neededAmount: this.state.neededAmount,
      image: this.state.pictureURL,
      createdBy: this.props.user.email,
    }
    dbCampaigns.doCreateCampaigns(campaign.id, campaign.title,campaign.description,campaign.currentAmount,campaign.neededAmount, campaign.image, campaign.createdBy)
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
       this.props.user &&
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
              <div className="news-image">
                <img src={this.state.pictureURL} alt="News-pic" />
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
)(CreateCampaign);
