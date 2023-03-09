import React from 'react';
import { useEffect, useState } from 'react';

import { List, ListItem } from '@patternfly/react-core';

import DesktopIcon from '@patternfly/react-icons/dist/esm/icons/desktop-icon';

import '@patternfly/react-core/dist/styles/base.css';

// https://stackoverflow.com/a/72858039
const uniqueId = () => Math.round(Date.now() * Math.random()).toString();

const DesktopIconClick = (props) => {
  const handleClick = (e) => console.log(e);
  return <DesktopIcon onClick={handleClick} {...props} />;
};

const TagTree = () => {
  const [data, setData] = useState(null);

  useEffect(function () {
    (async () => {
      // https://dev.to/thatamymac/dynamic-imports-of-json-ipl
      const data = await import('./fixtures/tag-tree.json').then(
        (module) => module.default
      );
      setData(data);
    })();
  }, []);

  const renderChildren = (nodes) => {
    const els = [];

    for (const node of nodes) {
      if (node.children.length > 0) {
        els.push(
          <ListItem
            onClick={(e) => {
              e.stopPropagation();
              console.log(node);
            }}
          >
            {node.name}
            <List isPlain>{renderChildren(node.children)}</List>
          </ListItem>
        );
      } else {
        els.push(
          <ListItem
            id={uniqueId()}
            onClick={(e) => {
              e.stopPropagation();
              console.log(node);
            }}
            icon={<DesktopIconClick />}
          >
            {node.name}
          </ListItem>
        );
      }
    }

    return els;
  };

  return <>{data ? <List isPlain>{renderChildren(data)}</List> : null}</>;
};

export default {
  title: 'Hello world',
  component: TagTree
};

const Template = (args) => <TagTree {...args} />;

//export const ignore = Template.bind({});
