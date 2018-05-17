import React, { Component } from 'react';
import NewsItem from './NewsItem'
import SortNews from './SortNews'
import { dbNews } from '../../firebase';
import CreateNews from './CreateNews';
import './news-style.css'
import { Dimmer } from 'semantic-ui-react';

export default class NewsList extends Component{
  constructor(props){
    super(props)
    this.state = {
      news: {},
      loading: false,
      loaded: false,
      sortOrder: 'newest',
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

  onDeleteNews = (key) => {
    dbNews.doDeleteNews(key, this.onUpdateNews)
  }

  isEmpty = obj => Object.keys(obj).length === 0

  sortByNewest = arr => arr.sort((a, b) => b - a)
  
  sortByOldest = arr => arr.sort((a, b) => a - b)
  
  sortChoose = (arr, sortMethod) => {
    if (sortMethod === 'newest') {
      return this.sortByNewest(arr)
    }
    if (sortMethod === 'oldest') {
      return this.sortByOldest(arr)
    }
  }

  updateSort = (value) => {
    this.setState({
      sortOrder: value
    })
  }

  render(){
    return(
      <div className="news-wrapper">
        <Dimmer.Dimmable dimmed={this.state.loading} >
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
                <div className="news-nav">
                  <CreateNews onCreated={this.onUpdateNews} />  
                    <div className="sort-wrap">        
                      <span>
                        Sort by:
                        {' '}
                        <SortNews update={this.updateSort}/>
                      </span>
                    </div>
                </div>
                {
                  this.sortChoose(Object.keys(this.state.news), this.state.sortOrder)
                    .map(key => <NewsItem onUpdated = {this.onUpdateNews} onDelete={this.onDeleteNews}
                       event={this.state.news[key]} key={key}/>)
                }
              </div>
          }
        </Dimmer.Dimmable>
      </div>
    )
  }
}
