import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './Header';
import CampaignsIndex from './campaigns/index';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import Footer from './Footer';
import MobileNavigation from './MobileNavigation';
import News from './news/News';
import ContactsPage from './contacts/ContactsPage'
import UserInfo from './UserInfo';
import PasswordForget from './auth/PasswordForget';
import AboutUs from './AboutUs.js';
import { Sidebar, Segment, Menu} from 'semantic-ui-react';

import * as routes from '../constants/routes';
import WithAuthentication from './auth/withAuthentication';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      humbMenu: false,
    }
  }

  toggleVisibility = () => this.setState({ humbMenu: !this.state.humbMenu })
  
  render(){
    return(
      <WithAuthentication>
        <BrowserRouter>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation='uncover'
              width='thin'
              direction='right'
              visible={this.state.humbMenu}
              icon='labeled'
              vertical
              inverted
            >
              <MobileNavigation toggleVisibility={this.toggleVisibility} />
            </Sidebar>
            <Sidebar.Pusher>
              <div className="all-content">
                <Header menuToggle={this.toggleVisibility} />
                <div className="main-content">
                  <Switch>
                    <Route exact path={ routes.CAMPAIGNS } component={CampaignsIndex} />
                    <Route exact path={ routes.NEWS } component={News} />
                    <Route exact path={ routes.CONTACTS } component={ContactsPage} />
                    <Route exact path={ routes.ABOUT_US } component={AboutUs} />
                    <Route exact path={ routes.USERINFO } component={UserInfo} />
                    <Route exact path={ routes.SIGN_UP } component={SignUp} />
                    <Route exact path={ routes.SIGN_IN } component={SignIn} />
                    <Route exact path={ routes.PASSWORD_FORGET } component={PasswordForget} />
                    <Redirect from="*" to={ routes.NEWS } />
                  </Switch>
                </div>
                <Footer />
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </BrowserRouter>
      </WithAuthentication>  
  )}
} 

export default App;
