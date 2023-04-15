import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

function Navbar() {
  return (
    <nav className={style.navbar}>
      <Link to="/">{`{ JSON formatter }`}</Link>
      <ul>
        <li>
          <Link to="/">JSON Beautifier</Link>
        </li>
        <li>
        <Link to="/base64">Base64 Decode/Encode</Link>
        </li>
        <li>Login</li>
      </ul>
    </nav>
  );
}

export default Navbar;
