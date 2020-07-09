import React from "react";
import Head from "next/head";

import { Preview } from "../components/Preview";
import { SelectImagePhase } from "../components/SelectImagePhase";

export default function Home() {
  const [selectedImage, setSelectedImage] = React.useState(null);

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
            <SelectImagePhase handleSelectImage={handleSelectImage} />
          )}

          {selectedImage && (
            <>
              <div className="field">
                <label htmlFor="" className="label">
                  Passo 2 - Click em <strong>Centralizar</strong> e tire um
                  print da tela.
                </label>
              </div>
              <div className="buttons">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="button is-info"
                >
                  Escolher outra imagem
                </button>

                <a href="#preview" className="button is-success">
                  Centralizar
                </a>
              </div>
            </>
          )}
        </section>

        {selectedImage && <Preview image={selectedImage} />}
      </div>

      <footer className="footer">
        Feito por: <a href="nerijunior.com">Neri Junior</a> - Usando{" "}
        <a href="https://nextjs.org/">Next.Js</a> e{" "}
        <a href="https://unsplash.com/">Unsplash</a>
      </footer>
    </div>
  );
}
