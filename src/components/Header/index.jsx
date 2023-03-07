import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { auth } from "../../firebase/config";

const Header = (props) => {
  const { currentUser } = props;

  return (
    <div className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="callToActions">
          {currentUser !== null && (
            <ul>
              <li>
                <Link onClick={() => auth.signOut()}>Logout</Link>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
