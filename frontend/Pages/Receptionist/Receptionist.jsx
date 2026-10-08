import React, { useEffect, useMemo, useState } from 'react';
import {
    CalendarDays,
    Clock,
    Hourglass,
    Banknote,
    UserRound,
    UserPlus,
    CalendarPlus,
    UserCheck,
    CreditCard,
    Search,
    X,
    Ban,
    Phone,
    Bell,
    Send,
    Printer,
    CheckCircle,
    ClipboardList,
    Stethoscope,
    MessageCircle
} from 'lucide-react';
import { api } from '../../services/api';

/* -------------------------------------------------------------------------- */
/*  Mock data — replace with API calls                                         */
/*  GET /doctors, GET /appointments?date=..., POST /appointments, etc.         */
/* -------------------------------------------------------------------------- */

const dateKey = (offset = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};

const minutesAgo = (min) => Date.now() - min * 60 * 1000;

/* availability mirrors the toggle on the doctor dashboard: available | break | off */
const DOCTORS = [
    { id: 'd1', name: 'Dr. Sara Ahmed', specialty: 'General Physician', availability: 'available', fee: 1500 },
    { id: 'd2', name: 'Dr. Imran Qureshi', specialty: 'Pediatrician', availability: 'break', fee: 2000 },
    { id: 'd3', name: 'Dr. Farah Nasir', specialty: 'Dermatologist', availability: 'available', fee: 2500 },
];

const INITIAL_APPOINTMENTS = [
    {
        id: 'r1', doctorId: 'd1', patient: 'Ali Khan', phone: '0300-1234567', date: dateKey(0), time: '09:30',
        type: 'General Checkup', reason: 'Recurring headaches', status: 'completed', walkIn: false,
        fee: 1500, paid: true, method: 'cash', amountPaid: 1500, token: 1, checkedInAt: minutesAgo(80),
    },
    {
        id: 'r2', doctorId: 'd1', patient: 'Ahmed Raza', phone: '0321-7654321', date: dateKey(0), time: '10:00',
        type: 'Follow-up', reason: 'Blood pressure review', status: 'in-progress', walkIn: false,
        fee: 1500, paid: true, method: 'jazzcash', amountPaid: 1500, token: 2, checkedInAt: minutesAgo(30),
    },
    {
        id: 'r3', doctorId: 'd1', patient: 'Usman Tariq', phone: '0333-9876543', date: dateKey(0), time: '10:30',
        type: 'Consultation', reason: 'Cough and mild fever', status: 'waiting', walkIn: false,
        fee: 1500, paid: false, token: 3, checkedInAt: minutesAgo(14),
    },
    {
        id: 'r4', doctorId: 'd1', patient: 'Hamza Malik', phone: '0345-1122334', date: dateKey(0), time: '11:30',
        type: 'General Checkup', reason: 'Annual checkup', status: 'confirmed', walkIn: false,
        fee: 1500, paid: false,
    },
    {
        id: 'r5', doctorId: 'd3', patient: 'Ayesha Noor', phone: '0312-5566778', date: dateKey(0), time: '12:00',
        type: 'Consultation', reason: 'Skin rash on forearms', status: 'scheduled', walkIn: false,
        fee: 2500, paid: false,
    },
    {
        id: 'r6', doctorId: 'd1', patient: 'Bilal Hussain', phone: '0301-4455667', date: dateKey(0), time: '13:00',
        type: 'Follow-up', reason: 'Diabetes follow-up', status: 'confirmed', walkIn: false,
        fee: 1500, paid: false,
    },
    {
        id: 'r7', doctorId: 'd2', patient: 'Maryam Shah', phone: '0302-7788990', date: dateKey(0), time: '10:00',
        type: 'Consultation', reason: 'Child with fever, age 4', status: 'waiting', walkIn: false,
        fee: 2000, paid: false, token: 1, checkedInAt: minutesAgo(9),
    },
    {
        id: 'r8', doctorId: 'd3', patient: 'Talha Anwar', phone: '0334-2233445', date: dateKey(0), time: '11:00',
        type: 'Consultation', reason: 'Acne treatment review', status: 'confirmed', walkIn: false,
        fee: 2500, paid: false,
    },
    {
        id: 'r9', doctorId: 'd1', patient: 'Sana Iqbal', phone: '0322-8899001', date: dateKey(0), time: '15:30',
        type: 'General Checkup', reason: 'Fatigue and low appetite', status: 'scheduled', walkIn: false,
        fee: 1500, paid: false,
    },
    /* Tomorrow — used for the reminders card */
    {
        id: 't1', doctorId: 'd1', patient: 'Zainab Fatima', phone: '0311-3344556', date: dateKey(1), time: '10:00',
        type: 'Follow-up', reason: 'Lab report review', status: 'confirmed', walkIn: false,
        fee: 1500, paid: false, reminderSent: false,
    },
    {
        id: 't2', doctorId: 'd3', patient: 'Kamran Butt', phone: '0343-6677889', date: dateKey(1), time: '11:30',
        type: 'Follow-up', reason: 'Post-treatment check', status: 'scheduled', walkIn: false,
        fee: 2500, paid: false, reminderSent: false,
    },
    {
        id: 't3', doctorId: 'd2', patient: 'Nadia Aslam', phone: '0305-9900112', date: dateKey(1), time: '09:30',
        type: 'Consultation', reason: 'Vaccination visit', status: 'confirmed', walkIn: false,
        fee: 2000, paid: false, reminderSent: true,
    },
];

