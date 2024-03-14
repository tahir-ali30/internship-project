import { Controller } from "react-hook-form"
import { Link } from "react-router-dom"

export function FormInput({ type = 'text', name, register, errors, placeHolder = '', label }) {
    return (
        <div className='flex-1'>
            <label className='mb-2 block' htmlFor={name}>{label}</label>
            <input
                {...register(name)}
                type={type}
                name={name}
                id={name}
                placeholder={placeHolder}
                className='border p-3 w-full rounded-md'
            />
            {errors[name] && <p className='text-red-600'>{errors[name].message}</p>}
        </div>
    )
}
  
export function FormSelectInput({ name, data, errors, placeHolder, label, control }) {
    return (
        <div className='space-y-2 flex-1'>
            <label className='block' htmlFor="">{label}</label>
            <Controller name={name} control={control} render={({ field }) => (
                <select
                    {...field}
                    className='p-3 bg-transparent border w-full rounded-md disabled:cursor-not-allowed disabled:bg-[#FAFBFD]'
                    disabled={data?.length === 0}
                >
  
                    <option>{placeHolder}</option>
                    {data?.length > 0 && data.map(item => (
                        <option key={item[name]} value={item[name]}>{item.name}</option>
                    ))}
                </select>
            )} />
            {errors[name] && <p className='text-red-600'>{errors[name].message}</p>}
        </div>
    )
}
  
export function FormInputsWrapper({ children }) {
    return (
        <div className='flex items-center gap-3'>
            {children}
        </div>
    )
}

export function FormWrapper({ label, link, back, children }) {
    return (
        <main className="bg-white rounded-md">
            <div className='flex justify-between items-center border-b pb-5 p-4'>
                <h1>{label}</h1>
                {
                    <Link to={link} className='py-2 px-3 bg-[#1E3769] text-white rounded-md'>
                        {back ?
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--lucide" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 19l-7-7l7-7m7 7H5"></path></svg>
                        : Add}
                    </Link>
                }
            </div>

            <div className="p-4">
                {children}
            </div>
        </main>
    )
}
  