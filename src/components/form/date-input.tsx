import {
  DateInputProps,
  DateValue,
  DateInput as MantineDateInput,
} from '@mantine/dates';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import FormLabel from './form-label';
import dayjs from 'dayjs';
import { parse, parseISO } from 'date-fns';
import { BoxProps } from '@mantine/core';

interface DateInputWrapper<T extends FieldValues> extends BoxProps {
  control: Control<T>;
  name: Path<T>;
  handleInputChange?: (field: keyof T) => void;
  label: string;
  defaultValue?: string | null;
}

type DateInput<T extends FieldValues> = Omit<DateInputWrapper<T>, 'label'>;

const dateParser: DateInputProps['dateParser'] = (input: string) => {
  return parseISO(input);
};

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
      render={({ field, fieldState }) => {
        console.log('DateInput Value:', {
          defaultValue,
          fieldValue: field.value,
          finalValue:
            defaultValue && typeof defaultValue === 'string'
              ? parseISO(defaultValue)
              : field.value && typeof field.value === 'string'
              ? parseISO(field.value)
              : null,
        });
        return (
          <>
            <MantineDateInput
              {...field}
              {...props}
              minDate={new Date()}
              dateParser={dateParser}
              error={fieldState?.error?.message}
              flex={1}
              valueFormat="YYYY-MM-DD"
              value={
                defaultValue && typeof defaultValue === 'string'
                  ? parseISO(defaultValue)
                  : field.value && typeof field.value === 'string'
                  ? parseISO(field.value)
                  : null
              }
              onChange={(value: DateValue) => {
                field.onChange(value ? value.toISOString() : '');
                handleChange();
              }}
            />
          </>
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
