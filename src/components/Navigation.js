/**
 * Import our dependencies
 */
import { Link, IndexLink } from 'react-router';
import React, { Component } from "react";
import './navigation.scss'

/**
 * This is our navigation component
 */
export const Navigation = () => (
  <div className="frame bit-1 navigation_container">
    <h3 className="bit-40"><Link to="/">Riderank</Link></h3>
    <ul className="bit-60 nav_menu">
      <li key={100}>
        <IndexLink to='/' activeClassName='route--active'>
          Home
        </IndexLink>
      </li>
      {' · '}
      <li key={101}><Link to="sign-in">Sign in</Link></li>
      <li key={102}><Link to="sign-up">Sign up</Link></li>
    </ul>
  </div>
)

export default Navigation
