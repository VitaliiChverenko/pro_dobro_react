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

export default SortNews
