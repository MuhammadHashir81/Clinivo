const HowITWorks = () => {
  return (
    <section className='bg-muted py-32' id="works">
        <div className='mx-auto max-w-7xl px-6 '>
            <div className=' text-center max-w-xl mx-auto mb-16'>
                <p className='text-xs font-rm font-medium tracking-widest uppercase text-primary mb-4' >getting started</p>
                <h2 className='text-5xl font-black font-roboto leading-tight text-foreground     tracking-tight'>
                    Live in 24 hours, not 24 weeks.
                    </h2>

            </div>


            <div className="grid grid-cols-3 gap-6">
                <div className='p-8 rounded-3xl bg-card border border-border '>
                    <span 
                    className='block text-6xl font-black mb-5 font-roboto tracking-tigther text-border leading-none' >
                        01
                    </span>
                    <h3 className='text-xl font-bold mb-3 font-roboto text-foreground'>
                      Onboard in a day
                    </h3>
                    <p className='text-sm font-inter text-muted-foreground  leading-relaxed'>
                        Import your existing patient data, configure departments, and go live. Our dedicated migration team handles the heavy lifting so nothing is lost.
                    </p>

                </div>

                <div className='p-8 rounded-3xl bg-primary border border-border '>
                    <span 
                    className='block text-6xl font-black mb-5 font-roboto tracking-tigther text-border leading-none' >
                        02
                    </span>
                    <h3 className='text-xl font-bold mb-3 font-roboto text-white'>
                      Train your team
                    </h3>
                    <p className='text-sm font-inter text-white/60  leading-relaxed'>
                        Role-based interfaces mean doctors, nurses, and admin staff each see exactly what they need — with guided onboarding walkthroughs built in.
                    </p>

                </div>

                <div className='p-8 rounded-3xl bg-card border border-border '>
                    <span 
                    className='block text-6xl font-black mb-5 font-roboto tracking-tigther text-border leading-none' >
                        03
                    </span>
                    <h3 className='text-xl font-bold mb-3 font-roboto text-foreground'>
                      Operate with clarity
                    </h3>
                    <p className='text-sm font-inter text-muted-foreground  leading-relaxed'>
                        Live dashboards surface the metrics that matter most. Spot bottlenecks before they become crises and act with full context.
                    </p>

                </div>
                

            </div>

        </div>
    </section>
  )
}

export default HowITWorks
