import React, { Component } from 'react';
import '../App.css';
import Navigation from './Navigation'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
      </div>
    );
  }
}