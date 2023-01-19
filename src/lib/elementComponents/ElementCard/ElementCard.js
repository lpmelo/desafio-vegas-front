import React from "react";
import "./ElementCard.css";

const ElementCard = ({ image, content, title }) => {
  return (
    <div className="element-card-container">
      <div className="card-image-container">{image}</div>
      <div className="card-content-container">
        <div className="card-content-title">{title}</div>
        <div className="card-content">{content}</div>
      </div>
    </div>
  );
};

export default ElementCard;
