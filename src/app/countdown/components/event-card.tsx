import {
  Group,
  ActionIcon,
  Image,
  Text,
  Card,
  SimpleGrid,
  Menu,
  Tooltip,
  UnstyledButton,
  Loader,
  Button,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';

import { BsThreeDots } from 'react-icons/bs';
import { BsFillPinAngleFill } from 'react-icons/bs';
import dayjs from 'dayjs';
import { MdDeleteForever } from 'react-icons/md';
import { BiSolidEdit } from 'react-icons/bi';
import { useRef, useState } from 'react';
import { dateFormat } from '@/lib/utils';
import { differenceInDays, parseISO } from 'date-fns';
import { useEditCountdown } from '../api/use-edit-countdown';
import { useDisclosure } from '@mantine/hooks';
import ModalDeleteConfirm from '@/components/modal-delete-confirm';

const EventCard = ({ event, onDelete }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dateLoading, setDateLoading] = useState(false);
  const editable = focused || hovered;
  const [value, setValue] = useState<Date | null>(parseISO(event.endAt));
  const prevValueRef = useRef<Date | null>(value);

  const { mutate, isPending } = useEditCountdown();
  function handleBlur() {
    console.log('blur');
    setFocused(false);
    if (prevValueRef.current?.getTime() !== value?.getTime()) {
      setDateLoading(true);
      mutate(
        {
          form: { endAt: value?.toISOString() },
          param: { countdownId: event.$id },
        },
        {
          onSuccess: () => setDateLoading(false),
        }
      );
    }
    prevValueRef.current = value;
  }

  function handleUpdateMainEvent() {
    mutate({
      form: { isMain: 'true' },
      param: { countdownId: event.$id },
    });
  }

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section pos="relative">
        <Button.Group top={-1} right={-1} pos={'absolute'}>
          <Button
            size="xs"
            color="var(--primary)"
            variant="filled"
            onClick={handleUpdateMainEvent}
          >
            <BsFillPinAngleFill
              style={{ transform: 'rotate(-90deg)' }}
              size={20}
              color="#000"
            />
          </Button>
          <Button size="xs" variant="filled" color="#000" onClick={open}>
            <MdDeleteForever size={20} />
          </Button>
        </Button.Group>
        <Text
          className="text-shadow "
          style={{
            transform: 'translate(-50%, -50%)',
          }}
          left={'50%'}
          top={'55%'}
          pos={'absolute'}
          size="3.25rem"
          c="#fff"
        >
          {differenceInDays(event.endAt, new Date())}
        </Text>
        <Image src={event.localImagePath || event.image} />
      </Card.Section>
      <Card.Section withBorder inheritPadding p="xs">
        <Tooltip label={event.name}>
          <Text pl="xs" flex={1} truncate="end" fw={500}>
            {event.name}
          </Text>
        </Tooltip>
        <Group gap={0}>
          <DateInput
            w="130px"
            px="xs"
            bd={`1px solid ${editable ? 'var(--gray4)' : 'transparent'}`}
            style={{ borderRadius: '4px' }}
            variant={'unstyled'}
            size="xs"
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
        </Group>
      </Card.Section>
      <ModalDeleteConfirm
        opened={opened}
        close={close}
        onDeleteClick={(close) => {
          onDelete(event.$id);
          close();
        }}
      />
    </Card>
  );
};

export default EventCard;
