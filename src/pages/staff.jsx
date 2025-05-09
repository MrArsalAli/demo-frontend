"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Search,
  Plus,
  MoreVertical,
  FileEdit,
  Trash2,
  FileText,
  UserCog,
  Users,
  Stethoscope,
  Syringe,
  Microscope,
  Pill,
} from "lucide-react";
import { Badge } from "../components/ui/badge";

// Mock data for staff
const initialStaff = [
  {
    id: "S-1001",
    name: "Dr. James Williams",
    role: "Doctor",
    department: "Cardiology",
    specialization: "Interventional Cardiology",
    contact: "555-111-2222",
    email: "jwilliams@hospital.com",
    status: "Active",
  },
  {
    id: "S-1002",
    name: "Dr. Maria Martinez",
    role: "Doctor",
    department: "Obstetrics",
    specialization: "Maternal-Fetal Medicine",
    contact: "555-222-3333",
    email: "mmartinez@hospital.com",
    status: "Active",
  },
  {
    id: "S-1003",
    name: "Dr. Robert Thompson",
    role: "Doctor",
    department: "Neurology",
    specialization: "Neurosurgery",
    contact: "555-333-4444",
    email: "rthompson@hospital.com",
    status: "Active",
  },
  {
    id: "S-1004",
    name: "Nurse Sarah Johnson",
    role: "Nurse",
    department: "Emergency",
    specialization: "Trauma Care",
    contact: "555-444-5555",
    email: "sjohnson@hospital.com",
    status: "Active",
  },
  {
    id: "S-1005",
    name: "Nurse Michael Brown",
    role: "Nurse",
    department: "Pediatrics",
    specialization: "Neonatal Care",
    contact: "555-555-6666",
    email: "mbrown@hospital.com",
    status: "On Leave",
  },
  {
    id: "S-1006",
    name: "Tech Emily Davis",
    role: "Lab Technician",
    department: "Pathology",
    specialization: "Hematology",
    contact: "555-666-7777",
    email: "edavis@hospital.com",
    status: "Active",
  },
  {
    id: "S-1007",
    name: "Admin Lisa Garcia",
    role: "Administrative",
    department: "Front Desk",
    specialization: "Patient Registration",
    contact: "555-777-8888",
    email: "lgarcia@hospital.com",
    status: "Active",
  },
  {
    id: "S-1008",
    name: "Pharm David Miller",
    role: "Pharmacist",
    department: "Pharmacy",
    specialization: "Clinical Pharmacy",
    contact: "555-888-9999",
    email: "dmiller@hospital.com",
    status: "Active",
  },
];

// Department options
const departments = [
  "Cardiology",
  "Obstetrics",
  "Neurology",
  "Emergency",
  "Pediatrics",
  "Pathology",
  "Radiology",
  "Pharmacy",
  "Orthopedics",
  "Dermatology",
  "Ophthalmology",
  "Psychiatry",
  "Oncology",
  "Urology",
  "Front Desk",
];

// Role options
const roles = [
  "Doctor",
  "Nurse",
  "Lab Technician",
  "Administrative",
  "Pharmacist",
  "Therapist",
];

export default function Staff() {
  const [staff, setStaff] = useState(initialStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "",
    department: "",
    specialization: "",
    contact: "",
    email: "",
    status: "Active",
  });

  // Filter staff based on search term and active tab
  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return (
      matchesSearch && member.role.toLowerCase() === activeTab.toLowerCase()
    );
  });

  // Handle adding a new staff member
  const handleAddStaff = () => {
    const staffId = `S-${1000 + staff.length + 1}`;
    const staffWithId = { ...newStaff, id: staffId };
    setStaff([...staff, staffWithId]);
    setNewStaff({
      name: "",
      role: "",
      department: "",
      specialization: "",
      contact: "",
      email: "",
      status: "Active",
    });
    setIsAddDialogOpen(false);
  };

  // Handle deleting a staff member
  const handleDeleteStaff = (id) => {
    setStaff(staff.filter((member) => member.id !== id));
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch (role) {
      case "Doctor":
        return <Stethoscope className="h-4 w-4" />;
      case "Nurse":
        return <Syringe className="h-4 w-4" />;
      case "Lab Technician":
        return <Microscope className="h-4 w-4" />;
      case "Pharmacist":
        return <Pill className="h-4 w-4" />;
      default:
        return <UserCog className="h-4 w-4" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Active
          </Badge>
        );
      case "On Leave":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 border-amber-300"
          >
            On Leave
          </Badge>
        );
      case "Inactive":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-300"
          >
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
        <p className="text-muted-foreground">
          Manage hospital staff and personnel
        </p>
      </div>

      <Tabs
        defaultValue="all"
        className="space-y-4"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              All Staff
            </TabsTrigger>
            <TabsTrigger value="doctor" className="flex items-center gap-1">
              <Stethoscope className="h-4 w-4" />
              Doctors
            </TabsTrigger>
            <TabsTrigger value="nurse" className="flex items-center gap-1">
              <Syringe className="h-4 w-4" />
              Nurses
            </TabsTrigger>
            <TabsTrigger
              value="lab technician"
              className="flex items-center gap-1"
            >
              <Microscope className="h-4 w-4" />
              Lab Techs
            </TabsTrigger>
          </TabsList>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogDescription>
                  Enter the staff details below to create a new record.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newStaff.name}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      onValueChange={(value) =>
                        setNewStaff({ ...newStaff, role: value })
                      }
                      value={newStaff.role}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      onValueChange={(value) =>
                        setNewStaff({ ...newStaff, department: value })
                      }
                      value={newStaff.department}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={newStaff.specialization}
                    onChange={(e) =>
                      setNewStaff({
                        ...newStaff,
                        specialization: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input
                      id="contact"
                      value={newStaff.contact}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, contact: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newStaff.email}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, email: e.target.value })
                      }
                    />
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
                <Button onClick={handleAddStaff}>Add Staff</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search staff..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.id}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRoleIcon(member.role)}
                          {member.role}
                        </div>
                      </TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{member.contact}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Edit Staff
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteStaff(member.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Staff
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No staff members found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="doctor" className="space-y-4">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.id}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{member.specialization}</TableCell>
                      <TableCell>{member.contact}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Edit Staff
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteStaff(member.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Staff
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No doctors found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="nurse" className="space-y-4">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.id}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{member.specialization}</TableCell>
                      <TableCell>{member.contact}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Edit Staff
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteStaff(member.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Staff
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No nurses found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="lab technician" className="space-y-4">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.id}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{member.specialization}</TableCell>
                      <TableCell>{member.contact}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Edit Staff
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteStaff(member.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Staff
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No lab technicians found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
