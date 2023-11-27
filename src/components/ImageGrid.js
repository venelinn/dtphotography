import React, { useState } from 'react';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Carousel, { Modal, ModalGateway } from 'react-images';
import { chunk, sum } from 'lodash';

const Gallery = ({ thumbs, full, itemsPerRow: itemsPerRowByBreakpoints = [2]}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);

  const closeModal = () => setModalIsOpen(false);
  const openModal = (imageIndex) => {
    setModalCurrentIndex(imageIndex);
    setModalIsOpen(true);
  };

  const aspectRatios = thumbs.map((image) => image.width / image.height);
  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    (itemsPerRow) =>
      chunk(aspectRatios, itemsPerRow).map((rowAspectRatios) => sum(rowAspectRatios))
  );

  return (
    <div className="gallery">
      {thumbs.map((thumb, i) => {
        const thumbnail = getImage(thumb);

        return (
        <div
          className="gallery__item"
          key={i}
          style={{
            '--thumb-width': rowAspectRatioSumsByBreakpoints.map((rowAspectRatioSums, j) => {
              const rowIndex = Math.floor(i / itemsPerRowByBreakpoints[j]);
              const rowAspectRatioSum = rowAspectRatioSums[rowIndex];

              return `calc(${(aspectRatios[i] / rowAspectRatioSum) * 100}% - 5px)`;
            })[0],
          }}

          >
          <GatsbyImage image={thumbnail} alt={thumb?.caption} />
          <a
            href={thumb.images.fallback.src}
            title={thumb?.caption}
            onClick={(e) => { e.preventDefault(); openModal(i); }}
            className="gallery__link"
            >
          </a>
        </div>
      )})}

      {ModalGateway && (
        <ModalGateway>
          {modalIsOpen && (
            <Modal onClose={closeModal}>
              <Carousel
                views={full.map(({ images, caption }) => ({
                  source: images.fallback.src,
                  caption,
                }))}
                currentIndex={modalCurrentIndex}
              />
            </Modal>
          )}
        </ModalGateway>
      )}
    </div>
  );
};

export default Gallery;