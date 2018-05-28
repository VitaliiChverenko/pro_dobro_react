import React, { Component } from 'react';
import NewsItem from './NewsItem';
import SortNews, { sortChoose } from './SortNews';
import NewsPagination from './NewsPagination';
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
      renderKeys: [],
      activePage: 1,
      newsPerPage: 3,
    }
  }

  componentWillMount(){
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

  updateSort = (value) => {
    this.setState({
      sortOrder: value
    })
  }

  handleActivePage = (activePage) => {
    this.setState({
      activePage
    })
  }

  render(){
    const allNewsKeys = Object.keys(this.state.news);
    const sortedNewsKeys = sortChoose(allNewsKeys, this.state.sortOrder);
    const renderNews = sortedNewsKeys.map(key => {
      return (<NewsItem onDelete={this.onDeleteNews}
                        event={this.state.news[key]} 
                        key={key}/>)
    });
    
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
                <NewsPagination 
                  activePage={this.state.activePage} 
                  newsPerPage={this.state.newsPerPage} 
                  newsArray={renderNews}
                  updActivePage={this.handleActivePage}
                />
              </div>
          }
        </Dimmer.Dimmable>
      </div>
    )
  }
}
