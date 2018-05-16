import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import ContactsList from './contacts/ContactsList';
import { Grid, Header } from 'semantic-ui-react'

const Footer = () =>{
    return(
      <Grid className="no-margin">
        <Grid.Row>
          <Grid.Column width={6} color='black' inverted  textAlign='center'>
            <Header size='small' color='teal' textAlign='center'>OUR GOALS</Header>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
            error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum.</p>
          </Grid.Column>
          

          <Grid.Column width={5} color='black' inverted textAlign='center'>
            <Header size='small' color='teal' textAlign='center'>LINKS</Header>
            <p><Link to={ routes.NEWS }>NEWS</Link></p>
            <p><Link to={ routes.CAMPAIGNS }>CAMPAIGNS</Link></p>
            <p><Link to={ routes.CONTACTS }>CONTACTS US</Link></p>
            <p><Link to={ routes.ABOUT_US }>ABOUT US</Link></p>
          </Grid.Column>

          <Grid.Column width={5} color='black' inverted >
            <ContactsList />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column  color='black' inverted textAlign='center'>
           <p>ProDobro 2018. All Rights Reserved</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

export default Footer;
