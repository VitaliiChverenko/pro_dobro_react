import React, { Component } from 'react';
import NewsItem from './NewsItem'
import { dbNews } from '../../firebase';

export default class NewsList extends Component{
  constructor(props){
    super(props)
    this.state = {
      news: []
    }
  }

  componentDidMount(){
    dbNews.onceGetNews().then(snapshot => {
      this.setState(() => ({news: snapshot.val()}));
    })
  }

  render(){
    return(
      <div>
        {
          this.state.news.map((event, key) =>
            <NewsItem event = {event} key={key}/>
          )
        }
      </div>
    )
  }
}
