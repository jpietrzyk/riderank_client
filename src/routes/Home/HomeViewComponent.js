import React from 'react'
import './HomeView.scss'

export const HomeView = (props) => (
  <div>
    <h4>This is your dashboard</h4>
    <h2>Sign in: {props.userAuthenticated}</h2>
  </div>
)

export default HomeView
