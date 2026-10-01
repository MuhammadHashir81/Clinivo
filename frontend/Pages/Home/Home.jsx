import { lazy } from 'react';
import Pricing from './Components/Pricing';
import DeserveBetter from './Components/DeserveBetter';
import Footer from './Components/Footer';
import { Plus, User } from 'lucide-react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';

const HowITWorks = lazy(() => import('./Components/HowITWorks'));
const Features = lazy(() => import('./Components/Features'));

const Home = () => {
    return (
        <div>

            <nav className='top-0 z-50 border-border sticky px-14 py-4 bg-background h-fit'>
                <div className='flex justify-between items-center'>

                    {/* Logo */}
                    <a
                        href='/'
                        className='flex gap-2 items-center cursor-pointer'
                    >
                        <div className='bg-primary w-fit px-1 py-1 rounded-lg'>
                            <Plus color='white' />
                        </div>

                        <h2 className='font-roboto font-bold tracking-tight text-xl font-foreground'>
                            Clinivo
                        </h2>
                    </a>

                    {/* Navigation */}
                    <ul className='flex gap-8 text-sm font-medium text-muted-foreground font-inter'>
                        <li>
                            <a href='#features'>Features</a>
                        </li>

                        <li>
                            <a href='#works'>How it works</a>
                        </li>

                        <li>
                            <a href='#pricing'>Pricing</a>
                        </li>

                        <li>
                            <a href='/admin/create-clinic'>Create Clinic</a>
                        </li>
                    </ul>

                    {/* Right side */}
                    <div className='flex gap-3 items-center'>

                        {/* Login Dropdown */}
                        <Menu as='div' className='relative'>

                            <MenuButton className='p-2 rounded-full hover:bg-muted cursor-pointer'>
                                <User size={21} />
                            </MenuButton>

                            <MenuItems
                                anchor='bottom end'
                                className='w-48 mt-2 origin-top-right rounded-xl border border-border bg-background p-2 shadow-lg focus:outline-none'
                            >

                                <MenuItem>
                                    <a
                                        href='/doctor'
                                        className='block px-3 py-2 text-sm rounded-lg hover:bg-muted font-inter'
                                    >
                                        doctor
                                    </a>
                                </MenuItem>

                                <MenuItem>
                                    <a
                                        href='/admin'
                                        className='block px-3 py-2 text-sm rounded-lg hover:bg-muted font-inter'
                                    >
                                        admin
                                    </a>
                                </MenuItem>

                                <MenuItem>
                                    <a
                                        href='/receptionist'
                                        className='block px-3 py-2 text-sm rounded-lg hover:bg-muted font-inter'
                                    >
                                        receptionist
                                    </a>
                                </MenuItem>

                            </MenuItems>
                        </Menu>

                        <button
                            className='text-sm font-bold font-inter rounded-xl px-5 py-2.5
                            shadow-sm bg-primary hover:opacity-90 text-white cursor-pointer'
                        >
                            Get started
                        </button>

                    </div>
                </div>
            </nav>

            <section className='flex items-center justify-center h-screen bg-foreground'>
                <div className='flex flex-col items-center justify-center w-[700px] gap-6'>

                    <h1 className='font-inter font-bold text-7xl'>
                        <p className='text-white tracking-tight'>
                            Run your hospital
                        </p>

                        <span className='text-accent tracking-tight'>
                            without the chaos
                        </span>
                    </h1>

                    <p className='text-center text-white font-inter text-lg'>
                        Clinivo connects patient intake, scheduling, billing, lab,
                        and pharmacy into one secure, intelligent platform — so your
                        team spends less time on software and more time on care.
                    </p>

                    <div>
                        <button className='bg-accent px-8 py-4 font-bold font-inter rounded-xl hover:opacity-90 cursor-pointer'>
                            Get Started Today
                        </button>
                    </div>

                </div>
            </section>

            <Features />
            <HowITWorks />
            <Pricing />
            <DeserveBetter />
            <Footer />

        </div>
    );
};

export default Home;

