import React from 'react';

export default class DropdownControl extends React.Component {
  render() {
    return (
      <div {...this.props} className="dropdown-control" >
        { this.props.children }
      </div>
    );
  }
}