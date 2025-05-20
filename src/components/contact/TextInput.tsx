import { FieldErrors, FieldValues, UseFormRegister, Path } from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  type?: string;
  placeholder: string;
  error?: FieldErrors<T>[keyof T];
  register: UseFormRegister<T>;
}

export default function TextInput<T extends FieldValues>({
  type = 'text',
  placeholder,
  error,
  register,
  name,
}: Props<T>) {
  return (
    <div>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`w-full border p-1  rounded-md focus:border-neutral-400 focus:outline-none ${error ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'}`}
        aria-invalid={!!error}
      />
      {error && (
        <p className=" text-red-500 text-sm" role="alert">
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
}
