import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error: string | undefined;
  type?: string;
  placeholder?: string;
  defaultValue?: string | number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  error,
  type = 'text',
  placeholder = '',
  defaultValue
}) => {
  console.log(name, defaultValue);
  return (
    <div className='mb-2'>
      <label className='block text-sm font-semibold leading-6 textDark'>{label}</label>
      <div className='mt-2'>
        <input
          {...register(name, {
            valueAsNumber: type === 'number' // Parse value as number for numeric inputs
          })}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className='w-full text-black rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-primary'
        />
        {error && <p className='text-xs font-medium text-red-600 mt-1 '>{error}</p>}
      </div>
    </div>
  );
};

export default InputField;
