import {
  Group,
  ActionIcon,
  Image,
  Text,
  Card,
  SimpleGrid,
  Menu,
  Tooltip,
} from '@mantine/core';
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashCan } from 'react-icons/fa6';
import dayjs from 'dayjs';

const EventCard = ({ event, onDelete }) => {
  const formatDate = dayjs(event.endAt).format('YYYY-MM-DD');
  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section>
        <Image src={event.localImagePath || event.image} />
      </Card.Section>
      <Card.Section withBorder inheritPadding p="xs">
        <Group justify="space-between" wrap="nowrap">
          <Tooltip label={event.name}>
            <Text flex={1} truncate="end" fw={500}>
              {event.name}
            </Text>
          </Tooltip>

          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <BsThreeDots />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<FiEdit size={14} />}>Edit</Menu.Item>

              <Menu.Item
                leftSection={<FaRegTrashCan size={14} />}
                color="red"
                onClick={() => onDelete(event.$id)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Text> {formatDate}</Text>
      </Card.Section>
    </Card>
  );
};

export default EventCard;
