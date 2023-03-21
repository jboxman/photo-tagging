import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import TagModalLayout from './modals/tags/TagModalLayout';

// fa-plus-circle
// fa-minus
// fa-plus

const Template = (args) => <TagModalLayout {...args} />;

export default {
  title: 'Tag Manager',
  component: Template,
};

/*
          <EmptyState>
            <EmptyStateBody>This should be a form.</EmptyStateBody>
          </EmptyState>
*/

export const Me = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Me.args = {
  primary: true,
};
Me.storyName = 'Default';
