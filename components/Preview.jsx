import React from "react";

export const Preview = ({ image, backgroundColor } = props) => {
  const { user } = image;

  return (
    <div id="preview" style={{ backgroundColor: backgroundColor }}>
      <div
        className="image"
        style={{
          backgroundImage: `url(${image.urls.regular})`,
          backgroundSize: "cover",
          boxShadow: `0 0 8px 8px ${backgroundColor} inset`,
        }}
      ></div>
      <div className="credits">Foto de {user.name} no Unsplash</div>
    </div>
  );
};
