import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import data from "./data.json";
import { CSSTransition } from 'react-transition-group';

function Board() {
  const [selectedButton, setSelectedButton] = useState(-1);

  const [isPanelShown, setIsPanelShown] = useState(false);
  const [isLeftSelected, setIsLeftSelected] = useState(false);
  const [isRightSelected, setIsRightSelected] = useState(false);
  const [selectedPanelData, setSelectedPanelData] = useState(null);
  // let selectedPanelData = isLeftSelected ? data.left : data.right;

  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);

  const showPanel = (isLeft) => {
    setIsPanelShown(true);
    if(isLeft) {
      setIsLeftSelected(true);
      setIsRightSelected(false);
    } else {
      setIsLeftSelected(false);
      setIsRightSelected(true);
    }
    setSelectedPanelData(isLeft ? data.left : data.right);
    setSelectedButton(0);
  }

  return (
    <>
      <Doughnut onClickHandler={(isLeft) => showPanel(isLeft)} />
      <CSSTransition
        in={isLeftSelected}
        nodeRef={nodeRef}
        timeout={5000}
        classNames="fade"
        unmountOnExit
      >
        <div ref={nodeRef}>
          {isPanelShown && isLeftSelected && (<Panel key={isLeftSelected ? 0 : 1} panel_data={selectedPanelData} isLeft={true} selectedButton={selectedButton} buttonClickHandler={(idx) => setSelectedButton(idx)} />)
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
          ref={nodeRef2}>
          {isPanelShown && isRightSelected && (<Panel key={isRightSelected ? 0 : 1} panel_data={selectedPanelData} isLeft={false} selectedButton={selectedButton} buttonClickHandler={(idx) => setSelectedButton(idx)} />)
          }
        </div>
      </CSSTransition>
    </>
  )
}

function Panel({ panel_data, isLeft, selectedButton, buttonClickHandler }) {
  const [videoSrc, setVideoSrc] = useState(panel_data.buttons[0].video_src);

  const images = panel_data.slides;

  const reg_video = /\.(mov|mp4)/i;
  return (
    <div style={{
      position: "absolute",
      width: "45%",
      height: "90%",
      left: isLeft ? "5%" : "50%",
      top: "5%",
      // opacity: 0
      // display: "none"
    }}>
      <div className="video-container">
        <video key={videoSrc + (isLeft ? "0" : "1")} autoPlay muted loop poster={videoSrc.match(reg_video) ? "" : videoSrc} >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
      <div style={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        position: "absolute",
        top: "23.5%"
      }}>
        {
          panel_data.buttons.map((button, i) => (
            <button className={i === selectedButton ? "panel button-selected" : "panel"} key={i} onClick={() => {
              // alert(button.video_src)
              buttonClickHandler(i);
              setVideoSrc(button.video_src)
            }} style={{
              display: "inline-flex",
              alignItems: "center"
            }}><span>{button.title}</span></button>
          ))
        }
      </div>
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
                  {/* <span>Slide {i}</span> */}
                </div>
              </div>
            ))
          }
        </Slide>
      </div>
    </div >
  );
}

function Icon(props) {
  return (
    <svg width="13" height="13" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M9 9.5V34.5L34 22L9 9.5Z" fill="#1A1A1A" />
    </svg>
  );
}

class Home extends React.Component {

  render() {
    return (
      <div className='home-bg'>
        <div id="left" className='home-half title'>
          <span>Smart</span>
          <span style={{ fontSize: '80%' }}>Trasnportation</span>
        </div>
        <div id="right" className='home-half description'>
          <span> How does traffic control & large scale simulation innovate network planning?</span>
          <button onClick={() => this.props.onClick()}><Icon value="play" />Explore</button>
        </div>
      </div>
    );
  }
}

function Explore({ onClickHandler = f => f }) {
  return (
    <div className='home-bg'>
      <div id="left" className='sub-left' tabIndex={1} onClick={() => onClickHandler(true)}>
        <span className='sub title'>DISCO</span>
        <span className='sub description'><span>Dynamic&nbsp;</span><span>Intersection&nbsp;</span><span>System&nbsp;</span><span>Control&nbsp;</span><span>Optimization</span></span>
      </div>
      <div className='v-divider'></div>
      <div id="right" className='sub-right' tabIndex={2} onClick={() => onClickHandler(false)}>
        <span className='sub title'>MAT<span className='sub-title' style={{ fontSize: 'smaller' }}>Sim</span></span>
        <span className='sub description'><span>Multi-agent&nbsp;</span><span>Transport&nbsp;</span><span>Simulation</span></span>
        {/* Button for testing only */}
      </div>
    </div>
  );
}

function Doughnut({ onClickHandler }) {
  const [isExplore, setIsExplore] = useState(false);

  const exploreMenu = () => {
    setIsExplore(!isExplore);
    document.body.style.boxShadow = !isExplore ? 'inset 0 0 0 100vmax rgba(255, 255, 255, 0.3)' : '';
  }

  return (
    <>
      <div className='doughnut-border'>

      </div>
      <div className="doughnut">
        {isExplore ? <Explore onClick={() => exploreMenu()} onClickHandler={(isLeft) => onClickHandler(isLeft)} /> : <Home onClick={() => exploreMenu()} />}
      </div>
    </>
  );
}
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board />);
