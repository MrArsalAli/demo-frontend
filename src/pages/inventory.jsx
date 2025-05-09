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
  Search,
  Plus,
  MoreVertical,
  FileEdit,
  Trash2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";

// Mock data for inventory items
const initialInventory = [
  {
    id: "I-1001",
    name: "Surgical Masks",
    category: "PPE",
    quantity: 120,
    threshold: 100,
    unit: "Box",
    location: "Storage A",
    lastUpdated: "2023-05-01",
  },
  {
    id: "I-1002",
    name: "Disposable Gloves",
    category: "PPE",
    quantity: 85,
    threshold: 100,
    unit: "Box",
    location: "Storage A",
    lastUpdated: "2023-05-02",
  },
  {
    id: "I-1003",
    name: "Syringes (10ml)",
    category: "Medical Supplies",
    quantity: 250,
    threshold: 150,
    unit: "Pack",
    location: "Storage B",
    lastUpdated: "2023-05-03",
  },
  {
    id: "I-1004",
    name: "IV Solution",
    category: "Medications",
    quantity: 75,
    threshold: 50,
    unit: "Bottle",
    location: "Pharmacy",
    lastUpdated: "2023-05-04",
  },
  {
    id: "I-1005",
    name: "Bandages",
    category: "Medical Supplies",
    quantity: 180,
    threshold: 100,
    unit: "Pack",
    location: "Storage B",
    lastUpdated: "2023-05-05",
  },
  {
    id: "I-1006",
    name: "Antibiotics",
    category: "Medications",
    quantity: 45,
    threshold: 30,
    unit: "Box",
    location: "Pharmacy",
    lastUpdated: "2023-05-06",
  },
  {
    id: "I-1007",
    name: "Blood Pressure Monitors",
    category: "Equipment",
    quantity: 12,
    threshold: 5,
    unit: "Unit",
    location: "Storage C",
    lastUpdated: "2023-05-07",
  },
  {
    id: "I-1008",
    name: "Thermometers",
    category: "Equipment",
    quantity: 25,
    threshold: 15,
    unit: "Unit",
    location: "Storage C",
    lastUpdated: "2023-05-08",
  },
];

// Category options
const categories = [
  "PPE",
  "Medical Supplies",
  "Medications",
  "Equipment",
  "Lab Supplies",
  "Office Supplies",
];

// Location options
const locations = [
  "Storage A",
  "Storage B",
  "Storage C",
  "Pharmacy",
  "Lab",
  "Emergency Department",
];

export default function Inventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    threshold: "",
    unit: "",
    location: "",
    lastUpdated: new Date().toISOString().split("T")[0],
  });

  // Filter inventory based on search term and active category
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeCategory === "all") return matchesSearch;
    if (activeCategory === "low")
      return matchesSearch && item.quantity < item.threshold;
    return matchesSearch && item.category === activeCategory;
  });

  // Handle adding a new inventory item
  const handleAddItem = () => {
    const itemId = `I-${1000 + inventory.length + 1}`;
    const itemWithId = {
      ...newItem,
      id: itemId,
      quantity: Number.parseInt(newItem.quantity),
      threshold: Number.parseInt(newItem.threshold),
    };
    setInventory([...inventory, itemWithId]);
    setNewItem({
      name: "",
      category: "",
      quantity: "",
      threshold: "",
      unit: "",
      location: "",
      lastUpdated: new Date().toISOString().split("T")[0],
    });
    setIsAddDialogOpen(false);
  };

  // Handle updating inventory quantity
  const handleUpdateQuantity = (id, newQuantity) => {
    setInventory(
      inventory.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number.parseInt(newQuantity),
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : item
      )
    );
  };

  // Handle deleting an inventory item
  const handleDeleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  // Get stock level indicator
  const getStockLevel = (quantity, threshold) => {
    const percentage = (quantity / threshold) * 100;

    if (percentage <= 50) {
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-red-500 text-sm font-medium">Low Stock</span>
          </div>
          <Progress
            value={percentage}
            className="h-2 bg-red-100"
            indicatorClassName="bg-red-500"
          />
        </div>
      );
    } else if (percentage <= 75) {
      return (
        <div className="space-y-1">
          <span className="text-amber-500 text-sm font-medium">
            Medium Stock
          </span>
          <Progress
            value={percentage}
            className="h-2 bg-amber-100"
            indicatorClassName="bg-amber-500"
          />
        </div>
      );
    } else {
      return (
        <div className="space-y-1">
          <span className="text-green-500 text-sm font-medium">Good Stock</span>
          <Progress
            value={percentage}
            className="h-2 bg-green-100"
            indicatorClassName="bg-green-500"
          />
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Inventory Management
        </h1>
        <p className="text-muted-foreground">
          Track and manage hospital supplies and equipment
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search inventory..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select onValueChange={setActiveCategory} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>
                Enter the item details below to add to inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewItem({ ...newItem, category: value })
                    }
                    value={newItem.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Storage Location</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewItem({ ...newItem, location: value })
                    }
                    value={newItem.location}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem({ ...newItem, quantity: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="threshold">Min. Threshold</Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={newItem.threshold}
                    onChange={(e) =>
                      setNewItem({ ...newItem, threshold: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={newItem.unit}
                    onChange={(e) =>
                      setNewItem({ ...newItem, unit: e.target.value })
                    }
                    placeholder="Box, Pack, Unit..."
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
              <Button onClick={handleAddItem}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell className="w-[150px]">
                    {getStockLevel(item.quantity, item.threshold)}
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
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
                          onClick={() => {
                            const newQuantity = prompt(
                              "Enter new quantity:",
                              item.quantity
                            );
                            if (newQuantity !== null) {
                              handleUpdateQuantity(item.id, newQuantity);
                            }
                          }}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Update Quantity
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileEdit className="mr-2 h-4 w-4" />
                          Edit Item
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Item
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No inventory items found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
