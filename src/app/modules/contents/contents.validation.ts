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
      image: z.string().optional(),
      category: z.string({
        required_error: 'Category is required',
      }),
      coverImage: z.string({
        required_error: 'Cover Image is required',
      }),

      region: z.enum(
        ['east', 'west', 'north', 'south', 'central', 'globally'],
        {
          required_error: 'Region is required',
        }
      ),

      images: z.array(z.string()).optional(),
      medias: z.array(z.string()).optional(),
      pdfs: z.array(z.string()).optional(),
      country: z.string({
        required_error: 'Country is required',
      }),
      shortDescription: z
        .string({
          required_error: 'Short Description is required',
        })
        .max(100, {
          message: 'Short Description must be less than 100 characters',
        }),
    }),
  }),
};

export default ContentValidation;
