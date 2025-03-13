import {
  Group,
  Stack,
  TextInput,
  TextInputProps,
  BoxProps,
} from '@mantine/core';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import FormLabel from './form-label';

type InputT = TextInputProps & FieldValues & BoxProps;

interface IControllerInput<T extends InputT> extends BoxProps {
  control: Control<T>;
  name: Path<T>;
  handleInputChange?: (field: keyof T) => void;
  label?: string;
  error?: string;
}

function Input<T extends InputT>({
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
      render={({ field, fieldState }) => (
        <TextInput
          error={fieldState?.error?.message}
          flex={1}
          {...field}
          {...props}
          onChange={(e) => {
            field.onChange(e);
            handleChange(e);
          }}
        />
      )}
    />
  );
}

function ControllerInput<T extends InputT>({
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
