import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { z } from "zod";
import axios from 'axios';
import { isStrongPassword } from 'validator';
import { sellerSignupRoute } from '../../../api/routes';
import useCountries from '../../../hooks/useCountries';
import { FormInputsWrapper,FormInput, FormSelectInput } from './FormComponents';

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const PersonalInfoSchema = z.object({
  first_name: z.string().min(1, 'First Name is required'),
  last_name: z.string().min(1, 'Last Name is required'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters').refine(val => isStrongPassword(val),
    { message: 'Password must include at least one capital letter, one number, and one special character' }),
  confirm_password: z.string(),
  phone: z.string().min(1, 'Phone Number is required'),
  country_id: z.string().min(1, 'Country cannot be empty'),
  state_id: z.string().min(1, 'State cannot be empty'),
  city_id: z.string().min(1, 'City cannot be empty'),
  address: z.string().min(1, 'Address is required'),
  nic: z.string().min(1, 'National Identification Number is required'),
});

const BankInfoSchema = z.object({
  bank_id: z.string().min(1, 'Bank is required'),
  iban: z.string().min(24, 'Account Number must be at least 24 characters'),
  title: z.string().min(1, 'Account Title is required'),
});

const ProfessionalInfoSchema = z.object({
  shop_name: z.string().min(1, 'Shop Name is required'),
  shop_email: z.string().email().min(1, 'Business Email is required'),
  shop_phone: z.string().min(1, 'Business Phone is required'),
  shop_address: z.string().min(1, 'Business Address is required'),
  ntn: z.string().min(1, 'National Tax Number is required'),
  stn: z.string().min(1, 'Sales Tax Number is required'),
});

const CNICSchema = z.object({
  front: z.any().transform(file => file?.[0]),
  back: z.any().transform(file => file?.[0])
});

