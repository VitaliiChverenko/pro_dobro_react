import React, { Component } from 'react';
import { firebase } from '../firebase';
import { Form, Progress } from 'semantic-ui-react';
import FileUploader from 'react-firebase-file-uploader';
 
class ImageUploader extends Component {
  constructor (props){
    super (props)
    this.state = {
      isUploading: false,
      progress: 0,
      image: '',
      imageUrl: '',
    };
  } 

  handleUploadStart = () => {
    this.setState({isUploading: true, progress: 0});
  }
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({
      image: filename, 
      progress: 100, 
      isUploading: false
    });
    firebase.storage
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.props.setUrl(url)
        this.props.setName(filename)
      });
  };
 
  render() {
    return (
        <Form.Field>
          {this.state.isUploading &&
            <Progress percent={this.state.progress} progress />
          }
          {this.props.imageUrl &&
            <img src={this.props.imageUrl} alt="Prodobro" />
          }
          <FileUploader
            accept="image/*"
            name="image"
            storageRef={firebase.storage.ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </Form.Field>
    );
  }
}
 
export default ImageUploader;
