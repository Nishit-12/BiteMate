import React from "react";
import ReactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "rgb(34, 34, 34)",
  transform: "translate(-50%, -50%)",
  zIndex: 100,
  height: "90%",
  width: "90%",
};

const BLURRED_OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 99,
  backdropFilter: "blur(4px)",
  backgroundColor: "rgba(0, 0, 0, 0.6)", 
};


export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={BLURRED_OVERLAY_STYLES} onClick={onClose}/>
      <div style={MODAL_STYLES}>
        <button
          className="btn bg-danger fs-4"
          style={{ marginLeft: "90%", marginTop: "-35px", cursor: "pointer" }}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById("cart-root")
  );
}
