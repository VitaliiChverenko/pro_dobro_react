import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

const Footer = () => {
  return(
    <div className="ui inverted segment no-margin">
      <div className="ui vertical footer sixteen wide column grid">
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
            <p><Link to={ routes.NEWS } className="ui small grey header">NEWS</Link></p>
            <p><Link to={ routes.CAMPAIGNS } className="ui small inverted grey header">CAMPAIGNS</Link></p>
            <p><Link to={ routes.CONTACTS } className="ui small inverted grey header">CONTACTS US</Link></p>
            <p><Link to={ routes.ABOUT_US } className="ui small inverted grey header">ABOUT US</Link></p>
          </div>
          <div className="four wide column">
        </div>
          <div className="four wide column">
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
    </div>
  )
}

export default Footer
