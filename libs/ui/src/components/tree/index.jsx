import { useState, useEffect } from 'react';
import { Tree as Arborist } from 'react-arborist';
import { Text } from '@mantine/core';

import styles from './gmail.module.css';

// Derived from https://stackoverflow.com/a/73030226
export const normalize = (obj) => {
  return Object.assign(
    {
      [obj.id]: {
        ...obj,
        children: obj.children.map((v) => v.id),
      },
    },
    ...obj.children.map(normalize)
  );
};

export default function Tree({ data = [] }) {
  //const [data, setData] = useState([]);

  /*
  useEffect(() => {
    (async function () {
      const tags = await import('./tags.json').then((module) => module.default);
      const d = tags.map(normalize).reduce((all, o) => {
        return Object.assign(all, o);
      }, {});
      // Need to deal with duplicate IDs, maybe with cuid2(), or set id = name
      const allTags = Object.values(d)
        .filter((v) => v.parentId === null)
        .reduce(function me(accum, v) {
          const { id, name } = v;
          const allChildren = v.children.map((id) => d[id]).reduce(me, []);
          return [...accum, { id: String(id), name, children: allChildren }];
        }, []);
      setData(allTags);
    })();
  }, []);
  */

  return (
    <>
      {!data.length <= 0 ? (
        <Arborist
          paddingTop={10}
          paddingBottom={10}
          overscanCount={38}
          initialData={data}
          onSelect={(...args) => console.log(args)}
          onActivate={(...args) => console.log(args)}
          renderRow={DefaultRow}
        >
          {Node}
        </Arborist>
      ) : null}
    </>
  );
}

function Node(props) {
  const { node, style, dragHandle } = props;
  /* This node instance can do many things. See the API reference. */
  return (
    <div className={styles.node} style={style} ref={dragHandle}>
      <Text>{node.data.name}</Text>
    </div>
  );
}

export function DefaultRow({ node, attrs, innerRef, children }) {
  const handleClick = (e) =>
    node.isSelected ? node.deselect() : node.select();
  return (
    <div
      {...attrs}
      ref={innerRef}
      onFocus={(e) => e.stopPropagation()}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
