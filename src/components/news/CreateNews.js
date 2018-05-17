import React, { Component } from 'react'
import { dbNews } from '../../firebase';
import { Button, Form, Modal } from 'semantic-ui-react';
import { connect } from "react-redux";
import ImageUploader from '../ImageUploader';
import placeholder from '../../media/images/pic-placeholder.png';

const INIT_STATE = {
  showModal: false,
  title:'',
  description:'',    
  image: '',
  isUploading: false,
  progress: 0,
  imageUrl: placeholder
};

class CreateNews extends Component {
  constructor() {
    super();
    this.state = INIT_STATE
  }

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  handledescriptionChange = (e) => {
    this.setState({description: e.target.value});
  }

  setUrl = (url) => {
    this.setState({imageUrl: url});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const createdAt = new Date().valueOf();
    const news = {
      title: this.state.title,
      description: this.state.description,
      createdAt,
      imageUrl: this.state.imageUrl
    }
    dbNews.doCreateNews(createdAt, news)
      .then(() => {
        this.close();
        this.props.onCreated();
        this.setState(INIT_STATE);
      })
  }

  close = () => {
    this.setState(INIT_STATE);
  }

  render() {
    const {title, description} = this.state;
    const isEnabled =
            title.length > 0 &&
            description.length > 0;
    return (
      this.props.user && this.props.user.isAdmin ? 
      <Modal trigger={<Button color="green" onClick={() => this.setState({showModal: true})}>Create News</Button>}
             open={this.state.showModal} 
             onClose={this.close}>
        <Modal.Header>Create News</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <input onChange={this.handleTitleChange} 
                       value={this.state.title} 
                       type="text" 
                       placeholder="Title" 
                       maxLength={50}
                       required />
              </Form.Field>
              <Form.Field>
                <textarea onChange={this.handledescriptionChange} 
                          value={this.state.description} 
                          type="textarea" 
                          placeholder="description" 
                          maxLength={1400} 
                          rows={7} />
              </Form.Field>
              <div className="news-image">
                <img src={this.state.imageUrl} alt="News-pic" />
              </div>
              <ImageUploader setUrl={this.setUrl}/>
              <Button positive 
                      icon='checkmark' 
                      labelPosition='right' 
                      content="Create News" 
                      disabled={!isEnabled} 
                      onClick={this.handleSubmit} />
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
      :
      false
    )
  }
}

export default connect (
  state => ({
    user: state.auth
  })
)(CreateNews);
