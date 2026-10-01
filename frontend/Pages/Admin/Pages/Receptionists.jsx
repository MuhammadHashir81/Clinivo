import React, { useEffect, useState } from "react";

import {
  Search,
  Plus,
  MoreHorizontal,
  Users,
  UserCheck,
  UserX,
  CalendarDays,
  Mail,
  Phone,
  X,
  Clock3,
} from "lucide-react";

import {
  Modal,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
import { api } from "../../../services/api";
import toast, {Toaster} from 'react-hot-toast';





/* =========================================================
   RECEPTIONISTS COMPONENT
========================================================= */

const Receptionists = () => {

  const [search, setSearch] = useState("");
  const [receptionists,setReceptionists] = useState([])
  const [page,setPage] = useState(1)
  const [totalPages,setTotalPages] = useState(0)
  const [totalReceptionists,setTotalReceptionists] = useState(0)

  const [statusFilter, setStatusFilter] =
    useState("All Status");

    const shifts = [
  "morning",
  "evening",
];


const limit = 10

  const [openModal, setOpenModal] =
    useState(false);


      const [receptionistForm, setReceptionistForm] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      shift: "",
      role:"receptionist"
    });


    console.log(receptionistForm)

const handleCreateReceptionist = async (e) => {

    e.preventDefault();

    try {
      const response = await api.post('/staff/create', receptionistForm)
      getAllRecepitonists()
      toast.success(response.success)
    } catch (error) {
      toast.error(error.response.data.error)
      console.log(error.response.data)
    }

    console.log(receptionistForm)



    handleCloseModal();
};



 const getAllRecepitonists = async () => {
  try {
    const result = await api.get(`/staff/get-all-receptionists?page=${page}&limit=${limit}&search=${search}`)
    setReceptionists(result.receptionists)
    setTotalReceptionists(result.totalReceptionists)
    setTotalPages(result.totalPages)
    console.log(result)
  } catch (error) {
    console.log(error)
    
  }
}


