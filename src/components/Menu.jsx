import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable jsx-a11y/anchor-is-valid */
const Menu = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Feed</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
      </li>
      <li>
        <Link to="/favorites">Favorites</Link>
      </li>
    </ul>
  </div>
);

export default Menu;
