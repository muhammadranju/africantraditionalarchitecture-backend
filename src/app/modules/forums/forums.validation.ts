import z from 'zod';
import { CategoryEnum } from './forums.interface';

const ForumValidation = {
  createForumZodSchema: z.object({
    body: z.object({
      title: z.string({
        required_error: 'Title is required',
      }),
      description: z.string({
        required_error: 'Description is required',
      }),
      category: z.enum([
        CategoryEnum.cultural,
        CategoryEnum.rebuilding,
        CategoryEnum.materials,
        CategoryEnum.interactive,
        CategoryEnum.community,
      ] as const),
    }),
  }),
};

export default ForumValidation;
