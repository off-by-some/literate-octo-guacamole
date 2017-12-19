/* @flow */
import * as React from "react";
import { setTimeout } from "core-js/library/web/timers";


type Props = {
  autofocus?: boolean,
  disabled?: boolean,
  form?: string,
  multiple?: boolean,
  name?: string,
  required?: boolean,
  size?: number,
  onChange: Function,
  children?: React.Node,
}

type State = {
  focused: boolean,
  inputValue: string  
}

export default class Select extends React.Component<Props, State> {

  constructor() {
    super();

    this.state = {
      focused: false,
      inputValue: '',
    };

    (this:any).handleFocusForInput = this.handleFocusForInput.bind(this);
    (this:any).handleBlurForInput = this.handleBlurForInput.bind(this);
  }

  handleFocusForInput(): void {
    this.setState({ focused: true });      
  }

  handleBlurForInput(): void {
    this.setState({ focused: false });      
  }

  handleClickForOption(value: string): void {
    this.setState({ inputValue: value });
    this.props.onChange(value);
  }

  attachOnClicks(children?: React.Node = []) {
    return React.Children.map(children, (child) => {

      const value   = child.props.value;
      const onClick = child.props.onClick? child.props.onClick : () => null;
      const wrapperClick = (...e) => {
        e[0].persist(); 
        this.handleClickForOption(value);
        onClick(...e);
      }

      return React.cloneElement(child, { onClick: wrapperClick });
    });
  }

  render() {
      const ddCn     = this.state.focused ? " focused " : "";
      const children = this.attachOnClicks(this.props.children);

      return (
        <div className="select">
          <select>
            { this.props.children }
          </select>
          <div className="content">
            <input 
                type="text" 
                placeholder="Select..."
                onBlur={this.handleBlurForInput}
                onFocus={this.handleFocusForInput}
                value={this.state.inputValue}
              />

            <div className={"drop-down" + ddCn }>
              { children }
            </div>
          </div>
        </div>
      );

  }
}