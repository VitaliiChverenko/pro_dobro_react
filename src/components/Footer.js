import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

const Footer = () => {
  return(
    <div class="ui inverted vertical footer segment sixteen wide column grid">
      <div class="one wide column">
      </div>
      <div class="four wide column">
        <p>OUR GOAL</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum.</p>
      </div>
      <div class="three wide column">
      </div>
      <div class="ui eight wide column grid">
        <div class="four wide column">
          <p>LINKS</p>
          <p><Link to={ routes.NEWS }>NEWS</Link></p>
          <p><Link to={ routes.CAMPAIGNS }>CAMPAIGNS</Link></p>
          <p><Link to={ routes.CONTACTS }>CONTACTS US</Link></p>
          <p><Link to={ routes.ABOUT_US }>ABOUT US</Link></p>
        </div>
        <div class="four wide column">
          <p>ADDRESS</p>
          <p>LVIV, LV 79000</p>
          <p>prodobro@gmail.com</p>
          <p>+01 234 567 88</p>
          <p>+01 678 345 12</p>
        </div>
      </div>
      <div class="ui container">
        ProDobro 2018. All Rights Reserved
      </div>
    </div>
  )
}

export default Footer
