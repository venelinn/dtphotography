import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: .5rem;
  margin-bottom: .5rem;
  font-size: 90%;
  span {
    margin-right: 0.5rem;
  }
`

const Date = styled.span`
  display: inline-block;
  margin-right: 1rem;
`
const PostDetails = ({ date }) => {
  return (
    <Wrapper>
      <Date><span role="img" aria-label={date}  aria-labelledby={date}>📅</span> {date}</Date>
    </Wrapper>
  )
}

export default PostDetails;


PostDetails.propTypes = {
  date: string,
};