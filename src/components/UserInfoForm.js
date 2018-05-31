import React from 'react';
import { Form, Button, Modal, Checkbox } from 'semantic-ui-react'
import ImageUploader from './ImageUploader';
import avatar from '../media/images/avatar.jpeg';

const UserInfoForm = props => {
    return(
    <div className="ui five wide column grid">
    <div className='one column'>
    </div>
    <div className='four wide column'>
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input onChange={props.handleChangeFirstName} 
            value = {props.firstname} placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input onChange={props.handleChangeLastName}
          value = {props.lastname} placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
          <label>Phone number</label>
          <input onChange={props.phoneValid.bind(this)}
          value = {props.phone} placeholder='Phone number' />
        </Form.Field>
        <Form.Field>
        <label>Choose sex</label>
          <Checkbox
            radio
            label='Male'
            name='checkboxRadioGroup'
            sex='Male'
            checked={props.sex === 'Male'}
            onChange={props.handleChangeSex}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Female'
            name='checkboxRadioGroup'
            sex='Female'
            checked={props.sex === 'Female'}
            onChange={props.handleChangeSex}
          />
        </Form.Field>
        <Button disabled={!props.enableSubmit} inverted color='green' type='submit' onClick={props.handleChangeInfo}>Submit</Button>
        <Button inverted color='red' onClick={() => {props.setInitialData(props.userprops)}}>Reset</Button>
      </Form>
    </div>
    <div className='four wide column'>
    </div>
      <Form.Field>
        <br />
        <div className='avatar' style={{backgroundImage: `url('${avatar}')` }}>
          <img className='avatar' src={props.imageUrl} alt=''/>
        </div>
        <br />
          <ImageUploader setUrl={props.setUrl}/>
      </Form.Field>
      <Modal size='tiny' open={props.openModal}>
        <Modal.Header>
        <p>Do you want to change user info?</p>
        </Modal.Header>
        <Modal.Actions>
          <Button onClick={props.handleChangeInfo} negative content='No' />
          <Button onClick={props.changeInfo} positive icon='checkmark' labelPosition='right' content='Yes' />
        </Modal.Actions>
      </Modal>
    </div>
    )
  }
export default UserInfoForm
