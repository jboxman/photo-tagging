import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mantine/core';

const TagForm = ({
  activeSelection = false,
  canEdit = false,
  canDelete = false,
  onCreateClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <form>
      <Button.Group>
        <Button compact onClick={onCreateClick}>
          Create
        </Button>
        <Button compact onClick={onEditClick} disabled={!canEdit}>
          Edit
        </Button>
        <Button compact onClick={onDeleteClick} disabled={!canDelete}>
          Delete
        </Button>
      </Button.Group>
    </form>
  );
};
export default TagForm;

TagForm.propTypes = {
  activeSelection: PropTypes.bool,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  onDeleteClick: PropTypes.func,
  onCreateClick: PropTypes.func,
  onEditClick: PropTypes.func,
};
