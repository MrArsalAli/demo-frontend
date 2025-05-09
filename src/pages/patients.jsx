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
import { Label } from "../components/ui/label";
import {
  Search,
  Plus,
  MoreVertical,
  FileEdit,
  Trash2,
  FileText,
} from "lucide-react";

// Mock data for patients
const initialPatients = [
  {
    id: "P-1001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    contact: "555-123-4567",
    address: "123 Main St",
    bloodType: "O+",
    lastVisit: "2023-04-15",
  },
  {
    id: "P-1002",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    contact: "555-234-5678",
    address: "456 Oak Ave",
    bloodType: "A-",
    lastVisit: "2023-05-20",
  },
  {
    id: "P-1003",
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    contact: "555-345-6789",
    address: "789 Pine Rd",
    bloodType: "B+",
    lastVisit: "2023-03-10",
  },
  {
    id: "P-1004",
    name: "Emily Davis",
    age: 27,
    gender: "Female",
    contact: "555-456-7890",
    address: "101 Elm St",
    bloodType: "AB+",
    lastVisit: "2023-06-05",
  },
  {
    id: "P-1005",
    name: "Robert Wilson",
    age: 63,
    gender: "Male",
    contact: "555-567-8901",
    address: "202 Maple Dr",
    bloodType: "O-",
    lastVisit: "2023-02-28",
  },
  {
    id: "P-1006",
    name: "Jennifer Lee",
    age: 41,
    gender: "Female",
    contact: "555-678-9012",
    address: "303 Cedar Ln",
    bloodType: "A+",
    lastVisit: "2023-05-12",
  },
  {
    id: "P-1007",
    name: "David Miller",
    age: 52,
    gender: "Male",
    contact: "555-789-0123",
    address: "404 Birch Blvd",
    bloodType: "B-",
    lastVisit: "2023-04-22",
  },
  {
    id: "P-1008",
    name: "Lisa Garcia",
    age: 36,
    gender: "Female",
    contact: "555-890-1234",
    address: "505 Walnut St",
    bloodType: "AB-",
    lastVisit: "2023-06-18",
  },
];

export default function Patients() {
  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPatient, setNewPatient] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    bloodType: "",
    lastVisit: new Date().toISOString().split("T")[0],
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a new patient
  const handleAddPatient = () => {
    const patientId = `P-${1000 + patients.length + 1}`;
    const patientWithId = { ...newPatient, id: patientId };
    setPatients([...patients, patientWithId]);
    setNewPatient({
      id: "",
      name: "",
      age: "",
      gender: "",
      contact: "",
      address: "",
      bloodType: "",
      lastVisit: new Date().toISOString().split("T")[0],
    });
    setIsAddDialogOpen(false);
  };

  // Handle deleting a patient
  const handleDeletePatient = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Patient Management
        </h1>
        <p className="text-muted-foreground">View and manage patient records</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>
                Enter the patient details below to create a new record.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newPatient.name}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newPatient.age}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, age: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input
                    id="gender"
                    value={newPatient.gender}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, gender: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Input
                    id="bloodType"
                    value={newPatient.bloodType}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        bloodType: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  value={newPatient.contact}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, contact: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newPatient.address}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, address: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddPatient}>Add Patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Blood Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.bloodType}</TableCell>
                  <TableCell>{patient.contact}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
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
                          Edit Patient
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeletePatient(patient.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Patient
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No patients found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
