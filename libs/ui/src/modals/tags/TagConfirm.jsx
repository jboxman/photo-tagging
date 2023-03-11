import React from 'react';
import PropTypes from 'prop-types';

import { Button, Form, ActionGroup } from '@patternfly/react-core';

const TagConfirm = ({ onDelete, onCancel }) => {
  return (
    <Form>
      <ActionGroup>
        <Button variant="link" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="link" onClick={onCancel}>
          Cancel
        </Button>
      </ActionGroup>
    </Form>
  );
};
export default TagConfirm;
