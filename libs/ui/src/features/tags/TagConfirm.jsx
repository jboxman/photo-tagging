import React from 'react';
import PropTypes from 'prop-types';

import { Group, Button } from '@mantine/core';


const TagConfirm = ({ onDeleteClick, onCancelClick }) => {
  return (
    <form>
      <Group>
        <Button variant="link" onClick={onDeleteClick}>
          Delete
        </Button>
        <Button variant="link" onClick={onCancelClick}>
          Cancel
        </Button>
      </Group>
    </form>
  );
};
export default TagConfirm;
