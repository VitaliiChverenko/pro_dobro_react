import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import { BrowserRouter } from 'react-router-dom';
import './App.css'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
