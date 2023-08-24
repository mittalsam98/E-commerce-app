import React, { ChangeEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ImCancelCircle } from 'react-icons/im';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { ProductParams, productSchema } from 'shared-types/index';
import { createProduct } from '../../helpers/api-calls/admin';
import InputField from '../ui/input/Input';
import { setApiErrors } from '../../helpers/utils/utilsFunctions';
import FileInput from '../ui/input/FileInput';
import CircleLoading from '../loading/Loading';

export default function AddProduct() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<ProductParams>({ resolver: zodResolver(productSchema) });

  const onSubmit: SubmitHandler<ProductParams> = (data) => {
    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('imgUrl', file);
    });
    formData.append('data', JSON.stringify(data));
    createProduct(formData)
      .then((res) => {
        setLoading(false);
        toast.success(res.message);
        navigate('/shop');
      })
      .catch((err) => {
        setLoading(false);
        if (err instanceof AxiosError) {
          const apiErrors = err.response?.data;
          setApiErrors(setError, apiErrors);
        }
      });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
  };
  const removeImage = (index: number) => {
    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = [...prevSelectedFiles];
      newSelectedFiles.splice(index, 1);
      return newSelectedFiles;
    });
  };

  console.log(errors);
  return (
    <div className='px-8 max-w-[80rem] mx-auto sm:my-8 w-full'>
      <h1 className='title my-12'>{'Add Product'}</h1>
      <div className='m-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputField
              label='Product Name'
              placeholder='Enter the product title'
              name='name'
              register={register}
              error={errors.name?.message}
            />
            <InputField
              label='Price'
              name='price'
              placeholder='Enter the product price'
              type='number'
              register={register}
              error={errors.price?.message}
            />
            <InputField
              label='Count in Stock'
              placeholder='Enter the stock count'
              type='number'
              name='countInStock'
              register={register}
              error={errors.countInStock?.message}
            />
            <div className='mb-2'>
              <label className='block text-sm font-semibold leading-6 textDark'>
                {'Description'}
              </label>
              <div className='mt-2'>
                <textarea
                  id='Description'
                  rows={4}
                  {...register('description')}
                  className='w-full text-black rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-primary'
                  placeholder='Enter more detail'
                ></textarea>

                {errors && (
                  <p className='text-xs font-medium text-red-600 mt-1 '>
                    {errors.description?.message}
                  </p>
                )}
              </div>
            </div>{' '}
            <div className='mb-2'>
              <label className='block text-sm font-semibold leading-6 textDark'>
                {'Upload Photos'}
              </label>
            </div>
            <FileInput>
              <input
                onChange={handleFileChange}
                multiple
                id='example5'
                type='file'
                className='sr-only'
              />
            </FileInput>
            {selectedFiles.map((file, index) => {
              return (
                <div className='flex items-center text-gray-600 font-medium textDark pt-1 mr-3'>
                  {file.name}
                  <span>
                    <ImCancelCircle
                      onClick={() => removeImage(index)}
                      className='ml-2 text-red-400'
                    />
                  </span>
                </div>
              );
            })}
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md text-white bg-primary px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      {loading && <CircleLoading showFull={true} />}
    </div>
  );
}
