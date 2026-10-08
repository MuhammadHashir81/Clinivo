import React from 'react'
import { ShieldX, ArrowLeft, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {

    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">

            <div className="w-full max-w-md text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <ShieldX
                            size={40}
                            className="text-primary"
                        />
                    </div>
                </div>

                {/* Status */}
                <p className="text-sm font-semibold text-primary mb-2">
                    ERROR 403
                </p>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-foreground tracking-tight">
                    Access Denied
                </h1>

                {/* Description */}
                <p className="mt-3 text-muted-foreground text-sm leading-6">
                    You don't have permission to access this page.
                    Please make sure you're signed in with an account
                    that has the required permissions.
                </p>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-3 mt-8">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-muted transition cursor-pointer"
                    >
                        <ArrowLeft size={17} />
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:opacity-90 transition cursor-pointer"
                    >
                        <Home size={17} />
                        Home
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Unauthorized

