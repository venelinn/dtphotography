import React from 'react'
import { Link } from 'gatsby'
import './Blog.scss';

const PostLinks = props => {
  return (
    <div className="post-nav-wrapper">
      <div className="post-nav">
        {props.prev && (
          <Link to={`${props.basePath}${props.prev.slug}/`} className="post-nav__link post-nav__link--prev ">
            &#8592; Prev
          </Link>
        )}
        {props.next && (
          <Link to={`${props.basePath}${props.next.slug}/`} className="post-nav__link post-nav__link--next">
            Next &#8594;
          </Link>
        )}
      </div>
    </div>
  )
}

export default PostLinks