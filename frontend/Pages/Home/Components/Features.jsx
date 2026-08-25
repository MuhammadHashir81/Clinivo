import { CalendarCheck2 } from 'lucide-react';
import { ChartNoAxesCombined } from 'lucide-react';
import { UserSearch } from 'lucide-react'

const Features = () => {
    return (
        <div className='' id='features'>
            <section className='max-w-7xl px-6 py-32 '>
                <div className='text-center max-w-2xl mx-auto mb-16'>

                    <p className='text-primary mx-auto font-rm text-xs font-medium tracking-widest uppercase mb-4'>
                        platform capabilities
                    </p>
                    <h2 className='font-roboto text-5xl tracking-tight leading-tight font-black mb-5  text-foreground'>Everything a hospital actually needs</h2>
                    <p className='font-inter text-muted-foreground leading-relaxed text-base'>
                        Not a collection of disconnected modules — one unified system where every workflow informs the next and nothing falls through the gaps.
                    </p>
                </div>


                {/* cards */}

                <div className='grid grid-cols-3 gap-5'>
                    <div className='p-7 rounded-2xl border border-border bg-card'>
                        <div className='flex items-center justify-between mb-5'>
                            <div className='w-11 h-11 bg-muted flex items-center justify-center rounded-xl'>
                                <UserSearch color='#0E7A4F' />
                            </div>
                            <div>
                                <span className='text-[10px] font-rm font-medium px-2.5 py-1 rounded-full text-primary bg-secondary'>core</span>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-base font-bold text-foreground font-inter mb-2'>
                                Doctor Discovery & Booking
                            </h3>
                            <p className='leading-relaxed text-sm font-inter text-muted-foreground'>
                                Patients browse doctors by specialization and availability, then book a slot directly — no phone calls, no waiting on hold.
                            </p>
                        </div>
                    </div>

                    <div className='p-7 rounded-2xl border border-border bg-card'>
                        <div className='flex items-center justify-between mb-5'>
                            <div className='w-11 h-11 bg-muted flex items-center justify-center rounded-xl'>
                                <CalendarCheck2 color='#0E7A4F' />
                            </div>
                            <div>
                                <span className='text-[10px] font-rm font-medium px-2.5 py-1 rounded-full text-primary bg-secondary'>schedule</span>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-base font-bold text-foreground font-inter mb-2'>
                                Smart Scheduling
                            </h3>
                            <p className='leading-relaxed text-sm font-inter text-muted-foreground'>
                                Conflict-free slot management with automated SMS/WhatsApp reminders that cut down no-shows before they happen.
                            </p>
                        </div>
                    </div>

                    <div className='p-7 rounded-2xl border border-border bg-card'>
                        <div className='flex items-center justify-between mb-5'>
                            <div className='w-11 h-11 bg-muted flex items-center justify-center rounded-xl'>
                                <ChartNoAxesCombined color='#0E7A4F' />
                            </div>
                            <div>
                                <span className='text-[10px] font-rm font-medium px-2.5 py-1 rounded-full text-primary bg-secondary'>Analytics & Reporting</span>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-base font-bold text-foreground font-inter mb-2'>
                                Role-Based Dashboards
                            </h3>
                            <p className='leading-relaxed text-sm font-inter text-muted-foreground'>
                                Admins track revenue and doctor performance, receptionists manage the daily check-in queue — each role sees exactly what it needs.
                            </p>
                        </div>
                    </div>
                </div>
                
            </section>

        </div>
    )
}

export default Features
