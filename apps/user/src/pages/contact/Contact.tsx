import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupParams, signupSchema } from 'shared-types/index';
import InputField from '../../components/ui/input/Input';

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupParams>({ resolver: zodResolver(signupSchema) });
  const onSubmit: SubmitHandler<SignupParams> = (data) => {
    // TODO - Add the functionality here
    console.log(data);
  };
  console.log(errors);
  return (
    <div className='px-8 max-w-[40rem] mx-auto sm:my-8 w-full'>
      <h1 className='title my-12'>{'WE’D LOVE TO HEAR FROM YOU'}</h1>
      <div className='m-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputField
              label='Your Full Name'
              name='firstName'
              register={register}
              error={errors.firstName?.message}
            />
            <InputField
              label='Your Email Address'
              name='lastName'
              register={register}
              error={errors.lastName?.message}
            />
            <InputField
              label='Your Query subject'
              name='email'
              register={register}
              error={errors.email?.message}
            />
            <div className='mb-2'>
              <label className='block text-sm font-semibold leading-6 textDark'>
                {'Explain your query in little more details'}
              </label>
              <div className='mt-2'>
                <textarea className='w-full text-black rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-primary' />
              </div>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md text-white bg-primary px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
