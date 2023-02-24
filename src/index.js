import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Icon(props) {
      return (
        <svg width="13" height="13" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M9 9.5V34.5L34 22L9 9.5Z" fill="#1A1A1A"/>
        </svg>
      );
  }
  
  class Home extends React.Component {

    render() {
      return (
        <div className='home-bg'>
          <div id="left" className='home-half title'>
            <span>Smart</span>
            <span style={{ fontSize:'80%' }}>Trasnportation</span>
          </div>
          <div id="right" className='home-half description'>
            <span> How does traffic control & large scale simulation innovate network planning?</span>
            <button onClick={() => this.props.onClick()}><Icon value="play"/>Explore</button>
          </div>
        </div>
      );
    }
  }

  class Explore extends React.Component {
    render() {
      console.log("EXPLORE")
      return (
        <div className='home-bg'>
          <div id="left" className='home-half'>
            <span className='title'>DISCO</span>
            <span className='description'>Dynamic Intersection System Control Optimization</span>
          </div>
          <div className='v-divider'></div>
          <div id="right" className='home-half'>
            <span className='title'>MATSim</span>
            <span className='description'>Multi-agent Transport Simulation</span>
            {/* Button for testing only */}
            <button onClick={() => this.props.onClick()}><Icon value="play"/>Explore</button>
          </div>
        </div>
      );
    }
  }
  
  class Doughnut extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isExplore: false
      }
    }

    exploreMenu() {
      this.setState({isExplore: !this.state.isExplore});
      document.body.style.boxShadow = !this.state.isExplore? 'inset 0 0 0 100vmax rgba(255, 255, 255, 0.3)': '';
    }

    render() {
      return (
        <div className='doughnut-border'>
        <div className="doughnut">
            {this.state.isExplore? <Explore onClick={() => this.exploreMenu()}/>: <Home onClick={() => this.exploreMenu()}/>}
        </div>
        </div>
      );
    }
  }
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Doughnut />);
  