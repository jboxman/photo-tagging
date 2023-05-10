import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextInput, Group, Button, Select } from '@mantine/core';

import { getSelectListItems } from '../../../store/helpers';

const upperFirst = (str) =>
  `${str.slice(0, 1).toLocaleUpperCase()}${str.slice(1)}`;

const saveValues = ({ parentId, tagName = '' } = {}) => ({
  parentId,
  tagName
});

const TagForm = ({
  data,
  formType = '',
  activeItem = {},
  onSaveClick = () => {},
  onCancelClick = () => {}
}) => {
  const { name: tagName, parentId } = activeItem;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      tagName: tagName ?? '',
      parentId: parentId ?? ''
    }
  });

  const onSubmit = (values) => {
    console.log(values);
    onSaveClick(saveValues(values));
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button.Group>
            <Button type="submit" compact>
              {upperFirst(formType)}
            </Button>
            <Button type="button" compact onClick={onCancelClick}>
              Cancel
            </Button>
          </Button.Group>
        </Group>
      </form>
    </Box>
  );
};
export default TagForm;
