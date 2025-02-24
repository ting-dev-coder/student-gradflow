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
import { useMounted } from '@mantine/hooks';

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
  console.log('defaultValue', defaultValue);
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
        return (
          <MantineDateInput
            // {...field}
            {...props}
            minDate={new Date()}
            error={fieldState?.error?.message}
            flex={1}
            valueFormat="YYYY-MM-DD"
            defaultValue={new Date(defaultValue)}
            // value={field.value}
            onChange={(value: DateValue) => {
              if (!value) return;
              field.onChange(value.toISOString());
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
