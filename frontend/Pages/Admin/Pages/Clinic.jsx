import React from 'react'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { Plus } from 'lucide-react';
import { api } from '../../../services/api';

const Clinic = () => {

   const [loading,setLoading ] = useState(false)

            const {
           register,
           formState: { errors },
           handleSubmit,
           reset
         } = useForm()
       
         const onSubmit = async (data) => {
            setLoading(true)
            try {
                const result = await api.post('/clinic/create',data)
                console.log(result)
                toast.success(result.success)
                setLoading(false)
                
                

            } catch (error) {
                toast.error(error.response.data.error)
                setLoading(false)

            }
         }


   

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
                        <h1 className='font-inter font-bold text-2xl text-foreground tracking-tight'>Create Clinic</h1>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                        <div className='flex flex-col gap-1.5'>
                            <label className='font-inter text-sm font-medium text-foreground'>Clinic name</label>
                            <input
                                type='text'
                                placeholder='clinic name'
                                className='font-inter text-sm px-4 py-3 rounded-lg border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-ring'
                                {...register("name", { required: 'clinic name is required' })}
                            />

                            <p className='text-red-500'>{errors.name?.message}</p>

                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='font-inter text-sm font-medium text-foreground'>address</label>
                            <input
                                type='text'
                                placeholder='address'
                                className='font-inter text-sm px-4 py-3 rounded-lg border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-ring'
                                {...register("address", { required: 'please enter address' })}
                            />

                            <p className='text-red-500'>{errors.address?.message}</p>

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
                                !loading ? 'create' : 'create...'
                            }
                        </button>

                    </form>


                </div>

            </div>
        </div>
    )
}

export default Clinic
