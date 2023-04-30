import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';

import {
  Button,
  Form,
  FormGroup,
  TextInput,
  ActionGroup,
} from '@patternfly/react-core';

const upperFirst = (str) =>
  `${str.slice(0, 1).toLocaleUpperCase()}${str.slice(1)}`;

const TagForm = ({ formType = '', activeItem = {}, onSave, onCancel }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      tagName: activeItem.name || '',
    },
  });
  const onSubmit = (data) => console.log(data);

  console.log(activeItem);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="Tag" isRequired>
        <Controller
          name="tagName"
          control={control}
          render={({ field }) => (
            <TextInput {...field} id="any" isRequired type="text" />
          )}
        />
      </FormGroup>
      <ActionGroup>
        <Button type="submit" variant="primary">
          {upperFirst(formType)}
        </Button>
        <Button variant="link" onClick={onCancel}>
          Cancel
        </Button>
      </ActionGroup>
    </Form>
  );
};
export default TagForm;
