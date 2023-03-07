import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from '@patternfly/react-core';

import BookOpenIcon from '@patternfly/react-icons/dist/esm/icons/book-open-icon';
import KeyIcon from '@patternfly/react-icons/dist/esm/icons/key-icon';
import DesktopIcon from '@patternfly/react-icons/dist/esm/icons/desktop-icon';

import '@patternfly/react-core/dist/styles/base.css';

const DesktopIconClick = (props) => {
  const handleClick = (e) => console.log(e);
  return <DesktopIcon onClick={handleClick} {...props} />;
};

const TagTree = () => {
  return (
    <List isPlain>
      <ListItem icon={<BookOpenIcon />}>First</ListItem>
      <ListItem icon={<KeyIcon />}>Second</ListItem>
      <ListItem icon={<DesktopIcon />}>Third</ListItem>
      <List isPlain>
        <ListItem icon={<DesktopIconClick />}>Try ntest</ListItem>
      </List>
    </List>
  );
};

export default {
  title: 'Hello world',
  component: TagTree,
};

const Template = (args) => <TagTree {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'PF List',
};
