import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from '@patternfly/react-core';

import BookOpenIcon from '@patternfly/react-icons/dist/esm/icons/book-open-icon';
import KeyIcon from '@patternfly/react-icons/dist/esm/icons/key-icon';
import DesktopIcon from '@patternfly/react-icons/dist/esm/icons/desktop-icon';

import '@patternfly/react-core/dist/styles/base.css';

// https://stackoverflow.com/a/72858039
const uniqueId = () => Math.round(Date.now() * Math.random()).toString();

const DesktopIconClick = (props) => {
  const handleClick = (e) => console.log(e);
  return <DesktopIcon onClick={handleClick} {...props} />;
};

// I might need to manage the active selection for this.
// Update/Delete only active on a selection
// Create happens, but you select a tag as the parent or check no parent

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
      //const children = [];
      if (node.children.length > 0) {
        //children.push();
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

/*
    <List isPlain>
      <ListItem icon={<BookOpenIcon />}>First</ListItem>
      <ListItem icon={<KeyIcon />}>Second</ListItem>
      <ListItem icon={<DesktopIcon />}>Third</ListItem>
      <List isPlain>
        <ListItem icon={<DesktopIconClick />}>Try ntest</ListItem>
      </List>
    </List>
*/

export default {
  title: 'Hello world',
  component: TagTree
};

const Template = (args) => <TagTree {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true
};
