import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../../services/api';
import {
    CalendarDays,
    Users,
    CheckCircle,
    Clock,
    UserRound,
    FileText,
    ArrowRight,
    Stethoscope,
    Search,
    Play,
    X,
    Plus,
    Trash2,
    Bell,
    UserX,
    Ban,
    Hourglass,
    Sparkles,
    Phone,
    CalendarClock,
    Activity,
    Timer,
    Send
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Mock data — replace with API calls (GET /doctor/appointments?date=today)   */
/* -------------------------------------------------------------------------- */

const TOTAL_PATIENTS = 124;

const INITIAL_APPOINTMENTS = [
    {
        id: 'a1',
        patient: 'Ali Khan',
        age: 34,
        gender: 'M',
        phone: '0300-1234567',
        time: '09:30',
        type: 'General Checkup',
        reason: 'Recurring headaches for two weeks',
        status: 'completed',
        visitCount: 3,
        lastVisit: '12 Aug 2026',
        diagnosis: 'Tension headache',
    },
    {
        id: 'a2',
        patient: 'Ahmed Raza',
        age: 52,
        gender: 'M',
        phone: '0321-7654321',
        time: '10:00',
        type: 'Follow-up',
        reason: 'Blood pressure review after new medication',
        status: 'in-progress',
        startedAt: Date.now() - 6 * 60 * 1000,
        visitCount: 6,
        lastVisit: '02 Sep 2026',
    },
    {
        id: 'a3',
        patient: 'Usman Tariq',
        age: 29,
        gender: 'M',
        phone: '0333-9876543',
        time: '10:30',
        type: 'Consultation',
        reason: 'Persistent cough and mild fever',
        status: 'waiting',
        visitCount: 1,
        lastVisit: 'First visit',
    },
    {
        id: 'a4',
        patient: 'Hamza Malik',
        age: 41,
        gender: 'M',
        phone: '0345-1122334',
        time: '11:30',
        type: 'General Checkup',
        reason: 'Annual health checkup',
        status: 'confirmed',
        visitCount: 2,
        lastVisit: '18 Jun 2026',
    },
    {
        id: 'a5',
        patient: 'Ayesha Noor',
        age: 26,
        gender: 'F',
        phone: '0312-5566778',
        time: '12:00',
        type: 'Consultation',
        reason: 'Skin rash on forearms',
        status: 'scheduled',
        visitCount: 1,
        lastVisit: 'First visit',
    },
    {
        id: 'a6',
        patient: 'Bilal Hussain',
        age: 60,
        gender: 'M',
        phone: '0301-4455667',
        time: '13:00',
        type: 'Follow-up',
        reason: 'Diabetes follow-up, sugar chart review',
        status: 'confirmed',
        visitCount: 9,
        lastVisit: '25 Aug 2026',
    },
    {
        id: 'a7',
        patient: 'Sana Iqbal',
        age: 33,
        gender: 'F',
        phone: '0322-8899001',
        time: '15:30',
        type: 'General Checkup',
        reason: 'Fatigue and low appetite',
        status: 'scheduled',
        visitCount: 1,
        lastVisit: 'First visit',
    },
];

const INITIAL_FOLLOW_UPS = [
    { id: 'f1', patient: 'Zainab Fatima', due: 'Today', note: 'Lab report review', reminded: false },
    { id: 'f2', patient: 'Kamran Butt', due: 'Tomorrow', note: 'Post-treatment check', reminded: false },
    { id: 'f3', patient: 'Nadia Aslam', due: 'In 3 days', note: 'BP recheck', reminded: true },
];

const INITIAL_ACTIVITY = [
    { id: 'n1', text: 'Sana Iqbal booked a 3:30 PM slot', time: '20 min ago' },
    { id: 'n2', text: 'Usman Tariq checked in at reception', time: '8 min ago' },
    { id: 'n3', text: 'Ali Khan visit completed', time: '1 hr ago' },
];

const WEEK_LOAD = [
    { day: 'Mon', count: 12 },
    { day: 'Tue', count: 9 },
    { day: 'Wed', count: 14 },
    { day: 'Thu', count: 7 },
    { day: 'Fri', count: 10 },
    { day: 'Sat', count: 5 },
];

const FOLLOW_UP_OPTIONS = [
    { value: '', label: 'No follow-up' },
    { value: '3', label: 'In 3 days' },
    { value: '7', label: 'In 1 week' },
    { value: '14', label: 'In 2 weeks' },
    { value: '30', label: 'In 1 month' },
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
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'waiting', label: 'Waiting' },
    { key: 'completed', label: 'Completed' },
    { key: 'closed', label: 'No-show / Cancelled' },
];

