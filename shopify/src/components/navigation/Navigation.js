import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
  return (
    <nav className="navContainer">
      <div className="home">
        <NavLink className="navLink" to="/">
          Shoppies
        </NavLink>
      </div>
      <div className="navLinkGroup">
        <NavLink
          activeClassName="activeNav"
          className="navLink group"
          to="/search"
        >
          Search
        </NavLink>

        <NavLink
          activeClassName="activeNav"
          className="navLink group"
          to="/nominations"
        >
          Nominations
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