useEffect(()=>{
   getAllRecepitonists()
},[search,page])





      // previous-next pages

  const previousPage = () => {
    setPage(page - 1)
  }

  const nextPage = () => {
    setPage(page + 1 )
  }


  const handleReceptionistChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setReceptionistForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const handleCloseModal = () => {

    setOpenModal(false);

    setReceptionistForm({
      name: "",
      email: "",
      phone: "",
      shift: "",
      password:"",
      role:"receptionist"
    });
  };




  return (

    <div className="w-full min-h-screen bg-background p-6 lg:p-8">
      <Toaster/>

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">

        <div>

          <h1 className="text-2xl font-semibold text-foreground">
            Receptionists
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Manage reception staff, shifts and appointment activity.
          </p>

        </div>


        {/* ADD RECEPTIONIST */}

        <button
          onClick={() => setOpenModal(true)}
          className="cursor-pointer inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        >

          <Plus size={18} />

          Add Receptionist

        </button>

      </div>


      {/* ===================================================
          STATISTICS
      =================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">


        <StatCard
          title="Total Receptionists"
          value={totalReceptionists}
          icon={Users}
        />


        <StatCard
          title="Active Receptionists"
          value={"activeReceptionists"}
          icon={UserCheck}
        />


        <StatCard
          title="Inactive Receptionists"
          value={"inactiveReceptionists"}
          icon={UserX}
        />


        <StatCard
          title="Appointments Handled"
          value={"totalAppointments"}
          icon={CalendarDays}
        />


      </div>


      {/* ===================================================
          TABLE CARD
      =================================================== */}

      <div className="bg-card border border-border rounded-xl overflow-hidden">


        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="p-5 border-b border-border">

          <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">


            {/* SEARCH */}

            <div className="relative w-full lg:max-w-md">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                type="text"
                placeholder="Search receptionists..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              />

            </div>



          </div>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="overflow-x-auto">

          <table className="w-full text-sm">


            {/* TABLE HEADER */}

            <thead>

              <tr className="border-b border-border text-left">


                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Receptionist
                </th>


                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Contact
                </th>


                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Shift
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
                  actions
                </th>


              </tr>

            </thead>


            {/* TABLE BODY */}

            <tbody>


              {receptionists.length > 0 ? (

                receptionists.map(
                  (receptionist) => (

                    <tr
                      key={receptionist._id}
                      className="border-b border-border last:border-none hover:bg-muted/40 transition"
                    >


                      {/* RECEPTIONIST */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">


                          <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center font-semibold">

                            {getInitials(
                              receptionist.name
                            )}

                          </div>


                          <div>

                            <p className="font-medium text-foreground">
                              {receptionist.name}
                            </p>

                            <p className="text-xs text-muted-foreground mt-0.5">
                              ID: REC-
                              {String(
                                receptionist._id
                              ).padStart(4, "0")}
                            </p>

                          </div>


                        </div>

                      </td>


                      {/* CONTACT */}

                      <td className="px-5 py-4">

                        <div className="space-y-1">


                          <div className="flex items-center gap-2 text-xs text-muted-foreground">

                            <Mail size={13} />

                            {receptionist.email}

                          </div>


                          <div className="flex items-center gap-2 text-xs text-muted-foreground">

                            <Phone size={13} />

                            {receptionist.phone}

                          </div>


                        </div>

                      </td>


                      {/* SHIFT */}

                      <td className="px-5 py-4">

                        <span className="inline-flex items-center gap-2 text-foreground">

                          <Clock3
                            size={15}
                            className="text-muted-foreground"
                          />

                          {receptionist.shift}

                        </span>

                      </td>


                      {/* APPOINTMENTS */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <CalendarDays
                            size={15}
                            className="text-muted-foreground"
                          />

                          <span className="font-medium text-foreground">

                            {receptionist.appointments}

                          </span>

                        </div>

                      </td>


                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <StatusBadge
                          status={
                            receptionist.status
                          }
                        />

                      </td>


                      {/* JOINED */}

                      <td className="px-5 py-4 text-muted-foreground">

                        {new Date(receptionist.date).toLocaleDateString('en-GB')}

                      </td>


                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        <button
                          type="button"
                          className="p-2 rounded-lg hover:bg-muted transition"
                        >

                          <MoreHorizontal
                            size={18}
                            className="text-muted-foreground"
                          />

                        </button>

                      </td>


                    </tr>

                  )
                )

              ) : (


                /* NO RESULTS */

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
                        No receptionists found
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


        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-border">


          <p className="text-sm text-muted-foreground">

            Showing{" "}

            <span className="font-medium text-foreground">

              {receptionists.length}

            </span>{" "}

            of{" "}

            <span className="font-medium text-foreground">

              {totalReceptionists}

            </span>{" "}

            receptionists

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
            className="h-9 px-3 rounded-lg border border-border text-sm hover:bg-muted"
            onClick={nextPage}
            disabled={page === totalPages}
            >

              Next
            </button>


          </div>

        </div>


      </div>


      {/* ===================================================
          CREATE RECEPTIONIST MODAL
      =================================================== */}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="create-receptionist-modal"
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
              md: "650px",
            },

            maxHeight: "90vh",
            overflowY: "auto",

            bgcolor: "background.paper",

            borderRadius: "12px",

            boxShadow: 24,

            outline: "none",
          }}
        >


          {/* =================================================
              MODAL HEADER
          ================================================= */}

          <div className="flex items-center justify-between px-6 py-5 border-b border-border">


            <div>

              <h2
                id="create-receptionist-modal"
                className="text-lg font-semibold text-foreground"
              >
                Add New Receptionist
              </h2>


              <p className="text-sm text-muted-foreground mt-1">
                Add a new receptionist to your Clinivo system.
              </p>

            </div>


            <button
              type="button"
              onClick={handleCloseModal}
              className="p-2 rounded-lg hover:bg-muted transition"
            >

              <X
                size={20}
                className="text-muted-foreground cursor-pointer cursor-pointer"
              />

            </button>


          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={
              handleCreateReceptionist
            }
          >


            <div className="p-6 space-y-6">


              {/* BASIC INFORMATION */}

              <div>

                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Basic Information
                </h3>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                  {/* NAME */}

                  <TextField
                    fullWidth
                    required
                    label="Full Name"
                    name="name"
                    value={
                      receptionistForm.name
                    }
                    onChange={
                      handleReceptionistChange
                    }
                    placeholder="receptionist"
                    size="small"
                  />


                  {/* EMAIL */}

                  <TextField
                    fullWidth
                    required
                    type="email"
                    label="Email Address"
                    name="email"
                    value={
                      receptionistForm.email
                    }
                    onChange={
                      handleReceptionistChange
                    }
                    placeholder="receptionist@clinivo.pk"
                    size="small"
                  />


                  {/* PHONE */}

                  <TextField
                    fullWidth
                    required
                    label="Phone Number"
                    name="phone"
                    value={
                      receptionistForm.phone
                    }
                    onChange={
                      handleReceptionistChange
                    }
                    placeholder="+92 300 1234567"
                    size="small"
                  />

                  <TextField
                    fullWidth
                    required
                    label="Password"
                    name="password"
                    value={
                      receptionistForm.password
                    }
                    onChange={
                      handleReceptionistChange
                    }
                    placeholder="*******"
                    size="small"
                  />


                  {/* SHIFT */}

                  <TextField
                    select
                    fullWidth
                    required
                    label="Shift"
                    name="shift"
                    value={
                      receptionistForm.shift
                    }
                    onChange={
                      handleReceptionistChange
                    }
                    size="small"
                  >

                    {shifts.map(
                      (shift) => (

                        <MenuItem
                          key={shift}
                          value={shift}
                        >
                          {shift}
                        </MenuItem>

                      )
                    )}

                  </TextField>


                </div>

              </div>


              {/* ACCOUNT INFORMATION */}

              


              {/* INFO BOX */}

              <div className="rounded-lg bg-secondary/60 border border-border p-4">

                <div className="flex gap-3">


                  <div className="w-9 h-9 shrink-0 rounded-lg bg-background flex items-center justify-center text-primary">

                    <Users size={18} />

                  </div>


                  <div>

                    <p className="text-sm font-medium text-foreground">
                      Receptionist permissions
                    </p>


                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">

                      Receptionists can manage patients,
                      create and update appointments,
                      and handle basic front-desk operations.

                    </p>

                  </div>


                </div>

              </div>


            </div>


            {/* =================================================
                MODAL FOOTER
            ================================================= */}

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/20">


              <button
                type="button"
                onClick={handleCloseModal}
                className="h-10 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition"
              >
                Cancel
              </button>


              <button
                type="submit"
                className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition inline-flex items-center gap-2"
              >

                <Plus size={17} />

                Create Receptionist

              </button>


            </div>


          </form>


        </Box>

      </Modal>


    </div>
  );
};


/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  title,
  value,
  icon: Icon,
}) => {

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


/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({
  status,
}) => {

  const styles = {

    Active:
      "bg-green-100 text-green-700",

    Inactive:
      "bg-red-100 text-red-700",

  };


  return (

    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
        styles[status]
      }`}
    >
      {status}
    </span>

  );
};


/* =========================================================
   GET INITIALS
========================================================= */

const getInitials = (name) => {

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

};


export default Receptionists;
