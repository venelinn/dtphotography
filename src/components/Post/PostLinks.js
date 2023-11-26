import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

// TODO: remove styled components

const Wrapper = styled.div`
  margin: 2rem 0 0 0;
  padding: 0 0
`

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  a {
    color: white;
    padding: 1em 0;
    border-radius: 2px;
    text-decoration: none;
    transition: 0.2s;
  }
`

const PreviousLink = styled(Link)`
  margin-right: auto;
  order: 1;
`

const NextLink = styled(Link)`
  margin-left: auto;
  order: 2;
`

const PostLinks = props => {
  return (
    <Wrapper>
      <Box>
        {props.prev && (
          <PreviousLink to={`${props.basePath}${props.prev.slug}/`}>
            &#8592; Prev
          </PreviousLink>
        )}
        {props.next && (
          <NextLink to={`${props.basePath}${props.next.slug}/`}>
            Next &#8594;
          </NextLink>
        )}
      </Box>
    </Wrapper>
  )
}

export default PostLinks