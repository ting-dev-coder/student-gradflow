import {
  DateInputProps,
  DateValue,
  DateInput as MantineDateInput,
} from '@mantine/dates';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import FormLabel from './form-label';
import { parseISO } from 'date-fns';
import { BoxProps } from '@mantine/core';

interface DateInputWrapper<T extends FieldValues> extends BoxProps {
  control: Control<T>;
  name: Path<T>;
  handleInputChange?: (field: keyof T) => void;
  label: string;
  defaultValue?: string | null;
}

type DateInput<T extends FieldValues> = Omit<DateInputWrapper<T>, 'label'>;

function DateInput<T extends FieldValues>({
  control,
  name,
  defaultValue,
  handleInputChange,
  ...props
}: DateInput<T>) {
  const handleChange = () => {
    if (handleInputChange) {
      handleInputChange(name);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      // defaultValue={defaultValue ? parseISO(defaultValue) : new Date()}
      render={({ field, fieldState }) => {
        return (
          <MantineDateInput
            {...field}
            {...props}
            minDate={new Date()}
            error={fieldState?.error?.message}
            flex={1}
            valueFormat="YYYY-MM-DD"
            value={field.value ? new Date(field.value) : null}
            onChange={(value: DateValue) => {
              if (!value) {
                field.onChange(null);
                return;
              }

              // Ensure ISO string is always used
              const isoString = value.toISOString();
              field.onChange(isoString);
              handleChange();
            }}
          />
        );
      }}
    />
  );
}

function DateInputWrapper<T extends FieldValues>({
  label,
  ...props
}: DateInputWrapper<T>) {
  return label ? (
    <FormLabel label={label} field={<DateInput {...props} />} />
  ) : (
    <DateInput {...props} />
  );
}

export default DateInputWrapper;
