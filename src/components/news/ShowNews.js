import React from 'react';
import { Button, Image, Modal } from 'semantic-ui-react'

const ShowNews = (props) => (
  <Modal trigger={<Button>Show News</Button>} closeIcon>
    <Modal.Header>
      <h1>
        {props.news.title}
      </h1>
      <p>
        Created at:  {props.news.createdAt}
      </p>
    </Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src={props.news.imageUrl} />
      <Modal.Description>
        <p>
          {props.news.description}
        </p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ShowNews
