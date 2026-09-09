import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Stethoscope,
  Users,
  UserCheck,
  UserX,
  CalendarDays,
  Mail,
  Phone,
  X,
} from "lucide-react";


import {
  Modal,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";

import { api } from "../../../services/api";
import { useEffect } from "react";

const doctorsData = [
  {
    id: 1,
    name: "Dr. Ali Raza",
    email: "ali.raza@clinivo.pk",
    phone: "+92 300 1234567",
    specialization: "General Physician",
    appointments: 142,
    status: "Active",
    joined: "Jan 12, 2026",
  },
  {
    id: 2,
    name: "Dr. Sara Ahmed",
    email: "sara.ahmed@clinivo.pk",
    phone: "+92 301 9876543",
    specialization: "Dentist",
    appointments: 128,
    status: "Active",
    joined: "Feb 04, 2026",
  },
  {
    id: 3,
    name: "Dr. Hamza Shah",
    email: "hamza.shah@clinivo.pk",
    phone: "+92 302 4567890",
    specialization: "Cardiologist",
    appointments: 116,
    status: "Active",
    joined: "Feb 18, 2026",
  },
  {
    id: 4,
    name: "Dr. Maria Khan",
    email: "maria.khan@clinivo.pk",
    phone: "+92 303 2345678",
    specialization: "Dermatologist",
    appointments: 98,
    status: "Active",
    joined: "Mar 02, 2026",
  },
  {
    id: 5,
    name: "Dr. Usman Tariq",
    email: "usman.tariq@clinivo.pk",
    phone: "+92 304 7654321",
    specialization: "Neurologist",
    appointments: 87,
    status: "Inactive",
    joined: "Mar 19, 2026",
  },
  {
    id: 6,
    name: "Dr. Ayesha Malik",
    email: "ayesha.malik@clinivo.pk",
    phone: "+92 305 3456789",
    specialization: "Pediatrician",
    appointments: 76,
    status: "Active",
    joined: "Apr 11, 2026",
  },
  {
    id: 7,
    name: "Dr. Fahad Ahmed",
    email: "fahad.ahmed@clinivo.pk",
    phone: "+92 306 8765432",
    specialization: "Orthopedic",
    appointments: 64,
    status: "Active",
    joined: "May 06, 2026",
  },
  {
    id: 8,
    name: "Dr. Noor Fatima",
    email: "noor.fatima@clinivo.pk",
    phone: "+92 307 5678901",
    specialization: "Gynecologist",
    appointments: 59,
    status: "Inactive",
    joined: "May 21, 2026",
  },
];

const specializations = [
  "All Specializations",
  "General Physician",
  "Dentist",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Orthopedic",
  "Gynecologist",
];



const Doctors = () => {

  console.log('rendering....')
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] =
    useState("All Specializations");

  const [openModal, setOpenModal] = useState(false);

  const [doctorForm, setDoctorForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    experience: "",
    consultationFee: "",
    bio: "",
    role:"doctor"
  });


  const handleDoctorChange = (e) => {
    const { name, value } = e.target;

    setDoctorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setOpenModal(false);

      setDoctorForm({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        licenseNumber: "",
        experience: "",
        consultationFee: "",
        status: "Active",
        bio: "",
      });
  };

  const handleCreateDoctor = async (e) => {
    e.preventDefault();

    try {
      const result = await api.post('/createStaff/create', doctorForm)
      console.log(result)
    } catch (error) {
      console.log(error.response.data)
    }


    console.log("Doctor Data:", doctorForm);

    handleCloseModal();
  };


  const totalDoctors = doctorsData.length;

  const activeDoctors = doctorsData.filter(
    (doctor) => doctor.status === "Active"
  ).length;

  const inactiveDoctors = doctorsData.filter(
    (doctor) => doctor.status === "Inactive"
  ).length;

  const totalAppointments = doctorsData.reduce(
    (total, doctor) => total + doctor.appointments,
    0
  );

  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8">

      {/* ================================
    CREATE DOCTOR MODAL
================================ */}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="create-doctor-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "92%",
              sm: "600px",
              md: "700px",
            },
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: "12px",
            boxShadow: 24,
            outline: "none",
          }}
        >

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">

            <div>
              <h2
                id="create-doctor-modal"
                className="text-lg font-semibold text-foreground"
              >
                Add New Doctor
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Add a new doctor.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseModal}
              className="p-2 rounded-lg hover:bg-muted transition"
            >
              <X size={20} className="text-muted-foreground cursor-pointer" />
            </button>

          </div>

          {/* Form */}
          <form onSubmit={handleCreateDoctor}>

            <div className="p-6 space-y-5">

              {/* Basic Information */}

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <TextField
                    fullWidth
                    required
                    label="Doctor Name"
                    name="name"
                    value={doctorForm.name}
                    onChange={handleDoctorChange}
                    placeholder="Dr. Ali Raza"
                    size="small"
                  />

                  <TextField
                    fullWidth
                    required
                    type="email"
                    label="Email Address"
                    name="email"
                    value={doctorForm.email}
                    onChange={handleDoctorChange}
                    placeholder="doctor@clinivo.pk"
                    size="small"
                  />

                  <TextField
                    fullWidth
                    required
                    type="password"
                    label="password"
                    name="password"
                    value={doctorForm.password}
                    onChange={handleDoctorChange}
                    placeholder="******"
                    size="small"
                  />

                  <TextField
                    fullWidth
                    required
                    type="tel"
                    label="Phone Number"
                    name="phone"
                    value={doctorForm.phone}
                    onChange={handleDoctorChange}
                    placeholder="+92 300 1234567"
                    size="small"
                  />

                  <TextField
                    select
                    fullWidth
                    required
                    label="Specialization"
                    name="specialization"
                    value={doctorForm.specialization}
                    onChange={handleDoctorChange}
                    size="small"
                  >
                    {specializations
                      .filter(
                        (item) => item !== "All Specializations"
                      )
                      .map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                  </TextField>

                </div>
              </div>

              {/* Professional Information */}

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Professional Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="Years of Experience"
                    name="experience"
                    value={doctorForm.experience}
                    onChange={handleDoctorChange}
                    placeholder="5"
                    size="small"
                  />

                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="Consultation Fee"
                    name="consultationFee"
                    value={doctorForm.consultationFee}
                    onChange={handleDoctorChange}
                    placeholder="2500"
                    inputProps={{ min: 0 }}
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <span className="mr-2 text-sm text-muted-foreground">
                            Rs.
                          </span>
                        ),
                      },
                    }}
                  />


                </div>
              </div>

              {/* Bio */}

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Additional Information
                </h3>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Doctor Bio"
                  name="bio"
                  value={doctorForm.bio}
                  onChange={handleDoctorChange}
                  placeholder="Write a short description about the doctor..."
                />
              </div>

            </div>

            {/* Footer */}

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/20">

              <button
                type="button"
                onClick={handleCloseModal}
                className="cursor-pointer h-10 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="cursor-pointer h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition inline-flex items-center gap-2"
              >
                <Plus size={17} />
                Create Doctor
              </button>

            </div>

          </form>

        </Box>
      </Modal>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">

        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Doctors
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Manage doctors, specializations and their availability.
          </p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="cursor-pointer inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add Doctor
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

        <StatCard
          title="Total Doctors"
          value={totalDoctors}
          icon={Stethoscope}
        />

        <StatCard
          title="Active Doctors"
          value={activeDoctors}
          icon={UserCheck}
        />

        <StatCard
          title="Inactive Doctors"
          value={inactiveDoctors}
          icon={UserX}
        />

        <StatCard
          title="Total Appointments"
          value={totalAppointments}
          icon={CalendarDays}
        />

      </div>

      {/* Doctors Table Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">

        {/* Filters */}
        <div className="p-5 border-b border-border">

          <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-md">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                type="text"
                placeholder="Search doctors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              />

            </div>

            {/* Specialization */}
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
            >
              {specializations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>
              <tr className="border-b border-border text-left">

                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Doctor
                </th>

                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Specialization
                </th>

                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Contact
                </th>

                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Appointments
                </th>

                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Status
                </th>

                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Joined
                </th>

                <th className="px-5 py-3">
                </th>

              </tr>
            </thead>

            <tbody>

              {doctorsData.length > 0 ? (
                doctorsData.map((doctor) => (

                  <tr
                    key={doctor.id}
                    className="border-b border-border last:border-none hover:bg-muted/40 transition"
                  >

                    {/* Doctor */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center font-semibold">
                          {getInitials(doctor.name)}
                        </div>

                        <div>
                          <p className="font-medium text-foreground">
                            {doctor.name}
                          </p>

                          <p className="text-xs text-muted-foreground mt-0.5">
                            ID: DOC-{String(doctor.id).padStart(4, "0")}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Specialization */}
                    <td className="px-5 py-4">

                      <span className="inline-flex items-center gap-2 text-foreground">
                        <Stethoscope
                          size={15}
                          className="text-muted-foreground"
                        />

                        {doctor.specialization}
                      </span>

                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">

                      <div className="space-y-1">

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail size={13} />
                          {doctor.email}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone size={13} />
                          {doctor.phone}
                        </div>

                      </div>

                    </td>

                    {/* Appointments */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <CalendarDays
                          size={15}
                          className="text-muted-foreground"
                        />

                        <span className="font-medium text-foreground">
                          {doctor.appointments}
                        </span>

                      </div>

                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">

                      <StatusBadge status={doctor.status} />

                    </td>

                    {/* Joined */}
                    <td className="px-5 py-4 text-muted-foreground">
                      {doctor.joined}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">

                      <button className="p-2 rounded-lg hover:bg-muted transition">
                        <MoreHorizontal
                          size={18}
                          className="text-muted-foreground"
                        />
                      </button>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground mb-3">
                        <Users size={22} />
                      </div>

                      <p className="font-medium text-foreground">
                        No doctors found
                      </p>

                      <p className="text-sm text-muted-foreground mt-1">
                        Try changing your search or filter.
                      </p>

                    </div>

                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-border">

          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {doctorsData.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {totalDoctors}
            </span>{" "}
            doctors
          </p>

          <div className="flex items-center gap-2">

            <button
              disabled
              className="h-9 px-3 rounded-lg border border-border text-sm text-muted-foreground disabled:opacity-50"
            >
              Previous
            </button>

            <button className="h-9 min-w-9 px-3 rounded-lg bg-primary text-primary-foreground text-sm">
              1
            </button>

            <button className="h-9 px-3 rounded-lg border border-border text-sm hover:bg-muted">
              Next
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

/* ==========================================
   STAT CARD
========================================== */

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <p className="text-2xl font-semibold text-foreground mt-2">
            {value}
          </p>
        </div>

        <div className="w-10 h-10 rounded-lg bg-secondary text-primary flex items-center justify-center">
          <Icon size={20} />
        </div>

      </div>

    </div>
  );
};

/* ==========================================
   STATUS BADGE
========================================== */

const StatusBadge = ({ status }) => {

  const styles = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]
        }`}
    >
      {status}
    </span>
  );
};

/* ==========================================
   GET INITIALS
========================================== */

const getInitials = (name) => {

  return name
    .replace("Dr. ", "")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

};

export default Doctors;

