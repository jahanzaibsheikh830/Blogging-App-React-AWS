import React from "react";
import "../style.css";
function Navbar() {
  return (
    <>
      <div>
        <div className='container'>
          <div className='header'>
            <div>
              <h2>Blog App</h2>
            </div>
            <div>
              <button>Toggle</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
