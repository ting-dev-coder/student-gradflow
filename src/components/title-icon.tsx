import { Text, Group, Paper, Title } from '@mantine/core';
import { IconType } from 'react-icons';

interface TitleIcon {
  icon: IconType;
  title: string;
}
const TitleIcon = ({ icon: Icon, title }: TitleIcon) => {
  return (
    <Group gap="xs">
      <Paper
        p="xs"
        style={{
          color: 'var(--secondary)',
        }}
        bg="var(--primary)"
        radius={'100vmax'}
      >
        <Icon color="#fff" />
      </Paper>
      {title && <Title order={3}>{title}</Title>}
    </Group>
  );
};

export default TitleIcon;
