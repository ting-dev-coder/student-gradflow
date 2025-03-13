import {
  ActionIcon,
  Checkbox,
  Dialog,
  Group,
  Text,
  Stack,
  TextInput,
} from '@mantine/core';
import { useContext, useState } from 'react';
import { PomodoroContext } from '../page';
import { useClickOutside } from '@mantine/hooks';
import { IoClose } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';

function ListItem({ text, onDelete, completed, toggleFocus, showDivider }) {
  const [checked, setChecked] = useState(completed);
  function handleCheckChange(state: boolean) {
    setChecked(state);
    toggleFocus();
  }
  return (
    <Group
      pb="sm"
      style={{ borderBottom: `${showDivider ? 1 : 0}px solid var(--gray4)` }}
    >
      <Checkbox
        flex={1}
        label={
          <Text
            td={completed && 'line-through'}
            c={`var(--gray${completed ? 4 : 3})`}
          >
            {text}
          </Text>
        }
        checked={checked}
        onChange={(event) => handleCheckChange(event.currentTarget.checked)}
      />
      <ActionIcon color="var(--gray4)" variant="subtle" onClick={onDelete}>
        <IoClose />
      </ActionIcon>
    </Group>
  );
}

export default function DrawerFocusQueue() {
  const [taskText, setTaskText] = useState('');
  const ref = useClickOutside(() => onFocusListOpenChange(false));
  const context = useContext(PomodoroContext);
  if (!context) return;
  const {
    focusListOpened,
    onFocusListOpenChange,
    focusList,
    deleteFocus,
    toggleFocus,
    addFocus,
  } = context;

  return (
    <Dialog
      ref={ref}
      zIndex={0}
      position={{ top: 0, left: 'var(--app-shell-navbar-width)' }}
      opened={focusListOpened}
      onClose={() => onFocusListOpenChange(false)}
      title="Focus Queue"
      transitionProps={{ transition: 'slide-right' }}
      h="100vw"
      bg="white"
    >
      <Stack gap="sm">
        <Group gap="xs">
          <TextInput
            flex={1}
            style={{ '--input-bd': 'var(--primary)' }}
            value={taskText}
            onChange={(event) => setTaskText(event.currentTarget.value)}
          />
          <ActionIcon
            color="var(--warning)"
            onClick={() => {
              addFocus(taskText);
              setTaskText('');
            }}
          >
            <IoMdAdd />
          </ActionIcon>
        </Group>
        {focusList.map((focusTask, idx) => (
          <ListItem
            key={`focus-list${idx}`}
            toggleFocus={() => toggleFocus(focusTask.id)}
            {...focusTask}
            showDivider={idx !== focusList.length - 1}
            onDelete={() => deleteFocus(focusTask.id)}
          />
        ))}
      </Stack>

      {/* Drawer content */}
    </Dialog>
  );
}
