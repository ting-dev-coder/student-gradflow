import {
  Modal,
  Timeline,
  Text,
  Group,
  Stack,
  Title,
  Box,
  ScrollArea,
  Image,
  CloseButton,
} from '@mantine/core';
import {
  IconGitBranch,
  IconGitCommit,
  IconGitPullRequest,
  IconMessageDots,
} from '@tabler/icons-react';
import styles from '../pomodoro-timer.module.scss';

export default function ModalHowItWorks({ opened, close }) {
  return (
    <Modal
      classNames={{
        body: styles['work-it-works_modal-content'],
        content: styles['work-it-works_modal-content'],
      }}
      centered
      style={{ '--mantine-color-body': '#E0615A' }}
      opened={opened}
      onClose={close}
      size={'xl'}
      withCloseButton={false}
      padding={0}
      zIndex={999}
    >
      <CloseButton
        size={'lg'}
        style={{ zIndex: 9 }}
        pos={'absolute'}
        right={16}
        top={8}
        onClick={() => close()}
      />
      <Box className={styles['work-it-works_bg']} />
      <Group p={0} h="100%" wrap="nowrap" align="flex-start">
        <Box flex={1} pt="xl" h={'100%'}>
          <Stack w="80%" pl="xl" pos={'relative'} h={'100%'}>
            <Title c="#fff">Pomodoro Timer</Title>
            <Text c="#fff">
              The Pomodoro Timer is a simple yet effective time management tool
              designed to boost productivity and help you focus. It is based on
              the Pomodoro Technique, which involves working in short, focused
              intervals (typically 25 minutes), followed by a short break.
              Here’s how to use it:
            </Text>
            <Image
              w="148px"
              pos={'absolute'}
              left={0}
              bottom={0}
              src="/tomato.png"
            />
          </Stack>
        </Box>

        <ScrollArea flex={1} h={'100%'}>
          <Timeline
            color="#E0615A"
            py="xl"
            pr="lg"
            active={4}
            bulletSize={24}
            lineWidth={2}
          >
            <Timeline.Item
              bullet={<IconGitBranch size={12} />}
              title=" Start a Task"
            >
              <Text c="dimmed" size="sm">
                Choose the task you want to work on. It could be anything from
                studying to completing a work project.
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconGitCommit size={12} />}
              title=" Set the Timer"
            >
              <Text c="dimmed">
                Set the timer to 25 minutes. This is your &quot;Pomodoro&quot;
                session. The timer will countdown as you work, keeping you
                focused.
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Work Until the Timer Rings"
              bullet={<IconGitPullRequest size={12} />}
            >
              <Text c="dimmed">
                During the Pomodoro, focus solely on your task. Don’t check
                emails, social media, or get distracted by other activities.
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Take a Short Break"
              bullet={<IconMessageDots size={12} />}
            >
              <Text c="dimmed" size="sm">
                When the timer rings, take a 5-minute break. Stand up, stretch,
                grab a drink, or just relax for a few minutes.
              </Text>
            </Timeline.Item>
            <Timeline.Item
              title="Repeat"
              bullet={<IconMessageDots size={12} />}
            >
              <Text c="dimmed" size="sm">
                After completing four Pomodoro sessions, take a longer break
                (15–30 minutes) to recharge. Then, repeat the process.
              </Text>
            </Timeline.Item>
          </Timeline>
        </ScrollArea>
      </Group>
    </Modal>
  );
}
