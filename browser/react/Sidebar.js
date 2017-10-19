import React from 'react';


const Sidebar = (props) => (
  <div className="col-xs-2">
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <a href="#" onClick={ () => props.handleReset() }>ALBUMS</a>
        </h4>
      </section>
    </sidebar>
  </div>
)


export default Sidebar;
