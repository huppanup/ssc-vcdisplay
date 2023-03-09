import React from 'react';

export default function PanelButton({ onClickButton, video_src, title }) {
    
    return (<button className="panel" onClick={onClickButton}>{title}</button>);
}