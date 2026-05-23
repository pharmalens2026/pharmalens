import { useState } from "react";
import { 
  Building2, 
  Search, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Filter,
  Download,
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  Package,
  UserCheck,
  Ban,
  Calendar,
  CreditCard,
  FileText,
  ArrowLeft
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PHARMACIES, Pharmacy } from "@/data/mockData";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function PharmacyManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(PHARMACIES);

  const filteredPharmacies = pharmacies.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (plan?: string) => {
    switch (plan) {
      case "Premium":
        return <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-none">Premium</Badge>;
      case "Growth":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none">Growth</Badge>;
      case "Basic":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">Basic</Badge>;
      default:
        return <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none">Free/Trial</Badge>;
    }
  };

  const getApprovalBadge = (status?: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-emerald-100 text-emerald-700 gap-1"><CheckCircle2 size={12} /> Approved</Badge>;
      case "Rejected":
        return <Badge className="bg-rose-100 text-rose-700 gap-1"><XCircle size={12} /> Rejected</Badge>;
      case "Pending":
      default:
        return <Badge className="bg-blue-100 text-blue-700 gap-1"><Clock size={12} /> Pending</Badge>;
    }
  };

  const handleUpdateStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setPharmacies(prev => prev.map(p => p.id === id ? { ...p, approvalStatus: status } : p));
    if (selectedPharmacy?.id === id) {
      setSelectedPharmacy(prev => prev ? { ...prev, approvalStatus: status } : null);
    }
    toast.success(`Pharmacy ${status.toLowerCase()} successfully`);
  };

  const handleAction = (action: string, pharmacy: Pharmacy) => {
    if (action === "Dashboard") {
      toast.success(`Redirecting to ${pharmacy.name} dashboard...`);
    } else if (action === "Details") {
      setSelectedPharmacy(pharmacy);
    } else {
      toast.info(`${action}: ${pharmacy.name}`);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!selectedPharmacy ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Pharmacy Management</h2>
                <p className="text-muted-foreground">Oversee registrations, approvals, and platform analytics.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
                <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 gap-2">
                  <Building2 className="h-4 w-4" />
                  Add Pharmacy
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search pharmacies..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="border rounded-xl bg-white overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="w-[250px]">Pharmacy</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead>Approval</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPharmacies.length > 0 ? (
                    filteredPharmacies.map((pharmacy) => (
                      <TableRow key={pharmacy.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xs shrink-0">
                              {pharmacy.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-semibold">{pharmacy.name}</div>
                              <div className="text-xs text-muted-foreground font-normal">{pharmacy.licenseNumber || 'No License'}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar className="h-3.5 w-3.5" />
                            {pharmacy.registrationDate || 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getApprovalBadge(pharmacy.approvalStatus)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(pharmacy.subscriptionPlan)}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-medium">
                              <TrendingUp className="h-3 w-3 text-emerald-500" />
                              <span>{pharmacy.totalLeads || 0} Leads</span>
                            </div>
                            <div className="text-[10px] text-slate-400">
                              KES {(pharmacy.revenue || 0).toLocaleString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2 text-cyan-600"
                              onClick={() => setSelectedPharmacy(pharmacy)}
                            >
                              Details
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Manage</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleAction("Dashboard", pharmacy)}>
                                  <LayoutDashboard className="mr-2 h-4 w-4" /> Manage Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUpdateStatus(pharmacy.id, 'Approved')}>
                                  <UserCheck className="mr-2 h-4 w-4 text-emerald-600" /> Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUpdateStatus(pharmacy.id, 'Rejected')}>
                                  <Ban className="mr-2 h-4 w-4 text-rose-600" /> Reject
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-rose-600">
                                  <XCircle className="mr-2 h-4 w-4" /> Deactivate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No pharmacies found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Button 
              variant="ghost" 
              className="mb-2 -ml-2 text-slate-500 hover:text-cyan-600"
              onClick={() => setSelectedPharmacy(null)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Overview
            </Button>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column: Basic Info & Approval */}
              <div className="w-full lg:w-1/3 space-y-6">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="h-16 w-16 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-lg shadow-cyan-200">
                      {selectedPharmacy.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <CardTitle className="text-2xl">{selectedPharmacy.name}</CardTitle>
                    <CardDescription>Registered on {selectedPharmacy.registrationDate}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <FileText className="h-4 w-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">License Number</p>
                        <p className="text-sm font-semibold">{selectedPharmacy.licenseNumber || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <CreditCard className="h-4 w-4 text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Subscription</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold">{selectedPharmacy.subscriptionPlan || 'Free'}</p>
                          {getStatusBadge(selectedPharmacy.subscriptionPlan)}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Approval Action</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          className="bg-emerald-600 hover:bg-emerald-700 h-10"
                          onClick={() => handleUpdateStatus(selectedPharmacy.id, 'Approved')}
                          disabled={selectedPharmacy.approvalStatus === 'Approved'}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-rose-200 text-rose-600 hover:bg-rose-50 h-10"
                          onClick={() => handleUpdateStatus(selectedPharmacy.id, 'Rejected')}
                          disabled={selectedPharmacy.approvalStatus === 'Rejected'}
                        >
                          <Ban className="mr-2 h-4 w-4" /> Reject
                        </Button>
                      </div>
                      <p className="text-[10px] text-center text-slate-400 mt-2">
                        Currently Status: <span className="font-bold">{selectedPharmacy.approvalStatus}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span>{selectedPharmacy.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span>{selectedPharmacy.phone}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                      <span>{selectedPharmacy.address}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Analytics & Performance */}
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-cyan-600 text-white border-none shadow-lg shadow-cyan-200/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-cyan-100 text-sm">Total Revenue</p>
                        <CreditCard className="h-5 w-5 text-cyan-200" />
                      </div>
                      <h3 className="text-2xl font-bold italic">KES {(selectedPharmacy.revenue || 0).toLocaleString()}</h3>
                      <p className="text-[10px] text-cyan-100 mt-2">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-500 text-sm">Patient Leads</p>
                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                      </div>
                      <h3 className="text-2xl font-bold">{selectedPharmacy.totalLeads || 0}</h3>
                      <p className="text-[10px] text-emerald-600 mt-2">Active inquiry channel</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-500 text-sm">Inventory Size</p>
                        <Package className="h-5 w-5 text-amber-500" />
                      </div>
                      <h3 className="text-2xl font-bold">124 Items</h3>
                      <p className="text-[10px] text-slate-400 mt-2">Updated today</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Performance Overview</CardTitle>
                        <CardDescription>Monthly traffic and engagement for this pharmacy.</CardDescription>
                      </div>
                      <BarChart3 className="h-5 w-5 text-slate-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="h-[250px] flex items-end justify-between gap-2 px-6 pb-8">
                    {[30, 45, 25, 60, 80, 55, 90].map((h, i) => (
                      <div key={i} className="flex-1 bg-slate-100 rounded-t-sm group relative hover:bg-cyan-100 transition-colors">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          className="w-full bg-cyan-600 rounded-t-sm"
                        />
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Logs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3 text-sm">
                        <div className="h-2 w-2 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="font-medium">Profile updated by owner</p>
                          <p className="text-xs text-slate-400">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex gap-3 text-sm">
                        <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="font-medium">Inventory stock alert triggered</p>
                          <p className="text-xs text-slate-400">Yesterday</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}