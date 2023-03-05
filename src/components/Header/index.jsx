import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

import Logo from "../../assets/logo.png";

const Header = (props) => {
  return (
    <div className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="callToActions">
          <ul>
            <li>
              <Link to="/registration">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