const INITIAL_ACTIVITY = [
    { id: 'n1', text: 'Maryam Shah checked in (token #1)', time: '9 min ago' },
    { id: 'n2', text: 'Usman Tariq checked in (token #3)', time: '14 min ago' },
    { id: 'n3', text: 'Sana Iqbal booked a 3:30 PM slot', time: '20 min ago' },
];

const STATUS_CONFIG = {
    scheduled: { label: 'Scheduled', className: 'bg-muted text-muted-foreground' },
    confirmed: { label: 'Confirmed', className: 'bg-secondary text-primary' },
    waiting: { label: 'Waiting', className: 'bg-amber-100 text-amber-700' },
    'in-progress': { label: 'In consultation', className: 'bg-primary text-primary-foreground' },
    completed: { label: 'Completed', className: 'bg-green-100 text-green-700' },
    'no-show': { label: 'No-show', className: 'bg-red-100 text-red-700' },
    cancelled: { label: 'Cancelled', className: 'bg-muted text-muted-foreground line-through' },
};

const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'expected', label: 'Expected' },
    { key: 'waiting', label: 'Waiting' },
    { key: 'in-progress', label: 'In consultation' },
    { key: 'completed', label: 'Done' },
    { key: 'closed', label: 'No-show / Cancelled' },
];

const AVAILABILITY_CONFIG = {
    available: { label: 'Available', dot: 'bg-green-500' },
    break: { label: 'On break', dot: 'bg-amber-500' },
    off: { label: 'Off duty', dot: 'bg-red-500' },
};

const PAYMENT_METHODS = [
    { key: 'cash', label: 'Cash' },
    { key: 'jazzcash', label: 'JazzCash' },
    { key: 'easypaisa', label: 'Easypaisa' },
    { key: 'card', label: 'Card' },
];

const APPOINTMENT_TYPES = ['General Checkup', 'Consultation', 'Follow-up'];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const EXPECTED_STATUSES = ['scheduled', 'confirmed'];
const CLOSED_STATUSES = ['no-show', 'cancelled'];
const PHONE_PATTERN = /^03\d{2}-?\d{7}$/;

const inputClass =
    'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

