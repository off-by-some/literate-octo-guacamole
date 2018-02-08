import React from 'react';

export default class DropdownControl extends React.Component {
  render() {
    return (
      <div className="dropdown-control" >
        { this.props.children }
      </div>
    );
  }
}