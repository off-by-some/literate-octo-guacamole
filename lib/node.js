// @flow
import * as React from 'react';

export type Bucket = { 
  [x: React.ComponentType<*>]: React.Node[],
  'other'?: React.Node[],
};

export default class Component {
  static discoverChildren(children: React.Node, b: Bucket): Bucket {
    const bucket = {
      ...b,
      other: [],
    };

    React.Children.forEach(children, (child) => {
      const validKeys = Object.keys(bucket);

      if (bucket[child.type]) {
        bucket[child.type].push(child)
      } else {
        bucket.other.push(child);
      }
    });

    return bucket;
  }

  // static merge(a: React.Node, b: React.Node) {
  //   if (a.type !== b.type) throw new Error('Type mismatch; Cannot merge');

  //   const newProps = {
  //     ...a.props,
  //     ...b.props,
  //   };

  //   React.Component

  //   const newChildren = new Set()
  // }

  // Returns a cloned element that spys on the child's onClick. Passes the child as well as the event up.
  static attachOnClicks(children: React.Node = [], wrapperHandler: Function, funcName: string = 'onClick'): React.Node[] {
    return React.Children.map(children, (child) => {

      const onClick = child.props[funcName]? child.props[funcName] : () => null;
      const wrapperClick = (...e) => {
        e[0].persist(); 

        wrapperHandler(child, ...e);
        onClick(...e);
      }

      return React.cloneElement(child, { [funcName]: wrapperClick });
    });
  }
}