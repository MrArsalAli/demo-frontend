"use client";

import { useState } from "react";
import {
  CalendarIcon,
  Clock,
  Plus,
  Search,
  MoreVertical,
  FileEdit,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";

// Mock data for appointments
const initialAppointments = [
  {
    id: "A-1001",
    patientId: "P-1001",
    patientName: "John Smith",
    doctor: "Dr. Williams",
    department: "Cardiology",
    date: "2023-05-15",
    time: "09:30",
    status: "Completed",
  },
  {
    id: "A-1002",
    patientId: "P-1002",
    patientName: "Sarah Johnson",
    doctor: "Dr. Martinez",
    department: "Obstetrics",
    date: "2023-05-15",
    time: "10:15",
    status: "Completed",
  },
  {
    id: "A-1003",
    patientId: "P-1003",
    patientName: "Michael Brown",
    doctor: "Dr. Thompson",
    department: "Neurology",
    date: "2023-05-15",
    time: "11:00",
    status: "Cancelled",
  },
  {
    id: "A-1004",
    patientId: "P-1004",
    patientName: "Emily Davis",
    doctor: "Dr. Garcia",
    department: "Orthopedics",
    date: "2023-05-15",
    time: "13:45",
    status: "Scheduled",
  },
  {
    id: "A-1005",
    patientId: "P-1005",
    patientName: "Robert Wilson",
    doctor: "Dr. Chen",
    department: "Pulmonology",
    date: "2023-05-15",
    time: "14:30",
    status: "Scheduled",
  },
  {
    id: "A-1006",
    patientId: "P-1006",
    patientName: "Jennifer Lee",
    doctor: "Dr. Patel",
    department: "Dermatology",
    date: "2023-05-16",
    time: "09:00",
    status: "Scheduled",
  },
  {
    id: "A-1007",
    patientId: "P-1007",
    patientName: "David Miller",
    doctor: "Dr. Wilson",
    department: "Gastroenterology",
    date: "2023-05-16",
    time: "10:30",
    status: "Scheduled",
  },
  {
    id: "A-1008",
    patientId: "P-1008",
    patientName: "Lisa Garcia",
    doctor: "Dr. Johnson",
    department: "Endocrinology",
    date: "2023-05-16",
    time: "11:45",
    status: "Scheduled",
  },
];

// Mock data for doctors
const doctors = [
  { id: "D-1001", name: "Dr. Williams", department: "Cardiology" },
  { id: "D-1002", name: "Dr. Martinez", department: "Obstetrics" },
  { id: "D-1003", name: "Dr. Thompson", department: "Neurology" },
  { id: "D-1004", name: "Dr. Garcia", department: "Orthopedics" },
  { id: "D-1005", name: "Dr. Chen", department: "Pulmonology" },
  { id: "D-1006", name: "Dr. Patel", department: "Dermatology" },
  { id: "D-1007", name: "Dr. Wilson", department: "Gastroenterology" },
  { id: "D-1008", name: "Dr. Johnson", department: "Endocrinology" },
];

// Mock data for patients
const patients = [
  { id: "P-1001", name: "John Smith" },
  { id: "P-1002", name: "Sarah Johnson" },
  { id: "P-1003", name: "Michael Brown" },
  { id: "P-1004", name: "Emily Davis" },
  { id: "P-1005", name: "Robert Wilson" },
  { id: "P-1006", name: "Jennifer Lee" },
  { id: "P-1007", name: "David Miller" },
  { id: "P-1008", name: "Lisa Garcia" },
];

export default function Appointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    doctor: "",
    department: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "09:00",
    status: "Scheduled",
  });

  // Filter appointments based on search term and selected date
  const filteredAppointments = appointments.filter(
    (appointment) =>
      (appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())) &&
      appointment.date === format(date, "yyyy-MM-dd")
  );

  // Handle adding a new appointment
  const handleAddAppointment = () => {
    const appointmentId = `A-${1000 + appointments.length + 1}`;
    const selectedPatient = patients.find(
      (p) => p.id === newAppointment.patientId
    );
    const patientName = selectedPatient ? selectedPatient.name : "";

    const appointmentWithId = {
      ...newAppointment,
      id: appointmentId,
      patientName,
    };

    setAppointments([...appointments, appointmentWithId]);
    setNewAppointment({
      patientId: "",
      doctor: "",
      department: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "09:00",
      status: "Scheduled",
    });
    setIsAddDialogOpen(false);
  };

  // Handle updating appointment status
  const handleUpdateStatus = (id, newStatus) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  // Handle deleting an appointment
  const handleDeleteAppointment = (id) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Completed
          </Badge>
        );
      case "Scheduled":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300"
          >
            Scheduled
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-300"
          >
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Appointment Scheduling
        </h1>
        <p className="text-muted-foreground">
          Manage patient appointments and schedules
        </p>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule New Appointment</DialogTitle>
                  <DialogDescription>
                    Enter the appointment details below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Select
                      onValueChange={(value) =>
                        setNewAppointment({
                          ...newAppointment,
                          patientId: value,
                        })
                      }
                      value={newAppointment.patientId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name} ({patient.id})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor</Label>
                    <Select
                      onValueChange={(value) => {
                        const selectedDoctor = doctors.find(
                          (d) => d.name === value
                        );
                        setNewAppointment({
                          ...newAppointment,
                          doctor: value,
                          department: selectedDoctor
                            ? selectedDoctor.department
                            : "",
                        });
                      }}
                      value={newAppointment.doctor}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.name}>
                            {doctor.name} ({doctor.department})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newAppointment.date
                              ? newAppointment.date
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(newAppointment.date)}
                            onSelect={(newDate) =>
                              newDate &&
                              setNewAppointment({
                                ...newAppointment,
                                date: format(newDate, "yyyy-MM-dd"),
                              })
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Select
                        onValueChange={(value) =>
                          setNewAppointment({ ...newAppointment, time: value })
                        }
                        value={newAppointment.time}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "09:00",
                            "09:30",
                            "10:00",
                            "10:30",
                            "11:00",
                            "11:30",
                            "13:00",
                            "13:30",
                            "14:00",
                            "14:30",
                            "15:00",
                            "15:30",
                            "16:00",
                          ].map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddAppointment}>
                    Schedule Appointment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search appointments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TabsContent value="list" className="space-y-4">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {appointment.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {appointment.patientName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.patientId}
                        </div>
                      </TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.department}</TableCell>
                      <TableCell>
                        {getStatusBadge(appointment.status)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(appointment.id, "Completed")
                              }
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(appointment.id, "Cancelled")
                              }
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Appointment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Edit Appointment
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleDeleteAppointment(appointment.id)
                              }
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Appointment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No appointments found for this date
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent
          value="calendar"
          className="h-[600px] flex items-center justify-center border rounded-md"
        >
          <p className="text-muted-foreground">
            Calendar view would appear here
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
