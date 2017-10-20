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
      progress: {},
      randomSongs: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.startPlaying = this.startPlaying.bind(this);
    this.togglePlaying = this.togglePlaying.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.previousSong = this.previousSong.bind(this);
    this.playRandom = this.playRandom.bind(this);
    this.moveProgress = this.moveProgress.bind(this);
  }

  componentDidMount(){

    audio.addEventListener('timeupdate', () => {
      this.setState({
        progress: 100 * audio.currentTime / audio.duration
      });
    });

    document.addEventListener('keydown', (e) => {
        switch( e.keyCode ){
          case 32: e.preventDefault(); this.togglePlaying(); break;
          case 37: this.previousSong( this.state.currentSong ); break;
          case 39: this.nextSong( this.state.currentSong  ); break;
        }

    })

    audio.addEventListener("ended", () => {

      let currentSong = this.state.currentSong;

      if( this.state.randomSongs.length > 0 ){
        if( this.state.randomSongs.filter( song => song !== currentSong ).length ){

          this.state.randomSongs = this.state.randomSongs.filter( song => song !== currentSong );
          console.log('ended.inside if...', this.state.randomSongs)
        }
        console.log('ended....', this.state.randomSongs)
        currentSong = this.state.randomSongs[0] - 1;
        this.state.randomSongs = this.state.randomSongs.slice(1);
        if( this.state.randomSongs.length === 0 ){
          this.playRandom();
        }
      }

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
    this.setState( { selectedAlbum : {} });
    this.setState( { currentSong : {} })
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

  playRandom(){

    const randomSongs = [];
    const totalSongs=this.state.selectedAlbum.songs.length;
    let count = 0;
    let arrSongs = [];
    for(var i = this.state.firstSong; i <= this.state.lastSong; i++ ){
      arrSongs.push(i);
    }
    console.log('....arrSongs', arrSongs)
    if ( this.state.randomSongs.length > 0 ){
      this.setState( { randomSongs } );
    }else{
      while( count < totalSongs ){
        let randomNum = Math.floor( Math.random() * totalSongs );
        let randomSong = arrSongs[ randomNum ];

        while( this.state.randomSongs.filter( song => song === randomSong ).length ){
          randomNum = Math.floor( Math.random() * totalSongs );

          randomSong = arrSongs[ randomNum ];
        }
        this.state.randomSongs.push( randomSong );
        count++;
      }
    }
  }

  moveProgress(e){
    const xPos = e.nativeEvent.offsetX;

    const barWidth=document.getElementsByClassName("progress")[0].offsetWidth;
    console.log('..........xPos', xPos, ".....barWidth" ,barWidth)

    audio.currentTime = audio.duration * xPos / barWidth;
    this.setState({
      progress: 100 * xPos / barWidth
    });
  }

  render(){
    console.log('.....Main this.state',this.state)
    return(
      <div id="main" className="container-fluid">

          <Sidebar handleReset={ this.handleReset } />
          { !this.state.selectedAlbum.id ? <Albums albums={ this.state.albums } handleClick = { this.handleClick }/> : <SingleAlbum startPlaying = { this.startPlaying } selectedAlbum={ this.state.selectedAlbum } currentSong = { this.state.currentSong }/> }
        { !isNaN( this.state.currentSong ) ? <Footer togglePlaying = { this.togglePlaying } currentSong = { this.state.currentSong }  nextSong = { this.nextSong } previousSong={ this.previousSong } progress={ this.state.progress } moveProgress = { this.moveProgress } paused = { this.state.paused }  playRandom = { this.playRandom }/> : '' }

      </div>

    )
  }

}
