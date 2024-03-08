import React, { useEffect, useState } from 'react'
import OTPInput from '../components/OTPInput'
import userAuthFetch, { resendOTP } from '../lib/userAuthFetch';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function OTPPage() {
  const navigator = useNavigate();
  const [otp, setOtp] = useState('');
  const [resend, setResend] = useState(true);
  const token = localStorage.getItem('token');

  function handleTimeout() {
    setResend(true);
    setTimeout(() => {
      setResend(false);
    }, 60000)
  };

  useEffect(() => {
    handleTimeout();
  }, []);

  async function handleOtp() {
    try {
      if (otp.length > 0 && otp.length === 6) {
        const { error, message } = await userFetch('email/verification', 'POST', { otp }, token);

        if (!error) {
          toast.success(message)
          navigator('/login');
        }
        else {
          throw new Error(message);
        }
  
      } else if (!otp.length) {
        toast.warn("OTP cannot be empty");
      } else {
        toast.warn('OTP must be at least 6 characters');
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  async function handleResendOtp() {
    try {
      const { error, message, } = await toast.promise(resendOTP(token), {
        pending: 'Sending OTP',
        success: 'OTP successfully resent',
      });
      if (!error) handleTimeout();
      else throw new Error(error);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <section className='h-screen bg-slate-300'>
      <div className='h-fit pt-96 font-semibold grid justify-center items-center gap-5'>
        <h1 className='text-3xl text-center'>VERIFY YOUR EMAIL</h1>
        <div>
          <h1 className='mb-2'>Enter Your OTP</h1>
          <OTPInput otp={otp} setOtp={setOtp} />

          <button
            className='bg-white py-2 rounded-lg w-full mt-3'
            onClick={handleOtp}>Verify Email</button>

          {resend && <p className='mt-2 font-normal'>Wait 1 minute before requesting another OTP.</p>}

          <button
            onClick={handleResendOtp}
            className='bg-white px-10 py-2 rounded-lg mt-4 disabled:bg-gray-400'
            disabled = {resend}>Resend OTP</button>
        </div>
      </div>
    </section>
  )
}
