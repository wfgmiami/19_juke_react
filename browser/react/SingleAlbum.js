import React from 'react';

const SingleAlbum = ( props ) => {

    const albumName = props.selectedAlbum.name;
    const imgURL = props.selectedAlbum.imageUrl;
    const songs = props.selectedAlbum.songs;
    const artists = props.selectedAlbum.artists;

    return(
    <div className="col-xs-10">
      <div className="album">
        <div>
          <h3>{ albumName }</h3>
          <img src={ imgURL ? imgURL : "http://placeholdit.imgix.net/~text?txtsize=33&txt=ALBUMoneIMAGE&w=300&h=300"} className="img-thumbnail" />
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Artists</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            { songs && songs.map( (song, idx) => (
              <tr key={ idx } className={ props.currentSong === song.id ? "active" : '' }>
                <td>
                { !(props.currentSong === song.id) ?
                  <button className="btn btn-default btn-xs" onClick={ () => props.startPlaying(song.id) }>
                    <span className="glyphicon glyphicon-play"></span>
                  </button>
                  : '' }
                </td>
                <td>{ song.name }</td>
                { artists && artists.map( (artist, id) => (
                  <td key={id}>{ artist.name }</td>
                ))
                }

                <td>{ song.genre }</td>
              </tr>
              )
            ) }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SingleAlbum;
