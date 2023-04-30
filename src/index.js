import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import data from "./data.json";
import data_cn from "./data_cn.json"
import { CSSTransition } from 'react-transition-group';
import HomeIcon from "./resource/image/ico_home.png";
import QRCode from "./resource/image/disco_qr.png";

function Board() {
  const [selectedButton, setSelectedButton] = useState(-1);

  const [isPanelShown, setIsPanelShown] = useState(false);
  const [isLeftSelected, setIsLeftSelected] = useState(false);
  const [isRightSelected, setIsRightSelected] = useState(false);
  const [selectedPanelData, setSelectedPanelData] = useState(null);
  const [selectedLanguage, setLanguage] = useState('en');

  const toggleLanguage = () => {
    if (selectedLanguage === 'en') {
      setLanguage('cn');
      setSelectedPanelData(isLeftSelected ? data_cn.left : data_cn.right);
    } else {
      setLanguage('en');
      setSelectedPanelData(isLeftSelected ? (data.left) : (data.right));
    }
  }

  // useEffect(() => {

  // }, [selectedLanguage])
  // let selectedPanelData = isLeftSelected ? data.left : data.right;

  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);

  const showPanel = (isPanel, isLeft) => {
    console.log("Show explore panels : " + isPanel);
    console.log("Is left panel : " + isLeft);
    setIsPanelShown(isPanel);
    if (!isPanel){
      document.getElementById('right').classList.remove('active');
      document.getElementById('left').classList.remove('active');
      document.getElementsByClassName('doughnut-border')[0].classList.remove('move-down');
      document.getElementsByClassName('doughnut-border')[0].classList.add('move-up');
      setIsLeftSelected(false);
      setIsRightSelected(false);
      return;
    }
    if (isLeft) {
      document.getElementById('right').classList.remove('active');
      document.getElementById('left').classList.add('active');
      setIsLeftSelected(true);
      setIsRightSelected(false);
    } else {
      document.getElementById('left').classList.remove('active');
      document.getElementById('right').classList.add('active');
      setIsLeftSelected(false);
      setIsRightSelected(true);
    }
    setSelectedPanelData(isLeft ? (selectedLanguage === "en" ? data.left : data_cn.left) : (selectedLanguage === "en" ? data.right : data_cn.right));
    setSelectedButton(0);
  }

  return (
    <>
      <Doughnut onClickHandler={(isPanel, isLeft) => showPanel(isPanel, isLeft)} lang={selectedLanguage} />
      <CSSTransition
        in={isLeftSelected}
        nodeRef={nodeRef}
        timeout={5000}
        classNames="fade"
        unmountOnExit
      >
        <div ref={nodeRef} key={selectedLanguage}>
          {isPanelShown && isLeftSelected && (<Panel key={isLeftSelected ? (selectedLanguage === 'en' ? 0 : 1) : (selectedLanguage === 'en' ? 2 : 3)} panel_data={selectedPanelData} isLeft={true} selectedButton={selectedButton} buttonClickHandler={(idx) => setSelectedButton(idx)} lang={selectedLanguage} />)
          }
        </div>

      </CSSTransition>
      <CSSTransition
        in={isRightSelected}
        nodeRef={nodeRef2}
        timeout={5000}
        classNames="fade"
        unmountOnExit
      >
        <div
          ref={nodeRef2} key={selectedLanguage}>
          {isPanelShown && isRightSelected && (<Panel key={isRightSelected ? (selectedLanguage === 'en' ? 0 : 1) : (selectedLanguage === 'en' ? 2 : 3)} panel_data={selectedPanelData} isLeft={false} selectedButton={selectedButton} buttonClickHandler={(idx) => setSelectedButton(idx)} lang={selectedLanguage} />)
          }
        </div>
      </CSSTransition>
      <TranslateButton toggle={() => toggleLanguage()} lang={selectedLanguage} />

    </>
  )
}

function TranslateButton({ lang, toggle }) {
  return (
    <div key={lang} style={{ position: 'absolute', bottom: '2%', right: '2%' }} onClick={() => toggle()}>
      <img src={lang === "cn" ? "cn_selected.svg" : "cn.svg"} style={{ height: "2.8vh", marginRight: '2vh' }} alt={lang === "cn" ? "cn_selected.svg" : "cn.svg"} />
      <img src="bar.svg" style={{ height: "2.8vh", marginRight: '2vh' }} alt="bar.svg" />
      <img src={lang === "en" ? "en_selected.svg" : "en.svg"} style={{ height: "2.5vh" }} alt={lang === "en" ? "en_selected.svg" : "en.svg"} />
    </div >
  );
}

