import React from 'react';

import TagForm from '../TagForm';

const Template = (args) => <TagForm {...args} />;

export default {
  title: 'tags/components/TagForm',
  component: Template,
  parameters: {
    layout: 'centered',
  },
};

export const Me = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Me.args = {
  data: [],
  activeItem: {
    tagName: 'my label',
    parentId: 'abc',
  },
};
Me.storyName = 'Default';
