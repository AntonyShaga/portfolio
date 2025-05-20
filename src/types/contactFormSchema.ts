import * as z from 'zod';
import { ContactFormI } from '@/types/dictionary';

export const createContactFormSchema = (form: ContactFormI) => {
  const {
    formErrors: {
      messageTooLong,
      nameTooLong,
      nameTooShort,
      messageTooShort,
      emailTooLong,
      emailInvalid,
    },
  } = form;

  return z.object({
    name: z.string().min(2, nameTooShort).max(50, nameTooLong),
    email: z.string().email(emailInvalid).max(100, emailTooLong),
    message: z.string().min(10, messageTooShort).max(1000, messageTooLong),
  });
};

export type ContactFormData = z.infer<ReturnType<typeof createContactFormSchema>>;
