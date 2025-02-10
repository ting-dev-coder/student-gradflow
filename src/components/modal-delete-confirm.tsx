import { Button, Group, Modal } from '@mantine/core';
interface ModalDeleteConfirm {
  opened: boolean;
  close: () => void;
  onDeleteClick: (closeCallback: () => void) => void;
  loading?: boolean;
}
const ModalDeleteConfirm = ({
  opened,
  close,
  onDeleteClick,
  loading,
}: ModalDeleteConfirm) => {
  return (
    <Modal
      size="auto"
      title="Delete this page?"
      opened={opened}
      onClose={close}
      centered
    >
      Are you sure you want to delete this? This action cannot be undone.
      <Group mt="lg" justify="flex-end">
        <Button onClick={close} variant="default">
          Cancel
        </Button>
        <Button
          onClick={() => onDeleteClick(() => close())}
          color="var(--gray4)"
          loading={loading}
        >
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default ModalDeleteConfirm;
