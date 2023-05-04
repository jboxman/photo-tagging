import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextInput, Group, Button, Select } from '@mantine/core';

import { getSelectListItems } from '../../store/helpers';

/*
import {
  Button,
  Form,
  Group,
  TextInput,
  Group,
} from '@patternfly/react-core';
*/

const upperFirst = (str) =>
  `${str.slice(0, 1).toLocaleUpperCase()}${str.slice(1)}`;

const TagForm = ({
  data,
  formType = '',
  activeItem = {},
  onSave,
  onCancel
}) => {
  const { name: tagName, parentId } = activeItem;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      tagName: tagName ?? '',
      parentId: parentId ?? ''
    }
  });

  const onSubmit = (values) => console.log(values);

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={onSubmit}>
        <Group>
          <Controller
            name="tagName"
            control={control}
            render={({ field }) => (
              <TextInput label="Tag" withAsterisk {...field} />
            )}
          />

          <Controller
            name="parentId"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  label="Parent"
                  withAsterisk
                  searchable
                  clearable
                  data={getSelectListItems({ tags: data })}
                  maxDropdownHeight={100}
                  {...field}
                />
              </>
            )}
          />
        </Group>

        <Group
          sx={{
            padding: '1rem 0 0 0'
          }}
        >
          <Button>{upperFirst(formType)}</Button>
          <Button>Cancel</Button>
        </Group>
      </form>
    </Box>
  );
};
export default TagForm;

/*
<form onSubmit={handleSubmit(onSubmit)}>
      <Group label="Tag" isRequired>
        <Controller
          name="tagName"
          control={control}
          render={({ field }) => (
            <TextInput {...field} isRequired />
          )}
        />
      </Group>
      <Group>
        <Button type="submit">{upperFirst(formType)}</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Group>
    </form>
*/
