import Modal from '@mui/material/Modal';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import {
    CalendarDays,
    Hourglass,
    UserRound,
    CalendarPlus,
    UserCheck,
    Search,
    X,
    Ban,
    Phone,
    ClipboardList,
    Stethoscope,
} from 'lucide-react';
import { api } from '../../services/api';
import { useEffect } from 'react';

/* -------------------------------------------------------------------------- */
/*  Display config (presentation only)                                         */
/* -------------------------------------------------------------------------- */

const STATUS_CONFIG = {
    waiting: { label: 'Waiting', className: 'bg-amber-100 text-amber-700' },
    completed: { label: 'Completed', className: 'bg-green-100 text-green-700' },
    cancelled: { label: 'Cancelled', className: 'bg-muted text-muted-foreground line-through' },
};



const AVAILABILITY_CONFIG = {
    available: { label: 'Available', dot: 'bg-green-500' },
    break: { label: 'On break', dot: 'bg-amber-500' },
    off: { label: 'Off duty', dot: 'bg-red-500' },
};


const GENDER = [
    {
        id: 1,
        gender: 'male',
    },
    {
        id: 2,
        gender: 'female',
    },
    {
        id: 3,
        gender: 'other',
    },
]

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const inputClass =
    'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';


const formatPKR = (amount) => `Rs ${Number(amount || 0).toLocaleString('en-PK')}`;

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
};




/* -------------------------------------------------------------------------- */
/*  Shared UI                                                                  */
/* -------------------------------------------------------------------------- */

const Field = ({ label, htmlFor, children }) => (
    <div>
        <label className="mb-1.5 block text-sm font-medium text-card-foreground" htmlFor={htmlFor}>
            {label}
        </label>
        {children}
    </div>
);




