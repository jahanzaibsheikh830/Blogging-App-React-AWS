import React, { useState } from "react";
import "../style.css";
import ToggleButton from "react-toggle-button";
function Navbar() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div>
        <div className='container'>
          <div className='header'>
            <div>
              <h2>Blog App</h2>
            </div>
            <div>
              <ToggleButton
                value={toggle}
                onClick={() => setToggle((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
