import React, { Component } from 'react'
import { dbNews } from '../../firebase';
import { Button, Form, Modal } from 'semantic-ui-react';
import {connect} from "react-redux";
import ImageUploader from '../ImageUploader';
import placeholder from '../../media/images/pic-placeholder.png';

const INIT_STATE = {
  showModal: false,
  title:'',
  description:'',    
  image: '',
  isUploading: false,
  progress: 0,
  imageUrl: ''
};

class EditNews extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE
  }

  componentDidMount() {
    this.setInitialData(this.props);
  }

  setUrl = (url) => {
    this.setState({imageUrl: url});
  }

  setInitialData = (props) => {
    if (props.news) {
      this.setState({
        title: props.news.title,
        description: props.news.description,
        createdAt: props.news.createdAt,
        imageUrl: props.news.imageUrl
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const news = {
      title: this.state.title,
      description: this.state.description,
      createdAt: this.state.createdAt,
      imageUrl: this.state.imageUrl
    }
    dbNews.doCreateNews(news.createdAt, news)
      .then(() => {
        this.close();
        this.setState();
        this.props.onUpdated();
      })
  }

  close = () => {
    this.setState({ showModal: false });
  }

  render() {
    const {title, description} = this.state;
    const isEnabled =
            title.length > 0 &&
            description.length > 7;
    return (
      this.props.user && this.props.user.isAdmin ?
      <Modal trigger={<Button color="yellow" onClick={() => this.setState({showModal: true})}>Edit News</Button>}
             open={this.state.showModal} 
             onClose={this.close}>
        <Modal.Header>Edit News</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit} >
              <Form.Field>
                <input onChange={event => this.setState({title: event.target.value})} 
                       value={this.state.title} 
                       type="text" 
                       placeholder="Title" 
                       maxLength={50}
                       required />
              </Form.Field>
              <Form.Field>
                <textarea onChange={event => this.setState({description: event.target.value})}
                          value={this.state.description}
                          type="textarea"
                          placeholder="Description"
                          maxLength={1400}
                          rows={7} />
              </Form.Field> 
                <div className="news-image">
                  <img src={this.state.imageUrl || placeholder}
                       alt="News"
                       onError={e => e.target.src = placeholder} 
                  />
                </div>
              <ImageUploader setUrl={this.setUrl}/>
              <Button positive 
                      icon='checkmark' 
                      labelPosition='right' 
                      content="Edit News" 
                      disabled={!isEnabled} />
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
      : false
    )
  }
}

export default connect (
  state => ({
    user: state.auth
  })
)(EditNews);
