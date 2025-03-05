import { useForm } from 'react-hook-form';
import { createCountdownSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const DEFAULT_BACKGROUND_IMAGES = [
  {
    id: 1,
    src: 'birthday.jpg',
  },
  {
    id: 2,
    src: 'graduation.jpg',
  },
  {
    id: 3,
    src: 'christmas.jpg',
  },
  {
    id: 4,
    src: 'travel.jpg',
  },
  {
    id: 5,
    src: 'move-place.jpg',
  },
  {
    id: 6,
    src: 'countdown-image-5.jpg',
  },
];

export const useCountdown = () => {
  const form = useForm<z.infer<typeof createCountdownSchema>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(createCountdownSchema),
    defaultValues: {
      name: '',
      localImagePath: DEFAULT_BACKGROUND_IMAGES[0].src,
    },
  });
  return {
    form,
  };
};
