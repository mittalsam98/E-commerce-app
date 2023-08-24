import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/ui/input/Input';
import { signin } from '../../helpers/api-calls/auth';
import { SignInParams, loginSchema } from 'shared-types/index';
import { setApiErrors } from '../../helpers/utils/utilsFunctions';
import { authTokenState, userState } from '../../store/atoms/userState';
import { setToken } from '../../helpers/utils/localstorage';

export default function Login() {
  const setUserState = useSetRecoilState(userState);
  const setAuthToken = useSetRecoilState(authTokenState);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<SignInParams>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<SignInParams> = async (data) => {
    setLoading(true);
    try {
      let res = await signin(data);
      if (res) {
        toast.success(res.message);
        setAuthToken(res.token);
        setToken(res.token);
        setUserState({ user: res.user, isAdmin: res.user.isAdmin });
        navigate('/');
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof AxiosError) {
        const apiErrors = err.response?.data;
        setApiErrors(setError, apiErrors);
      }
    }
  };

  return (
    <div className='flex justify-center items-center dark:text-lightColor mt-[77px]'>
      <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
        <div className=''>
          <h2 className='mt-6 text-center text-3xl font-bold textDark'>Sign in to your account</h2>
        </div>

        <div className='m-10'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <InputField
                label='Email address'
                name='email'
                register={register}
                error={errors.email?.message}
              />
              <InputField
                label='Password'
                name='password'
                register={register}
                error={errors.password?.message}
              />
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md text-white bg-primary px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-400'>
            Not a user?
            <span
              className='font-semibold leading-6 ml-1 text-indigo-600 textDark hover:text-primary'
              onClick={handleRegister}
            >
              SignUp Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
