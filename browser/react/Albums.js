import React from 'react';

const Albums = ( { albums, handleClick } ) => (

  <div className="col-xs-10">
    <div className="albums">
      <h3>Albums</h3>
      <div className="row">
      { albums.map( (album, idx) => (
        <div key = { idx } className="col-xs-4">
          <a className="thumbnail" href="#" onClick={ () => handleClick(album) }>
            <img src={ album.imageUrl } />
            <div className="caption">
              <h5>
                <span>{ album.name }</span>
              </h5>
              <small>{ album.songs.length } songs</small>
            </div>
          </a>
        </div>
      ))}
      </div>
    </div>
  </div>

)

export default Albums;