/* -------------------------------------------------------------------------- */
/*  Booking modal (appointment details + payment in one place)                 */
/* -------------------------------------------------------------------------- */
const BookingModal = ({ doctors, open, onClose, onSubmit, isSubmitting, submitError, onDoctorSearch }) => {
    const [form, setForm] = useState({ name: '', phone: '', doctorId: '', gender: 'male' });


    useEffect(() => {

        if (open) setForm({ name: '', phone: '', doctorId: doctors[0]?._id || '', gender: 'male' });
        onDoctorSearch('')

    }, [open, onDoctorSearch]);



    const handleSubmit = (event) => {
        event.preventDefault();
        const doctor = doctors.find((item) => item._id === form.doctorId);
        if (doctor) onSubmit({ name: form.name.trim(), phone: form.phone.trim(), gender: form.gender, doctorId: doctor._id, doctorName: doctor.name });
    };



    return (
        <Modal
            open={open}
            onClose={onClose}
            className="flex items-center justify-center p-4"
        >
            <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-border bg-card outline-none">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-border p-5">
                    <div>
                        <h2 id="booking-modal-title" className="font-semibold text-card-foreground">
                            New appointment
                        </h2>
                        <p id="booking-modal-description" className="mt-1 text-sm text-muted-foreground">
                            Book an appointment and receive payment.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="cursor-pointer rounded-lg p-2 text-muted-foreground hover:bg-muted"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-5">
                    <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Patient name" htmlFor="bk-name">
                                <input
                                    id="bk-name"
                                    placeholder="e.g. Ali Khan"
                                    className={inputClass}
                                    value={form.name}
                                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                                    required

                                />
                            </Field>
                            <Field label="Mobile number" htmlFor="bk-phone">
                                <input
                                    id="bk-phone"
                                    placeholder="0300-1234567"
                                    inputMode="tel"
                                    className={inputClass}
                                    value={form.phone}
                                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                                    required
                                />
                            </Field>
                        </div>

                        <div className="grid gap-4 grid-cols-2">

                            <Field label="Doctor" htmlFor="bk-doctor">
                                <Autocomplete
                                    options={doctors}
                                    value={doctors.find((d) => d._id === form.doctorId) || null}
                                    onInputChange={(event, value, reason) => {
                                        if (reason === 'input' || reason === 'clear') {
                                            onDoctorSearch(value);
                                        }
                                    }}
                                    onChange={(event, doctor) =>
                                        setForm({ ...form, doctorId: doctor?._id || '' })
                                    }
                                    getOptionLabel={(doctor) =>
                                        `${doctor.name} — ${doctor.specialization}`
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Search doctor"
                                            size="small"

                                        />
                                    )}
                                />
                            </Field>

                            <Field label="Gender" htmlFor="bk-gender">
                                <select id='bk-gender' className={inputClass} value={form.gender} onChange={(event) => setForm({ ...form, gender: event.target.value })}>

                                    {
                                        GENDER.map((g) => (
                                            <option key={g.id}>
                                                {g.gender}
                                            </option>

                                        ))

                                    }

                                </select>

                            </Field>
                        </div>



                        {submitError && <p role="alert" className="text-sm text-red-600">{submitError}</p>}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t border-border p-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-card-foreground hover:bg-muted"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || doctors.length === 0}
                            className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                        >
                            {isSubmitting ? 'Booking...' : 'Book appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};



const Receptionist = () => {
    /* Simple modal state: true opens the booking modal, false closes it */
    const [showBooking, setShowBooking] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingError, setBookingError] = useState('');
    const [receptionistName, setReceptionistName] = useState('Sarah');
    const [statCards, setStatCards] = useState([
        { title: "Today's Appointments", value: 12, icon: CalendarDays },
        { title: 'Waiting Now', value: 5, icon: Hourglass },
    ]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [page, setPage] = useState(1)
    const limit = 10
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [totalPages, setTotalPages] = useState(0)
    const [totalAppointments, setTotalAppointments] = useState(0)
    const [doctorSearch, setDoctorSearch] = useState('');


    const [waitingQueue, setWaitingQueue] = useState([
        { id: 'a1', token: 101, patient: 'Ali Khan', doctorName: 'Dr. Ayesha Khan', waitMinutes: 10 },
        { id: 'a2', token: 102, patient: 'Sara Malik', doctorName: 'Dr. Bilal Ahmed', waitMinutes: 5 },
    ]);


    const dateLabel = new Date().toLocaleDateString('en-PK', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });



    // get all doctors
    const getAllDoctors = async () => {
        try {
            const response = await api.get(`/staff/get-all/doctors?page=${page}&limit=${limit}&search=${doctorSearch}`);
            setDoctors(response.doctors)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            getAllDoctors()

        }, 500);

        return () => clearTimeout(timer)

    }, [doctorSearch])



    // appointment api call
    const handleAppointment = async (appointmentData) => {
        setIsBooking(true);
        setBookingError('');
        try {
            const response = await api.post('/receptionist/appointment/create', appointmentData);
            handleGetAllAppointments()
            console.log('Appointment booked:', response);


            setShowBooking(false);
        } catch (error) {
            setBookingError(error.response?.data?.message || error.response?.data?.error || 'Could not book the appointment. Please try again.');
        } finally {
            setIsBooking(false);
        }
    }

    // get all appointments
    const handleGetAllAppointments = async () => {
        try {
            const response = await api.get(`/receptionist/appointment/get/all?page=${page}&limit=${limit}&search=${debouncedSearch}`)

            console.log(response.appointments)

            setAppointments(response.appointments)
            setTotalPages(response.totalPages)
            setTotalAppointments(response.totalAppointments)


            setStatCards([
                {
                    title: "Today's Appointments",
                    value: response.totalAppointments,
                    icon: CalendarDays
                },
                {
                    title: "Waiting Now",
                    value: response.getWaitingStatus,
                    icon: CalendarDays
                },
            ])


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetAllAppointments()
    }, [debouncedSearch, page])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);

    }, [search]);

    const handleLogout = async () => {
        try {
            const result = await api.post('/auth/logout')
            console.log(result)
            window.location.reload()

        } catch (error) {
            console.log(error)
        }
    }

    // previous and next page 

    const handlePreviousPage = () => {
        console.log('fsdf')
        setPage((prev) => prev - 1)

    }


    const handleNextPage = () => {
        setPage((prev) => prev + 1)
    }


    return (
        <div className="min-h-screen bg-background p-6 font-inter">
            {/* Header */}
            <div className="mb-8 flex gap-4 flex-row items-start justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <ClipboardList size={24} className="text-primary" />
                        <h1 className="text-2xl font-semibold text-foreground">
                            {getGreeting()}, {receptionistName}
                        </h1>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {dateLabel} · Manage arrivals and bookings for today.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setShowBooking(true)}
                        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer "
                    >
                        <CalendarPlus size={16} />
                        New appointment
                    </button>
                    <button onClick={handleLogout}
                        className='text-sm font-primary cursor-pointer border-border rounded-lg px-3 bg-background '>logout</button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.title} className="rounded-xl border border-border bg-card p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    <h2 className="mt-2 text-2xl font-semibold text-card-foreground">{stat.value}</h2>
                                </div>
                                <div className="rounded-lg bg-secondary p-3">
                                    <Icon size={22} className="text-primary" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="mt-6 grid  gap-6 grid-cols-3">
                {/* Today's appointments */}
                <div className="rounded-xl border border-border bg-card col-span-2">
                    <div className="border-b border-border p-5">
                        <h2 className="font-semibold text-card-foreground">Today's Appointments</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Check patients in as they arrive.
                        </p>
                    </div>

                    <div className="space-y-3 border-b border-border p-5">
                        <div className="flex  gap-3 flex-row">
                            <div className="relative flex-1">
                                <Search
                                    size={16}
                                    className=" absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <input
                                    placeholder="Search by patient name or phone"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-lg border outline-none border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground  focus:border-primary 
                                    focus:ring-2 focus:ring-primary/10"
                                />
                            </div>

                            <select
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                onChange={(e) => setSearch(e.target.value)}
                            >
                                <option value="">All doctors</option>

                                {doctors.map((d) => (
                                    <option
                                        key={d._id}
                                        value={d.name}
                                    >

                                        {d.name}
                                    </option>
                                ))}
                            </select>

                        </div>

                    </div>

                    <div className="divide-y divide-border ">
                        {appointments.length === 0 && (
                            <div className="p-8 text-center text-sm text-muted-foreground">
                                No appointments match this view. Try a different filter, or book a new appointment.
                            </div>
                        )}

                        {appointments.map((appt) => {
                            const status = STATUS_CONFIG[appt.status]
                            return (
                                <div
                                    key={appt._id}
                                    className="flex flex-col gap-3 p-5 transition hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-full bg-secondary p-3">
                                            <UserRound size={20} className="text-primary" />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-card-foreground">
                                                {appt.name}

                                            </h3>
                                            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                                <Stethoscope size={12} />
                                                {appt.doctorName}
                                            </p>
                                            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                                                <Phone size={12} />
                                                {appt.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-card-foreground">
                                                {new Date(appt.date).toLocaleString("en-PK", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true
                                                })}
                                            </p>
                                            <div className="mt-1 flex items-center justify-end gap-1.5">
                                                <span
                                                    className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                                                >
                                                    {status.label}
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className='px-8 py-4 flex items-center justify-between gap-3 border-border border-t '>
                        <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                                Showing {appointments.length} </span> {' '}
                            <span className="font-medium text-foreground">of</span> {' '}
                            <span className='font-medium text-foreground'> {totalAppointments}{" "} </span>
                        </p>

                        <div className=' flex gap-3'>

                            <button className='h-9 px-3 rounded-lg border border-border text-sm text-muted-foreground disabled:opacity-50 cursor-pointer'
                                onClick={handlePreviousPage}
                                disabled={page === 1}
                            >previous</button>
                            <button className="h-9 w-9 px-3 rounded-lg bg-primary text-primary-foreground text-sm "

                            >
                                {page}


                            </button>
                            <button className='h-9 px-3 rounded-lg border border-border text-sm text-muted-foreground  cursor-pointer disabled:opacity-50'
                                onClick={handleNextPage}
                                disabled={page === totalPages}

                            >next</button>
                        </div>




                    </div>
                </div>

                {/* Right rail */}
                <div className="space-y-6">
                    {/* Doctors on duty */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <h2 className="font-semibold text-card-foreground">Doctors on Duty</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Availability is set by each doctor.</p>

                        <div className="mt-4 space-y-4">
                            {doctors.map((d) => {
                                const availability = AVAILABILITY_CONFIG[d.availability] || AVAILABILITY_CONFIG.off;
                                return (
                                    <div key={d._id} className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-card-foreground">
                                                {d.name}
                                            </p>
                                            <p className="truncate text-xs text-muted-foreground">
                                                {d.specialization} · {formatPKR(d.consultationFee)}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {d.waiting ?? 0} waiting · {d.inProgress ?? 0} in consultation
                                            </p>
                                        </div>
                                        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-card-foreground">
                                            <span className={`h-2 w-2 rounded-full ${availability.dot}`} />
                                            {availability.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Live queue */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-card-foreground">Waiting Room</h2>
                            <span className="text-xs text-muted-foreground">{waitingQueue.length} waiting</span>
                        </div>

                        {waitingQueue.length === 0 ? (
                            <p className="mt-4 text-sm text-muted-foreground">
                                Nobody is waiting. Check patients in as they arrive.
                            </p>
                        ) : (
                            <ul className="mt-4 space-y-3">
                                {waitingQueue.map((appt) => (
                                    <li key={appt.id} className="flex items-center justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
                                                {appt.token}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-card-foreground">
                                                    {appt.patient}
                                                </p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {appt.doctorName}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={`shrink-0 text-xs font-medium ${appt.waitMinutes >= 15 ? 'text-red-600' : 'text-muted-foreground'
                                                }`}
                                        >
                                            {appt.waitMinutes} min
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>


                </div>
            </div>

            {/* Modal */}
            <BookingModal
                open={showBooking}
                doctors={doctors}
                onClose={() => setShowBooking(false)}
                onSubmit={handleAppointment}
                isSubmitting={isBooking}
                submitError={bookingError}
                onDoctorSearch={setDoctorSearch}
            />
        </div>
    );
};

export default Receptionist;
