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
  constructor(props) {
    super(props); 
    this.state = INIT_STATE;
  }

  handleDescription = (e) => {
    this.setState({description: e.target.value})
  }

  handleTitle = (e) => {
    this.setState({title: e.target.value})
  }

  setUrl = (url) => {
    this.setState({imageUrl: url});
  }
  
  setImage = (image) => {
    this.setState({image});
  }

  setImage = (image) => {
    this.setState({image})
  }

  handleSubmit = () => {
    const createdAt = new Date().valueOf();
    const news = {
      title: this.state.title,
      description: this.state.description,
      createdAt,
      imageUrl: this.state.imageUrl,
      image: this.state.image
    }
    dbNews.doCreateNews(news)
      .then(() => {
        this.close();
        this.props.onCreated();
        this.setState(INIT_STATE);
      })
  }

  cancelForm = () => {
    dbNews.doDeleteNewsImg(this.state.image)
    .then(this.close())
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
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <input onChange={this.handleTitle} 
                       value={this.state.title} 
                       type="text" 
                       placeholder="Title" 
                       maxLength={50}
                       required />
              </Form.Field>
              <Form.Field>
                <textarea onChange={this.handleDescription} 
                          value={this.state.description} 
                          type="textarea" 
                          placeholder="description" 
                          maxLength={1400} 
                          rows={7} />
              </Form.Field>
              <div className="news-image">
                <img src={this.state.imageUrl} alt="News-pic" />
              </div>
              <ImageUploader setUrl={this.setUrl}
                             setImage={this.setImage}/>
              <Button color="green"
                      content="Create News" 
                      disabled={!isEnabled} />
              <Button color="red"
                      content="Cancel"
                      onClick={this.cancelForm} />
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
