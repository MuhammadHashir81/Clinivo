import React from "react";
import {
  CalendarDays,
  Users,
  Stethoscope,
  Wallet,
  Clock3,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  {
    title: "Today's Appointments",
    value: "24",
    change: "+12.5%",
    positive: true,
    icon: CalendarDays,
  },
  {
    title: "Total Patients",
    value: "1,284",
    change: "+8.2%",
    positive: true,
    icon: Users,
  },
  {
    title: "Today's Revenue",
    value: "Rs. 84,500",
    change: "+14.6%",
    positive: true,
    icon: Wallet,
  },
  {
    title: "Pending Payments",
    value: "Rs. 32,800",
    change: "-4.3%",
    positive: true,
    icon: Clock3,
  },
];

const appointments = [
  {
    patient: "Ahmed Khan",
    doctor: "Dr. Ali Raza",
    time: "09:30 AM",
    type: "General Checkup",
    status: "Confirmed",
  },
  {
    patient: "Fatima Noor",
    doctor: "Dr. Sara Ahmed",
    time: "10:15 AM",
    type: "Dental",
    status: "Confirmed",
  },
  {
    patient: "Hassan Malik",
    doctor: "Dr. Hamza Shah",
    time: "11:00 AM",
    type: "Cardiology",
    status: "Pending",
  },
  {
    patient: "Ayesha Khan",
    doctor: "Dr. Sara Ahmed",
    time: "12:30 PM",
    type: "Follow Up",
    status: "Cancelled",
  },
  {
    patient: "Usman Ali",
    doctor: "Dr. Ali Raza",
    time: "02:00 PM",
    type: "General Checkup",
    status: "Confirmed",
  },
];

const doctors = [
  {
    name: "Dr. Ali Raza",
    specialty: "General Physician",
    appointments: 42,
  },
  {
    name: "Dr. Sara Ahmed",
    specialty: "Dentist",
    appointments: 38,
  },
  {
    name: "Dr. Hamza Shah",
    specialty: "Cardiologist",
    appointments: 31,
  },
  {
    name: "Dr. Maria Khan",
    specialty: "Dermatologist",
    appointments: 27,
  },
];

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8">
      
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back, Admin. Here's what's happening today.
          </p>
        </div>

        <select className="h-10 rounded-lg border border-border bg-card px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary">
          <option>Today</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>

                  <h2 className="text-2xl font-semibold text-foreground mt-2">
                    {stat.value}
                  </h2>
                </div>

                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
                  <Icon size={20} />
                </div>
              </div>

              <div className="flex items-center gap-1 mt-4 text-xs">
                {stat.positive ? (
                  <ArrowUpRight size={14} className="text-green-600" />
                ) : (
                  <ArrowDownRight size={14} className="text-red-600" />
                )}

                <span
                  className={
                    stat.positive ? "text-green-600" : "text-red-600"
                  }
                >
                  {stat.change}
                </span>

                <span className="text-muted-foreground ml-1">
                  vs last period
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-foreground">
                Revenue Overview
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Revenue generated over the selected period
              </p>
            </div>

            <button className="p-2 rounded-lg hover:bg-muted">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Simple chart placeholder */}
          <div className="h-64 flex items-end gap-3 border-b border-border px-2">
            {[45, 65, 52, 78, 58, 88, 72, 95, 70, 84, 76, 100].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex-1 flex items-end h-full"
                >
                  <div
                    className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition"
                    style={{ height: `${height}%` }}
                  />
                </div>
              )
            )}
          </div>

          <div className="flex justify-between mt-3 text-xs text-muted-foreground">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>

        {/* Appointment Status */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="mb-6">
            <h2 className="font-semibold text-foreground">
              Appointment Status
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Today's appointment breakdown
            </p>
          </div>

          <div className="flex justify-center mb-7">
            <div className="w-40 h-40 rounded-full border-[18px] border-primary relative flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-semibold">24</p>
                <p className="text-xs text-muted-foreground">
                  Appointments
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <StatusRow
              label="Confirmed"
              value="16"
              percentage="67%"
              dot="bg-primary"
            />

            <StatusRow
              label="Pending"
              value="5"
              percentage="21%"
              dot="bg-yellow-500"
            />

            <StatusRow
              label="Cancelled"
              value="3"
              percentage="12%"
              dot="bg-red-500"
            />
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Appointments */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden">

          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <h2 className="font-semibold text-foreground">
                Recent Appointments
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Latest appointments in your clinic
              </p>
            </div>

            <button className="text-sm text-primary font-medium hover:underline">
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Patient
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Doctor
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Time
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={`${appointment.patient}-${appointment.time}`}
                    className="border-b border-border last:border-none hover:bg-muted/40"
                  >
                    <td className="px-5 py-4 font-medium text-foreground">
                      {appointment.patient}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {appointment.doctor}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {appointment.time}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {appointment.type}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={appointment.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Doctors */}
        <div className="bg-card border border-border rounded-xl">

          <div className="p-5 border-b border-border">
            <h2 className="font-semibold text-foreground">
              Most Active Doctors
            </h2>

            <p className="text-xs text-muted-foreground mt-1">
              Doctors with the most appointments
            </p>
          </div>

          <div className="p-5 space-y-5">
            {doctors.map((doctor, index) => (
              <div
                key={doctor.name}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-secondary text-primary flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {doctor.name}
                  </p>

                  <p className="text-xs text-muted-foreground truncate">
                    {doctor.specialty}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {doctor.appointments}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    visits
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary text-primary flex items-center justify-center">
              <Stethoscope size={20} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Upcoming Appointments
              </p>

              <p className="text-xl font-semibold text-foreground mt-1">
                18
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary text-primary flex items-center justify-center">
              <XCircle size={20} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Cancelled Appointments
              </p>

              <p className="text-xl font-semibold text-foreground mt-1">
                3
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const StatusRow = ({ label, value, percentage, dot }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
        <span className="text-sm text-foreground">{label}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{value}</span>
        <span className="text-xs text-muted-foreground">
          {percentage}
        </span>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
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

export default Dashboard;
