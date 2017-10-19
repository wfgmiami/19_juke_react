import React from 'react';

export default class Albums extends React.Component{

  constructor(props){
    super(props);

  }

  render(){

    return(
        <div className="col-xs-10">
          <div className="albums">
            <h3>Albums</h3>
            <div className="row">
            { this.props.albums.map( (album, idx) => (
              <div key = { idx } className="col-xs-4">
                <a className="thumbnail" href="#" onClick={ () => this.props.handleClick(album) }>
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
  }

}
