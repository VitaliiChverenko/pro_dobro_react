import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const SortNews = props => {
  const sortOptions = [
    { key: 1, text: 'newest first', value: 'newest' },
    { key: 2, text: 'oldest first', value: 'oldest' },
  ];

  const updateValue = (e, value) => {
    props.update(value.value)
  };

  return(
    <Dropdown 
      inline
      onChange={updateValue}
      options={sortOptions}
      defaultValue={sortOptions[0].value}
    />
  )
};

const sortByNewest = arr => arr.sort((a, b) => b - a)
  
const sortByOldest = arr => arr.sort((a, b) => a - b)

const sortChoose = (arr, sortMethod) => {
  if (sortMethod === 'newest') {
    return sortByNewest(arr)
  }
  if (sortMethod === 'oldest') {
    return sortByOldest(arr)
  }
}

export default SortNews;
export { sortChoose };
