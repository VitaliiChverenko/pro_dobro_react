import React from 'react';
import ShowNews from './ShowNews';
import EditNews from './EditNews';
import DeleteNews from './DeleteNews';
import placeholder from '../../media/images/pic-placeholder.png';

const NewsItem = (props) => {
  return(
    <div className="ui grid stackable segment">
      <div className="five wide column news-pic-wrapper">
        <div className="news-pic-box">
          { 
            <img src={props.event.imageUrl || placeholder} 
                 alt="News"
                 onError={e => e.target.src = placeholder}
            /> 
          }
        </div>
        <p className="created-at">
          Created at: <span> {new Date(props.event.createdAt).toLocaleString()} </span>
        </p>
      </div>
      <div className="eleven wide column news-description">
        <h2>{props.event.title}</h2>
        <p>{props.event.description}</p>
        <div className="news-btns">
          <ShowNews news={props.event}/> 
          <EditNews onUpdated={props.onUpdated} id={props.event} news={props.event}/>
          <DeleteNews onDelete={props.onDelete} id={props.event} news={props.event}/>        
        </div>
      </div>
    </div>
  )
}

export default NewsItem;
