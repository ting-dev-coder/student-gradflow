import { CheckboxIndicatorProps, Group } from '@mantine/core';
import FormLabel from './form-label';
import {
  Checkbox as MantineCheckbox,
  CheckboxProps as MantineCheckBoxProps,
} from '@mantine/core';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface CheckboxProps extends MantineCheckBoxProps {
  label: string;
  name: string;
  control?: Control<FieldValues> | undefined;
}
const Checkbox = ({ control, name, label, ...props }: CheckboxProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormLabel
          label={label}
          field={
            <MantineCheckbox {...field} {...props} checked={field.value} />
          }
        />
      )}
    />
  );
};

export default Checkbox;
