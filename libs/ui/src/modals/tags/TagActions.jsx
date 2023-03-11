import React from 'react';
import PropTypes from 'prop-types';

import { Button, Form, ActionGroup } from '@patternfly/react-core';

const TagForm = ({ onCreate, onEdit, onDelete }) => {
  return (
    <Form>
      <ActionGroup>
        <Button variant="link" onClick={onCreate}>
          Create
        </Button>
        <Button variant="link" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="link" onClick={onDelete}>
          Delete
        </Button>
      </ActionGroup>
    </Form>
  );
};
export default TagForm;
