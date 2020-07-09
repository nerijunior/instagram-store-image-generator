import React from "react";

export const Preview = ({ image } = props) => {
  const { color, user } = image;

  return (
    <div id="preview" style={{ backgroundColor: color }}>
      <div
        className="image"
        style={{
          backgroundImage: `url(${image.urls.regular})`,
          backgroundSize: "cover",
          boxShadow: `0 0 8px 8px ${color} inset`,
        }}
      ></div>
      <div className="credits">Foto de {user.name} no Unsplash</div>
    </div>
  );
};
