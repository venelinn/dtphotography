import React, { useState } from 'react';
import Img from 'gatsby-image';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { Box } from 'rebass';
import { chunk, sum } from 'lodash';

const Gallery = ({
  images,
  full,
  itemsPerRow: itemsPerRowByBreakpoints = [2],
}) => {
  console.log(full)
  const aspectRatios = images.map(image => image.aspectRatio);
  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    itemsPerRow =>
      chunk(aspectRatios, itemsPerRow).map(rowAspectRatios =>
        sum(rowAspectRatios),
      ),
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);

  const closeModal = () => setModalIsOpen(false);
  const openModal = (imageIndex) => {
    setModalCurrentIndex(imageIndex);
    setModalIsOpen(true);
  };

  return (
    <Box className="gallery">
      {images.map((image, i) => (
        <Box
          className="gallery__item"
          key={i}
          width={rowAspectRatioSumsByBreakpoints.map(
            (rowAspectRatioSums, j) => {
              const rowIndex = Math.floor(i / itemsPerRowByBreakpoints[j]);
              const rowAspectRatioSum = rowAspectRatioSums[rowIndex];

              return `${(image.aspectRatio / rowAspectRatioSum) * 100}%`;
            },
          )}
        >
          <Img
             fluid={{...image}}
          />
          <a
            href={image.fluid}
            title={image.caption}
            onClick={(e) => {
              e.preventDefault();
              openModal(i);
            }}
            className="gallery__link"
            >
          </a>


        </Box>
      ))}

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
    </Box>
  );
};

export default Gallery;