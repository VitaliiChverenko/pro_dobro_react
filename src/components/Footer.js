import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import ContactsList from './contacts/ContactsList';
import { Grid, Header, Icon } from 'semantic-ui-react'

const Footer = () =>{
    return(
      <div className="ui inverted segment no-margin">
       <Grid stackable className="ui container">
        <Grid.Row  >
          <Grid.Column width={5} color='black'  textAlign='left'>
            <Header size='small' color='teal' textAlign='left'>OUR GOALS</Header>
            <p style={{color: 'white'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
            error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum.</p>
          </Grid.Column >
          <Grid.Column width={1} color='black' textAlign='center'>
          </Grid.Column>
          <Grid.Column width={4} color='black' textAlign='center'>
            <Header size='small' color='teal' textAlign='left'>PAYMENT OPTIONS</Header>
            <div style={{textAlign: "left"}} className="payment">
              <Icon bordered size='large' name='visa' />
              <Icon bordered size='large' name='mastercard' />
              <Icon bordered size='large' name='paypal card' />
              <Icon bordered size='large' name='american express' />
              <Icon bordered size='large' name='credit card alternative' />
            </div>
          </Grid.Column>
          <Grid.Column width={2} color='black' textAlign='left'>
            <Header size='small' color='teal' textAlign='left'>LINKS</Header>
            <p><Link className="footer-links" to={ routes.NEWS }>NEWS</Link></p>
            <p><Link className="footer-links" to={ routes.CAMPAIGNS }>CAMPAIGNS</Link></p>
            <p><Link className="footer-links" to={ routes.CONTACTS }>CONTACTS US</Link></p>
            <p><Link className="footer-links" to={ routes.ABOUT_US }>ABOUT US</Link></p>
          </Grid.Column>
          <Grid.Column width={4} color='black'>
            <ContactsList />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column  color='black' textAlign='center'>
           <p style={{color: 'white'}}>ProDobro 2018. All Rights Reserved</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
    )
  }

export default Footer;
