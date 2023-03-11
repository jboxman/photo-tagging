import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Flex, FlexItem, Title } from '@patternfly/react-core';

import TagActions from './TagActions';
import TagForm from './TagForm';
import TagConfirm from './TagConfirm';
import TagTreeView from './TagTreeView';

// Need to know activeItems
// Need to load initial data
// Need to support create/edit/delete

const formTypes = {
  choice: 'choice',
  create: 'create',
  edit: 'edit',
  delete: 'delete'
};

const TagModalLayout = ({ formProps = { type: formTypes.choice } }) => {
  const [activeItems, setActiveItems] = useState([]);
  const [formType, setFormType] = useState(formProps.type);
  const [data, setData] = useState(null);

  useEffect(function () {
    (async () => {
      // https://dev.to/thatamymac/dynamic-imports-of-json-ipl
      const data = await import('../../fixtures/tag-tree.json').then(
        (module) => module.default
      );
      setData(data);
    })();
  }, []);

  const onSelect = (e, item, parentItem) => {
    if (activeItems.includes(item)) setActiveItems([]);
    if (!activeItems.includes(item)) setActiveItems([item]);
  };

  const createHandleClick = (actionName) => () => {
    setFormType(actionName);
  };

  const renderForm = (formType) => {
    if (formType == formTypes.choice) {
      return (
        <TagActions
          onCreate={createHandleClick(formTypes.create)}
          onEdit={createHandleClick(formTypes.edit)}
          onDelete={createHandleClick(formTypes.delete)}
        />
      );
    }
    if (formType == formTypes.delete) {
      return <TagConfirm onCancel={createHandleClick(formTypes.choice)} />;
    }
    return (
      <TagForm
        formType={formType}
        onCancel={createHandleClick(formTypes.choice)}
      />
    );
  };

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
              <TagTreeView
                data={data}
                onSelect={onSelect}
                activeItems={activeItems}
              />
            </FlexItem>
          </Flex>
        </FlexItem>
        <FlexItem>{renderForm(formType)}</FlexItem>
      </Flex>
    </>
  );
};
export default TagModalLayout;
