import React from 'react';
import NodeService from '../lib/node';

export default class Clear extends React.Component {
  render() {
    return (
      <div className="clear">
        { this.props.children }
      </div>
    );
  }
}