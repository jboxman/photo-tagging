import React from 'react';
import PropTypes from 'prop-types';

import MinusIcon from '@patternfly/react-icons/dist/esm/icons/minus-icon';
import PlusIcon from '@patternfly/react-icons/dist/esm/icons/plus-icon';

import '@patternfly/react-core/dist/styles/base.css';
import './default.css';

import {
  TreeView,
  Flex,
  FlexItem,
  EmptyState,
  EmptyStateBody,
  Bullseye,
  Button,
} from '@patternfly/react-core';

const data = [
  {
    name: 'Application launcher',
    id: 'example3-AppLaunch',
    checkProps: { 'aria-label': 'app-launcher-check', checked: false },
    children: [
      {
        name: 'Application 1',
        id: 'example3-App1',
        checkProps: { checked: false },
        children: [
          {
            name: 'Settings',
            id: 'example3-App1Settings',
            checkProps: { checked: false },
          },
          {
            name: 'Current',
            id: 'example3-App1Current',
            checkProps: { checked: false },
          },
        ],
      },
      {
        name: 'Application 2',
        id: 'example3-App2',
        checkProps: { checked: false },
        children: [
          {
            name: 'Settings',
            id: 'example3-App2Settings',
            checkProps: { checked: false },
          },
          {
            name: 'Loader',
            id: 'example3-App2Loader',
            checkProps: { checked: false },
            children: [
              {
                name: 'Loading App 1',
                id: 'example3-LoadApp1',
                checkProps: { checked: false },
              },
              {
                name: 'Loading App 2',
                id: 'example3-LoadApp2',
                checkProps: { checked: false },
              },
              {
                name: 'Loading App 3',
                id: 'example3-LoadApp3',
                checkProps: { checked: false },
              },
            ],
          },
        ],
      },
    ],
    defaultExpanded: true,
  },
  {
    name: 'Cost management',
    id: 'example3-Cost',
    checkProps: { 'aria-label': 'cost-check', checked: false },
    children: [
      {
        name: 'Application 3',
        id: 'example3-App3',
        checkProps: { 'aria-label': 'app-3-check', checked: false },
        children: [
          {
            name: 'Settings',
            id: 'example3-App3Settings',
            checkProps: {
              'aria-label': 'app-3-settings-check',
              checked: false,
            },
          },
          {
            name: 'Current',
            id: 'example3-App3Current',
            checkProps: {
              'aria-label': 'app-3-current-check',
              checked: false,
            },
          },
        ],
      },
    ],
  },
  {
    name: 'Sources',
    id: 'example3-Sources',
    checkProps: { 'aria-label': 'sources-check', checked: false },
    children: [
      {
        name: 'Application 4',
        id: 'example3-App4',
        checkProps: { 'aria-label': 'app-4-check', checked: false },
        children: [
          {
            name: 'Settings',
            id: 'example3-App4Settings',
            checkProps: {
              'aria-label': 'app-4-settings-check',
              checked: false,
            },
          },
        ],
      },
    ],
  },
  {
    name: 'Really really really long folder name that overflows the container it is in',
    id: 'example3-Long',
    checkProps: { 'aria-label': 'long-check', checked: false },
    children: [
      {
        name: 'Application 5',
        id: 'example3-App5',
        checkProps: { 'aria-label': 'app-5-check', checked: false },
      },
    ],
  },
];

const MyTreeView = () => (
  <>
    <TreeView
      data={data}
      defaultAllExpanded
      hasGuides
      onSelect={(e, item, parentItem) => {
        console.log(e);
      }}
    />
  </>
);

export default {
  title: 'MyTreeView',
  component: MyTreeView,
};

// fa-plus-circle
// fa-minus
// fa-plus

const Template = (args) => {
  return (
    <Bullseye className="smaller">
      <Flex
        direction={{ default: 'row' }}
        spaceItems={{ default: 'spaceItemsNone' }}
        flexWrap={{ default: 'nowrap' }}
      >
        <FlexItem>
          <Flex
            direction={{ default: 'column' }}
            spaceItems={{ default: 'spaceItemsNone' }}
            flexWrap={{ default: 'nowrap' }}
          >
            <FlexItem>
              <MyTreeView {...args} />
            </FlexItem>
            <FlexItem>
              <Button variant="link" icon={<PlusIcon />}>
                Add
              </Button>
              <Button variant="link" icon={<MinusIcon />}>
                Remove
              </Button>
            </FlexItem>
          </Flex>
        </FlexItem>
        <FlexItem>
          <EmptyState>
            <EmptyStateBody>This should be a form.</EmptyStateBody>
          </EmptyState>
        </FlexItem>
      </Flex>
    </Bullseye>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
};
