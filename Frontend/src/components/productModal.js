import React from "react";
import Modal from "react-modal";
import Image from "next/image";

const ProductModal = ({ isOpen, closeModal, product }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Product Details"
      className="product_modal"
      overlayClassName="product_modal_overlay"
    >
      <div className="modal_content">
        <h2>product 1</h2>
        <div className="modal_image">
          <Image
            src={'/mob.png'}
            alt={"product1"}
            width={500}
            height={300}
          />
        </div>
        <p>very good product</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
};

export default ProductModal;
