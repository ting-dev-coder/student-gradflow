import { Group, GroupProps, Input } from '@mantine/core';
import { ReactNode } from 'react';

interface FormLabelProps extends GroupProps {
  label: string;
  field: ReactNode;
}

const FormLabel = ({ label, field, ...props }: FormLabelProps) => {
  return (
    <Group {...props} gap="xs">
      <Input.Label
        c="var(--gray3)"
        tt="capitalize"
        ta="left"
        w="100px"
        miw={'80px'}
      >
        {label}
      </Input.Label>
      {field}
    </Group>
  );
};

export default FormLabel;
