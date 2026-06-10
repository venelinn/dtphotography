import React, { useState } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { chunk, sum } from 'lodash';
import LightGallery from 'lightgallery/react';

// Use lightgallery's precompiled CSS. Its SCSS uses `@use`, which conflicts
// with the global `additionalData` @import injected by gatsby-plugin-sass.
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-autoplay.css'
import 'lightgallery/css/lg-fullscreen.css'
import 'lightgallery/css/lg-share.css'

// import plugins if you need
// import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgHash from "lightgallery/plugins/hash";

const Gallery = ({
  thumbs,
  full,
  slug,
  itemsPerRow: itemsPerRowByBreakpoints = [2],
}) => {

  const aspectRatios = thumbs.map((image) => image.width / image.height);
  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    (itemsPerRow) =>
      chunk(aspectRatios, itemsPerRow).map((rowAspectRatios) =>
        sum(rowAspectRatios)
      )
  );
  const onInit = () => {};

  return (
    <div className="gallery">
       <LightGallery
          onInit={onInit}
          speed={500}
          download={false}
          plugins={[lgZoom, lgAutoplay, lgFullscreen, lgShare, lgHash]}
          autoplay={{
            autoplay: true,
            pause: 3000,
            autoplayFirstVideo: true,
          }}
          share={{
            facebook: true,
            x: true,
            pinterest: false,
            getShareUrl: (index) => {
              const image = full[index];
              const baseUrl = "https://dtphotography.ca";
              const shareUrl = `${baseUrl}/${slug}/${image.id}`;

              // Ensure the URL starts with the protocol
              return shareUrl;
            },
            getShareTitle: (index) => {
              const image = full[index];
              return image.alt || "Check out this image!";
            },
          }}

      >
        {thumbs.map((thumb, i) => {
          const thumbnail = getImage(thumb);

          return (
            <a
              data-src={full[i].images.fallback.src}
              className="gallery__item"
              key={i}
              style={{
                '--thumb-width': rowAspectRatioSumsByBreakpoints.map(
                  (rowAspectRatioSums, j) => {
                    const rowIndex = Math.floor(i / itemsPerRowByBreakpoints[j]);
                    const rowAspectRatioSum = rowAspectRatioSums[rowIndex];

                    return `calc(${
                      (aspectRatios[i] / rowAspectRatioSum) * 100
                    }% - 5px)`;
                  }
                )[0],
              }}
              >
              <GatsbyImage image={thumbnail} alt={thumb?.caption} />
            </a>
          );
        })}
          ...
      </LightGallery>

    </div>
  );
};

export default Gallery;
