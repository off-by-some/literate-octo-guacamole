/* @flow */
import * as React from "react";

type Props = {
  children?: React.Node,
  onClick?: Function,
}

type State = {

}

export default class Option extends React.Component<Props, State> {
  render() {
    return (
      <option onClick={this.props.onClick} className="option">
        { this.props.children }
      </option>
    );
  }
}
