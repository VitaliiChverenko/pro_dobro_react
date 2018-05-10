import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

const Footer = () => {
  return(
    <div className="ui inverted vertical footer segment sixteen wide column grid no-margin">
      <div className="one wide column">
      </div>
      <div className="four wide column">
        <p>OUR GOAL</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum.</p>
      </div>
      <div className="three wide column">
      </div>
      <div className="ui eight wide column grid">
        <div className="four wide column">
          <p>LINKS</p>
          <p><Link to={ routes.NEWS }>NEWS</Link></p>
          <p><Link to={ routes.CAMPAIGNS }>CAMPAIGNS</Link></p>
          <p><Link to={ routes.CONTACTS }>CONTACTS US</Link></p>
          <p><Link to={ routes.ABOUT_US }>ABOUT US</Link></p>
        </div>
        <div className="four wide column">
          <p>ADDRESS</p>
          <p>LVIV, LV 79000</p>
          <p>prodobro@gmail.com</p>
          <p>+01 234 567 88</p>
          <p>+01 678 345 12</p>
        </div>
      </div>
      <div className="ui container">
        ProDobro 2018. All Rights Reserved
      </div>
    </div>
  )
}

export default Footer
