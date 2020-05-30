import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: .5rem;
  font-size: 90%;
  span {
    margin-right: 0.5rem;
  }
`

const Date = styled.span`
  display: inline-block;
  margin-right: 1rem;
`

const ReadingTime = styled.span`
  display: inline-block;
`

const PostDetails = props => {
  return (
    <Wrapper>
      <Date><span role="img" aria-label={props.date}  aria-labelledby={props.date}>📅</span> {props.date}</Date>
      <ReadingTime>{`⏱️ ${props.timeToRead} min read `}</ReadingTime>
    </Wrapper>
  )
}

export default PostDetails