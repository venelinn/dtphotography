import React, { useState, useEffect, useRef } from "react";
import "./Modal.scss";

const Modal = ({
  isOpen,
  hasCloseBtn = true,
  onClose,
  children
}) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);


  return (
    <dialog
			ref={modalRef}
      open={isOpen}
			onKeyDown={handleKeyDown}
			className="modal"
			data-modal>
      {hasCloseBtn && (
        <button
					className="modal__close"
					onClick={handleCloseModal}
					data-modal-close />
      )}
      {children}
    </dialog>
  );
};

export default Modal;
export { Modal }