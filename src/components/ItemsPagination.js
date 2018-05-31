import React from 'react';
import { Pagination } from 'semantic-ui-react';

const NewsPagination = props => {
  const totalPageNumber = props.itemsArray.length / props.itemsPerPage;

  const handleActivePage = (e, {activePage}) => {
    props.updActivePage(activePage)
  }

  return(
      <div className="pagination-wrap">
        <Pagination defaultActivePage={1} 
                    totalPages={totalPageNumber} 
                    onPageChange={handleActivePage}/>
      </div>
    )
  }

const paginate = (items, activePage, itemsPerPage) =>  {
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return items.slice(indexOfFirstItem, indexOfLastItem);
}

export default NewsPagination;
export { paginate };
