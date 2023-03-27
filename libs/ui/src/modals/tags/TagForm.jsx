import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Form,
  FormGroup,
  TextInput,
  ActionGroup,
  Checkbox,
} from '@patternfly/react-core';

const upperFirst = (str) =>
  `${str.slice(0, 1).toLocaleUpperCase()}${str.slice(1)}`;

const TagForm = ({
  formType = '',
  activeItem = {},
  parentTagName = '',
  onSave,
  onCancel,
}) => {
  const [tagName, setTagName] = useState(activeItem.name || '');
  const [isRootTag, setIsRootTag] = useState(false);
  console.log(activeItem);
  return (
    <Form>
      <FormGroup label="Tag" isRequired>
        <TextInput
          isRequired
          type="text"
          defaultValue={tagName}
          onChange={(v) => setTagName(v)}
        />
      </FormGroup>
      <FormGroup>
        {formType == 'create' ? (
          <Checkbox
            label="Root"
            id="root_parent"
            name="no_parent"
            isChecked={isRootTag}
            onChange={(v) => setIsRootTag(v)}
          />
        ) : null}
      </FormGroup>
      <ActionGroup>
        <Button variant="primary">{upperFirst(formType)}</Button>
        <Button variant="link" onClick={onCancel}>
          Cancel
        </Button>
      </ActionGroup>
    </Form>
  );
};
export default TagForm;
