import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Form,
  FormGroup,
  TextInput,
  ActionGroup,
} from '@patternfly/react-core';

const TagForm = () => {
  return (
    <Form>
      <ActionGroup>
        <Button variant="primary">Create</Button>
        <Button variant="link">Edit</Button>
        <Button variant="link">Delete</Button>
      </ActionGroup>
    </Form>
  );
};
export default TagForm;
