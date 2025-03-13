import FormLabel from '@/components/form/form-label';
import {
  SimpleGrid,
  Indicator,
  Paper,
  LoadingOverlay,
  Image,
  Text,
  FileButton,
  UnstyledButton,
  Button,
  Stack,
} from '@mantine/core';
import { useState } from 'react';
import { MdCheck } from 'react-icons/md';
import { DEFAULT_BACKGROUND_IMAGES } from '../hooks/use-create-countdown';
import { RiImageAddLine } from 'react-icons/ri';

export interface DefaultImageI {
  id: number;
  src: string;
}

interface ImageButtonI {
  disabled: boolean;
  selected: boolean;
  onImageClick: () => void;
  loaded?: boolean;
  imageSrc: File | string | undefined;
  onLoad?: () => void;
}

interface BackgroundImageI {
  loading: boolean;
  onDefaultImageChange: (image: DefaultImageI | null) => void;
  onImageChange: (payload: File | null) => void;
  uploadImage: File | undefined | string;
}

const ImageButton = ({
  disabled,
  selected,
  onImageClick,
  loaded,
  imageSrc,
  onLoad,
}: ImageButtonI) => {
  return (
    <Indicator
      color="var(--primary)"
      size="18"
      offset={5}
      label={<MdCheck />}
      disabled={disabled}
    >
      <Paper
        className="cursor-pointer"
        radius={4}
        p="xxs"
        bd={`2px solid ${selected ? 'var(--primary)' : 'var(--gray4)'}`}
        onClick={onImageClick}
      >
        <LoadingOverlay
          visible={!loaded}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          h={'100%'}
        />
        <Image src={imageSrc} h={83} onLoad={onLoad} />
      </Paper>
    </Indicator>
  );
};

export default function AddEventBackgroundImage({
  loading,
  onDefaultImageChange,
  onImageChange,
  uploadImage,
}: BackgroundImageI) {
  {
    const [selectedImageId, setImageSelectedId] = useState<number | null>(
      DEFAULT_BACKGROUND_IMAGES[0].id
    );
    const [error, setError] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);

    function onImageClick(image: DefaultImageI) {
      setImageSelectedId(image.id);
      onDefaultImageChange(image);
    }
    function onUploadImageClick() {
      if (selectedImageId === null) {
        onUploadImageDelete();
        return;
      }
      setImageSelectedId(null);
      onDefaultImageChange(null);
    }
    function onUploadImageAdd(payload: File | null) {
      if (payload) {
        const maxSize = 1048576; // 1MB in bytes
        if (payload.size > maxSize) {
          setError('File is too large. Max size is 1MB');
          return;
        }
      }
      setError(null);
      setImageSelectedId(null);
      onDefaultImageChange(null);
      onImageChange(payload);
    }

    function onUploadImageDelete() {
      onImageClick(DEFAULT_BACKGROUND_IMAGES[0]);
      onImageChange(null);
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
              {DEFAULT_BACKGROUND_IMAGES.map((image, idx) => (
                <ImageButton
                  key={`${image}-${idx}`}
                  disabled={image.id !== selectedImageId}
                  selected={image.id === selectedImageId}
                  imageSrc={image.src}
                  onImageClick={() => onImageClick(image)}
                  onLoad={() => setLoaded(true)}
                  loaded={loaded}
                />
              ))}
              {uploadImage ? (
                <ImageButton
                  disabled={selectedImageId !== null}
                  loaded={true}
                  selected={selectedImageId === null}
                  imageSrc={
                    uploadImage instanceof File
                      ? URL.createObjectURL(uploadImage)
                      : uploadImage
                  }
                  onImageClick={onUploadImageClick}
                />
              ) : (
                <FileButton
                  accept="image/jpg,image/jpeg,image/png"
                  onChange={onUploadImageAdd}
                  disabled={loading}
                >
                  {(props) => (
                    <Button
                      color="var(--gray4)"
                      h="95px"
                      style={{
                        borderStyle: 'dashed',
                        borderWidth: '2px',
                      }}
                      {...props}
                      variant="outline"
                    >
                      <Stack gap={'xs'} align="center" justify="center">
                        <RiImageAddLine size={32} />
                        <Text fw="600" fz="sm">
                          Upload image
                        </Text>
                      </Stack>
                    </Button>
                  )}
                </FileButton>
              )}
            </SimpleGrid>
          }
        />
        {error && (
          <Text ta="center" c="red">
            {error}
          </Text>
        )}
      </>
    );
  }
}
