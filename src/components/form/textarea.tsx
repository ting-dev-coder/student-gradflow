import { DateValue, DateInput as MantineDateInput } from '@mantine/dates';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import FormLabel from './form-label';
import { Textarea as MantineTextarea, TextareaProps } from '@mantine/core';

type TextAreaT = TextareaProps & FieldValues;

interface TextareaWrapper<T extends FieldValues> extends TextareaProps {
  control: Control<T>;
  name: Path<T>;
  handleInputChange?: (field: keyof T) => void;
}

function TextArea<T extends TextAreaT>({
  label,
  handleInputChange,
  control,
  name,
  ...props
}: TextareaWrapper<T>) {
  const handleChange = () => {
    if (handleInputChange) {
      handleInputChange(name);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MantineTextarea
          {...field}
          {...props}
          value={field.value ?? ''}
          onChange={(event) => {
            field.onChange(event.currentTarget.value);
            handleChange();
          }}
        />
      )}
    />
  );
}

export default TextArea;
