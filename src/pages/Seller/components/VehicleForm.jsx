import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FormInput, FormInputsWrapper, FormSelectInput, FormWrapper } from './FormComponents'
import { Controller, useForm } from 'react-hook-form'
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import useCountries from '../../../hooks/useCountries';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useVehicleMakeandModel from '../hooks/useVehicleMakeandModel';

const maxYear = new Date();
const bodyTypes = [
    { body_type_id: 1, name: 'Sedan' },
    { body_type_id: 2, name: 'SUV' },
    { body_type_id: 3, name: 'Truck' },
    { body_type_id: 4, name: 'Coupe' },
    { body_type_id: 5, name: 'Convertible' },
    { body_type_id: 6, name: 'Hatchback' },
    { body_type_id: 7, name: 'Wagon' },
    { body_type_id: 8, name: 'Van' }
];

const VehicleSchema = z.object({
    make_id: z.string(),
    model_id: z.string(),
    year: z.date().max(maxYear, 'Vehicle Model Year cannot be in future').transform(val => new Date(val).getFullYear()),
    body_type_id: z.string(),
    price: z.string(),
    mileage: z.string(),
    color: z.string().refine(value => value.split(' ').length === 1,'You can only provide one color.'),
    door: z.string(),
    country_id: z.string(),
    state_id: z.string(),
    city_id: z.string(),
    condition: z.string(),
    description: z.string(),
    insured: z.boolean().default(false),
});

