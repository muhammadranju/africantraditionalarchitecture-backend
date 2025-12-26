import z from 'zod';

const ForumCategoryValidation = {
  createContentZodSchema: z.object({
    body: z.object({
      title: z.string({
        required_error: 'Title is required',
      }),
      description: z.string({
        required_error: 'Description is required',
      }),
      icon: z.string().optional(),
      type: z.string({
        required_error: 'Type is required',
      }),
    }),
  }),
};

export default ForumCategoryValidation;
