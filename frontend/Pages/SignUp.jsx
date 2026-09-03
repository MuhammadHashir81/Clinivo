import { Plus } from 'lucide-react';
import { NavLink } from 'react-router';
import { useForm } from "react-hook-form"
import { clearError, signUp } from '../src/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const SignUp = () => {
    const dispatch = useDispatch()

    const { success ,error } = useSelector(state => state.auth)
    console.log(success,error)

    
    
     const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = async (data) => {
    console.log('this is data')
     dispatch(signUp(data))
  }

  useEffect(()=>{

    if(success){
        toast.success(success)
        dispatch(clearError())
        setTimeout(() => {
        window.location.href = '/sign-in'
        }, 2000);
    }
    else if (error){
     toast.error(error)
     dispatch(clearError())
    }
    
  },[error,success])


    
    return (
        <div className='flex items-center justify-center pt-10 bg-background'>
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
                        <h1 className='font-inter font-bold text-2xl text-foreground tracking-tight'>Create your account</h1>
                        <p className='font-inter text-sm text-muted-foreground'>Start your 30-day free trial, no card required</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                        <div className='flex flex-col gap-1.5'>
                            <label className='font-inter text-sm font-medium text-foreground'>Full name</label>
                            <input
                                type='text'
                                placeholder='Dr. Afaque'
                                className='font-inter text-sm px-4 py-3 rounded-lg border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-ring'
                            {...register("name", { required: 'name is required' })}

                            />
                            <p className='text-red-500'>{errors.name?.message}</p>
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='font-inter text-sm font-medium text-foreground'>Email</label>
                            <input
                                type='email'
                                placeholder='you@gmail.com'
                                className='font-inter text-sm px-4 py-3 rounded-lg border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-ring'
                            {...register("email", { required: 'email is required' })}
                            />
                            <p className='text-red-500'>{errors.email?.message}</p>

                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='font-inter text-sm font-medium text-foreground'>Password</label>
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
                            className='mt-2 bg-primary text-white font-bold font-inter text-sm rounded-xl px-5 py-3 shadow-sm hover:opacity-90 cursor-pointer'
                        >
                            Create account
                        </button>

                    </form>

                    <p className='font-inter text-sm text-muted-foreground text-center'>
                        Already have an account?{' '}
                        <NavLink to='/sign-in' className='text-primary font-semibold'>Sign in</NavLink>
                    </p>

                </div>

            </div>
        </div>
    )
}

export default SignUp