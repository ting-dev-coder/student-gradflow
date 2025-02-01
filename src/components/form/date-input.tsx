import { DateValue, DateInput as MantineDateInput } from '@mantine/dates';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import FormLabel from './form-label';

interface DateInputWrapper<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  handleInputChange?: (field: keyof T) => void;
  label: string;
}

type DateInput<T extends FieldValues> = Omit<DateInputWrapper<T>, 'label'>;

function DateInput<T extends FieldValues>({
  control,
  name,
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
      render={({ field }) => (
        <MantineDateInput
          {...field}
          {...props}
          flex={1}
          onChange={(value: DateValue) => {
            field.onChange(value);
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
