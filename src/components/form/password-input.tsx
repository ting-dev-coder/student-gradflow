import {
  PasswordInput as MantinePasswordInput,
  TextInputProps,
  BoxProps,
} from '@mantine/core';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import FormLabel from './form-label';

type InputT = TextInputProps & FieldValues & BoxProps;

interface IControllerInput<T extends InputT> {
  control: Control<T>;
  name: Path<T>;
  handleInputChange?: (field: keyof T) => void;
  label?: string;
  error?: string;
}

function PasswordInput<T extends InputT>({
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
        <MantinePasswordInput
          {...field}
          {...props}
          error={fieldState?.error?.message}
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

function ControllerPasswordInput<T extends InputT>({
  label,
  ...props
}: IControllerInput<T>) {
  return label ? (
    <FormLabel label={label} field={<PasswordInput {...props} />} />
  ) : (
    <PasswordInput {...props} />
  );
}

export default ControllerPasswordInput;
