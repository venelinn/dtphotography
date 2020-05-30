import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import PostDetails from './PostDetails'
import './PostCard.scss';

const Card = ({ slug, heroImage, title, publishDate, body, ...props }) => {
  return (
    <>
      {heroImage && body && (
        <article key={slug} className="post">
          <div className="post__img">
            <Img sizes={{...heroImage.sizes, aspectRatio: 16/9}}/>
            <Link to={`/blog/${slug}`}></Link>
          </div>
          <div className="post__content">
            <h2 className="title title--h2 post__title">
              <Link to={`/blog/${slug}`}>{title} </Link>
            </h2>
            <PostDetails
              date={publishDate}
              timeToRead={body.childMarkdownRemark.timeToRead}
            />
          </div>
          <section>
            <p dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.excerpt }} />
          </section>
        </article>
      )}
    </>
  )
}

export default Card