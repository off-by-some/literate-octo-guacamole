// @flow

import * as React from 'react';
import NodeService from '../lib/node';

type Props = {
  onClick: Function,
  children: React.Node,
};

export default class Clear extends React.Component<Props, {}> {
  render() {
    return (
      <div className="clear" onClick={this.props.onClick} >
        { this.props.children }
      </div>
    );
  }
}