const formatTime = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`;
};

const formatPKR = (amount) => `Rs ${Number(amount || 0).toLocaleString('en-PK')}`;

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
};

const nowHHMM = () => new Date().toTimeString().slice(0, 5);

const buildDaySlots = () => {
    const slots = [];
    for (let minutes = 9 * 60; minutes < 17 * 60; minutes += 30) {
        const h = String(Math.floor(minutes / 60)).padStart(2, '0');
        const m = String(minutes % 60).padStart(2, '0');
        slots.push(`${h}:${m}`);
    }
    return slots;
};

const DAY_SLOTS = buildDaySlots();

const methodLabel = (key) => PAYMENT_METHODS.find((m) => m.key === key)?.label || key;

/* -------------------------------------------------------------------------- */
/*  Shared UI                                                                  */
/* -------------------------------------------------------------------------- */

const Modal = ({ title, subtitle, onClose, children, footer }) => {
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={onClose}
        >
            <div
                className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-border bg-card"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between border-b border-border p-5">
                    <div>
                        <h2 className="font-semibold text-card-foreground">{title}</h2>
                        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-5">{children}</div>

                {footer && <div className="flex justify-end gap-3 border-t border-border p-5">{footer}</div>}
            </div>
        </div>
    );
};

const Field = ({ label, htmlFor, error, children }) => (
    <div>
        <label className="mb-1.5 block text-sm font-medium text-card-foreground" htmlFor={htmlFor}>
            {label}
        </label>
        {children}
        {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
);

/* -------------------------------------------------------------------------- */
/*  Booking / walk-in modal                                                    */
/* -------------------------------------------------------------------------- */

const BookingModal = ({ mode, doctors, appointments, onClose, onSave }) => {
    const isWalkIn = mode === 'walk-in';
    const today = dateKey(0);
    const firstDoctor = doctors.find((d) => d.availability !== 'off') || doctors[0];

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [doctorId, setDoctorId] = useState(firstDoctor.id);
    const [date, setDate] = useState(today);
    const [time, setTime] = useState('');
    const [type, setType] = useState(isWalkIn ? 'Consultation' : 'General Checkup');
    const [reason, setReason] = useState('');
    const [errors, setErrors] = useState({});

    const doctor = doctors.find((d) => d.id === doctorId);

    /* Same rule as the compound unique index: one active booking per doctor + date + time */
    const bookedTimes = useMemo(
        () =>
            appointments
                .filter(
                    (a) =>
                        a.doctorId === doctorId &&
                        a.date === date &&
                        !a.walkIn &&
                        !CLOSED_STATUSES.includes(a.status)
                )
                .map((a) => a.time),
        [appointments, doctorId, date]
    );

    const isPast = (slot) => date === today && slot < nowHHMM();

    const handleSubmit = () => {
        const next = {};
        if (!name.trim()) next.name = 'Enter the patient name.';
        if (!PHONE_PATTERN.test(phone.trim())) next.phone = 'Enter a mobile number like 0300-1234567.';
        if (doctor.availability === 'off') next.doctor = `${doctor.name} is off duty today.`;
        if (!isWalkIn && !time) next.time = 'Pick a free time slot.';
        setErrors(next);
        if (Object.keys(next).length > 0) return;

        onSave({
            id: crypto.randomUUID(),
            doctorId,
            patient: name.trim(),
            phone: phone.trim(),
            date: isWalkIn ? today : date,
            time: isWalkIn ? nowHHMM() : time,
            type,
            reason: reason.trim() || 'Not specified',
            status: isWalkIn ? 'waiting' : 'confirmed',
            walkIn: isWalkIn,
            fee: doctor.fee,
            paid: false,
            reminderSent: false,
        });
    };

    return (
        <Modal
            title={isWalkIn ? 'Register walk-in patient' : 'New appointment'}
            subtitle={
                isWalkIn
                    ? 'The patient joins the doctor’s waiting queue straight away.'
                    : 'Book a free slot with a doctor.'
            }
            onClose={onClose}
            footer={
                <>
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-card-foreground hover:bg-muted"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        {isWalkIn ? 'Add to queue' : 'Book appointment'}
                    </button>
                </>
            }
        >
            <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Patient name" htmlFor="bk-name" error={errors.name}>
                        <input
                            id="bk-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Ali Khan"
                            className={inputClass}
                        />
                    </Field>
                    <Field label="Mobile number" htmlFor="bk-phone" error={errors.phone}>
                        <input
                            id="bk-phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="0300-1234567"
                            inputMode="tel"
                            className={inputClass}
                        />
                    </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Doctor" htmlFor="bk-doctor" error={errors.doctor}>
                        <select
                            id="bk-doctor"
                            value={doctorId}
                            onChange={(e) => {
                                setDoctorId(e.target.value);
                                setTime('');
                            }}
                            className={inputClass}
                        >
                            {doctors.map((d) => (
                                <option key={d.id} value={d.id} disabled={d.availability === 'off'}>
                                    {d.name} — {d.specialty}
                                    {d.availability === 'off' ? ' (Off duty)' : ''}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Visit type" htmlFor="bk-type">
                        <select
                            id="bk-type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className={inputClass}
                        >
                            {APPOINTMENT_TYPES.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </Field>
                </div>

                <Field label="Reason for visit" htmlFor="bk-reason">
                    <input
                        id="bk-reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="e.g. Fever since two days"
                        className={inputClass}
                    />
                </Field>

                {!isWalkIn && (
                    <>
                        <Field label="Date" htmlFor="bk-date">
                            <input
                                id="bk-date"
                                type="date"
                                min={today}
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value || today);
                                    setTime('');
                                }}
                                className={inputClass}
                            />
                        </Field>

                        <Field label="Time slot" htmlFor="bk-slots" error={errors.time}>
                            <div id="bk-slots" className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                                {DAY_SLOTS.map((slot) => {
                                    const booked = bookedTimes.includes(slot);
                                    const disabled = booked || isPast(slot);
                                    const selected = time === slot;
                                    return (
                                        <button
                                            key={slot}
                                            type="button"
                                            disabled={disabled}
                                            onClick={() => setTime(slot)}
                                            title={booked ? 'Already booked' : isPast(slot) ? 'Time has passed' : 'Free'}
                                            className={`rounded-md px-1 py-1.5 text-xs font-medium transition ${
                                                selected
                                                    ? 'bg-primary text-primary-foreground'
                                                    : disabled
                                                      ? 'cursor-not-allowed bg-muted text-muted-foreground line-through opacity-60'
                                                      : 'border border-border text-card-foreground hover:bg-secondary'
                                            }`}
                                        >
                                            {formatTime(slot).replace(' ', '').replace(/^0/, '')}
                                        </button>
                                    );
                                })}
                            </div>
                        </Field>
                    </>
                )}

                <p className="text-xs text-muted-foreground">
                    Consultation fee: <span className="font-medium text-card-foreground">{formatPKR(doctor.fee)}</span>
                </p>
            </div>
        </Modal>
    );
};

/* -------------------------------------------------------------------------- */
/*  Payment modal                                                              */
/* -------------------------------------------------------------------------- */

const PaymentModal = ({ appointment, doctor, onClose, onConfirm }) => {
    const [method, setMethod] = useState('cash');
    const [amount, setAmount] = useState(String(appointment.fee));
    const [error, setError] = useState('');
    const [receipt, setReceipt] = useState(null);

    const handleConfirm = () => {
        const value = Number(amount);
        if (!Number.isFinite(value) || value <= 0) {
            setError('Enter an amount greater than zero.');
            return;
        }
        onConfirm(appointment.id, { method, amount: value });
        setReceipt({
            number: `RCP-${appointment.id.slice(0, 6).toUpperCase()}`,
            amount: value,
            method,
        });
    };

    if (receipt) {
        return (
            <Modal
                title="Payment received"
                onClose={onClose}
                footer={
                    <>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-card-foreground hover:bg-muted"
                        >
                            <Printer size={16} />
                            Print receipt
                        </button>
                        <button
                            onClick={onClose}
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            Done
                        </button>
                    </>
                }
            >
                <div className="flex items-center gap-3 rounded-lg bg-secondary p-4">
                    <CheckCircle size={22} className="text-primary" />
                    <div>
                        <p className="text-sm font-medium text-card-foreground">{formatPKR(receipt.amount)} received</p>
                        <p className="text-xs text-muted-foreground">via {methodLabel(receipt.method)}</p>
                    </div>
                </div>

                <dl className="mt-4 space-y-2 text-sm">
                    {[
                        ['Receipt no.', receipt.number],
                        ['Patient', appointment.patient],
                        ['Doctor', doctor.name],
                        ['Visit', `${appointment.type} · ${formatTime(appointment.time)}`],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-4">
                            <dt className="text-muted-foreground">{label}</dt>
                            <dd className="text-right font-medium text-card-foreground">{value}</dd>
                        </div>
                    ))}
                </dl>
            </Modal>
        );
    }

    return (
        <Modal
            title="Collect payment"
            subtitle={`${appointment.patient} · ${doctor.name}`}
            onClose={onClose}
            footer={
                <>
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-card-foreground hover:bg-muted"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Confirm payment
                    </button>
                </>
            }
        >
            <div className="space-y-4">
                <Field label="Amount (PKR)" htmlFor="pay-amount" error={error}>
                    <input
                        id="pay-amount"
                        type="number"
                        min="0"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                            setError('');
                        }}
                        className={inputClass}
                    />
                    <p className="mt-1.5 text-xs text-muted-foreground">
                        Standard fee: {formatPKR(appointment.fee)}. Edit the amount to apply a discount.
                    </p>
                </Field>

                <div>
                    <span className="mb-1.5 block text-sm font-medium text-card-foreground">Payment method</span>
                    <div role="radiogroup" aria-label="Payment method" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {PAYMENT_METHODS.map((m) => (
                            <button
                                key={m.key}
                                role="radio"
                                aria-checked={method === m.key}
                                onClick={() => setMethod(m.key)}
                                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                                    method === m.key
                                        ? 'border-primary bg-secondary text-primary'
                                        : 'border-border text-card-foreground hover:bg-muted'
                                }`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

