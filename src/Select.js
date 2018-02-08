/* @flow */
import * as React from "react";
import * as Option from './Option';
import OptionComponent from './Option';
import Controls from './Controls'
import Clear from './Clear';
import NodeService from '../lib/node';
import * as NodeServiceTypes from '../lib/node';


import a from 'babel-autobind';
const { Autobind } = a; // Not sure why i need to do this 🙁


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
  selectedValue: string  
}

// type nodeTypeMap = { 
//   [x: string]: React.Node[],
// };

@Autobind
export default class Select extends React.Component<Props, State> {
  dropDown: ?HTMLDivElement;
  discovered: NodeServiceTypes.nodeTypeMap;

  constructor(props) {
    super();
    this.state = {
      focused: false,
      selectedValue: '',
    }

    this.constructDiscovered(props);
  }

  constructDiscovered(props) {
    const nodeTypeMap = {};
    nodeTypeMap[OptionComponent] = [];
    nodeTypeMap[Controls] = [];

    this.discovered = NodeService.discoverChildren(props.children, nodeTypeMap);
  }

  componentWillReceiveProps(nextProps) {
    this.constructDiscovered(nextProps);
  }

  focus() {
    this.setState({ focused: true });          
  }

  handleFocusForInput(): void {
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
    this.setState({ selectedValue: children });
    this.props.onChange(props.value);
  }

  handleClickForClear(): void {
    this.setState({ selectedValue: '' });
    this.props.onChange('');
  }

  defaultControls() {
    return (
      <Controls>
        <Clear>
         <i onClick={this.handleClickForClear}>x</i>
        </Clear>
      </Controls>
    );
  }

  attachOnClicks(children?: React.Node = []) {
    return NodeService.attachOnClicks(children, (child, ...e) => {
      this.handleClickForOption(child.props);
      this.handleBlurForInput();
    });
  }

  render() {
      const ddCn     = this.state.focused ? " focused " : "";
      const options = this.attachOnClicks(this.discovered[OptionComponent]);
      const controls = this.discovered[Controls][0] || this.defaultControls();

      return (
        <div className="select">
          <select>
            { options }
          </select>
          <div className="content" >
            <div className="editable">
              { controls }
              <input 
                  type="text" 
                  placeholder="Select..."
                  onFocus={this.handleFocusForInput}
                  value={this.state.selectedValue}
                />
            </div>


            <div 
              className={"drop-down" + ddCn } 
              onBlur={this.handleBlurForInput}
              tabIndex="-1"
              ref={ (x) => this.dropdown = x }
            >
              { options }
            </div>
          </div>
        </div>
      );
  }
}