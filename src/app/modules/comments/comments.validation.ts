import z from 'zod';

const CommentValidation = {
  createCommentZodSchema: z.object({
    body: z.object({
      userId: z.string({
        required_error: 'User ID is required',
      }),
      comment: z.string({
        required_error: 'Comment is required',
      }),

      type: z.string({
        required_error: 'Type is required',
      }),
    }),
  }),
};

export default CommentValidation;
