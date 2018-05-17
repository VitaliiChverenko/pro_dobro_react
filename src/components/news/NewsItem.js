import React from 'react';
import ShowNews from './ShowNews';
import EditNews from './EditNews';
import { connect } from 'react-redux';
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
        <h2>{props.event.title}</h2>
        <p>
            {props.event.description}
        </p>
        <div className="news-btns">
          <ShowNews news={props.event}/> 
          <EditNews onUpdated={props.onUpdated} news={props.event}/>
          {
            props.user && props.user.isAdmin ?
              <Button color='red' onClick={() => props.onDelete(props.event.createdAt)}>Delete news</Button>
              :
              true
          }        
        </div>
      </div>
    </div>
  )
}

export default connect (
  state => ({
    user: state.auth
  })
)(NewsItem);
