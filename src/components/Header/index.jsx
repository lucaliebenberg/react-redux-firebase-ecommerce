import React from "react";
import "./styles.scss";

import Logo from "../../assets/logo.png";

const Header = (props) => {
  return (
    <div className="header">
      <div className="wrap">
        <img className="logo" src={Logo} alt="logo" />
      </div>
    </div>
  );
};

export default Header;
