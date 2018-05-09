import React from 'react';
import ShowNews from './ShowNews'
import placeholder from '../../media/images/pic-placeholder.png';

const NewsItem = (props) => {
  return(
    <div className="ui grid segment">
      <div className="five wide column news-pic-wrapper">
        <div className="news-pic-box" style={{backgroundImage: `url('${placeholder}')`}}></div>
        <div className="news-pic-box" style={{backgroundImage: `url('${props.event.imageUrl}')`}}></div>
        <p className="created-at">
          Created at: <span> {new Date(props.event.createdAt).toLocaleString()} </span>
        </p>
      </div>
      <div className="eleven wide column news-description">
        <h2>{props.event.title}</h2>
        <p>
          {props.event.description}
        </p>
        <div className="show-news-btn">
          <ShowNews news={props.event}/>          
        </div>
      </div>
    </div>
  )
}

export default NewsItem;
