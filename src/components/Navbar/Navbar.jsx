import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

function Navbar() {
  return (
    <nav className={style.navbar}>
      <Link to="/">{`{ JSON formatter }`}</Link>
      <ul>
        <li>JSON Beautifier</li>
        <li>XML Formatter</li>
        <li>Login</li>
      </ul>
    </nav>
  );
}

export default Navbar;
