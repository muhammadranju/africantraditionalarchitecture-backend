import z from 'zod';

const blogValidation = {
  createBlogZodSchema: z.object({
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
      tags: z.array(z.string()).min(1, 'At least one tag is required'),
    }),
  }),
};

export default blogValidation;
