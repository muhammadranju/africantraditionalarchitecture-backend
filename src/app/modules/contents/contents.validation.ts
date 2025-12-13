import z from 'zod';

const ContentValidation = {
  createContentZodSchema: z.object({
    body: z.object({
      title: z.string({
        required_error: 'Title is required',
      }),
      description: z.string({
        required_error: 'Description is required',
      }),
      image: z.string({
        required_error: 'Image is required',
      }),
      category: z.string({
        required_error: 'Category is required',
      }),
      coverImage: z.string({
        required_error: 'Cover Image is required',
      }),
      type: z.string({
        required_error: 'Type is required',
      }),
    }),
  }),
};

export default ContentValidation;
