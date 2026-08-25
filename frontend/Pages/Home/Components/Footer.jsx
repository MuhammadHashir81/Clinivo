import React from 'react'
import { Plus } from 'lucide-react';

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
  return (
    <footer className='' >
        <div className='grid grid-cols-4 gap-12 mb-12 py-14 px-6 max-w-7xl mx-auto ' >

            <div>
                    <div className='flex items-center mb-4 gap-2.5 cursor-pointer'>
                        <div className='bg-primary w-fit px-1 py-1 rounded-lg'>
                            <Plus color='white' />
                            </div>
                        <h2
                            className='font-roboto font-bold tracking-tight text-xl font-foreground '>Clinivo</h2>
                            
                    </div>
                    <p className='text-sm leading-relaxed text-muted-foreground max-w-xs font-inter'>
                                The complete hospital management platform built for modern healthcare operations.
                            </p>
            </div>

            <div className=''>
                <p className='text-xs font-bold tracking-widest font-rm uppercase mb-4'>
                    product
                </p>
                
                    <ul>
                    <li>
                        <a href="" className='text-muted-foreground text-sm font-inter'>Features</a>
                    </li>
                    <li>
                        <a href="" className='text-muted-foreground text-sm font-inter'>Pricing</a>
                    </li>
                    <li>
                        <a href="" className='text-muted-foreground text-sm font-inter'>Changelog</a>
                    </li>
                    <li>
                        <a href="" className='text-muted-foreground text-sm font-inter'>Roadmap</a>
                    </li>
                </ul>
            </div>

            <div className=''>
                <p className='text-xs font-bold tracking-widest font-rm uppercase mb-4'>
                    Company
                </p>
                
                    <ul>
                    <li>
                        <a href="" className='text-muted-foreground text-sm font-inter'>About</a>
                    </li>
                    <li>
                        <a href="" className='text-muted-foreground text-sm font-inter'>Blog</a>
                    </li>
                    <li>
                        <a href="" className='text-muted-foreground text-sm font-inter'>Careers</a>
                    </li>
                    <li>
                        <a href="" className='text-muted-foreground text-sm font-inter'>Contact</a>
                    </li>
                </ul>
            </div>

            
            <div className=''>
                <p className='text-xs font-bold tracking-widest font-rm uppercase mb-4'>
                    Support
                </p>
                
                    <ul>
                    <li>
                        <a href="" className='text-muted-foreground text-sm font-inter'>Documentation</a>
                    </li>
                    <li>
                        <a href="" className='text-muted-foreground text-sm font-inter'>Status</a>
                    </li>
                    <li>
                        <a href="" className='text-muted-foreground text-sm font-inter'>Contact</a>
                    </li>
                    <li>
                        <a href="" className='text-muted-foreground text-sm font-inter'>Security</a>
                    </li>
                </ul>
            </div>


            




        </div>

        <div className='py-14 flex justify-between gap-4 pt-8 border-t border-border  w-full max-w-7xl mx-auto'>
                <p 
                className='text-xs font-inter text-muted-foreground'>
                    &copy; {year} Clinivo Technologies, Inc. All rights reserved.

                </p>
                <div className='flex gap-2.5'>

                <p className='text-xs font-inter text-muted-foreground'>Privacy Policy</p>
                <p className='text-xs font-inter text-muted-foreground'>Terms of Service</p>
                </div>
            </div>
      
    </footer>
  )
}

export default Footer
