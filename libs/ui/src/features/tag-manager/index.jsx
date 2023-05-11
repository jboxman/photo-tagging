import React from 'react';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Flex, Stack } from '@mantine/core';

import TagActions from './components/TagActions';
import TagForm from './components/TagForm';
import TagConfirm from './components/TagConfirm';
import Tree from '../../components/tree';

import { denormalizeTree } from '../../store/helpers';
import { updateTag } from '../../store/tagActions';

// Need to know selectedNode
// Need to load initial data
// Need to support create/edit/delete

const formTypes = {
  choice: 'choice',
  create: 'create',
  edit: 'edit',
  delete: 'delete'
};

const TagManager = ({ formProps = { type: formTypes.choice } }) => {
  const [selectedNode, setSelectedNode] = useState({});
  const [formType, setFormType] = useState(formProps.type);

  const data = useSelector((state) => state.tags.tags);

  const dispatch = useDispatch();

  // Soft disable because there's no disable prop for TreeView
  const handleNodeSelection = (n) => {
    if ([formTypes.create, formTypes.edit, formTypes.delete].includes(formType))
      return;

    // Event fires on first render w/o any selection
    //if (!n) return;

    if (n.data.id == selectedNode?.id) {
      setSelectedNode({});
      return;
    }
    setSelectedNode(n.data);
  };

  const createHandleClick = (actionName) => () => {
    setFormType(actionName);
  };

  // TODO - contemplate failure
  const handleSaveClick = (tag) => {
    console.log(tag);
    dispatch(updateTag({ ...tag, id: selectedNode?.databaseId })).then(() =>
      setFormType(formTypes.choice)
    );
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
        onSaveClick={handleSaveClick}
        onCancelClick={createHandleClick(formTypes.choice)}
      />
    );
  };

  return (
    <>
      <Flex gap="md" justify="center" align="flex-start">
        <Stack justify="flex-start">
          <Tree
            data={denormalizeTree(data)}
            onNodeSelect={handleNodeSelection}
          />
        </Stack>
        <Stack justify="flex-start">{renderForm(formType)}</Stack>
      </Flex>
    </>
  );
};
export default TagManager;

TagManager.propTypes = {
  formProps: PropTypes.shape({
    type: PropTypes.oneOf(Object.keys(formTypes))
  })
};