export default function SellerForm() {
  const [step, setStep] = useState(1);
  const titles = ['Personal', 'Bank', 'Shop', 'CNIC'];

  let currentSchema;
  switch (step) {
    case 1:
      currentSchema = PersonalInfoSchema
        .refine((data) => data.password === data.confirm_password, {
          path: ['confirm_password'],
          message: 'Passwords do not match',
        });
      break
    case 2:
      currentSchema = BankInfoSchema;
      break
    case 3:
      currentSchema = ProfessionalInfoSchema;
      break
    case 4:
      currentSchema = BankInfoSchema
        .merge(PersonalInfoSchema.omit({confirm_password: true}))
        .merge(ProfessionalInfoSchema)
        .merge(CNICSchema)
        .refine(
          (data) => ACCEPTED_IMAGE_TYPES.includes(data.front?.type) && ACCEPTED_IMAGE_TYPES.includes(data.back?.type), {
            path: ['front', 'back'],
            message:
              ".jpg, .jpeg, .png and .webp files are accepted only."
          }
      )
  }
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid, isSubmitting } } = useForm({ resolver: zodResolver(currentSchema) });
  const [countryId, stateId, frontImg, backImg] = watch(['country_id', 'state_id', 'front', 'back']);

  const { countries, states, cities } = useCountries(countryId, stateId);

  function nextStep() {
    if (step === 4) return;
    if (isValid) {
      setStep(prev => prev + 1);
    }
  }

  async function onSubmit(data) {
    try {
      const { error, message } = await axios.post(sellerSignupRoute, data,
        { headers: { 'Content-Type': 'multipart/form-data' } });
      if (!error) {
        toast.success(message)
      } else {
        throw new Error(message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <section className=' max-w-screen-md mx-auto flex flex-col items-center gap-5 pb-10'>
      <div>
        <ul className='flex gap-5'>
          <li className={`steps ${step >= 1 ? 'active' : ''}`}>01</li>
          <li className={`steps ${step >= 2 ? 'active' : ''}`}>02</li>
          <li className={`steps ${step >= 3 ? 'active' : ''}`}>03</li>
          <li className={`steps ${step > 3 ? 'active' : ''}`}>04</li>
        </ul>
      </div>
      
      <div className='grow w-full border-2 bg-slate-50 pb-10'>
        <h1 className='font-bold text-3xl text-center my-5'>{titles[step - 1]}</h1>

        <form className='px-5' onSubmit={handleSubmit(onSubmit)}>

          {/* 1st step form Personal */}
          {step === 1 && <div className=''>

            <FormInputsWrapper>
              <FormInput name={'first_name'} placeHolder={'Enter Your First Name'} register={register} errors={errors} label={'First Name'} />
              <FormInput name={'last_name'} placeHolder={'Enter Your Last Name'} register={register} errors={errors} label={'Last Name'} />
            </FormInputsWrapper>

            <FormInputsWrapper>
              <FormInput type='email' name={'email'} placeHolder={'Enter Your Email'} register={register} errors={errors} label={'Email'} />
              <FormInput type='number' name={'phone'} placeHolder={'Enter Your Phone (Optional)'} register={register} errors={errors} label={'Phone'} />
            </FormInputsWrapper>

            <FormSelectInput name={'country_id'} control={control} errors={errors} label={'Country'} data={countries} placeHolder={'Select Option'} />

            <FormInputsWrapper>
              <FormSelectInput name={'state_id'} control={control} errors={errors} label={'State'} data={states} placeHolder={'Select Option'} />
              <FormSelectInput name={'city_id'} control={control} errors={errors} label={'City'} data={cities} placeHolder={'Select Option'} />
            </FormInputsWrapper>

            <FormInput name={'address'} placeHolder={'Enter Your Address'} register={register} errors={errors} label={'Address'} />
            
            <FormInput type='number' name={'nic'} placeHolder={'Enter Your Cnic Number'} register={register} errors={errors} label={'National Identification Number'} />

            <FormInputsWrapper>
              <FormInput type='password' name={'password'} placeHolder={'Enter Your Password'} register={register} errors={errors} label={'Password'} />
              <FormInput type='password' name={'confirm_password'} placeHolder={'Confirm Your Password'} register={register} errors={errors} label={'Confirm Password'} />
            </FormInputsWrapper>

          </div>}

          {/* 2nd step form Bank */}
          {step === 2 && <div>

            <FormSelectInput
              label={'Bank'}
              control={control}
              errors={errors}
              name={'bank_id'}
              placeHolder={'Selec Option'}
              data={[{ bank_id: 1, name: 'Meezan' }]} />

            <FormInput
              name={'iban'}
              placeHolder={'Enter Your IBAN Number'}
              register={register} errors={errors} label={'Account IBAN Number (24 Characters)'} />

            <FormInput name={'title'}
              placeHolder={'Confirm Your Account Title'}
              register={register} errors={errors} label={'Account Title'} />

          </div>}

          {/* 3rd step form Shop */}
          {step === 3 && <div>

            <FormInput name={'shop_name'} placeHolder={'Enter Your Shop Name'} register={register} errors={errors} label={'Shop Name'} />

            <FormInputsWrapper>
              <FormInput
                type='email' name={'shop_email'}
                placeHolder={'Enter Your Business Email'}
                register={register}
                errors={errors}
                label={'Business Email'} />
              <FormInput type='number' name={'shop_phone'}
                placeHolder={'Enter Your Business Phone #'}
                register={register}
                errors={errors}
                label={'Business Phone'} />
            </FormInputsWrapper>

            <FormInput name={'shop_address'}
              placeHolder={'Enter Your Business Address'}
              register={register}
              errors={errors}
              label={'Business Address'} />

            <FormInputsWrapper>
              <FormInput type='number' name={'ntn'} placeHolder={'Confirm Your NTN Number'} register={register} errors={errors} label={'National Tax Number'} />
              <FormInput type='number' name={'stn'} placeHolder={'Confirm Your STN Number'} register={register} errors={errors} label={'Sales Tax Number'} />
            </FormInputsWrapper>

          </div>}

          {step === 4 && <div className='space-y-10'>
            <div>
              <FormInput type='file' name={'front'} register={register} errors={errors} />
              <div className='size-64 flex justify-center w-max mx-auto mt-8'>
                <img src={frontImg?.[0] ? URL.createObjectURL(frontImg?.[0]) : 'https://vshop-react.elliptical.website/assets/front-I4GrjJbJ.png'}
                  alt={frontImg?.[0]?.name} />
              </div>
            </div>
            <div>
              <FormInput type='file' name={'back'} register={register} errors={errors} />
              <div className='size-64 flex justify-center w-max mx-auto mt-8'>
                <img src={backImg?.[0] ? URL.createObjectURL(backImg?.[0]) : 'https://vshop-react.elliptical.website/assets/back-r3Oww33K.png'}
                  alt={backImg?.[0]?.name} />
              </div>
            </div>
          </div> }

          {/* Prev and Next buttons */}
          <div className='pr-5 mt-10 flex justify-end'>
            <div className='flex gap-8'>
              <button
                onClick={() => {
                  if (step === 1) return;
                  setStep(step - 1)
                }}
                type='button'
                disabled = { step === 1 }
                className='bg-[#1E3769] px-6 py-3 rounded-md text-white disabled:bg-gray-400 disabled:cursor-not-allowed'>Prev</button>

              {step !== 4 &&
                <button
                  onClick={
                    handleSubmit(nextStep)
                  }
                  type='button'
                  className='bg-[#1E3769] px-6 py-3 rounded-md text-white'>Next</button>
              }

              {step === 4 &&
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='bg-[#1E3769] px-6 py-3 rounded-md text-white disabled:cursor-not-allowed disabled:bg-gray-400'>Submit</button>
              }
            </div>
          </div>

        </form>
      </div>
    </section>
  )
}