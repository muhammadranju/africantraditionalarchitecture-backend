import z from 'zod';
import { ProfessionalROLES } from './waiting.interface';

const WaitingValidation = {
  createWaitingZodSchema: z.object({
    body: z.object({
      name: z.string({
        required_error: 'Name is required',
      }),
      email: z.string({
        required_error: 'Email is required',
      }),
      role: z.enum(
        [
          ProfessionalROLES.builder,
          ProfessionalROLES.architect,
          ProfessionalROLES.designer,
          ProfessionalROLES.student,
          ProfessionalROLES.other,
        ],
        {
          required_error: `Role must be one of ${Object.values(
            ProfessionalROLES
          )}`,
        }
      ),
      country: z.string({
        required_error: 'Country is required',
      }),
      about: z.string({
        required_error: 'About is required',
      }),
      website: z.string().optional(),
      expertise: z.string({
        required_error: 'Expertise is required',
      }),
      experience: z.string({
        required_error: 'Experience is required',
      }),
      image: z.string({
        required_error: 'Image is required',
      }),
      bio: z.string({
        required_error: 'Bio is required',
      }),
      available: z.boolean().optional(),
    }),
  }),
};

export default WaitingValidation;
