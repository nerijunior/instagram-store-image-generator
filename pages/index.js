import React from "react";
import Head from "next/head";
import { SliderPicker, GithubPicker } from "react-color";
import { ArrowLeftCircle, Download } from "react-feather";
import classnames from "classnames";

import { Preview } from "../components/Preview";
import { SelectImagePhase } from "../components/SelectImagePhase";

export default function Home() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedColor, setSelectedColor] = React.useState("");
  const [loadingDownload, setLoadingDownload] = React.useState(false);

  const handleSelectImage = (image) => () => {
    setSelectedImage(image);
    setSelectedColor(image.color);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.hex);
  };

  const handleDownload = () => {
    setLoadingDownload(true);

    fetch("/api/process", {
      method: "POST",
      body: JSON.stringify({
        imageUrl: selectedImage.urls.regular,
        color: selectedColor,
        credits: `Foto de ${selectedImage.user.name} no Unsplash`,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = `data:application/octet-stream;base64,${response.image}`;
        downloadLink.download = "teste.png";
        downloadLink.click();
        setLoadingDownload(false);
      })
      .catch((error) => {
        setLoadingDownload(false);
      });
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
                  <span className="icon">
                    <ArrowLeftCircle />
                  </span>
                  <span>Escolher outra imagem</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className={classnames("button is-success", {
                    "is-loading": loadingDownload,
                  })}
                >
                  <span className="icon">
                    <Download />
                  </span>
                  <span>Baixar</span>
                </button>
              </div>

              <SliderPicker
                color={selectedColor}
                onChangeComplete={handleColorChange}
              />

              <br />

              <GithubPicker
                color={selectedColor}
                triangle="hide"
                colors={[
                  "#000",
                  "#fff",
                  "#FF6900",
                  "#FCB900",
                  "#7BDCB5",
                  "#00D084",
                  "#8ED1FC",
                  "#0693E3",
                  "#ABB8C3",
                  "#EB144C",
                  "#F78DA7",
                  "#9900EF",
                ]}
                onChangeComplete={handleColorChange}
              />
            </>
          )}
        </section>

        {selectedImage && (
          <>
            <p>Como vai ficar</p>
            <Preview image={selectedImage} backgroundColor={selectedColor} />
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
