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
      <FormGroup label="Tag" isRequired>
        <TextInput isRequired type="text" />
      </FormGroup>
      <ActionGroup>
        <Button variant="primary">Save</Button>
        <Button variant="link">Cancel</Button>
      </ActionGroup>
    </Form>
  );
};
export default TagForm;
