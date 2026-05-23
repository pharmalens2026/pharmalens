import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Building2, 
  Package, 
  TrendingUp, 
  AlertCircle, 
  Settings, 
  Search, 
  Bell, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  Menu,
  X,
  MapPin,
  Clock,
  MoreVertical,
  LogOut,
  CreditCard,
  Download,
  Printer,
  FileSpreadsheet,
  User,
  Lock,
  Globe,
  BellRing,
  Save,
  MessageSquare,
  Zap
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PHARMACIES, POPULAR_MEDICINES, MOCK_WHOLESALER_LEADS } from "@/data/mockData";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PharmacyManagement } from "./PharmacyManagement";
import { PaymentManagement } from "./PaymentManagement";
import { MessageSystem } from "./MessageSystem";
import { LeadRoutingDashboard } from "./LeadRoutingDashboard";

// Mock Data for Charts
const REVENUE_DATA = [
  { name: "Mon", value: 12000 },
  { name: "Tue", value: 19000 },
  { name: "Wed", value: 15000 },
  { name: "Thu", value: 22000 },
  { name: "Fri", value: 30000 },
  { name: "Sat", value: 25000 },
  { name: "Sun", value: 28000 },
];

const ONBOARDING_DATA = [
  { name: "Jan", count: 12 },
  { name: "Feb", count: 18 },
  { name: "Mar", count: 15 },
  { name: "Apr", count: 25 },
  { name: "May", count: 32 },
  { name: "Jun", count: 28 },
];

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dateFilter, setDateFilter] = useState("7 days");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const kpiData = [
    { title: "Total Pharmacies", value: "1,284", change: "+12.5%", trend: "up", color: "blue" },
    { title: "Total Wholesalers", value: "86", change: "+5.2%", trend: "up", color: "purple" },
    { title: "Total Revenue", value: "KES 4.2M", change: "+15.3%", trend: "up", color: "cyan" },
    { title: "B2B Leads", value: "248", change: "+22.4%", trend: "up", color: "amber" },
    { title: "Churn Rate", value: "1.2%", change: "+0.5%", trend: "down", color: "rose" },
  ];

  const alerts = [
    { id: 1, type: "critical", message: "Low stock alert: Paracetamol 500mg at 12 pharmacies", time: "2 mins ago" },
    { id: 2, type: "warning", message: "5 Pharmacies have been inactive for > 30 days", time: "1 hour ago" },
    { id: 3, type: "critical", message: "Payment failure: City Central Pharmacy (Subscription ID: #9921)", time: "3 hours ago" },
    { id: 4, type: "info", message: "New wholesaler registration: Global Meds Ltd", time: "5 hours ago" },
  ];

  const topPharmacies = PHARMACIES.slice(0, 5).sort((a, b) => (b.revenue || 0) - (a.revenue || 0));
  const topProducts = POPULAR_MEDICINES.slice(0, 5);
  
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "pharmacies", label: "Pharmacies", icon: Building2 },
    { id: "leads", label: "B2B Leads", icon: Zap },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleSidebarToggle = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const handleExport = (format: 'csv' | 'excel') => {
    const headers = ["Metric", "Value", "Change"];
    const data = kpiData.map(kpi => [kpi.title, kpi.value, kpi.change]);
    
    const csvContent = [headers, ...data].map(e => e.join(",")).join(`
`);
    const blob = new Blob([csvContent], { type: format === 'excel' ? 'application/vnd.ms-excel' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `pharmalens_report_${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xls' : 'csv'}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Analytics exported as ${format.toUpperCase()}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const SettingsView = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">System Settings</h2>
        <p className="text-slate-500">Manage platform configurations and admin preferences.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mb-8">
          <TabsTrigger value="general" className="flex items-center gap-2"><User size={16} /> General</TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2"><Lock size={16} /> Security</TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2"><Globe size={16} /> System</TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2"><BellRing size={16} /> Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Profile Information</CardTitle>
              <CardDescription>Update your administrator profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Admin User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="admin@pharmalens.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+254 724 795 895" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Access Level</Label>
                  <Input id="role" defaultValue="Super Admin" disabled className="bg-slate-50" />
                </div>
              </div>
              <Button className="bg-cyan-600 hover:bg-cyan-700 gap-2" onClick={() => toast.success("Profile updated successfully")}>
                <Save size={16} /> Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Password & Security</CardTitle>
              <CardDescription>Secure your admin account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-w-md space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="curr-pass">Current Password</Label>
                  <Input id="curr-pass" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-pass">New Password</Label>
                  <Input id="new-pass" type="password" />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                  </div>
                  <Switch />
                </div>
              </div>
              <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={() => toast.success("Security settings updated")}>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Platform Configuration</CardTitle>
              <CardDescription>Global settings for the PharmaLens platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default Currency</Label>
                  <Select defaultValue="kes">
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kes">Kenyan Shilling (KES)</SelectItem>
                      <SelectItem value="usd">US Dollar (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>System Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="sw">Swahili</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-xs text-slate-500">Disable public access while performing updates.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New User Registration</Label>
                    <p className="text-xs text-slate-500">Allow new pharmacies to sign up on the platform.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={() => toast.success("System configuration saved")}>Save System Config</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Notification Channels</CardTitle>
              <CardDescription>Choose how you want to be notified about system events.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[ 
                  { id: "email", title: "Email Notifications", desc: "Critical alerts and weekly reports via email." },
                  { id: "push", title: "Push Notifications", desc: "Browser alerts for immediate actions." },
                  { id: "sms", title: "SMS Alerts", desc: "Emergency system failures or payment issues." }
                ].map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="space-y-0.5">
                      <Label className="text-base">{item.title}</Label>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.id !== 'sms'} />
                  </div>
                ))}
              </div>
              <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={() => toast.success("Notification preferences updated")}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );

  const DashboardView = () => (
    <div className="max-w-[1600px] mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Platform Analytics</h2>
          <p className="text-slate-500">Real-time overview of your pharmacy and wholesaler ecosystem.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 mr-2">
            {["Today", "7 days", "30 days"].map((period) => (
              <button
                key={period}
                onClick={() => setDateFilter(period)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  dateFilter === period 
                    ? "bg-cyan-600 text-white shadow-sm" 
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          
          <div className="h-8 w-px bg-slate-200 mx-1" />
          
          <Button variant="outline" className="gap-2 border-slate-200 text-slate-600" onClick={() => handleExport('csv')}>
            <Download size={16} />
            <span className="hidden sm:inline">CSV</span>
          </Button>

          <Button variant="default" className="gap-2 bg-slate-900 hover:bg-slate-800" onClick={handlePrint}>
            <Printer size={16} />
            <span className="hidden sm:inline">Print Report</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button 
          className="h-16 bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-between px-6 rounded-2xl shadow-lg shadow-cyan-900/10"
          onClick={() => setActiveTab("messages")}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <MessageSquare size={24} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Messages</p>
              <p className="text-[11px] opacity-80">Communicate with pharmacies</p>
            </div>
          </div>
          <ChevronRight size={20} />
        </Button>
        <Button 
          className="h-16 bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-between px-6 rounded-2xl shadow-lg shadow-amber-900/10"
          onClick={() => setActiveTab("leads")}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Zap size={24} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">B2B Leads</p>
              <p className="text-[11px] opacity-80">Manage medicine requests</p>
            </div>
          </div>
          <Badge className="bg-white text-amber-700 border-none">{MOCK_WHOLESALER_LEADS.length}</Badge>
        </Button>
        <Button 
          className="h-16 bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-between px-6 rounded-2xl shadow-lg shadow-slate-900/10"
          onClick={() => setActiveTab("payments")}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <CreditCard size={24} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Payments</p>
              <p className="text-[11px] opacity-80">Manage subscriptions & billing</p>
            </div>
          </div>
          <ChevronRight size={20} />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiData.map((kpi, idx) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group cursor-pointer"
          >
            <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative">
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${kpi.color}-500 opacity-0 group-hover:opacity-100 transition-opacity`} />
              <CardHeader className="p-4 pb-0">
                <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">{kpi.title}</p>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{kpi.value}</h3>
                  <div className={`flex items-center gap-0.5 text-[11px] font-bold ${
                    kpi.trend === "up" ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                  } px-1.5 py-0.5 rounded`}>
                    {kpi.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {kpi.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#0891b2" fill="#ecfeff" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold text-slate-900">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 flex gap-3 hover:bg-slate-50 transition-colors">
                  <div className={`h-2 w-2 mt-1.5 rounded-full ${alert.type === 'critical' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-800">{alert.message}</p>
                    <p className="text-[10px] text-slate-400">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "pharmacies":
        return <PharmacyManagement />;
      case "leads":
        return <LeadRoutingDashboard />;
      case "payments":
        return <PaymentManagement />;
      case "messages":
        return <MessageSystem />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      <aside className={`${isSidebarCollapsed ? "w-20" : "w-72"} hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 z-40`}>
        <div className="p-6 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-cyan-600 rounded-lg flex items-center justify-center">
                <Building2 className="text-white" size={20} />
              </div>
              <span className="font-bold text-slate-900 text-lg">PharmaLens</span>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={handleSidebarToggle}>
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <X size={20} />}
          </Button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? "bg-cyan-50 text-cyan-700 font-bold" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <item.icon size={20} />
              {!isSidebarCollapsed && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-rose-600" onClick={onLogout}>
            <LogOut size={20} className="mr-2" />
            {!isSidebarCollapsed && <span>Sign Out</span>}
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 z-30">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={20} />
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input className="pl-10 w-64" placeholder="Global search..." />
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 border-none">Live System</Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-cyan-100 text-cyan-700 font-bold text-xs">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}