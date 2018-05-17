import React from 'react';
import ShowNews from './ShowNews';
import EditNews from './EditNews';
import { Button } from 'semantic-ui-react';
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
        <div className="edit-news-header">
          <div>
            <h2>{props.event.title}</h2>
          </div>
          <div> 
            <div className="show-news-btn">
              <ShowNews news={props.event}/>          
            </div>
            <div className="edit-news-btn">
              <EditNews onUpdated={props.onUpdated} news={props.event}/>          
            </div>
          </div>
        </div>
        <p>
            {props.event.description}
        </p>
        <div className="show-news-btn">
          <ShowNews news={props.event}/> 
          <Button onClick={() => props.onDelete(props.event.createdAt)}>Delete news</Button>         
        </div>
      </div>
    </div>
  )
}

export default NewsItem;
