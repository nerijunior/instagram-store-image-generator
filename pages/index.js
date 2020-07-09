import React from "react";
import Head from "next/head";
import classnames from "classnames";

const Preview = ({ image } = props) => {
  const { color } = image;

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
    </div>
  );
};

export default function Home() {
  const [loadingImages, setLoadingImages] = React.useState(false);
  const [imagesPage, setImagesPage] = React.useState(1);
  const [term, setTerm] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);

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

  const handleSelectImage = (image) => () => {
    setSelectedImage(image);
  };

  return (
    <div>
      <Head>
        <title>Instagram Story Response Image</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <div className="container">
        <section className="section">
          <h1 className="title">Fundo Resposta Instagram</h1>

          {!selectedImage && (
            <>
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
                            Search
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
            </>
          )}
        </section>

        {selectedImage && (
          <>
            <button onClick={() => setSelectedImage(null)} className="button">
              Escolher outra imagem
            </button>
            <Preview image={selectedImage} />
          </>
        )}
      </div>

      <footer className="footer">
        Feito por: <a href="nerijunior.com">Neri Junior</a> - Usando{" "}
        <a href="https://nextjs.org/">Next.Js</a> e{" "}
        <a href="https://unsplash.com/">Unsplash</a>
      </footer>
    </div>
  );
}
