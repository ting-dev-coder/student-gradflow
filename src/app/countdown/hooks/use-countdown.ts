import { useForm } from 'react-hook-form';
import { createCountdownSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const DEFAULT_BACKGROUND_IMAGES = [
  {
    id: 1,
    src: 'countdown-image-1.jpg',
  },
  {
    id: 2,
    src: 'countdown-image-2.jpg',
  },
  {
    id: 3,
    src: 'countdown-image-3.jpg',
  },
  {
    id: 4,
    src: 'countdown-image-4.jpg',
  },
  {
    id: 5,
    src: 'countdown-image-5.png',
  },
  {
    id: 6,
    src: 'countdown-image-6.jpg',
  },
];

export const useCountdown = () => {
  const form = useForm<z.infer<typeof createCountdownSchema>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(createCountdownSchema),
    defaultValues: {
      name: '',
      endAt: new Date(),
      localImagePath: DEFAULT_BACKGROUND_IMAGES[0].src,
    },
  });
  return {
    form,
  };
};
