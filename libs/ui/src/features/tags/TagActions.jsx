import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mantine/core';

const TagForm = ({
  activeSelection = false,
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
        <Button compact onClick={onEditClick} disabled={!activeSelection}>
          Edit
        </Button>
        <Button compact onClick={onDeleteClick} disabled={!activeSelection}>
          Delete
        </Button>
      </Button.Group>
    </form>
  );
};
export default TagForm;
