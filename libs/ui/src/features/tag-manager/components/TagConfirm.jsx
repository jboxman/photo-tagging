import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mantine/core';

const TagConfirm = ({ onDeleteClick, onCancelClick }) => {
  return (
    <form>
      <Button.Group>
        <Button compact onClick={onDeleteClick}>
          Delete
        </Button>
        <Button compact onClick={onCancelClick}>
          Cancel
        </Button>
      </Button.Group>
    </form>
  );
};
export default TagConfirm;

TagConfirm.propTypes = {
  onDeleteClick: PropTypes.func,
  onCancelClick: PropTypes.func,
};
