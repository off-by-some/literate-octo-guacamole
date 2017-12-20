/* @flow */
import * as React from "react";

export type Props = {
  children?: React.Node,
  onClick?: Function,
  value: string,
}

type State = {

}

export default class Option extends React.Component<Props, State> {
  render() {
    return (
      <option value={this.props.value} onClick={this.props.onClick} className="option">
        { this.props.children }
      </option>
    );
  }
}
