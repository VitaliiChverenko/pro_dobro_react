import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

const deleteNews = (props) => {
  return (
    props.user && props.user.isAdmin ?
      <Button color='red' 
              onClick={() => props.onDelete(props.news)}
      >Delete news</Button>
      :
      true
  )
}
export default connect (
  state => ({
    user: state.auth
  })
)(deleteNews);