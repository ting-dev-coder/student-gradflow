import { ActionIcon, MantineSize } from '@mantine/core';
import { DateInput, DateInputProps } from '@mantine/dates';
import { useEffect, useRef, useState } from 'react';
import { BiSolidEdit } from 'react-icons/bi';

interface EditableDateInput extends Omit<DateInputProps, 'onChange'> {
  defaultValue: Date | null;
  onChange: (value: Date, callback: () => void) => void;
  size?: MantineSize;
}

const EditableDateInput = ({
  size = 'xs',
  defaultValue,
  onChange,
  ...props
}: EditableDateInput) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dateLoading, setDateLoading] = useState(false);
  const editable = focused || hovered;
  const [value, setValue] = useState<Date | null>(null);
  const prevValueRef = useRef<Date | null>(value);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  function handleBlur() {
    if (!value) return;
    setFocused(false);
    if (prevValueRef.current?.getTime() !== value?.getTime()) {
      setDateLoading(true);
      onChange(value, () => setDateLoading(false));
    }
    prevValueRef.current = value;
  }
  return (
    <DateInput
      {...props}
      px="xs"
      bd={`1px solid ${editable ? 'var(--gray4)' : 'transparent'}`}
      style={{ borderRadius: '4px' }}
      variant={'unstyled'}
      size={size}
      valueFormat="YYYY-MM-DD"
      value={value}
      onChange={setValue}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={dateLoading}
      rightSection={
        (dateLoading || !editable) && (
          <ActionIcon variant="subtle" loading={dateLoading}>
            <BiSolidEdit size={14} />
          </ActionIcon>
        )
      }
    />
  );
};

export default EditableDateInput;
