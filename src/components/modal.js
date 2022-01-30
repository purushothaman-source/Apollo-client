import React from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
const ModalBody = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const Modal = ({ children, isOpen, handleClick }) => {
  if (!isOpen) return <></>;
  return createPortal(
    <ModalBody onClick={handleClick}>{children}</ModalBody>,
    document.body
  );
};

export default Modal;
