import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  Image,
  Indicator,
  LoadingOverlay,
  Modal,
  Paper,
  SimpleGrid,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { cloneElement, createElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateCountdownEvent } from '../api/use-create-countdown-event';
import { createCountdownSchema } from '../schemas';
import { BsCalendarEventFill } from 'react-icons/bs';
import TitleIcon from '@/components/title-icon';
import ControllerInput from '@/components/form/input';
import DateInput from '@/components/form/date-input';
import FormLabel from '@/components/form/form-label';
import { MdCheck } from 'react-icons/md';
import {
  useCountdown,
  DEFAULT_BACKGROUND_IMAGES,
} from '../hooks/use-countdown';

interface DefaultImageI {
  id: number;
  src: string;
}

const ModalAddEvent = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate, isPending: loading } = useCreateCountdownEvent();

  const {
    form: {
      setValue,
      control,
      handleSubmit,
      clearErrors,
      reset,
      formState: { errors, isSubmitted, isDirty },
    },
  } = useCountdown();

  const onSubmit = (values: z.infer<typeof createCountdownSchema>) => {
    mutate(
      {
        form: {
          ...values,
        },
      },
      {
        onSuccess: ({ data }) => {
          reset();
          close();
        },
      }
    );
  };

  const handleImageChange = (payload: File | null) => {
    if (!payload) return;

    setValue('image', payload);
  };

  const handleImageClick = (image: DefaultImageI) => {
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
              error={errors.name?.message}
              handleInputChange={handleInputChange}
            />
            <DateInput
              pt="md"
              label="end at"
              name="endAt"
              control={control}
              error={errors.endAt?.message}
              handleInputChange={handleInputChange}
            />
            <BackgroundImageField
              onDefaultImageChange={handleImageClick}
              onImageChange={handleImageChange}
            />

            <Card.Section pt="md" ta="right">
              <Button type="submit" loading={loading}>
                Add
              </Button>
            </Card.Section>
          </form>
        </Card>
      </Modal>
      {cloneElement(children, { onClick: open })}
    </>
  );
};

const BackgroundImageField = ({ onImageChange, onDefaultImageChange }) => {
  const [selectedImageId, setImageSelectedId] = useState(
    DEFAULT_BACKGROUND_IMAGES[0].id
  );
  const [loaded, setLoaded] = useState(false);

  function onImageClick(image: DefaultImageI) {
    setImageSelectedId(image.id);
    onDefaultImageChange(image);
  }

  return (
    <>
      <FormLabel
        pt="md"
        label="background image"
        wrap="nowrap"
        align="flex-start"
        field={
          <SimpleGrid cols={3}>
            {DEFAULT_BACKGROUND_IMAGES.map((image) => (
              <Indicator
                color="var(--secondary)"
                size="18"
                offset={5}
                label={<MdCheck />}
                disabled={image.id !== selectedImageId}
              >
                <Paper
                  className="cursor-pointer"
                  radius={4}
                  p="xxs"
                  bd={`2px solid ${
                    image.id === selectedImageId
                      ? 'var(--secondary)'
                      : 'var(--gray4)'
                  }`}
                  onClick={() => onImageClick(image)}
                >
                  <LoadingOverlay
                    visible={!loaded}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                  />
                  <Image
                    src={image.src}
                    h={83}
                    onLoad={() => setLoaded(true)}
                  />
                </Paper>
              </Indicator>
            ))}
          </SimpleGrid>
        }
      />

      {/* <FileInput accept="image/jpg,image/jpeg,image/png" onChange={handleImageChange} label="Upload files" placeholder="Upload files" disabled={isPending} /> */}
    </>
  );
};

export default ModalAddEvent;
