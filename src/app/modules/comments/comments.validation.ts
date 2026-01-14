import z from 'zod';

const CommentValidation = {
  createCommentZodSchema: z.object({
    body: z.object({
      comment: z.string({
        required_error: 'Comment is required',
      }),
      image: z.array(z.string()).optional(),
      pdfs: z.array(z.string()).optional(),
      content: z.string().optional(),
      forum: z.string().optional(),
      videos: z.array(z.string()).optional(),
      blog: z.string().optional(),
      type: z.string({
        required_error: 'Type is required',
      }),
    }),
  }),
};

export default CommentValidation;
