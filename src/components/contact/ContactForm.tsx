'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFeedback, ContactFormI } from '@/types/dictionary';
import ContactFormUI from '@/components/contact/ContactFormUI';
import { sendMessage } from '@/app/api/messageService';
import { getToken } from '@/app/api/tokenService';
import { ContactFormData, createContactFormSchema } from '@/types/contactFormSchema';

interface ContactFormProps {
  form: ContactFormI;
  feedback: ContactFeedback;
}

export function ContactForm({ form, feedback }: ContactFormProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { feedbackToken, success, network, fail } = feedback;

  const formSchema = useMemo(() => createContactFormSchema(form), [form]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async (data: ContactFormData) => {
    setLoading(true);

    const currentToken = token || (await getToken(feedbackToken, network));
    if (!currentToken) {
      setLoading(false);
      return;
    }

    const result = await sendMessage(data, currentToken, { success, fail, network });
    if (result.success) {
      if (result.newToken) setToken(result.newToken);
      reset();
    }

    setLoading(false);
  });

  return (
    <ContactFormUI
      register={register}
      errors={errors}
      loading={loading}
      form={form}
      onSubmit={onSubmit}
    />
  );
}
