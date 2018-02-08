/* @flow */
import * as React from "react";
import * as Option from './Option';
import OptionComponent from './Option';
import ControlsComponent from './Controls'
import Clear from './Clear';
import NodeService from '../lib/node';
import * as ComponentTypes from '../lib/node';


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

// type Bucket = { 
//   [x: string]: React.Node[],
// };

@Autobind
export default class Select extends React.Component<Props, State> {
  dropDown: ?HTMLDivElement;
  discovered: ComponentTypes.Bucket;

  constructor(props) {
    super();
    this.state = {
      focused: false,
      selectedValue: '',
    }

    this.constructDiscovered(props);
  }

  constructDiscovered(props) {
    const nodeTypeMap: ComponentTypes.Bucket = {};
    nodeTypeMap[OptionComponent] = [];
    nodeTypeMap[ControlsComponent] = [];

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

  attachOnClicks(children?: React.Node = []) {
    return NodeService.attachOnClicks(children, (child, ...e) => {
      this.handleClickForOption(child.props);
      this.handleBlurForInput();
    });
  }

  getControls() {
    // If the user has specified a Controls component, return that one instead.
    // TODO: Merging children?
    if (this.discovered[ControlsComponent][0]) return this.discovered[ControlsComponent][0];

    return (
      <ControlsComponent />
    );
  }
  
  getOptions() {
    return this.attachOnClicks(this.discovered[OptionComponent]);
  }

  render() {
      const ddCn     = this.state.focused ? " focused " : "";
      const options  = this.getOptions();
      const ControlsComponent = this.getControls();

      return (
        <div className="select">
          <select>
            { options }
          </select>
          <div className="content" >
            <div className="editable">
              { ControlsComponent }
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

`
// Most verbose form, every option overridden
<Select>
  <Input />
  <ControlsComponent>
    <Clear>When you click me i clear the select</Clear> 
    <div>Sum other stuff here that can react to state</div>
    <DropdownControl>When you click me i trigger the dropdown</DropdownControl>
  </ControlsComponent>

  { this.state.options.map(x => (
    <Option value={x} />
  ))}
</Select>


Select.propTypes {
  autoFocus: bool,
  onSearch: func // Triggered when the Input component changes
  onChange: func, // Triggered when an option is selected
  value: obj
}

`