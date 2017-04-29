import React, { Component } from "react";
import { connect } from 'react-redux';
import { pingAction } from '../actions/index.js';

/**
 * export the dashboard page
 */
class Dashboard extends Component {

  handleClickPing() {
    this.props.pingAction();
  }

  /**
   * render component to the screen
   * @returns { ReactElement }
   */
  render() {
    return (
      <div>
        <h4>This is your dashboard</h4>
        <a onClick={this.handleClickPing.bind(this)}>Knock Knock</a>
        <h3>{this.props.ping.message}</h3>
      </div>
    );
  }
}

/**
 * allows us to call our application state from props
 */
function mapStateToProps(state) {
  return {
    ping: state.ping
  };
}

export default connect(mapStateToProps, { pingAction })(Dashboard);
