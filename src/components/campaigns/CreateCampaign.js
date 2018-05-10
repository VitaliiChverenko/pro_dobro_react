import React, { Component } from 'react';
import { dbCampaigns } from '../../firebase';
import { Button, Form , Modal, Segment } from 'semantic-ui-react'

class CreateCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      title: '',
      description: '',
      neededAmount: '',
      campaigns: this.props.items
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const campaign = {
      id: this.props.items.length,
      title: this.state.title,
      description: this.state.description,
      currentAmount: 10,
      neededAmount: this.state.neededAmount,
      image: 'http://via.placeholder.com/350x150'
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
    return (
      <Modal trigger={<Button className="ui inverted green button" onClick={() => this.setState({showModal: true})}>Create Campaign</Button>}
        open={this.state.showModal} onClose={this.close}>
        <Modal.Header>
          <h1>Create Campaign</h1>
        </Modal.Header>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="Title" type="text" value={this.state.value} onChange={event => this.setState({title: event.target.value})} />
              <Form.Input label="Needed Amount" type="text" value={this.state.value} onChange={event => this.setState({neededAmount: event.target.value})} />
            </Form.Group>
            <Form.TextArea label="Description" value={this.state.value} onChange={event => this.setState({description: event.target.value})} />
            <Button type="submit" disabled={!isEnabled}>Submit</Button>
          </Form>
        </Segment>
      </Modal>
    );
  }
}

export default CreateCampaign;
