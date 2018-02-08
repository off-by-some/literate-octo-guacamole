import * as React from 'react';

export type nodeTypeMap = { 
  [x: React.Component]: React.Node[],
};

export default class Node {
  static discoverChildren(children: React.Node, typeMap: nodeTypeMap): nodeTypeMap {
    React.Children.forEach(children, (child) => {
      const validKeys = Object.keys(typeMap);

      typeMap['other'] = [];

      if (typeMap[child.type]) {
        typeMap[child.type].push(child)
      } else {
        typeMap['other'].push(child);
      }
    });

    return typeMap;
  }

  static attachOnClicks(children?: React.Node = [], wrapperHandler: Function) {
    return React.Children.map(children, (child) => {

      const onClick = child.props.onClick? child.props.onClick : () => null;
      const wrapperClick = (...e) => {
        e[0].persist(); 

        wrapperHandler(child.props, ...e);
        onClick(...e);
      }

      return React.cloneElement(child, { onClick: wrapperClick });
    });
  }
}