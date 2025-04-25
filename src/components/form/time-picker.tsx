'use client';

import {
  Text,
  Paper,
  Popover,
  Group,
  ScrollArea,
  Button,
  Stack,
} from '@mantine/core';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';

type SessionT = 'AM' | 'PM';

// 時間選擇的範圍
const HOURS = Array.from({ length: 12 }, (_, i) => i);
const MINIS = Array.from({ length: 6 }, (_, i) => i * 10);
const SESSIONS: SessionT[] = ['AM', 'PM'];

interface SelectItemProps {
  type: 'hour' | 'min' | 'session';
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const SelectItem = ({ type, children, onClick, isActive }: SelectItemProps) => {
  return (
    <Button
      className={`${type}-list-item`}
      display="block"
      bg={isActive ? 'var(--primary)' : ''}
      color={isActive ? '#fff' : 'var(--primary)'}
      w="100%"
      h="32"
      variant="subtle"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

interface TimePickerTProps {
  value: (number | string)[];
  initialHour?: number | string;
  initialMin?: number | string;
  initialSession?: 'AM' | 'PM';
  onChange?: (array: [number, number, string]) => void;
}

function getFormattedTime(number) {
  if (number >= 10) return number;
  return `0${number}`;
}
const TimePicker = ({
  value,
  initialHour,
  initialMin,
  initialSession,
  onChange,
}: TimePickerTProps) => {
  const [hour, setHour] = useState(initialHour || 0);
  const [min, setMin] = useState(initialMin || 0);

  const [session, setSession] = useState<'PM' | 'AM'>(
    initialSession || SESSIONS[0]
  );

  const hourViewport = useRef<HTMLDivElement>(null);
  const minViewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value?.length) {
      setHour(value[0]);
      setMin(value[1]);
      setSession(value[2] as SessionT);
    } else {
      if (onChange) {
        onChange([HOURS[0], MINIS[1], SESSIONS[0]]);
      }
    }
  }, [value, onChange]);

  function handleClick(type: 'hour' | 'min', idx: number) {
    const viewport = type === 'hour' ? hourViewport : minViewport;
    viewport.current
      ?.querySelectorAll(`.${type}-list-item`)
      ?.[idx]?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function onTimeClick(number: number, idx: number, type: 'hour' | 'min') {
    let newMin = min;
    let newHour = hour;
    if (type === 'min') {
      setMin(() => number);
      newMin = number;
    }
    if (type === 'hour') {
      setHour(() => number);
      newHour = number;
    }
    handleClick(type, idx);
    onChange?.([Number(newHour), Number(newMin), session]);
  }

  return (
    <Popover trapFocus position="bottom-start" withArrow shadow="md">
      <Popover.Target>
        <Button
          variant="outline"
          maw="100px"
          miw={'100px'}
          py="0"
          px="sm"
          bd="1px solid #ccc"
        >
          {getFormattedTime(hour)}:{getFormattedTime(min)} {session}
        </Button>
      </Popover.Target>
      <Popover.Dropdown px="xs">
        <Group gap="sm" align="flex-start">
          <ScrollArea w={80} h={120} viewportRef={hourViewport}>
            {HOURS.map((h, idx) => (
              <SelectItem
                key={`hours-${h}`}
                type="hour"
                isActive={h == hour}
                onClick={() => onTimeClick(h, idx, 'hour')}
              >
                {getFormattedTime(h)}
              </SelectItem>
            ))}
          </ScrollArea>
          <ScrollArea w={80} h={120} viewportRef={minViewport}>
            {MINIS.map((m, idx) => (
              <SelectItem
                isActive={m == min}
                type="min"
                key={`min-${m}`}
                onClick={() => onTimeClick(m, idx, 'min')}
              >
                {getFormattedTime(m)}
              </SelectItem>
            ))}
          </ScrollArea>
          <Stack gap="0">
            {SESSIONS.map((s) => (
              <SelectItem
                isActive={s === session}
                type="session"
                key={`session-${s}`}
                onClick={() => {
                  setSession(s as SessionT);
                  onChange?.([hour, min, s]);
                }}
              >
                {s}
              </SelectItem>
            ))}
          </Stack>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

interface ControlTimePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  initialHour?: number | string;
  initialMin?: number | string;
  initialSession?: string;
  error?: string;
  handleChange?: (value: {
    hour: number;
    min: number;
    session: string;
  }) => void;
}

const ControlTimePicker = <T extends FieldValues>({
  control,
  name,
  initialHour = 0,
  initialMin = 0,
  initialSession = SESSIONS[0],
  handleChange,
}: ControlTimePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Stack>
          <TimePicker
            {...field}
            initialHour={initialHour}
            initialMin={initialMin}
            initialSession={initialSession as SessionT}
            onChange={(value) => {
              field.onChange(value);
              handleChange?.(value);
            }}
          />
          {fieldState.error && (
            <Text c="red" size="12px">
              {fieldState.error.message}
            </Text>
          )}
        </Stack>
      )}
    />
  );
};

export default ControlTimePicker;
