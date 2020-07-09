import React from "react";
import classnames from "classnames";

export const SelectImagePhase = ({ handleSelectImage } = props) => {
  const [term, setTerm] = React.useState("");
  const [loadingImages, setLoadingImages] = React.useState(false);
  const [images, setImages] = React.useState([]);

  const handleImageSearch = (e) => {
    e.preventDefault();

    setLoadingImages(true);

    fetch("/api/image-search", {
      method: "POST",
      body: JSON.stringify({ term }),
    })
      .then((response) => response.json())
      .then((response) => {
        setLoadingImages(false);
        setImages(response.results);
      });
  };

  return (
    <div id="first-phase">
      <form onSubmit={handleImageSearch} className="form">
        <div className="field">
          <label htmlFor="" className="label">
            Passo 1 - Escolher uma imagem
          </label>
          <div className="field-body">
            <div className="field is-expanded">
              <div className="field has-addons">
                <p className="control is-expanded">
                  <input
                    className={classnames("input", {
                      "is-loading": loadingImages,
                    })}
                    disabled={loadingImages}
                    type="text"
                    placeholder="Cachorro, montanha, people, food"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                  />
                </p>
                <div className="control">
                  <button type="submit" className="button is-info">
                    Buscar
                  </button>
                </div>
              </div>
              <p className="help">
                Dica: se pesquisar o termo em inglês fica melhor! ;)
              </p>
            </div>
          </div>
        </div>
      </form>

      <hr />

      <div className="columns is-multiline">
        {images.length > 0 &&
          images.map((image) => (
            <div
              className="column is-2 image"
              key={image.id}
              onClick={handleSelectImage(image)}
            >
              <img src={image.urls.small} />
            </div>
          ))}
      </div>
    </div>
  );
};
