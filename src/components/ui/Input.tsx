import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  type?: 'text' | 'email' | 'password' | 'textarea' | 'number';
  placeholder?: string;
  error?: FieldError | undefined;
  register: UseFormRegister<T>;
  rows?: number;
}

export default function Input<T extends FieldValues>({
  type = 'text',
  placeholder,
  error,
  register,
  name,
  rows = 3,
}: Props<T>) {
  const commonClasses = `w-full border p-1 rounded-md focus:border-neutral-400 focus:outline-none ${
    error ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'
  }`;

  if (type === 'textarea') {
    return (
      <div>
        <textarea
          {...register(name)}
          placeholder={placeholder}
          className={`${commonClasses} resize-none`}
          aria-invalid={!!error}
          rows={rows}
        />
        {error && (
          <p className="text-red-500 text-sm" role="alert">
            {error.message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={commonClasses}
        aria-invalid={!!error}
      />
      {error && (
        <p className="text-red-500 text-sm" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
