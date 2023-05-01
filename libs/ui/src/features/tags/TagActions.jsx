import React from 'react';
import PropTypes from 'prop-types';

import { Group, Button } from '@mantine/core';

const TagForm = ({
  activeSelection = false,
  onCreateClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <form>
      <Group>
        <Button onClick={onCreateClick}>Create</Button>
        <Button onClick={onEditClick} disabled={!activeSelection}>
          Edit
        </Button>
        <Button onClick={onDeleteClick} disabled={!activeSelection}>
          Delete
        </Button>
      </Group>
    </form>
  );
};
export default TagForm;
