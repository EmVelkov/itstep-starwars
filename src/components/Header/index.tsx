import React from "react";
import { Link } from "react-router-dom";
import logo from "/images/logo.svg";
import "./header.style.scss";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="Logo Star Wars" />
      </Link>

      <nav className="navigation">
        <Link to="/">Movies</Link>
        <Link to="/people">People</Link>
        <Link to="/starships">Starships</Link>
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/species">Species</Link>
        <Link to="/planets">Planets</Link>
      </nav>
    </header>
  );
};

export { Header };
