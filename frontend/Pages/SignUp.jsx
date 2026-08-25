import { Plus } from 'lucide-react';
import { NavLink } from 'react-router';
const SignUp = () => {
    return (
        <div className='flex items-center justify-center pt-10 bg-background'>
            <div className='flex flex-col gap-8 w-[420px]'>

                <div className='flex gap-2 items-center justify-center cursor-pointer'>
                    <div className='bg-primary w-fit px-1 py-1 rounded-lg'>
                        <Plus color='white' />
                    </div>
                    <h2 className='font-roboto font-bold tracking-tight text-xl text-foreground'>Clinivo</h2>
                </div>

                <div className='bg-card border border-border rounded-2xl shadow-sm px-10 py-10 flex flex-col gap-6'>

                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='font-inter font-bold text-2xl text-foreground tracking-tight'>Create your account</h1>
                        <p className='font-inter text-sm text-muted-foreground'>Start your 30-day free trial, no card required</p>
                    </div>

                    <form className='flex flex-col gap-4'>

                        <div className='flex flex-col gap-1.5'>
                            <label className='font-inter text-sm font-medium text-foreground'>Full name</label>
                            <input
                                type='text'
                                placeholder='Dr. Sarah Ahmed'
                                className='font-inter text-sm px-4 py-3 rounded-lg border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-ring'
                            />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='font-inter text-sm font-medium text-foreground'>Email</label>
                            <input
                                type='email'
                                placeholder='you@clinic.com'
                                className='font-inter text-sm px-4 py-3 rounded-lg border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-ring'
                            />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='font-inter text-sm font-medium text-foreground'>Password</label>
                            <input
                                type='password'
                                placeholder='••••••••'
                                className='font-inter text-sm px-4 py-3 rounded-lg border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-ring'
                            />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='font-inter text-sm font-medium text-foreground'>Confirm password</label>
                            <input
                                type='password'
                                placeholder='••••••••'
                                className='font-inter text-sm px-4 py-3 rounded-lg border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-ring'
                            />
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