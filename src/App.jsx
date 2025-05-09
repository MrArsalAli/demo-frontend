import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import {
  Users,
  Calendar,
  Activity,
  Package,
  AlertTriangle,
  Clock,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Hospital management system overview
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Patients
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">+12 new today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Appointments
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  8 pending confirmation
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Bed Occupancy
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">
                  32 beds available
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Inventory Alerts
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">
                  Items below threshold
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Patients</CardTitle>
                <CardDescription>Last 5 patient admissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "P-1001",
                      name: "John Smith",
                      age: 45,
                      department: "Cardiology",
                      date: "Today, 9:30 AM",
                    },
                    {
                      id: "P-1002",
                      name: "Sarah Johnson",
                      age: 32,
                      department: "Obstetrics",
                      date: "Today, 10:15 AM",
                    },
                    {
                      id: "P-1003",
                      name: "Michael Brown",
                      age: 58,
                      department: "Neurology",
                      date: "Today, 11:00 AM",
                    },
                    {
                      id: "P-1004",
                      name: "Emily Davis",
                      age: 27,
                      department: "Orthopedics",
                      date: "Today, 1:45 PM",
                    },
                    {
                      id: "P-1005",
                      name: "Robert Wilson",
                      age: 63,
                      department: "Pulmonology",
                      date: "Today, 2:30 PM",
                    },
                  ].map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {patient.age} yrs • {patient.department}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {patient.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
                <CardDescription>
                  System notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2 items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Low Inventory Alert</p>
                      <p className="text-sm text-muted-foreground">
                        Surgical masks below threshold (20 remaining)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Staff Shift Change</p>
                      <p className="text-sm text-muted-foreground">
                        Nursing shift change in 30 minutes
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Emergency Room Alert</p>
                      <p className="text-sm text-muted-foreground">
                        High patient volume in emergency department
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent
          value="analytics"
          className="h-[400px] flex items-center justify-center border rounded-md"
        >
          <p className="text-muted-foreground">
            Analytics charts would appear here
          </p>
        </TabsContent>
        <TabsContent
          value="reports"
          className="h-[400px] flex items-center justify-center border rounded-md"
        >
          <p className="text-muted-foreground">Reports would appear here</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
