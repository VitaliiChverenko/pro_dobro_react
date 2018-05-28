import React from 'react';
import { Pagination } from 'semantic-ui-react';

const NewsPagination = (props) => {
  const indexOfLastNews = props.activePage * props.newsPerPage;
  const indexOfFirstNews = indexOfLastNews - props.newsPerPage;;

  const currentNews = props.newsArray.slice(indexOfFirstNews, indexOfLastNews);
  const totalPageNumber = props.newsArray.length / props.newsPerPage;;

  const handleActivePage = (e, {activePage}) => {
    props.updActivePage(activePage)
  }

  return(
    <div>
      {currentNews}
      <div className="pagination-wrap">
        <Pagination 
          defaultActivePage={1} 
          totalPages={totalPageNumber} 
          onPageChange={handleActivePage}/>
      </div>
    </div>
    )
  }

export default NewsPagination
