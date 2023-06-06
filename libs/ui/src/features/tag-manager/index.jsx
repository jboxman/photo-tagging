import React from 'react';
import { useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Flex, Stack } from '@mantine/core';

import TagActions from './components/TagActions';
import TagForm from './components/TagForm';
import TagConfirm from './components/TagConfirm';
import Tree from '../../components/tree';

import { denormalizeTree } from '../../store/helpers';
import { updateTag, deleteTag, createTag } from '../../store/tagActions';

// Need to know selectedNode
// Need to load initial data
// Need to support create/edit/delete

// TODO -
// Convert strings to numbers leaving form
// What else?

const formTypes = {
  choice: 'choice',
  create: 'create',
  edit: 'edit',
  delete: 'delete'
};

const TagManager = ({ formProps = { type: formTypes.choice } }) => {
  const dispatch = useDispatch();
  const treeRef = useRef();

  const [selectedNode, setSelectedNode] = useState({});
  //const [scrollToId, setScrollToId] = useState(null);
  const [formType, setFormType] = useState(formProps.type);

  const data = useSelector((state) => state.tags.tags);

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
  const handleSaveClick = (formData) => {
    console.log(formData);
    if (formType == formTypes.create) {
      dispatch(createTag({ ...formData })).then(() => {
        setFormType(formTypes.choice);
        // TODO - setState and useEffect instead?
        treeRef.current.scrollTo(selectedNode?.treeId);
        treeRef.current.select(selectedNode?.treeId);
      });
    } else if (formType == formTypes.edit) {
      dispatch(updateTag({ ...formData, id: selectedNode?.id })).then(() =>
        setFormType(formTypes.choice)
      );
    }
  };

  const handleDeleteClick = () => {
    dispatch(deleteTag({ id: selectedNode?.id })).then(() => {
      //treeRef.current.deselect(selectedNode?.id);
      // TODO - batching?
      setSelectedNode({});
      setFormType(formTypes.choice);
    });
  };

  const isEditable = () => !!selectedNode?.id;
  const isDeletable = () => {
    console.log(selectedNode);
    return (
      isEditable &&
      selectedNode?.children?.length == 0 &&
      selectedNode?.imageCount == 0
    );
  };

  const renderForm = (formType) => {
    if (formType == formTypes.choice) {
      return (
        <TagActions
          activeSelection={!!selectedNode?.id}
          canEdit={isEditable()}
          canDelete={isDeletable()}
          onCreateClick={createHandleClick(formTypes.create)}
          onEditClick={createHandleClick(formTypes.edit)}
          onDeleteClick={createHandleClick(formTypes.delete)}
        />
      );
    }
    if (formType == formTypes.delete) {
      return (
        <TagConfirm
          onDeleteClick={handleDeleteClick}
          onCancelClick={createHandleClick(formTypes.choice)}
        />
      );
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

  // TODO - need to pass moveTo node so that imperative API can be used
  // to move tree focus to newly created node? This _might_ work.
  return (
    <>
      <Flex gap="md" justify="center" align="flex-start">
        <Stack justify="flex-start">
          <Tree
            treeRef={treeRef}
            data={denormalizeTree(data)}
            onNodeSelect={handleNodeSelection}
            renderRowProps={{
              disableSelect: [
                formTypes.create,
                formTypes.edit,
                formTypes.delete
              ].includes(formType)
            }}
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
