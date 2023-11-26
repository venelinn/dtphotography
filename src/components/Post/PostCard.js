import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PostDetails from './PostDetails'
import './PostCard.scss';

const Card = ({ slug, heroImage, title, publishDate, excerpt }) => {
  const image = getImage(heroImage);
  return (
    <>
      {heroImage && (
        <article key={slug} className="post">
          <div className="post__img">
            <GatsbyImage image={image} alt={title} />
            <Link to={`/blog/${slug}`}></Link>
          </div>
          <div className="post__content">
            <h2 className="title title--h2 post__title">
              <Link to={`/blog/${slug}`}>{title} </Link>
            </h2>
            <PostDetails
              date={publishDate}
            />
          </div>
          <section>
            <p>{excerpt}</p>
          </section>
        </article>
      )}
    </>
  )
}

export default Card