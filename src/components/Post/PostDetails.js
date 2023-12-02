import React from 'react';
import { string } from 'prop-types';
import './Blog.scss';

const PostDetails = ({ date }) => {
  return (
    <div className='date'>
      <span className='date__wrapper'>
        <span role="img" aria-label={date} aria-labelledby={date}>📅</span>
        {date}
      </span>
    </div>
  )
}

export default PostDetails;


PostDetails.propTypes = {
  date: string,
};