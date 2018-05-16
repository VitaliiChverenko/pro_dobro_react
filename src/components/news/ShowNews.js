import React from 'react';
import { Button, Modal,Label } from 'semantic-ui-react'
import placeholder from '../../media/images/news-placeholder.png';

const ShowNews = (props) => (
  <Modal trigger={<Button>Show News</Button>} closeIcon>
    <Modal.Header>
      <h1>
        {props.news.title}
      </h1>
      <Label attached='top right'>
        Posted at: {props.news.createdAt}
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
