"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import {
  Building,
  User,
  Shield,
  Database,
  Bell,
  Save,
  Download,
  HardDrive,
} from "lucide-react";

export default function Settings() {
  const [hospitalSettings, setHospitalSettings] = useState({
    name: "General Hospital",
    address: "123 Medical Center Blvd, Healthville, HV 12345",
    phone: "(555) 123-4567",
    email: "info@generalhospital.com",
    website: "www.generalhospital.com",
    taxId: "12-3456789",
    licenseNumber: "MED-12345-HC",
  });

  const [userSettings, setUserSettings] = useState({
    username: "admin",
    email: "admin@generalhospital.com",
    role: "Administrator",
    department: "Administration",
    language: "English",
    theme: "light",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    systemAlerts: true,
    criticalAlerts: true,
    inventoryAlerts: true,
    financialReports: false,
    staffUpdates: false,
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupLocation: "local",
    retentionPeriod: "30",
  });

  const handleHospitalChange = (e) => {
    const { name, value } = e.target;
    setHospitalSettings({
      ...hospitalSettings,
      [name]: value,
    });
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserSettings({
      ...userSettings,
      [name]: value,
    });
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: value,
    });
  };

  const handleNotificationToggle = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  const handleBackupChange = (name, value) => {
    setBackupSettings({
      ...backupSettings,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your hospital system settings and preferences
        </p>
      </div>

      <Tabs defaultValue="hospital" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hospital" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Hospital</span>
          </TabsTrigger>
          <TabsTrigger value="user" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">User</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Backup</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hospital">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Information</CardTitle>
              <CardDescription>
                Manage your hospital details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Hospital Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={hospitalSettings.name}
                    onChange={handleHospitalChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={hospitalSettings.phone}
                    onChange={handleHospitalChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={hospitalSettings.address}
                  onChange={handleHospitalChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={hospitalSettings.email}
                    onChange={handleHospitalChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={hospitalSettings.website}
                    onChange={handleHospitalChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input
                    id="taxId"
                    name="taxId"
                    value={hospitalSettings.taxId}
                    onChange={handleHospitalChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    value={hospitalSettings.licenseNumber}
                    onChange={handleHospitalChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={userSettings.username}
                    onChange={handleUserChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email</Label>
                  <Input
                    id="userEmail"
                    name="email"
                    value={userSettings.email}
                    onChange={handleUserChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    name="role"
                    value={userSettings.role}
                    onChange={handleUserChange}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    value={userSettings.department}
                    onChange={handleUserChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={userSettings.language}
                    onValueChange={(value) =>
                      setUserSettings({ ...userSettings, language: value })
                    }
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={userSettings.theme}
                    onValueChange={(value) =>
                      setUserSettings({ ...userSettings, theme: value })
                    }
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Change Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage security and access control settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactorAuth">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Require a verification code when logging in
                  </p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({
                      ...securitySettings,
                      twoFactorAuth: checked,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecurityChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input
                    id="passwordExpiry"
                    name="passwordExpiry"
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={handleSecurityChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                <Input
                  id="loginAttempts"
                  name="loginAttempts"
                  type="number"
                  value={securitySettings.loginAttempts}
                  onChange={handleSecurityChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Access Control</Label>
                <p className="text-sm text-muted-foreground">
                  Manage user roles and permissions in the system
                </p>
                <Button variant="outline" className="mt-2">
                  Manage Access Control
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage your notification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={() =>
                    handleNotificationToggle("emailNotifications")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive system-wide alerts and announcements
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.systemAlerts}
                  onCheckedChange={() =>
                    handleNotificationToggle("systemAlerts")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Critical Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive critical system alerts
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.criticalAlerts}
                  onCheckedChange={() =>
                    handleNotificationToggle("criticalAlerts")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Inventory Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts about low inventory levels
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.inventoryAlerts}
                  onCheckedChange={() =>
                    handleNotificationToggle("inventoryAlerts")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Financial Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly financial reports
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.financialReports}
                  onCheckedChange={() =>
                    handleNotificationToggle("financialReports")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Staff Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about new staff members
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.staffUpdates}
                  onCheckedChange={() =>
                    handleNotificationToggle("staffUpdates")
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup Settings</CardTitle>
              <CardDescription>Manage your backup settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoBackup">Automatic Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically backup your data
                  </p>
                </div>
                <Switch
                  id="autoBackup"
                  checked={backupSettings.autoBackup}
                  onCheckedChange={(checked) =>
                    handleBackupChange("autoBackup", checked)
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={backupSettings.backupFrequency}
                    onValueChange={(value) =>
                      handleBackupChange("backupFrequency", value)
                    }
                  >
                    <SelectTrigger id="backupFrequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupLocation">Backup Location</Label>
                  <Select
                    value={backupSettings.backupLocation}
                    onValueChange={(value) =>
                      handleBackupChange("backupLocation", value)
                    }
                  >
                    <SelectTrigger id="backupLocation">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="cloud">Cloud</SelectItem>
                      <SelectItem value="external">External Drive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="retentionPeriod">Retention Period (days)</Label>
                <Input
                  id="retentionPeriod"
                  name="retentionPeriod"
                  type="number"
                  value={backupSettings.retentionPeriod}
                  onChange={(e) =>
                    handleBackupChange("retentionPeriod", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Download Backup</Label>
                <p className="text-sm text-muted-foreground">
                  Download a copy of your latest backup
                </p>
                <Button variant="outline" className="mt-2">
                  <Download className="mr-2 h-4 w-4" />
                  Download Backup
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Storage Usage</Label>
                <p className="text-sm text-muted-foreground">
                  View your current storage usage
                </p>
                <Button variant="outline" className="mt-2">
                  <HardDrive className="mr-2 h-4 w-4" />
                  View Storage
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
