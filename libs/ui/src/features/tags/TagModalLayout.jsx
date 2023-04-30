import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Flex, FlexItem, Title } from '@patternfly/react-core';

import TagActions from './TagActions';
import TagForm from './TagForm';
import TagConfirm from './TagConfirm';
//import TagTreeView from './TagTreeView';
import Tree from '../../components/tree';

// Need to know activeItems
// Need to load initial data
// Need to support create/edit/delete

const formTypes = {
  choice: 'choice',
  create: 'create',
  edit: 'edit',
  delete: 'delete',
};

const TagModalLayout = ({
  formProps = { type: formTypes.choice },
}) => {
  const [activeItems, setActiveItems] = useState([]);
  const [formType, setFormType] = useState(formProps.type);

  const data = useSelector((state) => state.tags.tags);

  // Soft disable because there's no disable prop for TreeView
  const handleTreeViewItemClick = (e, item) => {
    if ([formTypes.create, formTypes.edit, formTypes.delete].includes(formType))
      return;

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
          activeSelection={activeItems.length > 0 ? true : false}
          onCreateClick={createHandleClick(formTypes.create)}
          onEditClick={createHandleClick(formTypes.edit)}
          onDeleteClick={createHandleClick(formTypes.delete)}
        />
      );
    }
    if (formType == formTypes.delete) {
      return <TagConfirm onCancelClick={createHandleClick(formTypes.choice)} />;
    }
    return (
      <TagForm
        formType={formType}
        activeItem={activeItems[0]}
        onCancelClick={createHandleClick(formTypes.choice)}
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
              <Tree
                data={data}
                onSelect={handleTreeViewItemClick}
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