export default function VehicleForm({ label = 'Add Vehicle' }) {
    const { register, handleSubmit, control, watch, trigger, formState: { errors } } = useForm({ resolver: zodResolver(VehicleSchema) });
    const [countryId, stateId, makeId, year] = watch(['country_id', 'state_id', 'make_id','year']);
    const { model, make } = useVehicleMakeandModel(makeId);
    const { countries, states, cities } = useCountries(countryId, stateId);

    useEffect(() => {
        if (year)
            trigger('year');
    }, [year]);

    function onSubmit(data) {
        console.log('Submitted data: ', data);
    }

    return (
        <FormWrapper label={label} back={true} link={'/dashboard/seller/vehicle'}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>
                <FormInputsWrapper>
                    <FormSelectInput label={'Make'} control={control} name={'make_id'} errors={errors} placeHolder={'Select Your Vehicle Make'} data={make} />
                    <FormSelectInput label={'Model'} control={control} name={'model_id'} errors={errors} placeHolder={'Select Your Vehicle Model'} data={model} />
                </FormInputsWrapper>

                <FormInputsWrapper>
                    <CalendarInput control={control} errors={errors} />
                    <FormSelectInput label={'Body Type'} control={control} name={'body_type_id'} errors={errors} placeHolder={'Select Your Vehicle Body Type'} data={bodyTypes} />
                </FormInputsWrapper>

                <FormInputsWrapper>
                    <FormInput label={'Price'} register={register} name={'price'} errors={errors} placeHolder='Enter Your Vehicle Price' type='number' />
                    <FormInput label={'Mileage'} register={register} name={'mileage'} errors={errors} placeHolder='Enter Your Vehicle Mileage' type='number' />
                </FormInputsWrapper>

                <FormInputsWrapper>
                    <FormInput label={'Color'} register={register} name={'color'} errors={errors} placeHolder='Enter Your Vehicle Color' />
                    <FormSelectInput label={'Doors'} control={control} name={'door'} errors={errors} placeHolder='Select Your Vehicle Doors' data={Array.from({ length: 5 }, (elm, index) => ({ door: index + 2, name: `${index + 2} Doors` }))} />
                </FormInputsWrapper>

                <FormInputsWrapper>
                    <FormSelectInput label={'Country'} control={control} errors={errors} name={'country_id'} placeHolder='Select Country Where Vehicle Exist' data={countries} />
                    <FormSelectInput label={'State'} control={control} errors={errors} name={'state_id'} placeHolder='Select State Where Vehicle Exist' data={states} />
                </FormInputsWrapper>

                <FormInputsWrapper>
                    <FormSelectInput label={'City'} control={control} errors={errors} name={'city_id'} placeHolder='Select City Where Vehicle Exist' data={cities} />
                    <FormSelectInput label={'Condition'} control={control} errors={errors} name={'condition'} placeHolder='Select Your Vehicle Condition' data={Array.from({length:10},(elm,indx)=>({condition:indx+1,name:indx+1}))} />
                </FormInputsWrapper>

                <div>
                    <label htmlFor="description" className='block mb-3'>Description</label>
                    <textarea {...register("description")} id="description" cols="30" rows="3" className='border border-slate-300 w-full p-2' placeholder='Enter Your Vehicle Description'></textarea>
                    {errors.description && <span className='text-red-700'>{errors.description.message}</span>}
                </div>

                <div className='space-x-2'>
                    <input type="checkbox" {...register('insured')} />
                    <label htmlFor="insured">Is Your Car Insured</label>
                </div>
                <button className='p-5 rounded-md bg-slate-300'>Submit</button>
            </form>
        </FormWrapper>
    )
    return (
        <main className='bg-white rounded-md'>
            <div className='flex justify-between items-center border-b pb-5 p-4'>
                <h1>{label}</h1>
                <Link to={'/dashboard/seller/vehicle'} className='py-2 px-3 bg-[#1E3769] text-white rounded-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--lucide" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 19l-7-7l7-7m7 7H5"></path></svg>
                </Link>
            </div>

            <div className='p-4'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>
                    <FormInputsWrapper>
                        <FormSelectInput label={'Make'} control={control} name={'make_id'} errors={errors} placeHolder={'Select Your Vehicle Make'} data={make} />
                        <FormSelectInput label={'Model'} control={control} name={'model_id'} errors={errors} placeHolder={'Select Your Vehicle Model'} data={model} />
                    </FormInputsWrapper>

                    <FormInputsWrapper>
                        <CalendarInput control={control} errors={errors} />
                        <FormSelectInput label={'Body Type'} control={control} name={'body_type_id'} errors={errors} placeHolder={'Select Your Vehicle Body Type'} data={bodyTypes} />
                    </FormInputsWrapper>

                    <FormInputsWrapper>
                        <FormInput label={'Price'} register={register} name={'price'} errors={errors} placeHolder='Enter Your Vehicle Price' type='number' />
                        <FormInput label={'Mileage'} register={register} name={'mileage'} errors={errors} placeHolder='Enter Your Vehicle Mileage' type='number' />
                    </FormInputsWrapper>

                    <FormInputsWrapper>
                        <FormInput label={'Color'} register={register} name={'color'} errors={errors} placeHolder='Enter Your Vehicle Color' />
                        <FormSelectInput label={'Doors'} control={control} name={'door'} errors={errors} placeHolder='Select Your Vehicle Doors' data={Array.from({ length: 5 }, (elm, index) => ({ door: index + 2, name: `${index + 2} Doors` }))} />
                    </FormInputsWrapper>

                    <FormInputsWrapper>
                        <FormSelectInput label={'Country'} control={control} errors={errors} name={'country_id'} placeHolder='Select Country Where Vehicle Exist' data={countries} />
                        <FormSelectInput label={'State'} control={control} errors={errors} name={'state_id'} placeHolder='Select State Where Vehicle Exist' data={states} />
                    </FormInputsWrapper>

                    <FormInputsWrapper>
                        <FormSelectInput label={'City'} control={control} errors={errors} name={'city_id'} placeHolder='Select City Where Vehicle Exist' data={cities} />
                        <FormSelectInput label={'Condition'} control={control} errors={errors} name={'condition'} placeHolder='Select Your Vehicle Condition' data={Array.from({length:10},(elm,indx)=>({condition:indx+1,name:indx+1}))} />
                    </FormInputsWrapper>

                    <div>
                        <label htmlFor="description" className='block mb-3'>Description</label>
                        <textarea {...register("description")} id="description" cols="30" rows="3" className='border border-slate-300 w-full p-2' placeholder='Enter Your Vehicle Description'></textarea>
                        {errors.description && <span className='text-red-700'>{errors.description.message}</span>}
                    </div>

                    <div className='space-x-2'>
                        <input type="checkbox" {...register('insured')} />
                        <label htmlFor="insured">Is Your Car Insured</label>
                    </div>
                    <button className='p-5 rounded-md bg-slate-300'>Submit</button>
                </form>
            </div>
        </main>
  )
}

function CalendarInput({ control, errors }) {
    return (
        <div className='flex-1 space-y-2'>
            <label htmlFor="year">Model Year</label>
            <Controller
                name='year'
                control={control}
                render={({ field }) => (
                    <Calendar
                        {...field}
                        inputId={field.name}
                        view='year'
                        placeholder='Select Vehicle Model Year'
                        dateFormat='yy'
                        className='border w-full p-2.5 rounded-md text-lg'
                        pt={{
                            panel: { className: 'bg-white drop-shadow-lg p-4 text-lg' },
                            header: { className: 'border-b pb-2' },
                            yearPicker: { className: 'pt-2' },
                            year: ({ context }) => ({
                                className: classNames(
                                    { 'p-2 hover:bg-slate-200 rounded-md': !context.selected },
                                    {'p-2 bg-slate-300 rounded-md': context.selected}
                                )
                            }),
                        }}
                    />
                )}
            />
            {errors.year && <span className='text-red-700'>{errors.year.message}</span>}
        </div>
    )
}
