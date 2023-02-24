import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Icon(props) {
      return (
        <svg width="13" height="13" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 9.5V34.5L34 22L9 9.5Z" fill="#1A1A1A"/>
        </svg>
      );
  }
  
  class Home extends React.Component {

    render() {
      return (
        <div className='home-bg'>
          <div id="left" className='home-half title'>
            SAMPLE TITLE
          </div>
          <div id="right" className='home-half description'>
            <span> Sample description in doughnut div.</span>
            <button onClick={() => alert("Explore button clicked")}><Icon value="play"/>Explore</button>
          </div>
        </div>
      );
    }
  }
  
  class Doughnut extends React.Component {
    render() {
      return (
        <div className='doughnut-border'>
        <div className="doughnut">
            <Home />
        </div>
        </div>
      );
    }
  }
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Doughnut />);
  