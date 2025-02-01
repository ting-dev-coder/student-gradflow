import {
  Group,
  Stack,
  TextInput,
  Input as MantineInput,
  Box,
} from '@mantine/core';
import { ChangeEvent } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import FormLabel from './form-label';

interface IControllerInput<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  handleInputChange?: (field: keyof T) => void;
  label?: string;
  error?: string;
}

function Input<T extends FieldValues>({
  control,
  name,
  error,
  handleInputChange,
  ...props
}: IControllerInput<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleInputChange) {
      handleInputChange(name);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          {...field}
          {...props}
          error={error}
          flex={1}
          onChange={(e) => {
            field.onChange(e);
            handleChange(e);
          }}
        />
      )}
    />
  );
}

function ControllerInput<T extends FieldValues>({
  label,
  ...props
}: IControllerInput<T>) {
  return label ? (
    <FormLabel label={label} field={<Input {...props} />} />
  ) : (
    <Input {...props} />
  );
}

export default ControllerInput;
