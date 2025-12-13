import z from 'zod';

const ForumValidation = {
  createForumZodSchema: z.object({
    body: z.object({
      name: z.string({
        required_error: 'Name is required',
      }),
      email: z.string({
        required_error: 'Email is required',
      }),
      phone: z.string({
        required_error: 'Phone is required',
      }),
      address: z.string({
        required_error: 'Address is required',
      }),
      message: z.string({
        required_error: 'Message is required',
      }),
    }),
  }),
};

export default ForumValidation;
