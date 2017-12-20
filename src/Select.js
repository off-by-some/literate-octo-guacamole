/* @flow */
import * as React from "react";
import * as Option from './Option';

import autobind from 'autobind-decorator';

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
    (this:any).handleClickForClear = this.handleClickForClear.bind(this);
  }

  handleFocusForInput(): void {
    (this:any).dropdown.focus();

    this.setState({ focused: true });      
  }

  handleBlurForInput(): void {
    this.setState({ focused: false });      
  }

  handleClickForOption(props: Option.Props): void {
    const children: any = (props.children || '');
    let text: string;
    if (children.toString) {
      text = children.toString();
    } else {
      text = '';
    }

    // const children: ?string = (props.children || '').toString();
    this.setState({ inputValue: children });
    this.props.onChange(props.value);
  }

  handleClickForClear(): void {
    this.setState({ inputValue: '' });
  }

  attachOnClicks(children?: React.Node = []) {
    return React.Children.map(children, (child) => {

      const onClick = child.props.onClick? child.props.onClick : () => null;
      const wrapperClick = (...e) => {
        e[0].persist(); 

        this.handleClickForOption(child.props);
        this.handleBlurForInput();

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
          <div className="content" >
            <div className="editable">
              <div className="options">
                <i onClick={this.handleClickForClear}>x</i>
              </div>
              <input 
                  type="text" 
                  placeholder="Select..."
                  onFocus={this.handleFocusForInput}
                  value={this.state.inputValue}
                />
            </div>


            <div 
              className={"drop-down" + ddCn } 
              onBlur={this.handleBlurForInput}
              tabIndex="-1"
              ref={ (x) => (this:any).dropdown = x }
            >
              { children }
            </div>
          </div>
        </div>
      );
  }
}