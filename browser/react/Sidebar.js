import React, { Component } from 'react';

class Sidebar extends Component{
  constructor(props){
    super(props);

  }

  render(){
    // console.log('..sidebar.', this.props)
    return(
      <div className="col-xs-2">
        <sidebar>
          <img src="juke.svg" className="logo" />
          <section>
            <h4 className="menu-item active">
              <a href="#" onClick={ () => this.props.handleReset() }>ALBUMS</a>
            </h4>
          </section>
        </sidebar>
      </div>
    )
  }
}

export default Sidebar;
