import React from 'react';
import { useEffect, useState } from 'react';
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
  Title,
  Form,
  FormGroup,
  TextInput,
  ActionGroup
} from '@patternfly/react-core';

const MyTreeView = () => {
  const [data, setData] = useState(null);
  const [activeItems, setActiveItems] = useState([]);

  useEffect(function () {
    (async () => {
      // https://dev.to/thatamymac/dynamic-imports-of-json-ipl
      const data = await import('./fixtures/tag-tree.json').then(
        (module) => module.default
      );
      setData(data);
    })();
  }, []);

  return (
    <>
      {!data ? null : (
        <TreeView
          data={data}
          defaultAllExpanded
          hasGuides
          hasSelectableNodes
          activeItems={activeItems}
          onSelect={(e, item, parentItem) => {
            if (activeItems.includes(item)) setActiveItems([]);
            if (!activeItems.includes(item)) setActiveItems([item]);
          }}
          className="smaller"
        />
      )}
    </>
  );
};

const TagForm = () => {
  return (
    <Form>
      <FormGroup label="Tag" isRequired>
        <TextInput isRequired type="text" />
      </FormGroup>
      <ActionGroup>
        <Button variant="primary">Save</Button>
        <Button variant="link">Cancel</Button>
      </ActionGroup>
    </Form>
  );
};

export default {
  title: 'Tag Manager',
  component: MyTreeView
};

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
          <Title headingLevel="h1">h1 defaults to 2xl</Title>
          <Flex
            direction={{ default: 'column' }}
            spaceItems={{ default: 'spaceItemsNone' }}
            flexWrap={{ default: 'nowrap' }}
          >
            <FlexItem className="scroll">
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
          <TagForm />
        </FlexItem>
      </Flex>
    </>
  );
};

/*
          <EmptyState>
            <EmptyStateBody>This should be a form.</EmptyStateBody>
          </EmptyState>
*/

export const Me = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Me.args = {
  primary: true
};
Me.storyName = 'Default';