function Panel({ panel_data, isLeft, selectedButton, buttonClickHandler, lang }) {
  const [videoSrc, setVideoSrc] = useState(panel_data.buttons[0].video_src);
  const [videoDesc, setVideoDesc] = useState(panel_data.buttons[0].video_desc);
  
  const images = panel_data.slides;
  console.log(images);
  const reg_video = /\.(mov|mp4)/i;
  return (
    <div style={{
      position: "absolute",
      width: "44.4vh",
      height: "90%",
      left: isLeft ? "calc(50% - 44.4vh)" : "50%",
      top: "5%"
    }}>
      <div className="vvideo-container">
        <video key={videoSrc + (isLeft ? "0" : "1")} autoPlay muted loop poster={videoSrc.match(reg_video) ? "" : videoSrc} >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="video-description">
        {videoDesc}
      </div>
      </div>
      
      <div style={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        position: "absolute",
        bottom: "5%",
        left: "6%"
      }}
      >
        {
          panel_data.buttons.map((button, i) => (
            <button className={i === selectedButton ? "panel button-selected" : "panel"} key={i} onClick={() => {
              buttonClickHandler(i);
              setVideoSrc(button.video_src);
              setVideoDesc(button.video_desc);
            }} style={{
              display: "inline-flex",
              alignItems: "center"
            }}><span dangerouslySetInnerHTML={{ __html: button.title }}></span></button>
          ))
        }
      </div>
      <div className="qr-container" style={{
        position: "fixed",
        right: isLeft? "3vh" : "",
        left: isLeft? "" : "3vh"
      }} >
        <div> Get to know our team!</div>
        <br></br>
        <img src={QRCode} style={{
        width: "100%"}}></img>
      </div>
      {/*
      <div style={{
        position: "absolute",
        width: "90%",
        height: "25%",
        left: "5%",
        top: "70%",
        // backgroundColor: "yellow"
      }}>
        <Slide indicators={true} autoplay={false} key={isLeft ? 0 : 1}>
          {
            images.map((slide_image, i) => (
              <div className="each-slide-effect" key={i}>
                <div style={{ 'backgroundImage': `url(${slide_image})` }}>
                  {// <span>Slide {i}</span> }
                </div>
              </div>
            ))
          }
        </Slide>
      </div>
      */}
    </div>
  );
}

function Icon(props) {
  return (
    <svg width="13" height="13" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M9 9.5V34.5L34 22L9 9.5Z" fill="#1A1A1A" />
    </svg>
  );
}

// class Home extends React.Component {

//   render() {

//   }
// }

function Home({ onClick, lang }) {
  const data_lang = lang === "en" ? data : data_cn;
  return (
    <div className='home-bg move-up'>
      <div id="left" className='home-half title'>
        <span>{data_lang.home.init_left_top}</span>
        <span style={{ fontSize: '80%' }}>{data_lang.home.init_left_bottom}</span>
      </div>
      <div id="right" className='home-half description'>
        <span> {data_lang.home.init_right}</span>
        <button onClick={() => onClick()}><Icon value="play" />{data_lang.home.init_right_button}</button>
      </div>
    </div>
  );
}

function Explore({ onClick = f => f, onClickHandler = f => f, lang }) {
  let timeoutID = setTimeout(function(){onClick(); onClickHandler(false, true);}, 120000);

  function resetTimer() {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function(){onClick(); onClickHandler(false, true);}, 120000);
  }

  document.addEventListener("mousemove", resetTimer);
  document.addEventListener("click", resetTimer);

  const data_lang = lang === "en" ? data : data_cn;
  document.addEventListener("mousemove", resetTimer);
  document.addEventListener("click", resetTimer);
  return (
    <>
      <div className='home-bg fade-in move-down'>
        <div id="left" className='sub-left' tabIndex={1} onClick={() => onClickHandler(true, true)}>
          <span className='sub title'>DISCO</span>
          <span className='sub description'><span>{data_lang.disco.line1}&nbsp;</span><span>{data_lang.disco.line2}&nbsp;</span><span>{data_lang.disco.line3}&nbsp;</span><span>{data_lang.disco.line4}&nbsp;</span><span>{data_lang.disco.line5}</span></span>
        </div>
        <div className='v-divider'></div>
        <div id="right" className='sub-right' tabIndex={2} onClick={() => onClickHandler(true, false)}>
          <span className='sub title'>MAT<span className='sub-title' style={{ fontSize: 'smaller' }}>Sim</span></span>
          <span className='sub description'><span>{data_lang.matsim.line1}&nbsp;</span><span>{data_lang.matsim.line2}&nbsp;</span><span>{data_lang.matsim.line3}</span></span>
          {/* Button for testing only */}
        </div>
      </div>
      <div id="home-button" onClick={() => {onClick(); onClickHandler(false, true) }}><img id="home-icon" src={HomeIcon} alt="home" /></div>
    </>

  );
}

function Doughnut({ onClickHandler, lang }) {
  const [isExplore, setIsExplore] = useState(false);

  const exploreMenu = () => {
    setIsExplore(!isExplore);
    document.getElementById('filter').style.boxShadow = !isExplore ? 'inset 0 0 0 100vmax rgba(255, 255, 255, 0.3)' : '';
    document.getElementById('filter').classList.add('fade-in');
    document.getElementsByClassName('doughnut-border')[0].classList.remove('move-up');
    document.getElementsByClassName('doughnut-border')[0].classList.add('move-down');

  }

  return (
    <>
      <div className='doughnut-border move-up'>
        <div className="doughnut">
        </div>
      </div>
      {isExplore ?
        <Explore onClick={() => exploreMenu()} onClickHandler={(isPanel, isLeft) => onClickHandler(isPanel, isLeft)} lang={lang} /> :
        <Home onClick={() => exploreMenu()} lang={lang} />}
    </>
  );
}
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board />);
