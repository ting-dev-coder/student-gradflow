import {
  DateInputProps,
  DateValue,
  DateInput as MantineDateInput,
} from '@mantine/dates';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import FormLabel from './form-label';
import dayjs from 'dayjs';
import { parseISO } from 'date-fns';

interface DateInputWrapper<T extends FieldValues> {
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
  console.log('defaultValue', defaultValue);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <>
            <MantineDateInput
              {...field}
              {...props}
              error={fieldState?.error?.message}
              flex={1}
              valueFormat="YYYY-MM-DD"
              value={
                defaultValue
                  ? parseISO(defaultValue)
                  : field.value
                  ? parseISO(field.value)
                  : null
              }
              onChange={(value: DateValue) => {
                field.onChange(value ? value.toDateString() : '');
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
