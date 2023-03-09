import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '@patternfly/react-core/dist/styles/base.css';
import './default.css';

import { Flex, FlexItem, Title } from '@patternfly/react-core';

import TagActions from './modals/tags/TagActions';
import TagForm from './modals/tags/TagForm';
import TagTreeView from './modals/tags/TagTreeView';

// fa-plus-circle
// fa-minus
// fa-plus

const Template = (args) => {
  return (
    <>
      <Flex
        direction={{ default: 'row' }}
        spaceItems={{ default: 'spaceItemsNone' }}
        flexWrap={{ default: 'nowrap' }}
        alignItems={{ default: 'alignItemsStretch' }}
      >
        <FlexItem>
          <Title headingLevel="h1">Tags</Title>
          <Flex
            direction={{ default: 'column' }}
            spaceItems={{ default: 'spaceItemsNone' }}
            flexWrap={{ default: 'nowrap' }}
          >
            <FlexItem className="scroll">
              <TagTreeView {...args} />
            </FlexItem>
          </Flex>
        </FlexItem>
        <FlexItem>
          <TagForm />
        </FlexItem>
      </Flex>
    </>
  );
};

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
