import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export default function FormField({ label, name, error, required, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
        {label}{required && ' *'}
      </label>
      {children}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
