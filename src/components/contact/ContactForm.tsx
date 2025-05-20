'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ContactFeedback, ContactFormI } from '@/types/dictionary';
import ContactFormUI from '@/components/contact/ContactFormUI';
import { sendMessage } from '@/app/api/messageService';
import { getToken } from '@/app/api/tokenService';

interface IProps {
  form: ContactFormI;
  feedback: ContactFeedback;
}

export function ContactForm({ form, feedback }: IProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const { feedbackToken, success, network, fail } = feedback;

  const formSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, nameTooShort).max(50, nameTooLong),
        email: z.string().email(emailInvalid).max(100, emailTooLong),
        message: z.string().min(10, messageTooShort).max(1000, messageTooLong),
      }),
    [nameTooShort, nameTooLong, emailInvalid, emailTooLong, messageTooShort, messageTooLong],
  );

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  /*const getToken = async () => {
    try {
      const res = await fetch('/api/get-token');
      if (!res.ok) {
        const errorMessage = res.status === 429 ? feedbackToken.rateLimit : feedbackToken.fail;
        toast.error(errorMessage);
        return null;
      }
      return (await res.json()).token as string;
    } catch {
      toast.error(network);
      return null;
    }
  };

  const onSubmit = handleSubmit(async (data: FormData) => {
    setLoading(true);

    try {
      const currentToken = token || (await getToken());
      if (!currentToken) {
        setLoading(false);
        return;
      }

      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const newToken = res.headers.get('X-New-Token');
        if (newToken) setToken(newToken);

        toast.success(success);
        reset();
      } else {
        toast.error(fail);
      }
    } catch {
      toast.error(network);
    } finally {
      setLoading(false);
    }
  });*/

  const onSubmit = handleSubmit(async (data: FormData) => {
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
