
import React from 'react';
import Clear from './Clear';
import DropdownControl from './DropdownControl';

import ComponentService from '../lib/node';
import * as ComponentServiceTypes from '../lib/node';


export default class Controls extends React.Component {
  constructor(props) {
    super();

    this.constructDiscovered(props);
  }

  componentWillReceiveProps(nextProps) {
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
      <Clear>
        x
      </Clear>
    );
  }

  defaultDropdownControl() {
    return (
      <DropdownControl>
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