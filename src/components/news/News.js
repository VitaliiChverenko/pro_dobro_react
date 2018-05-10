import React, { Component } from 'react';
import NewsItem from './NewsItem'
import { dbNews } from '../../firebase';
import CreateNews from './CreateNews';

export default class NewsList extends Component{
  constructor(props){
    super(props)
    this.state = {
      news: {}
    }
  }

  componentDidMount(){
    dbNews.onceGetNews().then(snapshot => {
      this.setState(() => ({news: snapshot.val() || {}}));
    })
  }

  render(){
    return(
      <div>
        {
          Object.keys(this.state.news).map(key =>
            <NewsItem event = {this.state.news[key]} key={key}/>
          )
        }
        <CreateNews />
      </div>
    )
  }
}
