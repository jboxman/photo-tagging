import React from 'react';
import PropTypes from 'prop-types';

import { Button, Form, ActionGroup } from '@patternfly/react-core';

const TagForm = ({ activeSelection = false, onCreate, onEdit, onDelete }) => {
  return (
    <Form>
      <ActionGroup>
        <Button variant="link" onClick={onCreate}>
          Create
        </Button>
        <Button variant="link" onClick={onEdit} isDisabled={!activeSelection}>
          Edit
        </Button>
        <Button variant="link" onClick={onDelete} isDisabled={!activeSelection}>
          Delete
        </Button>
      </ActionGroup>
    </Form>
  );
};
export default TagForm;
