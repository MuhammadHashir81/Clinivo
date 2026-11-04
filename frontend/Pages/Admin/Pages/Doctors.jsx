import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Loader } from "lucide-react";
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
  Eye,
  EyeOff,
} from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

import {
  Modal,
  Box,
  MenuItem,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";

import { api } from "../../../services/api";

const Doctors = () => {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All Specializations");
  const [doctors, setDoctors] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);


  const limit = 10;

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
    role: "doctor",
  });

  // ================= UPDATE DOCTOR STATE =================

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [staffId, setStaffId] = useState(null);

  const [updateForm, setUpdateForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    consultationFee: "",
    status: "Active",
    bio: "",
  });

  // ================= HANDLE AVAILABILITY STATUS =================

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedDoctor = await api.patch(
        `/doctor/update-status/${id}`,
        { status: newStatus }
      );

      setDoctors((prev) =>
        prev.map((doctor) =>
          doctor._id === id
            ? {
              ...doctor,
              availability: updatedDoctor.availability,
            }
            : doctor
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
        "Something went wrong while updating status"
      );
    }
  };

  // ================= HANDLE UPDATE FORM =================

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open update modal and pre-fill it with selected doctor's data

  const handleOpenUpdateModal = (doctor) => {
    setStaffId(doctor._id);

    setUpdateForm({
      name: doctor.name ?? "",
      email: doctor.email ?? "",
      phone: doctor.phone ?? "",
      specialization: doctor.specialization ?? "",
      experience: doctor.experience ?? "",
      consultationFee: doctor.consultationFee ?? "",
      status: doctor.status ?? "Active",
      bio: doctor.bio ?? "",
    });

    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setStaffId(null);

    setUpdateForm({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      experience: "",
      consultationFee: "",
      status: "Active",
      bio: "",
    });
  };

  // ================= UPDATE DOCTOR =================

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await api.patch(
        `/staff/update/${staffId}`,
        updateForm
      );

      console.log(response);
      toast.success(response.success);

      handleGetAllDoctors();
      handleCloseUpdateModal();
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Something went wrong"
      );

      console.log(error.response?.data || error);
    }
  };

  // ================= HANDLE CREATE FORM =================

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
      password: "",
      specialization: "",
      licenseNumber: "",
      experience: "",
      consultationFee: "",
      status: "Active",
      bio: "",
      role: "doctor",
    });
  };

  // ================= PAGINATION =================

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  // ================= GET ALL DOCTORS =================

  const handleGetAllDoctors = async () => {

    setLoading(true);

    try {
      const response = await api.get(
        `/staff/get-all/doctors?page=${page}&limit=${limit}&search=${search}`
      );


      setDoctors(response.doctors);
      setTotalPages(response.totalPages);
      setTotalDoctors(response.totalDoctors);
      setLoading(false);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGetAllDoctors();
    }, 500);

    return () => clearTimeout(timer);
  }, [page, search]);

  // ================= CREATE DOCTOR =================

  const handleCreateDoctor = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/staff/create", doctorForm);

      toast.success(response.success);
      handleGetAllDoctors();
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error.response.data);
    }

    console.log("Doctor Data:", doctorForm);

    handleCloseModal();
  };

  // ================= DELETE DOCTOR =================

  const handleDelete = async (doctor) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await api.delete(
          `/staff/delete/${doctor._id}`
        );

        await Swal.fire({
          title: "Deleted!",
          text: response.success,
          icon: "success",
        });

        handleGetAllDoctors();
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.error ||
          "Failed to delete staff.",
        icon: "error",
      });
    }
  };



  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8">
      <Toaster />

      {/* ================================
          CREATE DOCTOR MODAL
      ================================= */}

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
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="create-name"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="create-name"
                      required
                      name="name"
                      value={doctorForm.name}
                      onChange={handleDoctorChange}
                      placeholder="Dr. Ali Raza"
                      className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="create-email"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="create-email"
                      type="email"
                      name="email"
                      value={doctorForm.email}
                      onChange={handleDoctorChange}
                      placeholder="doctor@clinivo.pk"
                      className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                    />
                  </div>

                  {/* Password with eye toggle */}
                  <div>
                    <label
                      htmlFor="create-password"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="create-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={doctorForm.password}
                        onChange={handleDoctorChange}
                        placeholder="******"
                        className='w-full rounded-lg border border-border bg-background px-3 py-2 pr-10 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="create-phone"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="create-phone"
                      type="tel"
                      name="phone"
                      value={doctorForm.phone}
                      onChange={handleDoctorChange}
                      placeholder="+92 300 1234567"
                      className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                    />
                  </div>

                  {/* Specialization */}
                  <div>
                    <label
                      htmlFor="create-specialization"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Specialization
                    </label>
                    <input
                      id="create-specialization"
                      type="text"
                      name="specialization"
                      value={doctorForm.specialization}
                      onChange={handleDoctorChange}
                      placeholder="Cardiology"
                      className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Professional Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>

                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      id="experience"
                      label="Years of Experience"
                      name="experience"
                      value={doctorForm.experience}
                      onChange={handleDoctorChange}
                      placeholder="5"
                      size="small"
                      className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                    />
                  </div>

                  <div>

                    <label
                      htmlFor="consultationFee"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Consultation Fee
                    </label>
                    <input
                      type="number"
                      id="consultationFee"
                      label="Consultation Fee"
                      name="consultationFee"
                      value={doctorForm.consultationFee}
                      onChange={handleDoctorChange}
                      className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                    />
                  </div>

                </div>
              </div>

              {/* Bio */}

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Additional Information
                </h3>

                <textarea
                  className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                  rows={4}
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

      {/* ================================
          UPDATE DOCTOR MODAL
      ================================= */}

      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby="update-doctor-modal"
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
                id="update-doctor-modal"
                className="text-lg font-semibold text-foreground"
              >
                Update Doctor
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Edit the doctor's details.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseUpdateModal}
              className="p-2 rounded-lg hover:bg-muted transition"
            >
              <X size={20} className="text-muted-foreground cursor-pointer" />
            </button>
          </div>

          {/* Form */}

          <form onSubmit={handleSubmitUpdate}>
            <div className="p-6 space-y-5">
              {/* Basic Information */}

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>

                    <label htmlFor="dr-name"
                      className="block text-sm font-medium text-foreground mb-1.5">Doctor Name</label>
                    <input
                      type="text"
                      id="dr-name"
                      name="name"
                      value={updateForm.name}
                      onChange={handleUpdateChange}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary "

                    />
                  </div>

                  <div>
                    <label htmlFor="dr-email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                    >Email Address</label>
                    <input
                      type="email"
                      id="dr-email"
                      name="email"
                      value={updateForm.email}
                      onChange={handleUpdateChange}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary "
                    />
                  </div>

                  <div>



                    <label htmlFor="dr-phone"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="dr-phone"
                      name="phone"
                      value={updateForm.phone}
                      onChange={handleUpdateChange}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary "
                    />
                  </div>

                  <div>


                    <label htmlFor="dr-specialization"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Specialization
                    </label>
                    <input
                      type="text"
                      id="dr-specialization"
                      name="specialization"
                      value={updateForm.specialization}
                      onChange={handleUpdateChange}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary "
                    />
                  </div>

                  <div>
                    <label htmlFor="specialization"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Specialization
                    </label>
                    <input
                      type="text"
                      required
                      id="specialization"
                      label="Specialization"
                      name="specialization"
                      value={updateForm.specialization}
                      onChange={handleUpdateChange}
                      size="small"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                    />

                  </div>
                </div>
              </div>

              {/* Professional Information */}

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Professional Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    type="number"
                    label="Years of Experience"
                    name="experience"
                    value={updateForm.experience}
                    onChange={handleUpdateChange}
                    size="small"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                  />

                  <input
                    type="number"
                    label="Consultation Fee"
                    name="consultationFee"
                    value={updateForm.consultationFee}
                    onChange={handleUpdateChange}
                    size="small"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                  />

                </div>
              </div>

              {/* Bio */}

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Additional Information
                </h3>

                <textarea     
                  rows={4}
                  label="Doctor Bio"
                  name="bio"
                  value={updateForm.bio}
                  onChange={handleUpdateChange}
                  placeholder="Write a short description about the doctor..."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Footer */}

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/20">
              <button
                type="button"
                onClick={handleCloseUpdateModal}
                className="cursor-pointer h-10 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="cursor-pointer h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
              >
                Update Doctor
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* ================= HEADER ================= */}

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

      {/* ================= STATISTICS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <StatCard
          title="Total Doctors"
          value={totalDoctors}
          icon={Stethoscope}
        />

        <StatCard
          title="Active Doctors"
          value={"activeDoctors"}
          icon={UserCheck}
        />

        <StatCard
          title="Inactive Doctors"
          value={"inactiveDoctors"}
          icon={UserX}
        />

        <StatCard
          title="Total Appointments"
          value={"totalAppointments"}
          icon={CalendarDays}
        />
      </div>

      {/* ================= DOCTORS TABLE ================= */}

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
                  Fee
                </th>

                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Joined
                </th>

                <th className="px-5 py-3">
                  Actions
                </th>

                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Availability
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader
                        size={30}
                        className="animate-spin text-primary"
                      />

                    </div>
                  </td>
                </tr>
              ) :

                doctors.length > 0 ? (
                  doctors.map((doctor) => (
                    <tr
                      key={doctor._id}
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
                              {doctor.email}
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

                      {/* Fee */}

                      <td className="px-5 py-4">
                        <p>{doctor.consultationFee}</p>
                      </td>

                      {/* Joined */}

                      <td className="px-5 py-4 text-muted-foreground">
                        {new Date(doctor.date).toLocaleDateString("en-GB")}
                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            className="cursor-pointer text-blue-500"
                            onClick={() => handleOpenUpdateModal(doctor)}
                          >
                            Edit
                          </button>

                          <button
                            className="cursor-pointer text-red-500"
                            onClick={() => handleDelete(doctor)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>

                      {/* MUI AVAILABILITY SELECT */}

                      <td className="px-5 py-4">
                        <TextField
                          select
                          size="small"
                          value={doctor.availability || "available"}
                          onChange={(e) =>
                            handleStatusChange(doctor._id, e.target.value)
                          }
                          sx={{
                            minWidth: 140,
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px",
                              fontSize: "13px",
                              backgroundColor: "#fff",
                            },
                            "& .MuiSelect-select": {
                              padding: "8px 12px",
                            },
                          }}
                        >
                          <MenuItem value="available">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-green-500" />
                              Available
                            </span>
                          </MenuItem>

                          <MenuItem value="off">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-gray-500" />
                              Off
                            </span>
                          </MenuItem>

                          <MenuItem value="on leave">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-orange-500" />
                              On Leave
                            </span>
                          </MenuItem>

                          <MenuItem value="break">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-blue-500" />
                              Break
                            </span>
                          </MenuItem>
                        </TextField>
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
                )
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {doctors.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {totalDoctors}
            </span>{" "}
            doctors
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={previousPage}
              className="h-9 px-3 rounded-lg border border-border text-sm text-muted-foreground disabled:opacity-50"
            >
              Previous
            </button>

            <button className="h-9 min-w-9 px-3 rounded-lg bg-primary text-primary-foreground text-sm">
              {page}
            </button>

            <button
              onClick={nextPage}
              disabled={page === totalPages}
              className="h-9 px-3 rounded-lg border border-border text-sm text-muted-foreground disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= STAT CARD ================= */

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

/* ================= STATUS BADGE ================= */

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

/* ================= GET INITIALS ================= */

const getInitials = (name = "") => {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export default Doctors;