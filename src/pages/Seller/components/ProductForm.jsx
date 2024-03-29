import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { z } from 'zod'
import 'react-quill/dist/quill.snow.css';
import { getBrand, getSubcategory, sellerGetCategories } from '../../../api/routes';
import { Link } from 'react-router-dom';
import { Chips } from 'primereact/chips';
import { FormInput, FormInputsWrapper, FormSelectInput } from './FormComponents';
import useFetchCategories from '../../../hooks/useFetchCategories';
import useFetchSubCategories from '../../../hooks/useFetchSubCategories';
import useFetchBrands from '../../../hooks/useFetchBrands';

const ProductSchema = z.object({
  category_id: z.number().or(z.string()).transform(val => parseInt(val)),
  subcategory_id: z.number().or(z.string()).transform(val => parseInt(val)),
  brand_id: z.number().or(z.string()).default('1').transform(val => parseInt(val)),
  name: z.string().min(1,'Name is required'),
  color: z.array(z.string()),
  size: z.array(z.string()),
  price: z.number().or(z.string()).transform(val => parseInt(val)),
  keyword: z.string().min(1,'Keywords is required'),
  redirect_url: z.string().min(1,'Redirect Url is required'),
  description: z.string().min(1,'Description is required'),
  specification: z.string().min(1,'Specifications is required'),
  feature: z.string().min(1,'Features is required'),
}).passthrough();

export default function ProductForm({ details, label, onSubmit }) {
  const { categories } = useFetchCategories(sellerGetCategories);
  const { subCategories, fetchSubCategories } = useFetchSubCategories();
  const { brands, fetchBrands } = useFetchBrands();

  const { register, handleSubmit, watch, control, reset, getValues, formState: { errors } } = useForm({
    resolver: zodResolver(ProductSchema)
  });

  const [categoryId] = watch(['category_id']);

  useEffect(() => {
    if (!categoryId) {
      reset(details);
    }
    if (categoryId) {
      fetchSubCategories(categoryId);
      fetchBrands(categoryId);
    }
  }, [categoryId])

  return (
    <main className='bg-white rounded-md'>
      <div className='flex justify-between items-center border-b pb-5 p-4'>
        <h1>{label}</h1>
        <Link to={'/dashboard/seller/products'} className='py-2 px-3 bg-[#1E3769] text-white rounded-md'>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--lucide" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 19l-7-7l7-7m7 7H5"></path></svg>
        </Link>
      </div>

      <div className='p-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>

          <FormInputsWrapper>
            <FormSelectInput
              name={'category_id'}
              register={register}
              errors={errors}
              placeHolder={'Select Your Product Category'}
              label={'Category'}
              data={categories}
              control={control}
            />
            <FormSelectInput
              name={'subcategory_id'}
              register={register}
              errors={errors}
              placeHolder={'Select Your Sub Category'}
              label={'Sub Category'}
              data={subCategories}
              control={control}
            />
          </FormInputsWrapper>

          <FormInputsWrapper>
            <FormSelectInput
              name={'brand_id'}
              register={register}
              errors={errors}
              placeHolder={'Select Your Product Brand (Optional)'}
              label={'Brand'}
              data={brands}
              control={control}
            />
            <FormInput name={'name'} register={register} errors={errors} placeHolder={'Enter Your Product Name'} label={'Name'} />
          </FormInputsWrapper>

          <FormInputsWrapper>
            <div className='space-y-2 flex-1'>
              <label className='block' htmlFor="">Color</label>
              <Controller
                name='color'
                control={control}
                render={({ field }) =>
                  <Chips
                    id={field.name}
                    name='color'
                    value={field?.value}
                    className='p-1.'
                    pt={{
                      root: { className: 'border p-3 w-full rounded-md' },
                      container: { className: 'w-full space-x-2' },
                      token: { className: 'bg-[#eef2ff] py-1.5 px-2 rounded-full flex gap-1' },
                      label: { className: 'text-xs' }
                    }}
                    onChange={(e) => field.onChange(e.value)}
                  />}
              />
              {errors.color && <p className='text-red-700'>{errors.color.message}</p> }
            </div>
            <div className='space-y-2 flex-1'>
              <label className='block' htmlFor="">Size</label>
              <Controller
                name='size'
                control={control}
                render={({ field }) =>
                  <Chips
                    id={field.name}
                    name='size'
                    value={field?.value}
                    pt={{
                      root: { className: 'border p-3 w-full rounded-md' },
                      container: { className: 'w-full space-x-2' },
                      token: { className: 'bg-[#eef2ff] py-1.5 px-2 rounded-full flex gap-1' },
                      label: { className: 'text-xs' }
                    }}
                    onChange={(e) => field.onChange(e.value)} />}
              />
              {errors.size && <p className='text-red-700'>{errors.size.message}</p> }
            </div>
          </FormInputsWrapper>

          <FormInputsWrapper>
            <FormInput type='number' name={'price'} register={register} errors={errors} placeHolder={'Enter Your Product Price'} label={'Price'} />
            <FormInput name={'keyword'} register={register} errors={errors} placeHolder={'Enter Your Product Keywords'} label={'Keywords (Space Between Each Keyword)'} />
          </FormInputsWrapper>

          <div>
            <FormInput type='url' name={'redirect_url'} register={register} errors={errors} placeHolder={'Enter Your Product Redirect URL'} label={'Redirect URL'} />
            <p className='text-xs mt-1 text-[#AFC0D6]'>Example: https://example.com/product/mobile</p>
          </div>

          <div className='space-y-2'>
            <label htmlFor="" className='block'>Description</label>
            <textarea
              {...register('description')}
              className='border rounded-md w-full p-2'
              placeholder='Enter Your Product Description'
              name="description" id="" rows="5"></textarea>
          </div>

          <div>
            <label className='block mb-2.5' htmlFor="">Specification</label>
            <Controller
              control={control}
              name='specification'
              defaultValue={''}
              render={({ field }) => <ReactQuill {...field} id='specification' theme='snow' />} />
            {errors.specification && <p className='text-red-600'>{errors.specification.message}</p>}
          </div>

          <div>
            <label className='block mb-2.5' htmlFor="">Feature</label>
            <Controller
              control={control}
              name='feature'
              defaultValue={''}
              render={({ field }) => <ReactQuill {...field} id='feature' theme='snow' />} />
            {errors.feature && <p className='text-red-600'>{errors.feature.message}</p>}
          </div>

          <div className='space-x-4'>
            <button type="submit" className='p-3 bg-[#1E3769] text-white rounded-md'>{label === 'Add' ? 'Submit' : 'Update'}</button>
            <button type='button' className='p-3 bg-[#1E3769] text-white rounded-md' onClick={() => console.log(getValues())}>Show</button>
          </div>

        </form>
      </div>
    </main>
  )
}

