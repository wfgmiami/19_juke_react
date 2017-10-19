import React from 'react';

const Footer = ( props ) => {

    const songPlaying = !isNaN( props.currentSong );
    const progress = props.progress;

    return(
      <footer>
        <div className="pull-left">
          <button className="btn btn-default" onClick={ () => props.previousSong(props.currentSong) }>
            <span className="glyphicon glyphicon-step-backward"></span>
          </button>
          <button className="btn btn-default" onClick={ props.togglePlaying }>
            <span className={ songPlaying && !props.paused ? "glyphicon glyphicon-pause" : "glyphicon glyphicon-play" }></span>
          </button>
          <button className="btn btn-default" onClick={ () => props.nextSong(props.currentSong) }>
            <span className="glyphicon glyphicon-step-forward"></span>
          </button>
        </div>
        <div className="bar">
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </footer>
    )
}

export default Footer;
