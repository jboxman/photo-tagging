import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Flex, FlexItem, Title } from '@patternfly/react-core';

import TagActions from './TagActions';
import TagForm from './TagForm';
import TagConfirm from './TagConfirm';
import Tree from '../../components/tree';

import { denormalizeTree } from '../../store/helpers';

// Need to know selectedNode
// Need to load initial data
// Need to support create/edit/delete

const formTypes = {
  choice: 'choice',
  create: 'create',
  edit: 'edit',
  delete: 'delete'
};

const TagModalLayout = ({ formProps = { type: formTypes.choice } }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [formType, setFormType] = useState(formProps.type);

  const data = useSelector((state) => state.tags.tags);

  // Soft disable because there's no disable prop for TreeView
  const handleNodeSelection = (n) => {
    if ([formTypes.create, formTypes.edit, formTypes.delete].includes(formType))
      return;

    // Event fires on first render w/o any selection
    //if (!n) return;

    if (n.data.id == selectedNode?.id) {
      setSelectedNode(null);
      return;
    }
    setSelectedNode(n.data);
  };

  const createHandleClick = (actionName) => () => {
    setFormType(actionName);
  };

  const renderForm = (formType) => {
    if (formType == formTypes.choice) {
      return (
        <TagActions
          activeSelection={!!selectedNode?.id}
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
        data={data}
        formType={formType}
        activeItem={selectedNode}
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
                data={denormalizeTree(data)}
                onNodeSelect={handleNodeSelection}
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
