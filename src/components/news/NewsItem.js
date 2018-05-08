import React from 'react';
import ShowNews from './ShowNews'

const NewsItem = (props) => {
  return(
    <div>
      <div>{props.event.title}
        <ShowNews news={props.event}/>
      </div>
    </div>
  )
}

export default NewsItem;
