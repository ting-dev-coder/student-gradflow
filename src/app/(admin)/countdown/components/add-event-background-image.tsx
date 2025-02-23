import FormLabel from '@/components/form/form-label';
import {
  SimpleGrid,
  Indicator,
  Paper,
  LoadingOverlay,
  FileInput,
  Image,
} from '@mantine/core';
import { useState } from 'react';
import { MdCheck } from 'react-icons/md';
import { DEFAULT_BACKGROUND_IMAGES } from '../hooks/use-create-countdown';

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
      color="var(--secondary)"
      size="18"
      offset={5}
      label={<MdCheck />}
      disabled={disabled}
    >
      <Paper
        className="cursor-pointer"
        radius={4}
        p="xxs"
        bd={`2px solid ${selected ? 'var(--secondary)' : 'var(--gray4)'}`}
        onClick={onImageClick}
      >
        <LoadingOverlay
          visible={!loaded}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
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
    console.log('selectedImageId', selectedImageId === null);
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
      setImageSelectedId(null);
      onDefaultImageChange(null);
      onImageChange(payload);
    }

    function onUploadImageDelete() {
      onImageClick(DEFAULT_BACKGROUND_IMAGES[0]);
      onImageChange(null);
    }

    return (
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
              <FileInput
                accept="image/jpg,image/jpeg,image/png"
                onChange={onUploadImageAdd}
                label="Upload files"
                disabled={loading}
              />
            )}
          </SimpleGrid>
        }
      />
    );
  }
}
