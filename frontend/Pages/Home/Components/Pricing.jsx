import React from 'react'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$10',
    period: '/month',
    description: 'For solo practitioners getting off paper registers.',
    features: [
      '1 doctor account',
      'Up to 200 appointments/mo',
      'SMS reminders',
      'Basic patient records',
    ],
    highlighted: false,
  },
  {
    name: 'Clinic',
    price: '$20',
    period: '/month',
    description: 'For growing clinics with multiple doctors and staff.',
    features: [
      'Up to 5 doctor accounts',
      'Unlimited appointments',
      'SMS + WhatsApp reminders',
      'Role-based staff access',
      'Billing & invoicing',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$100',
    period: '/month',
    description: 'For established clinics that need deeper control and visibility.',
    features: [
      'Unlimited doctor accounts',
      'Advanced analytics & reports',
      'Custom roles & permissions',
      'Data export (CSV/PDF)',
      'Audit logs & activity history',
      'Custom branding (white-label)',
    ],
    highlighted: false,
  },
]

const Pricing = () => {
  return (
    <section className='bg-muted py-32' id='pricing'>
      <div className='mx-auto max-w-7xl px-6'>

        <div className='text-center max-w-xl mx-auto mb-16'>
          <p className='text-xs font-rm font-medium tracking-widest uppercase text-primary mb-4'>
            pricing
          </p>
          <h2 className='text-5xl font-black font-roboto leading-tight text-foreground tracking-tight'>
            Simple pricing that scales with you.
          </h2>
        </div>

        <div className='grid grid-cols-3 max-w-5xl mx-auto gap-6'>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-3xl border border-border flex flex-col ${
                plan.highlighted ? 'bg-primary' : 'bg-card'
              }`}
            >
              {plan.highlighted && (
                <span className='inline-block w-fit text-xs font-rm font-medium tracking-widest uppercase text-white/70 bg-white/10 px-3 py-1 rounded-full mb-4'>
                  most popular
                </span>
              )}

              <h3
                className={`text-xl font-bold font-roboto mb-2 ${
                  plan.highlighted ? 'text-white' : 'text-foreground'
                }`}
              >
                {plan.name}
              </h3>

              <p
                className={`text-sm font-inter leading-relaxed mb-6 ${
                  plan.highlighted ? 'text-white/60' : 'text-muted-foreground'
                }`}
              >
                {plan.description}
              </p>

              <div className='mb-8'>
                <span
                  className={`text-5xl font-black font-roboto tracking-tight ${
                    plan.highlighted ? 'text-white' : 'text-foreground'
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm font-inter ml-1 ${
                    plan.highlighted ? 'text-white/60' : 'text-muted-foreground'
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              <ul className='flex flex-col gap-3 mb-8 flex-1'>
                {plan.features.map((feature) => (
                  <li key={feature} className='flex items-center gap-3'>
                    <Check
                      size={16}
                      className={plan.highlighted ? 'text-white' : 'text-primary'}
                    />
                    <span
                      className={`text-sm font-inter ${
                        plan.highlighted ? 'text-white/80' : 'text-foreground'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-2xl text-sm font-inter font-medium transition ${
                  plan.highlighted
                    ? 'bg-white text-primary hover:bg-white/90'
                    : 'bg-secondary text-secondary-foreground hover:bg-border'
                }`}
              >
                Get started
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Pricing