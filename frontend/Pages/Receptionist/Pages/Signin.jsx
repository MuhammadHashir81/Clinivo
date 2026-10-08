import { Plus } from 'lucide-react';
import { NavLink } from 'react-router';
import { useEffect } from 'react';
import { useForm } from "react-hook-form"
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { api } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { staffLogin } from '../../../src/store/slices/authSlice';
import { clearError } from '../../../src/store/slices/authSlice';

const Signin = () => {
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector((state) => state.auth)


        const {
        register,
        formState: { errors },
        handleSubmit,
        reset
      } = useForm()
    
      const onSubmit = async (data) => {
        const loginData = {
            ...data,
            role:'receptionist'
        }
        try {
         const result = await dispatch(staffLogin(loginData))
         console.log(result)
            
        } catch (error) {
            console.log(error)
        }


        
      }




  useEffect(()=>{

    if(success){
        toast.success(success)
        dispatch(clearError())
        reset()
        setTimeout(() => {
        window.location.href = '/receptionist'
        }, 2000);
    }
    else if (error){
     toast.error(error)
     dispatch(clearError())
    }
    
  },[error,success])

    return (
        <div className='flex items-center justify-center h-screen bg-background '>
            <Toaster/>

            <div className='flex flex-col gap-8 w-[420px]'>

                <NavLink to='/' className='flex gap-2 items-center justify-center cursor-pointer'>
                    <div className='bg-primary w-fit px-1 py-1 rounded-lg'>
                        <Plus color='white' />
                    </div>
                    <h2 className='font-roboto font-bold tracking-tight text-xl text-foreground'>Clinivo</h2>
                </NavLink>

                <div className='bg-card border border-border rounded-2xl shadow-sm px-10 py-10 flex flex-col gap-6'>

                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='font-inter font-bold text-2xl text-foreground tracking-tight'>welcome back receptionist</h1>
                        <p className='font-inter text-sm text-muted-foreground'>Sign in to your Clinivo account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                        <div className='flex flex-col gap-1.5'>
                            <label className='font-inter text-sm font-medium text-foreground'>Email</label>
                            <input
                                type='email'
                                placeholder='receptionist@gmail.com'
                                className='font-inter text-sm px-4 py-3 rounded-lg border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-ring'
                                {...register("email", { required: 'email is required' })}
                            />

                            <p className='text-red-500'>{errors.email?.message}</p>

                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <div className='flex justify-between items-center'>
                                <label className='font-inter text-sm font-medium text-foreground'>Password</label>
                            </div>
                            <input
                                type='password'
                                placeholder='••••••••'
                                className='font-inter text-sm px-4 py-3 rounded-lg border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-ring'
                                {...register("password", { required: 'password is required' })}
                            />

                            <p className='text-red-500'>{errors.password?.message}</p>

                        </div>

                        <button
                            type='submit'
                            className=
                            {`mt-2 bg-primary text-white font-bold font-inter text-sm rounded-xl px-5 py-3 shadow-sm hover:opacity-90 cursor-pointer 
                                ${loading ? 'disabled' : ''}`}
                        >
                            {
                                !loading ? 'signin' : 'signin...'
                            }
                        </button>

                    </form>

                    <p className='font-inter text-sm text-muted-foreground text-center'>
                        Did not sign up yet?{' '}
                        <a href='/admin/sign-up' className='text-primary font-semibold'>Sign up</a>
                    </p>

                </div>

            </div>
        </div>
    )
}

export default Signin