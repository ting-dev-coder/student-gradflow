import { DateValue, DateInput as MantineDateInput } from '@mantine/dates';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import FormLabel from './form-label';

interface DateInputWrapper<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  handleInputChange?: (field: keyof T) => void;
  label: string;
  defaultValue?: Date;
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
      render={({ field, fieldState }) => (
        <MantineDateInput
          {...field}
          {...props}
          error={fieldState?.error?.message}
          flex={1}
          value={
            field.value
              ? new Date(field.value)
              : defaultValue
              ? new Date(defaultValue)
              : null
          }
          onChange={(value: DateValue) => {
            field.onChange(value ? value.toDateString() : '');
            handleChange();
          }}
        />
      )}
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
