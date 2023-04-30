import React from 'react';
import PropTypes from 'prop-types';

import { Group, Button } from '@mantine/core';

const TagForm = ({ activeSelection = false, onCreateClick, onEditClick, onDeleteClick }) => {
  return (
    <form>
      <Group>
        <Button variant="link" onClick={onCreateClick}>
          Create
        </Button>
        <Button variant="link" onClick={onEditClick} disabled={!activeSelection}>
          Edit
        </Button>
        <Button variant="link" onClick={onDeleteClick} disabled={!activeSelection}>
          Delete
        </Button>
      </Group>
    </form>
  );
};
export default TagForm;
