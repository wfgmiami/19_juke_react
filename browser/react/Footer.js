import React from 'react';

export default class Footer extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    const songPlaying = !isNaN( this.props.currentSong );
    const progress = this.props.progress;
    console.log('......', songPlaying, this.props)
    return(
      <footer>
        <div className="pull-left">
          <button className="btn btn-default" onClick={ () => this.props.previousSong(this.props.currentSong) }>
            <span className="glyphicon glyphicon-step-backward"></span>
          </button>
          <button className="btn btn-default" onClick={ this.props.togglePlaying }>
            <span className={ songPlaying && !this.props.paused ? "glyphicon glyphicon-pause" : "glyphicon glyphicon-play" }></span>
          </button>
          <button className="btn btn-default" onClick={ () => this.props.nextSong(this.props.currentSong) }>
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
}
