import React, { useMemo, useState } from "react";
import {
  Search,
  MoreHorizontal,
  CalendarDays,
  Clock3,
  Users,
  UserCheck,
  UserX,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Stethoscope,
  MapPin,
  Video,
  X,
} from "lucide-react";

import {
  Modal,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";

// ======================================================
// MOCK APPOINTMENTS DATA
// ======================================================

const appointmentsData = [
  {
    id: 1,
    patient: {
      name: "Ali Khan",
      email: "ali.khan@gmail.com",
      phone: "+92 300 1234567",
    },
    doctor: {
      name: "Dr. Ahmed Raza",
      specialization: "Cardiologist",
    },
    date: "2026-09-08",
    time: "09:00 AM",
    type: "In Person",
    reason: "Chest pain and regular checkup",
    status: "Confirmed",
    createdAt: "2026-09-05",
  },
  {
    id: 2,
    patient: {
      name: "Sara Ahmed",
      email: "sara.ahmed@gmail.com",
      phone: "+92 301 9876543",
    },
    doctor: {
      name: "Dr. Fatima Noor",
      specialization: "Dermatologist",
    },
    date: "2026-09-08",
    time: "10:30 AM",
    type: "In Person",
    reason: "Skin allergy",
    status: "Completed",
    createdAt: "2026-09-04",
  },
  {
    id: 3,
    patient: {
      name: "Hamza Malik",
      email: "hamza.malik@gmail.com",
      phone: "+92 302 4567890",
    },
    doctor: {
      name: "Dr. Usman Tariq",
      specialization: "Neurologist",
    },
    date: "2026-09-08",
    time: "11:00 AM",
    type: "Video Call",
    reason: "Frequent headaches",
    status: "Pending",
    createdAt: "2026-09-07",
  },
  {
    id: 4,
    patient: {
      name: "Ayesha Khan",
      email: "ayesha.khan@gmail.com",
      phone: "+92 303 1122334",
    },
    doctor: {
      name: "Dr. Ahmed Raza",
      specialization: "Cardiologist",
    },
    date: "2026-09-08",
    time: "01:00 PM",
    type: "In Person",
    reason: "Blood pressure consultation",
    status: "Confirmed",
    createdAt: "2026-09-06",
  },
  {
    id: 5,
    patient: {
      name: "Bilal Shah",
      email: "bilal.shah@gmail.com",
      phone: "+92 304 9988776",
    },
    doctor: {
      name: "Dr. Maria Hassan",
      specialization: "Pediatrician",
    },
    date: "2026-09-08",
    time: "02:30 PM",
    type: "In Person",
    reason: "Child fever",
    status: "Cancelled",
    createdAt: "2026-09-05",
  },
  {
    id: 6,
    patient: {
      name: "Hassan Ali",
      email: "hassan.ali@gmail.com",
      phone: "+92 305 4455667",
    },
    doctor: {
      name: "Dr. Fatima Noor",
      specialization: "Dermatologist",
    },
    date: "2026-09-09",
    time: "09:30 AM",
    type: "Video Call",
    reason: "Acne consultation",
    status: "Confirmed",
    createdAt: "2026-09-07",
  },
  {
    id: 7,
    patient: {
      name: "Maham Iqbal",
      email: "maham.iqbal@gmail.com",
      phone: "+92 306 7788990",
    },
    doctor: {
      name: "Dr. Usman Tariq",
      specialization: "Neurologist",
    },
    date: "2026-09-09",
    time: "11:30 AM",
    type: "In Person",
    reason: "Migraine consultation",
    status: "Pending",
    createdAt: "2026-09-08",
  },
  {
    id: 8,
    patient: {
      name: "Usman Ahmed",
      email: "usman.ahmed@gmail.com",
      phone: "+92 307 2233445",
    },
    doctor: {
      name: "Dr. Ahmed Raza",
      specialization: "Cardiologist",
    },
    date: "2026-09-09",
    time: "03:00 PM",
    type: "In Person",
    reason: "Heart examination",
    status: "Confirmed",
    createdAt: "2026-09-07",
  },
  {
    id: 9,
    patient: {
      name: "Zainab Fatima",
      email: "zainab.fatima@gmail.com",
      phone: "+92 308 6677889",
    },
    doctor: {
      name: "Dr. Maria Hassan",
      specialization: "Pediatrician",
    },
    date: "2026-09-10",
    time: "10:00 AM",
    type: "In Person",
    reason: "Routine child checkup",
    status: "Confirmed",
    createdAt: "2026-09-08",
  },
  {
    id: 10,
    patient: {
      name: "Saad Rauf",
      email: "saad.rauf@gmail.com",
      phone: "+92 309 3344556",
    },
    doctor: {
      name: "Dr. Fatima Noor",
      specialization: "Dermatologist",
    },
    date: "2026-09-10",
    time: "12:00 PM",
    type: "Video Call",
    reason: "Skin infection",
    status: "Cancelled",
    createdAt: "2026-09-06",
  },
  {
    id: 11,
    patient: {
      name: "Maryam Asif",
      email: "maryam.asif@gmail.com",
      phone: "+92 310 8899001",
    },
    doctor: {
      name: "Dr. Usman Tariq",
      specialization: "Neurologist",
    },
    date: "2026-09-11",
    time: "09:00 AM",
    type: "In Person",
    reason: "Neurological consultation",
    status: "Pending",
    createdAt: "2026-09-08",
  },
  {
    id: 12,
    patient: {
      name: "Omar Farooq",
      email: "omar.farooq@gmail.com",
      phone: "+92 311 5566778",
    },
    doctor: {
      name: "Dr. Ahmed Raza",
      specialization: "Cardiologist",
    },
    date: "2026-09-11",
    time: "02:00 PM",
    type: "In Person",
    reason: "Follow-up appointment",
    status: "Completed",
    createdAt: "2026-09-07",
  },
];

// ======================================================
// FILTER OPTIONS
// ======================================================

const statusOptions = [
  "All Status",
  "Confirmed",
  "Pending",
  "Completed",
  "Cancelled",
];

const doctorOptions = [
  "All Doctors",
  "Dr. Ahmed Raza",
  "Dr. Fatima Noor",
  "Dr. Usman Tariq",
  "Dr. Maria Hassan",
];

// ======================================================
// MAIN COMPONENT
// ======================================================

const Appointments = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [doctorFilter, setDoctorFilter] = useState("All Doctors");
  const [dateFilter, setDateFilter] = useState("");

  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // ====================================================
  // FILTER APPOINTMENTS
  // ====================================================

  const filteredAppointments = useMemo(() => {
    return appointmentsData.filter((appointment) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        appointment.patient.name.toLowerCase().includes(searchValue) ||
        appointment.patient.email.toLowerCase().includes(searchValue) ||
        appointment.patient.phone.includes(searchValue) ||
        appointment.doctor.name.toLowerCase().includes(searchValue) ||
        appointment.doctor.specialization
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" ||
        appointment.status === statusFilter;

      const matchesDoctor =
        doctorFilter === "All Doctors" ||
        appointment.doctor.name === doctorFilter;

      const matchesDate =
        !dateFilter || appointment.date === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDoctor &&
        matchesDate
      );
    });
  }, [search, statusFilter, doctorFilter, dateFilter]);

  // ====================================================
  // STATISTICS
  // ====================================================

  const totalAppointments = appointmentsData.length;

  const confirmedAppointments = appointmentsData.filter(
    (appointment) => appointment.status === "Confirmed"
  ).length;

  const pendingAppointments = appointmentsData.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  const cancelledAppointments = appointmentsData.filter(
    (appointment) => appointment.status === "Cancelled"
  ).length;

  const completedAppointments = appointmentsData.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  // ====================================================
  // VIEW APPOINTMENT
  // ====================================================

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenViewModal(true);
  };

  // ====================================================
  // CLOSE MODAL
  // ====================================================

  const handleCloseModal = () => {
    setOpenViewModal(false);
    setSelectedAppointment(null);
  };

  // ====================================================
  // GET INITIALS
  // ====================================================

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-full min-h-screen bg-background">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="px-6 py-6 border-b border-border bg-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Appointments
            </h1>

            <p className="text-sm text-muted-foreground mt-1">
              Manage and monitor all patient appointments
            </p>
          </div>

          <div className="flex items-center gap-2">

            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background">
              <CalendarDays
                size={16}
                className="text-muted-foreground"
              />

              <span className="text-sm text-foreground">
                {filteredAppointments.length} appointments
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ==================================================
          PAGE CONTENT
      ================================================== */}

      <div className="p-6 space-y-6">

        {/* ==================================================
            STAT CARDS
        ================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">

          <StatCard
            title="Total Appointments"
            value={totalAppointments}
            icon={CalendarDays}
          />

          <StatCard
            title="Confirmed"
            value={confirmedAppointments}
            icon={CheckCircle2}
          />

          <StatCard
            title="Pending"
            value={pendingAppointments}
            icon={Clock3}
          />

          <StatCard
            title="Completed"
            value={completedAppointments}
            icon={UserCheck}
          />

          <StatCard
            title="Cancelled"
            value={cancelledAppointments}
            icon={UserX}
          />

        </div>

        {/* ==================================================
            APPOINTMENTS CARD
        ================================================== */}

        <div className="bg-card border border-border rounded-xl overflow-hidden">

          {/* ==================================================
              FILTER BAR
          ================================================== */}

          <div className="p-4 border-b border-border">

            <div className="flex flex-col xl:flex-row gap-3">

              {/* Search */}

              <div className="relative flex-1">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                  type="text"
                  placeholder="Search patient or doctor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />

              </div>

              {/* Status */}

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              {/* Doctor */}

              <select
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                className="h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
              >
                {doctorOptions.map((doctor) => (
                  <option key={doctor} value={doctor}>
                    {doctor}
                  </option>
                ))}
              </select>

              {/* Date */}

              <div className="relative">

                <CalendarDays
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />

                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
                />

              </div>

              {/* Clear Filters */}

              {(search ||
                statusFilter !== "All Status" ||
                doctorFilter !== "All Doctors" ||
                dateFilter) && (
                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All Status");
                    setDoctorFilter("All Doctors");
                    setDateFilter("");
                  }}
                  className="h-10 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition"
                >
                  Clear
                </button>
              )}

            </div>

          </div>

          {/* ==================================================
              TABLE
          ================================================== */}

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-border bg-muted/30">

                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Patient
                  </th>

                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Doctor
                  </th>

                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Date & Time
                  </th>

                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Type
                  </th>

                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Status
                  </th>

                  <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (

                    <tr
                      key={appointment.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition"
                    >

                      {/* Patient */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 shrink-0 rounded-full bg-secondary text-primary flex items-center justify-center text-xs font-semibold">
                            {getInitials(
                              appointment.patient.name
                            )}
                          </div>

                          <div className="min-w-0">

                            <p className="text-sm font-medium text-foreground">
                              {appointment.patient.name}
                            </p>

                            <p className="text-xs text-muted-foreground mt-0.5">
                              {appointment.patient.phone}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Doctor */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <Stethoscope size={15} />
                          </div>

                          <div>

                            <p className="text-sm font-medium text-foreground">
                              {appointment.doctor.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {appointment.doctor.specialization}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Date */}

                      <td className="px-5 py-4">

                        <div>

                          <p className="text-sm font-medium text-foreground">
                            {formatDate(appointment.date)}
                          </p>

                          <div className="flex items-center gap-1 mt-1">

                            <Clock3
                              size={13}
                              className="text-muted-foreground"
                            />

                            <span className="text-xs text-muted-foreground">
                              {appointment.time}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* Type */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          {appointment.type === "Video Call" ? (
                            <Video
                              size={15}
                              className="text-muted-foreground"
                            />
                          ) : (
                            <MapPin
                              size={15}
                              className="text-muted-foreground"
                            />
                          )}

                          <span className="text-sm text-foreground">
                            {appointment.type}
                          </span>

                        </div>

                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">

                        <StatusBadge
                          status={appointment.status}
                        />

                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">

                        <div className="flex items-center justify-end gap-1">

                          <button
                            onClick={() =>
                              handleViewAppointment(
                                appointment
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition"
                            title="View appointment"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition"
                            title="Edit appointment"
                          >
                            <Edit size={16} />
                          </button>

                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                            title="Delete appointment"
                          >
                            <Trash2 size={16} />
                          </button>

                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition"
                          >
                            <MoreHorizontal size={17} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="px-5 py-16 text-center"
                    >

                      <div className="flex flex-col items-center">

                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                          <CalendarDays
                            size={22}
                            className="text-muted-foreground"
                          />
                        </div>

                        <p className="text-sm font-medium text-foreground">
                          No appointments found
                        </p>

                        <p className="text-xs text-muted-foreground mt-1">
                          Try changing your search or filters
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* ==================================================
              PAGINATION
          ================================================== */}

          <div className="px-5 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">

            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredAppointments.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {appointmentsData.length}
              </span>{" "}
              appointments
            </p>

            <div className="flex items-center gap-1">

              <button
                disabled
                className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground disabled:opacity-50"
              >
                Previous
              </button>

              <button className="w-8 h-8 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                1
              </button>

              <button className="w-8 h-8 rounded-lg border border-border text-sm text-foreground hover:bg-muted transition">
                2
              </button>

              <button className="px-3 py-1.5 rounded-lg border border-border text-sm text-foreground hover:bg-muted transition">
                Next
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================
          VIEW APPOINTMENT MODAL
      ====================================================== */}

      <Modal
        open={openViewModal}
        onClose={handleCloseModal}
        aria-labelledby="appointment-details-modal"
      >

        <Box
          className="bg-card rounded-xl shadow-xl border border-border"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "calc(100% - 32px)",
              sm: 560,
            },
            maxHeight: "90vh",
            overflowY: "auto",
            outline: "none",
          }}
        >

          {selectedAppointment && (
            <>

              {/* Modal Header */}

              <div className="px-6 py-5 border-b border-border flex items-center justify-between">

                <div>

                  <h2 className="text-lg font-semibold text-foreground">
                    Appointment Details
                  </h2>

                  <p className="text-xs text-muted-foreground mt-1">
                    Appointment #{selectedAppointment.id}
                  </p>

                </div>

                <button
                  onClick={handleCloseModal}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition"
                >
                  <X size={18} />
                </button>

              </div>

              {/* Modal Content */}

              <div className="p-6 space-y-6">

                {/* Patient */}

                <div>

                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Patient
                  </p>

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-full bg-secondary text-primary flex items-center justify-center text-sm font-semibold">
                      {getInitials(
                        selectedAppointment.patient.name
                      )}
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-foreground">
                        {selectedAppointment.patient.name}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">

                        <div className="flex items-center gap-1">
                          <Mail
                            size={13}
                            className="text-muted-foreground"
                          />
                          <span className="text-xs text-muted-foreground">
                            {selectedAppointment.patient.email}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Phone
                            size={13}
                            className="text-muted-foreground"
                          />
                          <span className="text-xs text-muted-foreground">
                            {selectedAppointment.patient.phone}
                          </span>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Doctor */}

                <div>

                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Doctor
                  </p>

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Stethoscope size={20} />
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-foreground">
                        {selectedAppointment.doctor.name}
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedAppointment.doctor.specialization}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Appointment Info */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <InfoItem
                    icon={CalendarDays}
                    label="Date"
                    value={formatDate(
                      selectedAppointment.date
                    )}
                  />

                  <InfoItem
                    icon={Clock3}
                    label="Time"
                    value={selectedAppointment.time}
                  />

                  <InfoItem
                    icon={
                      selectedAppointment.type ===
                      "Video Call"
                        ? Video
                        : MapPin
                    }
                    label="Appointment Type"
                    value={selectedAppointment.type}
                  />

                  <div>

                    <p className="text-xs text-muted-foreground mb-2">
                      Status
                    </p>

                    <StatusBadge
                      status={
                        selectedAppointment.status
                      }
                    />

                  </div>

                </div>

                {/* Reason */}

                <div>

                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Reason for Visit
                  </p>

                  <div className="p-3 rounded-lg bg-muted/40 border border-border">

                    <p className="text-sm text-foreground">
                      {selectedAppointment.reason}
                    </p>

                  </div>

                </div>

              </div>

              {/* Modal Footer */}

              <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-2">

                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition"
                >
                  Close
                </button>

                <button
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
                >
                  Edit Appointment
                </button>

              </div>

            </>
          )}

        </Box>

      </Modal>

    </div>
  );
};

// ======================================================
// STAT CARD
// ======================================================

const StatCard = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <p className="text-2xl font-semibold text-foreground mt-2">
            {value}
          </p>

        </div>

        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <Icon size={19} />
        </div>

      </div>

    </div>
  );
};

// ======================================================
// STATUS BADGE
// ======================================================

const StatusBadge = ({ status }) => {

  const statusStyles = {
    Confirmed:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400",

    Pending:
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",

    Completed:
      "bg-green-500/10 text-green-600 dark:text-green-400",

    Cancelled:
      "bg-red-500/10 text-red-600 dark:text-red-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        statusStyles[status] ||
        "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
};

// ======================================================
// INFO ITEM
// ======================================================

const InfoItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div>

      <p className="text-xs text-muted-foreground mb-2">
        {label}
      </p>

      <div className="flex items-center gap-2">

        <Icon
          size={15}
          className="text-primary"
        />

        <p className="text-sm font-medium text-foreground">
          {value}
        </p>

      </div>

    </div>
  );
};

// ======================================================
// DATE FORMATTER
// ======================================================

const formatDate = (date) => {

  return new Date(
    `${date}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

};

export default Appointments;