import { CheckboxIndicatorProps, Group } from '@mantine/core';
import FormLabel from './form-label';
import { Checkbox as MantineCheckbox } from '@mantine/core';
import { Controller } from 'react-hook-form';

interface CheckboxProps extends CheckboxIndicatorProps {
  label: string;
}
//MantineCheckbox.Indicato
const Checkbox = ({ control, name, label, ...props }) => {
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
