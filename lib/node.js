import * as React from 'react';

export type Bucket = { 
  [x: React.Component]: React.Node[],
};

export default class Component {
  static discoverChildren(children: React.Node, bucket: Bucket): Bucket {
    React.Children.forEach(children, (child) => {
      const validKeys = Object.keys(bucket);

      bucket['other'] = [];

      if (bucket[child.type]) {
        bucket[child.type].push(child)
      } else {
        bucket['other'].push(child);
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

  // static 

  // Returns a cloned element that spys on the child's onClick. Passes the child as well as the event up.
  static attachOnClicks(children?: React.Node = [], wrapperHandler: Function) {
    return React.Children.map(children, (child) => {

      const onClick = child.props.onClick? child.props.onClick : () => null;
      const wrapperClick = (...e) => {
        e[0].persist(); 

        wrapperHandler(child, ...e);
        onClick(...e);
      }

      return React.cloneElement(child, { onClick: wrapperClick });
    });
  }
}