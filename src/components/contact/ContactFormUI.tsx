import Button from '@/components/ui/Button';
import { ContactFormI } from '@/types/dictionary';
import { FieldError, FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import Input from '@/components/ui/Input';

interface ContactFormUIProps<T extends FieldValues> {
  form: ContactFormI;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  onSubmit: () => void;
  loading: boolean;
}

export default function ContactFormUI<T extends FieldValues>({
  form,
  onSubmit,
  register,
  errors,
  loading,
}: ContactFormUIProps<T>) {
  const {
    titleForm,
    subtitleForm,
    messagePlaceholderForm,
    emailPlaceholderForm,
    submitForm,
    namePlaceholderForm,
    sendingForm,
  } = form;
  return (
    <div
      className={
        'rounded-lg border shadow-sm border-gray-100 dark:border-gray-800 flex flex-col justify-between h-full'
      }
    >
      <div className={'flex flex-col space-y-1.5 p-6'}>
        <h3 className={'text-2xl font-semibold leading-none tracking-tight'}>{titleForm}</h3>
        <p className={'text-sm text-muted-foreground'}>{subtitleForm}</p>
      </div>
      <div className={'p-6 pt-0 h-full space-y-4'}>
        <form onSubmit={onSubmit} className="flex flex-col h-full justify-between gap-2">
          <Input
            name={'name' as Path<T>}
            type="text"
            placeholder={namePlaceholderForm}
            register={register}
            error={errors?.name as FieldError | undefined}
          />

          <Input
            name={'email' as Path<T>}
            type="email"
            placeholder={emailPlaceholderForm}
            register={register}
            error={errors?.email as FieldError | undefined}
          />

          <Input
            name={'message' as Path<T>}
            type="textarea"
            placeholder={messagePlaceholderForm}
            register={register}
            error={errors?.message as FieldError | undefined}
          />
          <Button type="submit" disabled={loading} aria-busy={loading} variant={'reverseColor'}>
            {loading ? sendingForm : submitForm}
          </Button>
        </form>
      </div>
    </div>
  );
}
