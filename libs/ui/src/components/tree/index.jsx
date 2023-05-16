import React from 'react';
import { Tree as Arborist } from 'react-arborist';
import { Text, Paper } from '@mantine/core';

// From Arborist Gmail example
import styles from './styles.module.css';

export default function Tree({
  data = [],
  renderRow = DefaultRow,
  renderRowProps = { selectBehavior: () => {}, disableSelect: false },
  onNodeSelect = () => {},
}) {
  return (
    <Paper shadow="xs" radius="xs" p="xs">
      {!data.length <= 0 ? (
        <Arborist
          paddingTop={10}
          paddingBottom={10}
          data={data}
          onActivate={onNodeSelect}
          renderRow={withCustomProps(renderRow, renderRowProps)}
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

export function DefaultRow({
  node,
  attrs,
  innerRef,
  children,
  selectBehavior,
  disableSelect,
}) {
  // Need to disable this if the form type is in edit mode
  // So this behavior depends on behavior outside of its knowledge
  const handleClick = (e) => {
    if (disableSelect) return;
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

// Can I wrap this and apply props?

function withCustomProps(C, props = {}) {
  return (originalProps) => <C {...originalProps} {...props} />;
}
