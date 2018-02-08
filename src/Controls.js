import React from 'react';
import Clear from './Clear';
import NodeService from '../lib/node';

export default class Controls extends React.Component {
  constructor(props) {
    super();

    this.constructDiscovered(props);
  }

  componentWillReceiveProps(nextProps) {
    this.constructDiscovered(nextProps);
  }

  constructDiscovered(props) {
    const nodeTypeMap = {};
    nodeTypeMap[Clear] = [];

    this.discovered = NodeService.discoverChildren(props.children, nodeTypeMap);
  }

  defaultClear() {
    return (
      <Clear>
        x
      </Clear>
    );
  }

  render() {
    const clearIcon = this.discovered[Clear][0] || this.defaultClear();
    const other = this.discovered['other'];

    return (
      <div className="controls">
        { clearIcon }
        { other }
      </div>
    );
  }
}