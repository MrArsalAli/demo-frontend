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
  Receipt,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Printer,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

// Mock data for invoices
const initialInvoices = [
  {
    id: "INV-1001",
    patientId: "P-1001",
    patientName: "John Smith",
    date: "2023-05-01",
    amount: 1250.0,
    status: "Paid",
    paymentMethod: "Insurance",
    description: "Cardiology Consultation",
  },
  {
    id: "INV-1002",
    patientId: "P-1002",
    patientName: "Sarah Johnson",
    date: "2023-05-02",
    amount: 3500.0,
    status: "Pending",
    paymentMethod: "Insurance",
    description: "Obstetrics Procedures",
  },
  {
    id: "INV-1003",
    patientId: "P-1003",
    patientName: "Michael Brown",
    date: "2023-05-03",
    amount: 750.0,
    status: "Overdue",
    paymentMethod: "Cash",
    description: "Neurology Consultation",
  },
  {
    id: "INV-1004",
    patientId: "P-1004",
    patientName: "Emily Davis",
    date: "2023-05-04",
    amount: 2100.0,
    status: "Paid",
    paymentMethod: "Credit Card",
    description: "Orthopedic Surgery",
  },
  {
    id: "INV-1005",
    patientId: "P-1005",
    patientName: "Robert Wilson",
    date: "2023-05-05",
    amount: 450.0,
    status: "Pending",
    paymentMethod: "Insurance",
    description: "Pulmonology Tests",
  },
  {
    id: "INV-1006",
    patientId: "P-1006",
    patientName: "Jennifer Lee",
    date: "2023-05-06",
    amount: 300.0,
    status: "Paid",
    paymentMethod: "Cash",
    description: "Dermatology Consultation",
  },
  {
    id: "INV-1007",
    patientId: "P-1007",
    patientName: "David Miller",
    date: "2023-05-07",
    amount: 1800.0,
    status: "Cancelled",
    paymentMethod: "Insurance",
    description: "Gastroenterology Procedures",
  },
  {
    id: "INV-1008",
    patientId: "P-1008",
    patientName: "Lisa Garcia",
    date: "2023-05-08",
    amount: 550.0,
    status: "Paid",
    paymentMethod: "Credit Card",
    description: "Endocrinology Consultation",
  },
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

// Payment method options
const paymentMethods = [
  "Insurance",
  "Cash",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
];

export default function Billing() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    patientId: "",
    date: new Date().toISOString().split("T")[0],
    amount: "",
    status: "Pending",
    paymentMethod: "",
    description: "",
  });

  // Calculate totals
  const totalAmount = invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );
  const paidAmount = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices
    .filter((invoice) => invoice.status === "Pending")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const overdueAmount = invoices
    .filter((invoice) => invoice.status === "Overdue")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  // Filter invoices based on search term and active status
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeStatus === "all") return matchesSearch;
    return (
      matchesSearch &&
      invoice.status.toLowerCase() === activeStatus.toLowerCase()
    );
  });

  // Handle adding a new invoice
  const handleAddInvoice = () => {
    const invoiceId = `INV-${1000 + invoices.length + 1}`;
    const selectedPatient = patients.find((p) => p.id === newInvoice.patientId);
    const patientName = selectedPatient ? selectedPatient.name : "";

    const invoiceWithId = {
      ...newInvoice,
      id: invoiceId,
      patientName,
      amount: Number.parseFloat(newInvoice.amount),
    };

    setInvoices([...invoices, invoiceWithId]);
    setNewInvoice({
      patientId: "",
      date: new Date().toISOString().split("T")[0],
      amount: "",
      status: "Pending",
      paymentMethod: "",
      description: "",
    });
    setIsAddDialogOpen(false);
  };

  // Handle updating invoice status
  const handleUpdateStatus = (id, newStatus) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, status: newStatus } : invoice
      )
    );
  };

  // Handle deleting an invoice
  const handleDeleteInvoice = (id) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Paid
          </Badge>
        );
      case "Pending":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300"
          >
            Pending
          </Badge>
        );
      case "Overdue":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-300"
          >
            Overdue
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 border-gray-300"
          >
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Billing & Finance</h1>
        <p className="text-muted-foreground">
          Manage patient invoices and financial records
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invoices
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoices.length} invoices total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(paidAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoices.filter((i) => i.status === "Paid").length} invoices paid
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(pendingAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoices.filter((i) => i.status === "Pending").length} invoices
              pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(overdueAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoices.filter((i) => i.status === "Overdue").length} invoices
              overdue
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="all"
        className="space-y-4"
        onValueChange={setActiveStatus}
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Invoices</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Invoice
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>
                  Enter the invoice details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewInvoice({ ...newInvoice, patientId: value })
                    }
                    value={newInvoice.patientId}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={newInvoice.amount}
                      onChange={(e) =>
                        setNewInvoice({ ...newInvoice, amount: e.target.value })
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newInvoice.date}
                      onChange={(e) =>
                        setNewInvoice({ ...newInvoice, date: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewInvoice({ ...newInvoice, paymentMethod: value })
                    }
                    value={newInvoice.paymentMethod}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newInvoice.description}
                    onChange={(e) =>
                      setNewInvoice({
                        ...newInvoice,
                        description: e.target.value,
                      })
                    }
                    placeholder="Invoice description"
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
                <Button onClick={handleAddInvoice}>Create Invoice</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search invoices..."
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
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>
                        <div>{invoice.patientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {invoice.patientId}
                        </div>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {invoice.paymentMethod === "Credit Card" && (
                            <CreditCard className="h-4 w-4" />
                          )}
                          {invoice.paymentMethod}
                        </div>
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
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              Print Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(invoice.id, "Paid")
                              }
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteInvoice(invoice.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No invoices found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="paid" className="space-y-4">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>
                        <div>{invoice.patientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {invoice.patientId}
                        </div>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {invoice.paymentMethod === "Credit Card" && (
                            <CreditCard className="h-4 w-4" />
                          )}
                          {invoice.paymentMethod}
                        </div>
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
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              Print Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No paid invoices found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>
                        <div>{invoice.patientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {invoice.patientId}
                        </div>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {invoice.paymentMethod === "Credit Card" && (
                            <CreditCard className="h-4 w-4" />
                          )}
                          {invoice.paymentMethod}
                        </div>
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
                                handleUpdateStatus(invoice.id, "Paid")
                              }
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(invoice.id, "Overdue")
                              }
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Mark as Overdue
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Edit Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No pending invoices found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>
                        <div>{invoice.patientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {invoice.patientId}
                        </div>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {invoice.paymentMethod === "Credit Card" && (
                            <CreditCard className="h-4 w-4" />
                          )}
                          {invoice.paymentMethod}
                        </div>
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
                                handleUpdateStatus(invoice.id, "Paid")
                              }
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Edit Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No overdue invoices found
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
