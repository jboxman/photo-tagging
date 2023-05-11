import React from 'react';
import { Tree as Arborist } from 'react-arborist';
import { Text, Paper } from '@mantine/core';

import styles from './gmail.module.css';

export default function Tree({ data = [], onNodeSelect = () => {} }) {
  return (
    <Paper shadow="xs" radius="xs" p="xs">
      {!data.length <= 0 ? (
        <Arborist
          paddingTop={10}
          paddingBottom={10}
          data={data}
          onActivate={onNodeSelect}
          renderRow={DefaultRow}
        >
          {Node}
        </Arborist>
      ) : null}
    </Paper>
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
  const handleClick = (e) => {
    node.isSelected ? node.deselect() : node.select();
    node.activate();
  };
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
