import React, { Component } from 'react';
import NewsItem from './NewsItem'
import { dbNews } from '../../firebase';
import CreateNews from './CreateNews';
import './news-style.css'
import { Dimmer, Loader } from 'semantic-ui-react';

export default class NewsList extends Component{
  constructor(props){
    super(props)
    this.state = {
      news: {},
      loading: false,
      loaded: false,
    }
  }

  componentDidMount(){
    this.onUpdateNews();
  }

  onUpdateNews = () => {
    this.setState({loading: true})
    dbNews.onceGetNews().then(snapshot => {
      this.setState(() => ({
        news: snapshot.val() || {},
        loading: false,
        loaded: true,
      }));
    })
  }

  isEmpty = (obj) => {
    return Object.getOwnPropertyNames(obj).length === 0 
  }

  render(){
    return(
      <div className="news-wrapper">
        <Dimmer.Dimmable dimmed={this.state.loading} >
          <Dimmer active={this.state.loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
          { 
            this.isEmpty(this.state.news) && this.state.loaded ?
            <div className="ui container">
              <h2 className="no-news">
                There are no news yet!
              </h2>
              <CreateNews onCreated={this.onUpdateNews} />
            </div>
            : 
            <div className="ui container">
              {
                Object.keys(this.state.news).map(key =>
                  <NewsItem event = {this.state.news[key]} key={key}/>
                )
              }
              <CreateNews onCreated={this.onUpdateNews} />
            </div>
          }
        </Dimmer.Dimmable>
      </div>
    )
  }
}
