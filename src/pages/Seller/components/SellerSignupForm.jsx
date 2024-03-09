import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { z } from "zod";
import axios from 'axios';
import { isStrongPassword } from 'validator';
import { getCityRoute, getCountryRoute, getStateRoute, sellerSignupRoute } from '../../../api/routes';
import { getData, postData } from '../../../hooks/useAxios';

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
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
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
  const { register, handleSubmit, watch, formState: { errors, isValid, isSubmitting } } = useForm({ resolver: zodResolver(currentSchema) });
  const [countryId, stateId, frontImg, backImg] = watch(['country_id', 'state_id', 'front', 'back']);

  useEffect(() => {
    getData(getCountryRoute).then(data => setCountries(data.country));
  }, [])

  useEffect(() => {
    if (countryId) {
      postData(getStateRoute, { country_id: countryId }).then(data => setStates(data.state));
    }
  }, [countryId])

  useEffect(() => {
    if (stateId) {
      postData(getCityRoute, { state_id: stateId }).then(data => setCities(data.city));
    }
  }, [stateId])

  function nextStep(data) {
    if (step === 4) return;
    if (isValid) {
      setStep(prev => prev + 1);
    } else {
        throw new Error('unknown error');
      }
  }

  async function onSubmit(data) {
    try {
      const { error, message, ...response } = await axios.post(sellerSignupRoute, data,
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

        <form className='px-5 grid gap-y-5' onSubmit={handleSubmit(onSubmit)}>

          {/* 1st step form Personal */}
          {step === 1 && <div>

            <div className='formInputsContainer'>
              <div className='flex-1'>
                <label className='block'>First Name</label>
                <FormInput name={'first_name'} placeHolder={'Enter Your First Name'} register={register} errors={errors} />
                <label className='block'>Last Name</label>
                <FormInput name={'last_name'} placeHolder={'Enter Your Last Name'} register={register} errors={errors} />
              </div>
            </div>

            <div className='formInputsContainer'>
              <div className='flex-1'>
                <label className='block'>Email</label>
                <FormInput type='email' name={'email'} placeHolder={'Enter Your Email'} register={register} errors={errors} />
              </div>
              <div className='flex-1'>
                <label className='block'>Phone</label>
                <FormInput type='number' name={'phone'} placeHolder={'Enter Your Phone (Optional)'} register={register} errors={errors} />
              </div>
            </div>

            <div>
              <label className='block'>Country</label>
              <select
                {...register('country_id')}
                className='w-full p-2 my-3' name="country_id" id="country_id">

                <option value={''}>Select Option</option>
                {countries?.length > 0 && countries.map(country =>
                  <option key={country.country_id} value={country.country_id}>{country.name}</option>
                )}

              </select>
                {errors.country_id && <p className='-mt-2 text-red-700'>{errors.country_id.message}</p>}
            </div>

            <div className='formInputsContainer'>

              <div className='flex-1'>
                <label className='block'>State</label>
                <select
                  {...register('state_id')}
                  className='w-full p-2 my-3 disabled:cursor-not-allowed' name="state_id" id="state_id"
                  disabled={states?.length === 0}
                >
                  <option value={''}>Select Option</option>
                  {states?.length > 0 && states.map(state =>
                    <option key={state.state_id} value={state.state_id}>{state.name}</option>
                )}

                </select>
                {errors.state_id && <p className='-mt-2 text-red-700'>{errors.state_id.message}</p>}
              </div>

              <div className='flex-1'>
                <label className='block'>City</label>
                <select
                  {...register('city_id')}
                  className='w-full p-2 my-3 disabled:cursor-not-allowed' name="city_id" id="city_id"
                  disabled={(cities?.length === 0)}
                >

                  <option value={''}>Select Option</option>
                  {cities?.length > 0 && cities.map(city =>
                   <option key={city.city_id} value={city.city_id}>{city.name}</option>
                )}

                </select>
                {errors.city_id && <p className='-mt-2 text-red-700'>{errors.city_id.message}</p>}
              </div>

            </div>

            <div>
              <label className='block'>Address</label>
                <FormInput name={'address'} placeHolder={'Enter Your Address'} register={register} errors={errors} />
            </div>

            <div>
              <label className='block'>National Identification Number</label>
                <FormInput type='number' name={'nic'} placeHolder={'Enter Your Cnic Number'} register={register} errors={errors} />
            </div>

            <div className='formInputsContainer'>
              <div className='flex-1'>
                <label className='block'>Password</label>
                <FormInput type='password' name={'password'} placeHolder={'Enter Your Password'} register={register} errors={errors} />
              </div>
              <div className='flex-1'>
                <label className='block'>Confirm Password</label>
                <FormInput type='password' name={'confirm_password'} placeHolder={'Confirm Your Password'} register={register} errors={errors} />
              </div>
            </div>

          </div>}

          {/* 2nd step form Bank */}
          {step === 2 && <div>
            <div>
              <label className='block'>Bank</label>
              <select
                {...register('bank_id')}
                className='w-full p-2 my-3' name="bank_id" id="bank_id">
                <option value=''>Select Option</option>
                <option value="1">Meezan</option>
              </select>
                {errors.bank_id && <p className='-mt-2 text-red-700'>{errors.bank_id.message}</p>}
            </div>
            <div>
              <label className='block'>Account IBAN Number (24 Characters)</label>
                <FormInput name={'iban'} placeHolder={'Enter Your IBAN Number'} register={register} errors={errors} />
            </div>
            <div>
              <label className='block'>Account Title</label>
                <FormInput name={'title'} placeHolder={'Confirm Your Account Title'} register={register} errors={errors} />
            </div>
          </div>}

          {/* 3rd step form Shop */}
          {step === 3 && <div>
            <div>
              <label htmlFor="">Shop Name</label>
                <FormInput name={'shop_name'} placeHolder={'Enter Your Shop Name'} register={register} errors={errors} />
            </div>

            <div className='formInputsContainer'>
              <div>
                <label htmlFor="">Bussiness Email</label>
                <FormInput type='email' name={'shop_email'} placeHolder={'Enter Your Business Email'} register={register} errors={errors} />
              </div>
              <div>
                <label htmlFor="">Bussiness Phone #</label>
                <FormInput type='number' name={'shop_phone'} placeHolder={'Enter Your Business Phone #'} register={register} errors={errors} />
              </div>
            </div>

            <div>
              <label htmlFor="">Bussiness Address</label>
              <FormInput name={'shop_address'} placeHolder={'Enter Your Business Address'} register={register} errors={errors} />
            </div>

            <div className='formInputsContainer'>
              <div>
                <label htmlFor="">National Tax Number</label>
                <FormInput type='number' name={'ntn'} placeHolder={'Confirm Your NTN Number'} register={register} errors={errors} />
              </div>
              <div>
                <label htmlFor="">Sales Tax Number</label>
                <FormInput type='number' name={'stn'} placeHolder={'Confirm Your STN Number'} register={register} errors={errors} />
              </div>
            </div>

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

function FormInput({ type = 'text', name, placeHolder, register, errors }) {
  return (
    <>
      <input
        {...register(name)}
        className='formInput'
        type={type} name={name} id={name} placeholder={placeHolder} />
      {errors[name] && <p className='-mt-2 text-red-700'>{errors[name].message}</p>}
    </>
  )
}