/* -------------------------------------------------------------------------- */
/*  Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

const Receptionist = ({ receptionistName = 'Receptionist' }) => {
    const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
    const [activity, setActivity] = useState(INITIAL_ACTIVITY);
    const [query, setQuery] = useState('');
    const [doctorFilter, setDoctorFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [modal, setModal] = useState(null); // { type: 'booking', mode } | { type: 'payment', id }
    const [now, setNow] = useState(Date.now());

    const today = dateKey(0);
    const tomorrow = dateKey(1);
    const doctors = DOCTORS;
    const doctorById = useMemo(() => Object.fromEntries(doctors.map((d) => [d.id, d])), [doctors]);

    /* Refresh wait times every 30 seconds */
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 30000);
        return () => clearInterval(id);
    }, []);

    const logActivity = (text) =>
        setActivity((prev) => [{ id: crypto.randomUUID(), text, time: 'Just now' }, ...prev].slice(0, 6));

    const updateAppointment = (id, changes) =>
        setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...changes } : a)));

    const nextToken = (doctorId) => {
        const tokens = appointments
            .filter((a) => a.doctorId === doctorId && a.date === today && a.token)
            .map((a) => a.token);
        return (tokens.length ? Math.max(...tokens) : 0) + 1;
    };

    /* Actions — swap the bodies for API calls, keep the state update as the optimistic UI */
    const addAppointment = (payload) => {
        const doctor = doctorById[payload.doctorId];
        if (payload.walkIn) {
            const token = nextToken(payload.doctorId);
            setAppointments((prev) => [...prev, { ...payload, token, checkedInAt: Date.now() }]);
            logActivity(`${payload.patient} registered as walk-in for ${doctor.name} (token #${token})`);
        } else {
            setAppointments((prev) => [...prev, payload]);
            logActivity(`${payload.patient} booked with ${doctor.name} at ${formatTime(payload.time)}`);
        }
        setModal(null);
    };

    const checkIn = (appt) => {
        const token = nextToken(appt.doctorId);
        updateAppointment(appt.id, { status: 'waiting', token, checkedInAt: Date.now() });
        logActivity(`${appt.patient} checked in (token #${token})`);
    };

    const cancelAppointment = (appt) => {
        if (!window.confirm(`Cancel ${appt.patient}'s appointment?`)) return;
        updateAppointment(appt.id, { status: 'cancelled' });
        logActivity(`Appointment for ${appt.patient} cancelled`);
    };

    const recordPayment = (id, { method, amount }) => {
        const appt = appointments.find((a) => a.id === id);
        updateAppointment(id, { paid: true, method, amountPaid: amount, paidAt: Date.now() });
        if (appt) logActivity(`${formatPKR(amount)} received from ${appt.patient} (${methodLabel(method)})`);
    };

    const sendReminder = (id) => {
        const appt = appointments.find((a) => a.id === id);
        updateAppointment(id, { reminderSent: true });
        if (appt) logActivity(`Reminder sent to ${appt.patient}`);
    };

    const sendAllReminders = (list) => {
        const ids = list.filter((a) => !a.reminderSent).map((a) => a.id);
        if (ids.length === 0) return;
        setAppointments((prev) => prev.map((a) => (ids.includes(a.id) ? { ...a, reminderSent: true } : a)));
        logActivity(`${ids.length} reminders sent for tomorrow`);
    };

    /* Derived data */
    const todays = useMemo(() => appointments.filter((a) => a.date === today), [appointments, today]);
    const tomorrows = useMemo(
        () =>
            appointments
                .filter((a) => a.date === tomorrow && !CLOSED_STATUSES.includes(a.status))
                .sort((a, b) => a.time.localeCompare(b.time)),
        [appointments, tomorrow]
    );

    const waitingQueue = useMemo(
        () =>
            todays
                .filter((a) => a.status === 'waiting')
                .sort((a, b) => (a.checkedInAt || 0) - (b.checkedInAt || 0)),
        [todays]
    );

    const money = useMemo(() => {
        const paid = todays.filter((a) => a.paid);
        const collected = paid.reduce((sum, a) => sum + (a.amountPaid || 0), 0);
        const outstandingList = todays.filter((a) => !a.paid && !CLOSED_STATUSES.includes(a.status));
        const outstanding = outstandingList.reduce((sum, a) => sum + a.fee, 0);
        const byMethod = PAYMENT_METHODS.map((m) => ({
            ...m,
            total: paid.filter((a) => a.method === m.key).reduce((sum, a) => sum + (a.amountPaid || 0), 0),
        })).filter((m) => m.total > 0);
        return { collected, outstanding, outstandingCount: outstandingList.length, byMethod };
    }, [todays]);

    const stats = [
        {
            title: "Today's Appointments",
            value: todays.filter((a) => a.status !== 'cancelled').length,
            icon: CalendarDays,
        },
        { title: 'Waiting Now', value: waitingQueue.length, icon: Hourglass },
        {
            title: 'Expected Arrivals',
            value: todays.filter((a) => EXPECTED_STATUSES.includes(a.status)).length,
            icon: Clock,
        },
        { title: 'Collected Today', value: formatPKR(money.collected), icon: Banknote },
    ];

    const counts = useMemo(
        () => ({
            all: todays.length,
            expected: todays.filter((a) => EXPECTED_STATUSES.includes(a.status)).length,
            waiting: todays.filter((a) => a.status === 'waiting').length,
            'in-progress': todays.filter((a) => a.status === 'in-progress').length,
            completed: todays.filter((a) => a.status === 'completed').length,
            closed: todays.filter((a) => CLOSED_STATUSES.includes(a.status)).length,
        }),
        [todays]
    );

    const visibleAppointments = useMemo(() => {
        const q = query.trim().toLowerCase();
        return todays
            .filter((a) => doctorFilter === 'all' || a.doctorId === doctorFilter)
            .filter((a) => {
                if (statusFilter === 'expected') return EXPECTED_STATUSES.includes(a.status);
                if (statusFilter === 'closed') return CLOSED_STATUSES.includes(a.status);
                if (statusFilter === 'all') return true;
                return a.status === statusFilter;
            })
            .filter((a) => !q || a.patient.toLowerCase().includes(q) || a.phone.replace(/-/g, '').includes(q.replace(/-/g, '')))
            .sort((a, b) => a.time.localeCompare(b.time));
    }, [todays, doctorFilter, statusFilter, query]);

    const doctorLoad = (doctorId) => ({
        waiting: todays.filter((a) => a.doctorId === doctorId && a.status === 'waiting').length,
        inProgress: todays.filter((a) => a.doctorId === doctorId && a.status === 'in-progress').length,
    });

    const waitMinutes = (appt) => Math.max(0, Math.floor((now - (appt.checkedInAt || now)) / 60000));

    const dateLabel = new Date().toLocaleDateString('en-PK', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const paymentTarget = modal?.type === 'payment' ? appointments.find((a) => a.id === modal.id) : null;
    const unsentReminders = tomorrows.filter((a) => !a.reminderSent).length;

    const handleLogout = async() => {
            try {
                const result = await api.post('/auth/logout')
                console.log(result) 
            } catch (error) {
                console.log(error)
            }
    
        }

    return (
        <div className="min-h-screen bg-background p-6 font-inter">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <ClipboardList size={24} className="text-primary" />
                        <h1 className="text-2xl font-semibold text-foreground">
                            {getGreeting()}, {receptionistName}
                        </h1>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {dateLabel} · Manage arrivals, bookings and payments for today.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setModal({ type: 'booking', mode: 'walk-in' })}
                        className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground hover:bg-muted"
                    >
                        <UserPlus size={16} className="text-primary" />
                        Walk-in patient
                    </button>
                    <button
                        onClick={() => setModal({ type: 'booking', mode: 'appointment' })}
                        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        <CalendarPlus size={16} />
                        New appointment
                    </button>
                    <button onClick={handleLogout}>logout</button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
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
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Today's appointments */}
                <div className="rounded-xl border border-border bg-card lg:col-span-2">
                    <div className="border-b border-border p-5">
                        <h2 className="font-semibold text-card-foreground">Today's Appointments</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Check patients in as they arrive and collect payment at the desk.
                        </p>
                    </div>

                    <div className="space-y-3 border-b border-border p-5">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative flex-1">
                                <Search
                                    size={16}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search by patient name or phone"
                                    aria-label="Search appointments"
                                    className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <select
                                value={doctorFilter}
                                onChange={(e) => setDoctorFilter(e.target.value)}
                                aria-label="Filter by doctor"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All doctors</option>
                                {doctors.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {FILTERS.map((f) => (
                                <button
                                    key={f.key}
                                    onClick={() => setStatusFilter(f.key)}
                                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                                        statusFilter === f.key
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {f.label} ({counts[f.key]})
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="divide-y divide-border">
                        {visibleAppointments.length === 0 && (
                            <div className="p-8 text-center text-sm text-muted-foreground">
                                No appointments match this view. Try a different filter, or book a new appointment.
                            </div>
                        )}

                        {visibleAppointments.map((appt) => {
                            const status = STATUS_CONFIG[appt.status];
                            const doctor = doctorById[appt.doctorId];
                            const isExpected = EXPECTED_STATUSES.includes(appt.status);
                            const isClosed = CLOSED_STATUSES.includes(appt.status);
                            const canCancel = isExpected || appt.status === 'waiting';
                            const canCollect = !appt.paid && !isClosed;

                            return (
                                <div
                                    key={appt.id}
                                    className="flex flex-col gap-3 p-5 transition hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-full bg-secondary p-3">
                                            <UserRound size={20} className="text-primary" />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-card-foreground">
                                                {appt.patient}
                                                {appt.token && (
                                                    <span className="ml-2 rounded-md bg-secondary px-1.5 py-0.5 text-xs font-medium text-primary">
                                                        #{appt.token}
                                                    </span>
                                                )}
                                                {appt.walkIn && (
                                                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                                                        Walk-in
                                                    </span>
                                                )}
                                            </h3>
                                            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                                <Stethoscope size={12} />
                                                {doctor.name} · {appt.type}
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
                                                {formatTime(appt.time)}
                                            </p>
                                            <div className="mt-1 flex items-center justify-end gap-1.5">
                                                <span
                                                    className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                                                >
                                                    {status.label}
                                                </span>
                                                {!isClosed && (
                                                    <span
                                                        className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                                                            appt.paid
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-muted text-muted-foreground'
                                                        }`}
                                                    >
                                                        {appt.paid ? 'Paid' : 'Unpaid'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            {isExpected && (
                                                <button
                                                    onClick={() => checkIn(appt)}
                                                    className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                                                >
                                                    <UserCheck size={14} />
                                                    Check in
                                                </button>
                                            )}
                                            {canCollect && (
                                                <button
                                                    onClick={() => setModal({ type: 'payment', id: appt.id })}
                                                    className="flex items-center gap-1.5 rounded-lg border border-primary px-3 py-2 text-xs font-medium text-primary hover:bg-secondary"
                                                >
                                                    <CreditCard size={14} />
                                                    Collect
                                                </button>
                                            )}
                                            {canCancel && (
                                                <button
                                                    onClick={() => cancelAppointment(appt)}
                                                    title="Cancel appointment"
                                                    aria-label={`Cancel appointment for ${appt.patient}`}
                                                    className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted"
                                                >
                                                    <Ban size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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
                                const availability = AVAILABILITY_CONFIG[d.availability];
                                const load = doctorLoad(d.id);
                                return (
                                    <div key={d.id} className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-card-foreground">
                                                {d.name}
                                            </p>
                                            <p className="truncate text-xs text-muted-foreground">
                                                {d.specialty} · {formatPKR(d.fee)}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {load.waiting} waiting · {load.inProgress} in consultation
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
                                {waitingQueue.map((appt) => {
                                    const wait = waitMinutes(appt);
                                    return (
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
                                                        {doctorById[appt.doctorId].name}
                                                    </p>
                                                </div>
                                            </div>
                                            <span
                                                className={`shrink-0 text-xs font-medium ${
                                                    wait >= 15 ? 'text-red-600' : 'text-muted-foreground'
                                                }`}
                                            >
                                                {wait} min
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* Payments */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center gap-2">
                            <Banknote size={18} className="text-primary" />
                            <h2 className="font-semibold text-card-foreground">Today's Payments</h2>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="rounded-lg bg-secondary p-3">
                                <p className="text-xs text-muted-foreground">Collected</p>
                                <p className="mt-1 text-sm font-semibold text-card-foreground">
                                    {formatPKR(money.collected)}
                                </p>
                            </div>
                            <div className="rounded-lg bg-muted p-3">
                                <p className="text-xs text-muted-foreground">
                                    Outstanding ({money.outstandingCount})
                                </p>
                                <p className="mt-1 text-sm font-semibold text-card-foreground">
                                    {formatPKR(money.outstanding)}
                                </p>
                            </div>
                        </div>

                        {money.byMethod.length > 0 && (
                            <ul className="mt-4 space-y-2">
                                {money.byMethod.map((m) => (
                                    <li key={m.key} className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">{m.label}</span>
                                        <span className="font-medium text-card-foreground">{formatPKR(m.total)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Tomorrow's reminders */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MessageCircle size={18} className="text-primary" />
                                <h2 className="font-semibold text-card-foreground">Tomorrow's Reminders</h2>
                            </div>
                            <button
                                onClick={() => sendAllReminders(tomorrows)}
                                disabled={unsentReminders === 0}
                                className="text-xs font-medium text-primary hover:text-primary/80 disabled:text-muted-foreground"
                            >
                                Send all
                            </button>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">SMS or WhatsApp to the patient.</p>

                        {tomorrows.length === 0 ? (
                            <p className="mt-4 text-sm text-muted-foreground">No bookings for tomorrow yet.</p>
                        ) : (
                            <div className="mt-4 space-y-3">
                                {tomorrows.map((appt) => (
                                    <div key={appt.id} className="flex items-center justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-card-foreground">
                                                {appt.patient}
                                            </p>
                                            <p className="truncate text-xs text-muted-foreground">
                                                {formatTime(appt.time)} · {doctorById[appt.doctorId].name}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => sendReminder(appt.id)}
                                            disabled={appt.reminderSent}
                                            className="flex shrink-0 items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-secondary disabled:text-muted-foreground disabled:hover:bg-transparent"
                                        >
                                            <Send size={12} />
                                            {appt.reminderSent ? 'Sent' : 'Remind'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Activity */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center gap-2">
                            <Bell size={18} className="text-primary" />
                            <h2 className="font-semibold text-card-foreground">Recent Activity</h2>
                        </div>

                        <ul className="mt-4 space-y-3">
                            {activity.map((item) => (
                                <li key={item.id} className="flex items-start justify-between gap-3">
                                    <p className="text-sm text-card-foreground">{item.text}</p>
                                    <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {modal?.type === 'booking' && (
                <BookingModal
                    mode={modal.mode}
                    doctors={doctors}
                    appointments={appointments}
                    onClose={() => setModal(null)}
                    onSave={addAppointment}
                />
            )}

            {paymentTarget && (
                <PaymentModal
                    appointment={paymentTarget}
                    doctor={doctorById[paymentTarget.doctorId]}
                    onClose={() => setModal(null)}
                    onConfirm={recordPayment}
                />
            )}
        </div>
    );
};

export default Receptionist;