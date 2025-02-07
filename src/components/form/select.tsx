import {
  Group,
  Stack,
  Select as MantineSelect,
  Box,
  BoxProps,
  SelectProps,
} from '@mantine/core';
import { ChangeEvent } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import FormLabel from './form-label';

interface IControllerSelect<T extends FieldValues>
  extends SelectProps,
    BoxProps {
  control: Control<T>;
  name: Path<T>;
  handleSelectChange?: (field: keyof T) => void;
  label?: string;
  error?: string;
}

function Select<T extends SelectProps>({
  control,
  name,
  error,
  handleSelectChange,
  ...props
}: IControllerSelect<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (handleSelectChange) {
      handleSelectChange(name);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Stack>
          <MantineSelect
            {...field}
            {...props}
            error={fieldState?.error?.message}
            flex={1}
            onChange={(e) => {
              field.onChange(e);
              handleChange(e);
            }}
          />
        </Stack>
      )}
    />
  );
}

function ControllerSelect<T extends FieldValues>({
  label,
  ...props
}: IControllerSelect<T>) {
  return label ? (
    <FormLabel label={label} field={<Select {...props} />} />
  ) : (
    <Select {...props} />
  );
}

export default ControllerSelect;
