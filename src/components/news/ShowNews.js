import React from 'react';
import { Button, Modal, Label } from 'semantic-ui-react';
import placeholder from '../../media/images/pic-placeholder.png';

const ShowNews = (props) => (
  <Modal trigger={<Button color='teal'>Show News</Button>} closeIcon>
    <Modal.Header>
      <h1>
        {props.news.title}
      </h1>
      <Label attached='top right'>
        Posted at: {new Date(props.news.createdAt).toLocaleString()}
      </Label> 
    </Modal.Header>
    <Modal.Content image>
      <div className='newsImageDiv' style={{backgroundImage: `url('${placeholder}')`}}>
        <img className='newsImage' src={props.news.imageUrl} alt=''/>
      </div>
      <div className="newsDesc">
        <Modal.Description>
          <p>
            {props.news.description}
          </p>
        </Modal.Description>
      </div>
    </Modal.Content>
  </Modal>
) 

export default ShowNews
