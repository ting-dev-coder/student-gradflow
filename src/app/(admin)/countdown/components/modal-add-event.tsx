import { Button, Card, LoadingOverlay, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { cloneElement, ReactElement, ReactNode } from 'react';
import { z } from 'zod';
import { useCreateCountdownEvent } from '../api/use-create-countdown-event';
import { createCountdownSchema } from '../schemas';
import { BsCalendarEventFill } from 'react-icons/bs';
import TitleIcon from '@/components/title-icon';
import ControllerInput from '@/components/form/input';
import DateInput from '@/components/form/date-input';
import { useCountdown } from '../hooks/use-create-countdown';
import AddEventBackgroundImage, {
  DefaultImageI,
} from './add-event-background-image';
import styles from '../countdown.module.scss';

const ModalAddEvent = ({ children }: { children: ReactNode }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate, isPending: loading } = useCreateCountdownEvent();

  const {
    form: {
      setValue,
      control,
      handleSubmit,
      clearErrors,
      reset,
      watch,
      formState: { errors },
    },
  } = useCountdown();
  const uploadImage = watch('image');

  const onSubmit = (values: z.infer<typeof createCountdownSchema>) => {
    mutate(
      { form: { ...values } },
      {
        onSuccess: () => {
          reset();
          close();
        },
      }
    );
  };

  const handleImageChange = (payload: File | null) => {
    console.log('set', payload);
    if (!payload) {
      setValue('image', undefined);
      return;
    }
    console.log('set', payload);
    setValue('image', payload);
  };

  const handleImageClick = (image: DefaultImageI | null) => {
    if (!image) return setValue('localImagePath', undefined);
    setValue('localImagePath', image.src);
  };

  function handleInputChange(
    field: keyof z.infer<typeof createCountdownSchema>
  ) {
    if (errors[field]) {
      clearErrors(field);
    }
  }

  return (
    <>
      <Modal
        size="min(70%, xl)"
        classNames={{
          content: styles['modal-content'],
          header: styles['modal-header'],
        }}
        closeOnClickOutside={!loading}
        opened={opened}
        onClose={close}
        title={<TitleIcon title="Add event" icon={BsCalendarEventFill} />}
      >
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        <Card bg="#fff">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ControllerInput
              pt="md"
              label="event name"
              name="name"
              control={control}
              handleInputChange={handleInputChange}
            />
            <DateInput
              pt="md"
              label="end at"
              name="endAt"
              control={control}
              handleInputChange={handleInputChange}
            />
            <AddEventBackgroundImage
              loading={loading}
              onDefaultImageChange={handleImageClick}
              onImageChange={handleImageChange}
              uploadImage={uploadImage}
            />

            <Card.Section pt="md" ta="right">
              <Button type="submit" loading={loading}>
                Add
              </Button>
            </Card.Section>
          </form>
        </Card>
      </Modal>
      {cloneElement(children as ReactElement<{ onClick?: () => void }>, {
        onClick: open,
      })}
    </>
  );
};

export default ModalAddEvent;
