import React, { Component } from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Albums from './Albums';
import axios from 'axios';
import SingleAlbum from './SingleAlbum';

const audio = document.createElement('audio');


export default class Main extends Component{

  constructor(props){

    super(props);
    this.state = {
      albums: [],
      selectedAlbum: {},
      currentSong: {},
      paused: false,
      firstSong: {},
      lastSong: {},
      progress: {}
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.startPlaying = this.startPlaying.bind(this);
    this.togglePlaying = this.togglePlaying.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.previousSong = this.previousSong.bind(this);
  }

  componentDidMount(){

    audio.addEventListener('timeupdate', () => {
      this.setState({
        progress: 100 * audio.currentTime / audio.duration
      });
    });

    audio.addEventListener("ended", () => {
      const currentSong = this.state.currentSong;
      this.setState( { currentSong } );
      this.nextSong(currentSong);
    })

    axios.get('/api/albums')
    .then( response => response.data )
    .then( albums => {
      albums = albums.map( album => {
        album.imageUrl=`/api/albums/${ album.id }/image`;
        return album;
    })
      this.setState( { albums })
    })
    .catch( err => console.log(err))

  }

  handleClick(selectedAlbum){
    axios.get(`/api/albums/${ selectedAlbum.id }`)
    .then( response => response.data )
    .then ( selectedAlbum => {
      selectedAlbum.imageUrl = `/api/albums/${ selectedAlbum.id }/image`;
      this.setState({ selectedAlbum })
      const firstSong = selectedAlbum.songs[0].id;
      const lastSong = selectedAlbum.songs[selectedAlbum.songs.length - 1].id;
      this.setState( { firstSong, lastSong } );
    })
    .catch( err => console.log( err ));

  }

  handleReset(){
    this.setState( { selectedAlbum : {} })
  }

  startPlaying(songId){
    let currentSong = songId;
    let paused = false;
    audio.src = `/api/songs/${ songId }/audio`;
    audio.load()
    audio.play()
    this.setState( { paused } );
    this.setState({ currentSong })
  }

  togglePlaying(){
    !this.state.paused ? audio.pause() : audio.play();
    let paused = !this.state.paused;
    this.setState( { paused } );
  }

  nextSong( id ){
    let currentSong = ++id;
    if( id > this.state.lastSong ) currentSong = this.state.firstSong;
    this.setState( { currentSong } );
    this.startPlaying(currentSong);
  }

  previousSong( id ){
    let currentSong = --id;
    if( id < this.state.firstSong ) currentSong = this.state.lastSong;
    this.setState( { currentSong } );
    this.startPlaying( currentSong );
  }

  render(){
    console.log('.....Main this.state',this.state)
    return(
      <div id="main" className="container-fluid">

          <Sidebar handleReset={ this.handleReset } />
          { !this.state.selectedAlbum.id ? <Albums albums={ this.state.albums } handleClick = { this.handleClick }/> : <SingleAlbum startPlaying = { this.startPlaying } selectedAlbum={ this.state.selectedAlbum } currentSong = { this.state.currentSong }/> }
        { !isNaN( this.state.currentSong ) ? <Footer togglePlaying = { this.togglePlaying } currentSong = { this.state.currentSong }  nextSong = { this.nextSong } previousSong={ this.previousSong } progress={ this.state.progress } paused = { this.state.paused }/> : '' }

      </div>

    )
  }

}
