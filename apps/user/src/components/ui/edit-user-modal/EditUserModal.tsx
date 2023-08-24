import React, { useState } from 'react';
import { GiCancel } from 'react-icons/gi';
import { useRecoilValue } from 'recoil';
import { editUser } from '../../../store/atoms/adminState';
import InputField from '../input/Input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { UpdateUserSchemaParams, updateUserSchema } from 'shared-types/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUser } from '../../../helpers/api-calls/admin';
import { toast } from 'react-toastify';
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EditUserModal = ({ isOpen, onClose }: ModalProps) => {
  const editUserState = useRecoilValue(editUser);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors },
    control
  } = useForm<UpdateUserSchemaParams>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: editUserState.id,
      firstName: editUserState.firstName,
      lastName: editUserState.lastName,
      email: editUserState.email
      // Add more fields as needed
    }
  });
  const onSubmit: SubmitHandler<UpdateUserSchemaParams> = (data) => {
    console.log(data);
    updateUser(data)
      .then((res) => {
        if (res) {
          toast.success(res.message);
          onClose();
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };
  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-darkMode opacity-75'></div>
      <div className='relative w-full max-w-md max-h-full'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <button
            onClick={onClose}
            className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
          >
            <GiCancel className='text-2xl textDark textLight' />
          </button>
          <div className='px-6 py-6 lg:px-8'>
            <h3 className='mb-4 text-xl font-medium textDark textLight'>Edit User Details</h3>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label='First Name'
                placeholder='Enter first name'
                name='firstName'
                register={register}
                defaultValue={editUserState.firstName} // Pre-fill value from editUserState
                error={errors.firstName?.message}
              />

              <InputField
                label='Last Name'
                placeholder='Enter last name'
                name='lastName'
                register={register}
                defaultValue={editUserState.lastName} // Pre-fill value from editUserState
                error={errors.lastName?.message}
              />

              <InputField
                label='Email'
                placeholder='Enter email'
                name='email'
                register={register}
                defaultValue={editUserState.email} // Pre-fill value from editUserState
                error={errors.email?.message}
              />
              <Controller
                name='isAdmin' // Name of the field in the form
                control={control} // The 'control' prop from useForm
                defaultValue={editUserState.isAdmin} // Set the default value based on isAdmin
                render={({ field }) => (
                  <select
                    {...field}
                    value={editUserState.isAdmin ? 'admin' : 'user'}
                    onChange={(e) => {
                      setValue('isAdmin', e.target.value === 'admin');
                    }}
                    className='w-full rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-primary'
                  >
                    <option value='user'>User</option>
                    <option value='admin'>Admin</option>
                  </select>
                )}
              />

              <div className='w-full text-center'>
                <button
                  type='submit'
                  className='w-1/2 mx-auto text-white bg-primary dark:bg-primary font-medium rounded-lg text-sm px-5 py-2.5'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
