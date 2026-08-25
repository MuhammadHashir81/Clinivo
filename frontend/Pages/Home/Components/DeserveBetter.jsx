import React from 'react'

const DeserveBetter = () => {
  return (
    <section>
        <div className='bg-foreground py-28 '>
            <div className='w-3xl mx-auto flex flex-col items-center'>
                <h2 className='font-roboto text-6xl font-black leading-tight mb-6 text-center'>
              <span className='text-white'> Your hospital deserves  </span>
              <span className='text-accent'> better software.</span>
                </h2>
                <p className='font-inter text-lg mb-10 text-white/90 font-light text-center'>
                    Join 2,400+ hospitals already running on Clinivo. Start your free 30-day trial — no credit card, no contracts.
                </p>
                <button className='hover:opacity-90 cursor-pointer px-8 py-4 text-base font-bold bg-accent  rounded-2xl'>
                    Start free trial
                </button>

            </div>

        </div>
    </section>
      
  )
}

export default DeserveBetter
