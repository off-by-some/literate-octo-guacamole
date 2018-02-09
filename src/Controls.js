// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import Clear from './Clear';
import DropdownControl from './DropdownControl';

import ComponentService from '../lib/node';
import * as ComponentServiceTypes from '../lib/node';


type Props = {
  onClickClear: Function,
  onClickDropdownControl: Function,
  children?: React.Node,
}

type State = {
  focused: boolean,
  selectedValue: string  
}

export default class Controls extends React.Component<Props, State> {
  discovered: ComponentServiceTypes.Bucket;

  constructor(props: Props) {
    super();

    this.constructDiscovered(props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.constructDiscovered(nextProps);
  }

  constructDiscovered(props) {
    const nodeTypeMap: ComponentServiceTypes.Bucket = {};
    nodeTypeMap[Clear] = [];
    nodeTypeMap[DropdownControl] = [];

    this.discovered = ComponentService.discoverChildren(props.children, nodeTypeMap);
  }

  defaultClear() {
    return (
      <Clear onClick={this.handleClickForClear}>
        x
      </Clear>
    );
  }

  defaultDropdownControl() {
    return (
      <DropdownControl onClick={this.handleClickForDropdownControl}>
        v
      </DropdownControl> 
    );
  }

  getDropdownControl() {
    const dropdownControl = this.discovered[DropdownControl][0] || this.defaultDropdownControl();
    const that = this;

    return ComponentService.attachOnClicks(dropdownControl, (child, ...e) => {
      that.handleClickForDropdownControl(...e)
    })[0];
  }

  getClear() {
    const clearIcon = this.discovered[Clear][0] || this.defaultClear();
    const that = this;

    return ComponentService.attachOnClicks(clearIcon, (child, ...e) => {
      that.handleClickForClear(...e)
    })[0];
  }

  handleClickForDropdownControl(...e) {
    this.props.onClickDropdownControl(...e);
  }

  handleClickForClear(...e) {
    this.props.onClickClear(...e);
  }

  render() {
    const clearIcon = this.getClear();
    const dropdownControl = this.getDropdownControl();
    const other = this.discovered['other'];

    return (
      <div className="controls">
        { clearIcon }
        { dropdownControl }
        { other }
      </div>
    );
  }
}