const AVAILABILITY_OPTIONS = [
    { key: 'available', label: 'Available', dot: 'bg-green-500' },
    { key: 'break', label: 'On break', dot: 'bg-amber-500' },
    { key: 'off', label: 'Off duty', dot: 'bg-red-500' },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const UPCOMING_STATUSES = ['scheduled', 'confirmed', 'waiting'];
const CLOSED_STATUSES = ['no-show', 'cancelled'];

const formatTime = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`;
};

const formatElapsed = (ms) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return `${m}:${s}`;
};

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
};

const buildSlots = (appointments) => {
    const slots = [];
    for (let minutes = 9 * 60; minutes < 17 * 60; minutes += 30) {
        const h = String(Math.floor(minutes / 60)).padStart(2, '0');
        const m = String(minutes % 60).padStart(2, '0');
        const time = `${h}:${m}`;
        const booked = appointments.find(
            (a) => a.time === time && !CLOSED_STATUSES.includes(a.status)
        );
        slots.push({ time, booked: Boolean(booked) });
    }
    return slots;
};

const emptyMedicine = () => ({ id: crypto.randomUUID(), name: '', dose: '', duration: '' });

/* -------------------------------------------------------------------------- */
/*  Consultation modal                                                         */
/* -------------------------------------------------------------------------- */

const ConsultationModal = ({ appointment, onClose, onSave }) => {
    const [diagnosis, setDiagnosis] = useState('');
    const [notes, setNotes] = useState('');
    const [medicines, setMedicines] = useState([emptyMedicine()]);
    const [followUp, setFollowUp] = useState('');

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    const updateMedicine = (id, field, value) =>
        setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));

    const removeMedicine = (id) =>
        setMedicines((prev) => (prev.length === 1 ? [emptyMedicine()] : prev.filter((m) => m.id !== id)));

    const handleSave = () => {
        onSave({
            diagnosis: diagnosis.trim(),
            notes: notes.trim(),
            prescription: medicines.filter((m) => m.name.trim()),
            followUpDays: followUp ? Number(followUp) : null,
        });
    };

    const inputClass =
        'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-title"
            onClick={onClose}
        >
            <div
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-card"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between border-b border-border p-5">
                    <div>
                        <h2 id="consultation-title" className="font-semibold text-card-foreground">
                            Finish consultation
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {appointment.patient} · {appointment.age} yrs · {appointment.reason}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-5 p-5">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-card-foreground" htmlFor="diagnosis">
                            Diagnosis
                        </label>
                        <input
                            id="diagnosis"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            placeholder="e.g. Seasonal flu"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-card-foreground" htmlFor="notes">
                            Clinical notes
                        </label>
                        <textarea
                            id="notes"
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Observations, advice given, tests requested"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <div className="mb-1.5 flex items-center justify-between">
                            <span className="text-sm font-medium text-card-foreground">Prescription</span>
                            <button
                                onClick={() => setMedicines((prev) => [...prev, emptyMedicine()])}
                                className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                            >
                                <Plus size={14} />
                                Add medicine
                            </button>
                        </div>

                        <div className="space-y-2">
                            {medicines.map((med) => (
                                <div key={med.id} className="grid grid-cols-12 gap-2">
                                    <input
                                        aria-label="Medicine name"
                                        value={med.name}
                                        onChange={(e) => updateMedicine(med.id, 'name', e.target.value)}
                                        placeholder="Medicine"
                                        className={`${inputClass} col-span-5`}
                                    />
                                    <input
                                        aria-label="Dose"
                                        value={med.dose}
                                        onChange={(e) => updateMedicine(med.id, 'dose', e.target.value)}
                                        placeholder="Dose (1+0+1)"
                                        className={`${inputClass} col-span-3`}
                                    />
                                    <input
                                        aria-label="Duration"
                                        value={med.duration}
                                        onChange={(e) => updateMedicine(med.id, 'duration', e.target.value)}
                                        placeholder="5 days"
                                        className={`${inputClass} col-span-3`}
                                    />
                                    <button
                                        onClick={() => removeMedicine(med.id)}
                                        aria-label="Remove medicine"
                                        className="col-span-1 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-card-foreground" htmlFor="followup">
                            Follow-up
                        </label>
                        <select
                            id="followup"
                            value={followUp}
                            onChange={(e) => setFollowUp(e.target.value)}
                            className={inputClass}
                        >
                            {FOLLOW_UP_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                        <p className="mt-1.5 text-xs text-muted-foreground">
                            A reminder is sent to the patient by SMS/WhatsApp before the follow-up date.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-border p-5">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-card-foreground hover:bg-muted"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Save and complete
                    </button>
                </div>
            </div>
        </div>
    );
};

/* -------------------------------------------------------------------------- */
/*  Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

const Doctor = ({ doctorName = 'Doctor' }) => {
    const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
    const [followUps, setFollowUps] = useState(INITIAL_FOLLOW_UPS);
    const [activity, setActivity] = useState(INITIAL_ACTIVITY);
    const [filter, setFilter] = useState('all');
    const [query, setQuery] = useState('');
    const [availability, setAvailability] = useState('available');
    const [finishing, setFinishing] = useState(null);
    const [now, setNow] = useState(Date.now());

    const inProgress = appointments.find((a) => a.status === 'in-progress') || null;

    /* Live timer only while a consultation is running */
    useEffect(() => {
        if (!inProgress) return undefined;
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, [inProgress]);

    const logActivity = (text) =>
        setActivity((prev) => [{ id: crypto.randomUUID(), text, time: 'Just now' }, ...prev].slice(0, 6));

    const updateAppointment = (id, changes) =>
        setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...changes } : a)));

    /* Actions — swap the bodies for PATCH /appointments/:id/status */
    const startConsultation = (appt) => {
        updateAppointment(appt.id, { status: 'in-progress', startedAt: Date.now() });
        setNow(Date.now());
        logActivity(`Started consultation with ${appt.patient}`);
    };

    const markNoShow = (appt) => {
        updateAppointment(appt.id, { status: 'no-show' });
        logActivity(`${appt.patient} marked as no-show`);
    };

    const cancelAppointment = (appt) => {
        updateAppointment(appt.id, { status: 'cancelled' });
        logActivity(`Appointment with ${appt.patient} cancelled`);
    };

    const completeConsultation = (payload) => {
        const appt = finishing;
        updateAppointment(appt.id, {
            status: 'completed',
            diagnosis: payload.diagnosis || 'Not recorded',
            notes: payload.notes,
            prescription: payload.prescription,
        });
        if (payload.followUpDays) {
            setFollowUps((prev) => [
                {
                    id: crypto.randomUUID(),
                    patient: appt.patient,
                    due: `In ${payload.followUpDays} days`,
                    note: payload.diagnosis || 'Follow-up visit',
                    reminded: false,
                },
                ...prev,
            ]);
        }
        logActivity(`Consultation with ${appt.patient} completed`);
        setFinishing(null);
    };

    const sendReminder = (id) => {
        const item = followUps.find((f) => f.id === id);
        setFollowUps((prev) => prev.map((f) => (f.id === id ? { ...f, reminded: true } : f)));
        if (item) logActivity(`Reminder sent to ${item.patient}`);
    };

    /* Derived data */
    const stats = useMemo(() => {
        const active = appointments.filter((a) => a.status !== 'cancelled');
        return [
            { title: "Today's Appointments", value: active.length, icon: CalendarDays },
            { title: 'Waiting Now', value: appointments.filter((a) => a.status === 'waiting').length, icon: Hourglass },
            { title: 'Completed', value: appointments.filter((a) => a.status === 'completed').length, icon: CheckCircle },
            {
                title: 'Pending',
                value: appointments.filter((a) => UPCOMING_STATUSES.includes(a.status)).length,
                icon: Clock,
            },
        ];
    }, [appointments]);

    const counts = useMemo(
        () => ({
            all: appointments.length,
            upcoming: appointments.filter((a) => UPCOMING_STATUSES.includes(a.status)).length,
            waiting: appointments.filter((a) => a.status === 'waiting').length,
            completed: appointments.filter((a) => a.status === 'completed').length,
            closed: appointments.filter((a) => CLOSED_STATUSES.includes(a.status)).length,
        }),
        [appointments]
    );

    const visibleAppointments = useMemo(() => {
        const q = query.trim().toLowerCase();
        return appointments
            .filter((a) => {
                if (filter === 'upcoming') return UPCOMING_STATUSES.includes(a.status);
                if (filter === 'waiting') return a.status === 'waiting';
                if (filter === 'completed') return a.status === 'completed';
                if (filter === 'closed') return CLOSED_STATUSES.includes(a.status);
                return true;
            })
            .filter((a) => !q || a.patient.toLowerCase().includes(q) || a.reason.toLowerCase().includes(q))
            .sort((a, b) => a.time.localeCompare(b.time));
    }, [appointments, filter, query]);

    /* Next patient: waiting patients first, then earliest upcoming */
    const nextPatient = useMemo(() => {
        const upcoming = appointments
            .filter((a) => UPCOMING_STATUSES.includes(a.status))
            .sort((a, b) => a.time.localeCompare(b.time));
        return upcoming.find((a) => a.status === 'waiting') || upcoming[0] || null;
    }, [appointments]);

    const slots = useMemo(() => buildSlots(appointments), [appointments]);
    const freeSlots = slots.filter((s) => !s.booked).length;
    const maxWeek = Math.max(...WEEK_LOAD.map((d) => d.count));

    const today = new Date().toLocaleDateString('en-PK', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const canStart = !inProgress && availability !== 'off';


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
            <div className=" mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Stethoscope size={24} className="text-primary" />
                        <h1 className="text-2xl font-semibold text-foreground">
                            {getGreeting()}, {doctorName}
                        </h1>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {today} · Here's what's happening with your appointments today.
                    </p>
                </div>

                {/* Availability toggle — controls whether patients can book new slots */}
                <div
                    role="radiogroup"
                    aria-label="Availability"
                    className="inline-flex rounded-lg border border-border bg-card p-1"
                >
                    {AVAILABILITY_OPTIONS.map((opt) => (
                        <button
                            key={opt.key}
                            role="radio"
                            aria-checked={availability === opt.key}
                            onClick={() => setAvailability(opt.key)}
                            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                                availability === opt.key
                                    ? 'bg-secondary text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <span className={`h-2 w-2 rounded-full ${opt.dot}`} />
                            {opt.label}
                        </button>
                    ))}
                    
                <div className=''>

                <button onClick={handleLogout} 
                className='bg-red-500 text-white rounded-lg px-2.5 py-1.5 text-sm '>
                    logout
                </button>
                </div>
                    
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

            {/* Now / Next up */}
            <div className="mt-6 rounded-xl border border-border bg-card">
                {inProgress ? (
                    <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-primary p-3">
                                <Activity size={20} className="text-primary-foreground" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-primary">In consultation now</p>
                                <h2 className="mt-0.5 font-semibold text-card-foreground">
                                    {inProgress.patient}
                                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                                        {inProgress.age} yrs · {inProgress.gender}
                                    </span>
                                </h2>
                                <p className="mt-0.5 text-sm text-muted-foreground">{inProgress.reason}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-card-foreground">
                                <Timer size={18} className="text-primary" />
                                <span className="text-lg font-semibold tabular-nums">
                                    {formatElapsed(now - inProgress.startedAt)}
                                </span>
                            </div>
                            <button
                                onClick={() => setFinishing(inProgress)}
                                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                            >
                                Finish consultation
                            </button>
                        </div>
                    </div>
                ) : nextPatient ? (
                    <div className="grid gap-5 p-5 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <p className="text-xs font-medium text-primary">
                                {nextPatient.status === 'waiting' ? 'Waiting in reception' : 'Next up'}
                            </p>
                            <h2 className="mt-1 font-semibold text-card-foreground">
                                {nextPatient.patient}
                                <span className="ml-2 text-sm font-normal text-muted-foreground">
                                    {nextPatient.age} yrs · {nextPatient.gender} · {formatTime(nextPatient.time)}
                                </span>
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {nextPatient.type} — {nextPatient.reason}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Phone size={12} /> {nextPatient.phone}
                                </span>
                                <span>Last visit: {nextPatient.lastVisit}</span>
                                <span>Visits: {nextPatient.visitCount}</span>
                            </div>

                            {/* Placeholder for the AI feature: pre-visit summary built from past records */}
                            <div className="mt-4 flex items-start gap-2 rounded-lg bg-secondary p-3">
                                <Sparkles size={16} className="mt-0.5 shrink-0 text-primary" />
                                <p className="text-xs text-card-foreground">
                                    Pre-visit summary will appear here once the AI feature is connected — key history,
                                    recurring complaints and last prescription.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center lg:justify-end">
                            <button
                                onClick={() => startConsultation(nextPatient)}
                                disabled={!canStart}
                                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Play size={16} />
                                Start consultation
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-5 text-sm text-muted-foreground">
                        No more patients for today. Enjoy the break.
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Today's Appointments */}
                <div className="rounded-xl border border-border bg-card lg:col-span-2">
                    <div className="flex items-center justify-between border-b border-border p-5">
                        <div>
                            <h2 className="font-semibold text-card-foreground">Today's Appointments</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Your scheduled appointments for today.
                            </p>
                        </div>

                        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
                            View all
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* Search + filters */}
                    <div className="space-y-3 border-b border-border p-5">
                        <div className="relative">
                            <Search
                                size={16}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by patient or reason"
                                aria-label="Search appointments"
                                className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {FILTERS.map((f) => (
                                <button
                                    key={f.key}
                                    onClick={() => setFilter(f.key)}
                                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                                        filter === f.key
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
                                No appointments match this view. Try a different filter or search.
                            </div>
                        )}

                        {visibleAppointments.map((appointment) => {
                            const status = STATUS_CONFIG[appointment.status];
                            const isOpen = UPCOMING_STATUSES.includes(appointment.status);

                            return (
                                <div
                                    key={appointment.id}
                                    className="flex flex-col gap-3 p-5 transition hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-full bg-secondary p-3">
                                            <UserRound size={20} className="text-primary" />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-card-foreground">
                                                {appointment.patient}
                                                <span className="ml-2 text-xs font-normal text-muted-foreground">
                                                    {appointment.age} yrs · {appointment.gender}
                                                </span>
                                            </h3>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {appointment.type} — {appointment.reason}
                                            </p>
                                            {appointment.status === 'completed' && appointment.diagnosis && (
                                                <p className="mt-1 text-xs text-green-700">
                                                    Diagnosis: {appointment.diagnosis}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 sm:justify-end">
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-card-foreground">
                                                {formatTime(appointment.time)}
                                            </p>
                                            <span
                                                className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                                            >
                                                {status.label}
                                            </span>
                                        </div>

                                        {isOpen && (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => startConsultation(appointment)}
                                                    disabled={!canStart}
                                                    title={
                                                        inProgress
                                                            ? 'Finish the current consultation first'
                                                            : availability === 'off'
                                                              ? 'You are marked off duty'
                                                              : 'Start consultation'
                                                    }
                                                    aria-label={`Start consultation with ${appointment.patient}`}
                                                    className="rounded-lg bg-primary p-2 text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                                                >
                                                    <Play size={14} />
                                                </button>
                                                <button
                                                    onClick={() => markNoShow(appointment)}
                                                    title="Mark as no-show"
                                                    aria-label={`Mark ${appointment.patient} as no-show`}
                                                    className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted"
                                                >
                                                    <UserX size={14} />
                                                </button>
                                                <button
                                                    onClick={() => cancelAppointment(appointment)}
                                                    title="Cancel appointment"
                                                    aria-label={`Cancel appointment for ${appointment.patient}`}
                                                    className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted"
                                                >
                                                    <Ban size={14} />
                                                </button>
                                            </div>
                                        )}

                                        {appointment.status === 'in-progress' && (
                                            <button
                                                onClick={() => setFinishing(appointment)}
                                                className="rounded-lg border border-primary px-3 py-1.5 text-xs font-medium text-primary hover:bg-secondary"
                                            >
                                                Finish
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right rail */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <h2 className="font-semibold text-card-foreground">Quick Actions</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Quickly access your common tasks.</p>

                        <div className="mt-5 space-y-3">
                            <button className="flex w-full items-center gap-3 rounded-lg border border-border p-4 text-left transition hover:bg-muted">
                                <div className="rounded-lg bg-secondary p-2">
                                    <CalendarDays size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-card-foreground">View Appointments</p>
                                    <p className="text-xs text-muted-foreground">Manage your schedule</p>
                                </div>
                            </button>

                            <button className="flex w-full items-center gap-3 rounded-lg border border-border p-4 text-left transition hover:bg-muted">
                                <div className="rounded-lg bg-secondary p-2">
                                    <Users size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-card-foreground">My Patients</p>
                                    <p className="text-xs text-muted-foreground">
                                        {TOTAL_PATIENTS} patient records
                                    </p>
                                </div>
                            </button>

                            <button className="flex w-full items-center gap-3 rounded-lg border border-border p-4 text-left transition hover:bg-muted">
                                <div className="rounded-lg bg-secondary p-2">
                                    <FileText size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-card-foreground">Patient History</p>
                                    <p className="text-xs text-muted-foreground">Review medical history</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Today's slots */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-card-foreground">Today's Slots</h2>
                            <span className="text-xs text-muted-foreground">{freeSlots} free</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">30-minute slots, 9:00 AM to 5:00 PM.</p>

                        <div className="mt-4 grid grid-cols-4 gap-2">
                            {slots.map((slot) => (
                                <div
                                    key={slot.time}
                                    className={`rounded-md px-1 py-1.5 text-center text-xs font-medium ${
                                        slot.booked
                                            ? 'bg-secondary text-primary'
                                            : 'border border-dashed border-border text-muted-foreground'
                                    }`}
                                    title={slot.booked ? 'Booked' : 'Free'}
                                >
                                    {formatTime(slot.time).replace(' ', '').replace(/^0/, '')}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Follow-ups due */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center gap-2">
                            <CalendarClock size={18} className="text-primary" />
                            <h2 className="font-semibold text-card-foreground">Follow-ups Due</h2>
                        </div>

                        <div className="mt-4 space-y-3">
                            {followUps.map((item) => (
                                <div key={item.id} className="flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-card-foreground">
                                            {item.patient}
                                        </p>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {item.due} · {item.note}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => sendReminder(item.id)}
                                        disabled={item.reminded}
                                        className="flex shrink-0 items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-secondary disabled:text-muted-foreground disabled:hover:bg-transparent"
                                    >
                                        <Send size={12} />
                                        {item.reminded ? 'Sent' : 'Remind'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Weekly load */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <h2 className="font-semibold text-card-foreground">This Week</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Appointments per day.</p>

                        <div className="mt-5 flex h-28 items-end justify-between gap-2">
                            {WEEK_LOAD.map((d) => (
                                <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
                                    <span className="text-xs text-muted-foreground">{d.count}</span>
                                    <div
                                        className="w-full rounded-t-md bg-primary/80"
                                        style={{ height: `${(d.count / maxWeek) * 72}px` }}
                                    />
                                    <span className="text-xs text-muted-foreground">{d.day}</span>
                                </div>
                            ))}
                        </div>
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

            {finishing && (
                <ConsultationModal
                    appointment={finishing}
                    onClose={() => setFinishing(null)}
                    onSave={completeConsultation}
                />
            )}
        </div>
    );
};

export default Doctor;