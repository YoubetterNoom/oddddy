import "./App.css";
import { useState, useRef, useEffect } from "react";
import allPics from "./info.json";
import html2canvas from "html2canvas";
import LazyLoad from "react-lazyload";

function App() {
  const divRef = useRef(null);

  const [currentHat, setCurrentHat] = useState(0);
  const [currentFace, setCurrentFace] = useState(0);
  const [currentMisc, setCurrentMisc] = useState(0);
  const [currentEffect, setCurrentEffect] = useState(0);

  const map = ["HAT", "FACE", "MISC", "EFFECT"];

  useEffect(() => {
    console.log(currentEffect);
  }, [currentEffect]);

  const handleReset = () => {
    setCurrentHat(0);
    setCurrentEffect(0);
    setCurrentFace(0);
    setCurrentMisc(0);
  };

  const handleDownload = async () => {
    try {
      const node = divRef.current;
      const canvas = await html2canvas(node);
      const img = canvas.toDataURL("image/png");
      const imgElement = document.createElement("a");
      imgElement.href = img;
      imgElement.download = "footage";
      imgElement.click();
    } catch (error) {
      console.error("Error exporting div to image:", error);
    }
  };

  const getImg = (m) => {
    switch (m) {
      case "HAT":
        return require(`./assets/${m}/${allPics[m][currentHat]}`);
      case "FACE":
        return require(`./assets/${m}/${allPics[m][currentFace]}`);
      case "MISC":
        return require(`./assets/${m}/${allPics[m][currentMisc]}`);
      case "EFFECT":
        return require(`./assets/${m}/${allPics[m][currentEffect]}`);
      default:
        return;
    }
  };
  const isEmpty = (m) => {
    switch (m) {
      case "HAT":
        return currentHat === 0;
      case "FACE":
        return currentFace === 0;
      case "MISC":
        return currentMisc === 0;
      case "EFFECT":
        return currentEffect === 0;
    }
  };

  const renderContent = (m, index) => {
    const handleBefore = () => {
      switch (m) {
        case "HAT":
          currentHat > 0 && setCurrentHat(currentHat - 1);
          break;
        case "FACE":
          currentFace > 0 && setCurrentFace(currentFace - 1);
          break;
        case "MISC":
          currentMisc > 0 && setCurrentMisc(currentMisc - 1);
          break;
        case "EFFECT":
          currentEffect > 0 && setCurrentEffect(currentEffect - 1);
          break;
        default:
          return;
      }
    };

    const handleNext = () => {
      switch (m) {
        case "HAT":
          currentHat < allPics[m].length - 1 && setCurrentHat(currentHat + 1);
          break;
        case "FACE":
          currentFace < allPics[m].length - 1 &&
            setCurrentFace(currentFace + 1);
          break;
        case "MISC":
          currentMisc < allPics[m].length - 1 &&
            setCurrentMisc(currentMisc + 1);
          break;
        case "EFFECT":
          currentEffect < allPics[m].length - 1 &&
            setCurrentEffect(currentEffect + 1);
          break;
        default:
          return;
      }
    };

    return (
      <div className="text" key={index}>
        <span>{m}</span>
        <div className="container">
          <img
            onClick={() => {
              handleBefore();
            }}
            src={require("./assets/arrow.png")}
            style={{
              width: "20px",
              transform: "rotate(270deg)",
              cursor: "pointer",
              zIndex: "99",
            }}
          />
          {
            <div className="middle">
              <LazyLoad>
                <img
                  className={`${isEmpty(m) ? "empty" : `icon ${m}`} `}
                  src={getImg(m)}
                />
              </LazyLoad>
            </div>
          }
          <img
            onClick={() => {
              handleNext();
            }}
            src={require("./assets/arrow.png")}
            style={{
              width: "20px",
              transform: "rotate(90deg)",
              cursor: "pointer",
              zIndex: "99",
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="content">
        <div className="main">
          <div className="buttons">
            <div className="button" onClick={handleReset}>
              RESET
            </div>
            <div className="button" onClick={handleDownload}>
              DOWNLOAD
            </div>
          </div>
          <div className="show">
            <div className="man-container" ref={divRef}>
              {!isEmpty("HAT") && <img src={getImg("HAT")} className="hat" />}
              <img src={require("./assets/2.png")} className="awesome" />
              {!isEmpty("FACE") && (
                <img src={getImg("FACE")} className="face" />
              )}
              {!isEmpty("MISC") && (
                <img src={getImg("MISC")} className="misc" />
              )}
              {!isEmpty("EFFECT") && (
                <img src={getImg("EFFECT")} className="effect" />
              )}
            </div>
          </div>
          <div className="textList">
            {map.map((i, index) => {
              return renderContent(i, index);
            })}
          </div>
        </div>
      </div>
      <div className="footer">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="https://t.me/+70LEM_FeQNs1YTU1" target="_blank" rel="noopener noreferrer">
          Telegram
        </a>
      </div>
    </div>
  );
}

export default App;
