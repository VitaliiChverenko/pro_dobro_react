import React, { Component } from 'react'
import { firebase, dbNews } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { Button, Form, Modal } from 'semantic-ui-react'

class CreateNews extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      title:'',
      description:'',    
      picture: '',
      isUploading: false,
      progress: 0,
      pictureURL: ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handledescriptionChange = this.handledescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
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

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handledescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const createdAt = new Date().valueOf();
    const news = {
      title: this.state.title,
      description: this.state.description,
      createdAt,
      imageUrl: this.state.pictureURL
    }
    dbNews.doCreateNews(createdAt, news)
      .then(() => this.close())
  }

  close(){
    this.setState({ showModal: false });
  }

  render() {
    const {title, description} = this.state;
    const isEnabled = 
            title.length > 0 &&
            description.length > 0;
    return (
      <Modal trigger={<Button onClick={() => this.setState({showModal: true})}>Create News</Button>} 
      open={this.state.showModal} onClose={this.close}>
        <Modal.Header>Create News</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Field>
                <input type="text" onChange={this.handleTitleChange} value={this.state.title} className="form-control" id="title" name="title" placeholder="Title" required />
              </Form.Field>
              <Form.Field>
                <textarea className="form-control" onChange={this.handledescriptionChange} value={this.state.description} type="textarea" id="description" placeholder="description" maxLength={140} rows={7} />
              </Form.Field>
              <Form.Field>
                {this.state.isUploading &&
                  <p>Progress: {this.state.progress}</p>
                }
                {this.state.pictureURL &&
                  <img src={this.state.pictureURL} />
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
              <Button positive icon='checkmark' labelPosition='right' content="Create News" disabled={!isEnabled} onClick={this.handleSubmit} />
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default CreateNews
