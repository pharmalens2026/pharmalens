import { LayoutDashboard, Package, Users, TrendingUp, Bell, Search, Truck, ArrowUpRight, CheckCircle2, AlertCircle, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WHOLESALE_LEADS, WHOLESALE_PRODUCTS } from "@/data/mockData";
import { motion } from "framer-motion";

interface WholesalerDashboardProps {
  onLogout: () => void;
  onManageInventory: () => void;
  onViewLeads: () => void;
}

export function WholesalerDashboard({ onLogout, onManageInventory, onViewLeads }: WholesalerDashboardProps) {
  const activeLeads = WHOLESALE_LEADS.filter(l => l.status === "New");

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Wholesaler Portal</h1>
            <p className="text-slate-500">Global Pharma Distributors • <span className="text-emerald-600 font-bold">Platinum Plan</span></p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="font-bold" onClick={onLogout}>Logout</Button>
            <Button className="bg-purple-600 hover:bg-purple-700 font-bold gap-2" onClick={onManageInventory}>
              <Package className="h-4 w-4" />
              Manage Inventory
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[ 
            { label: "Total Leads", value: "1,284", change: "+12%", icon: Users, color: "purple" },
            { label: "Pending Orders", value: activeLeads.length.toString(), change: "New", icon: Bell, color: "amber" },
            { label: "Active Products", value: WHOLESALE_PRODUCTS.length.toString(), change: "+2", icon: Package, color: "blue" },
            { label: "Monthly Revenue", value: "KES 1.2M", change: "+8%", icon: TrendingUp, color: "emerald" },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-slate-50 text-slate-600`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-none">{stat.change}</Badge>
                </div>
                <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Lead Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">Active Medicine Requests</h2>
              <Button variant="link" className="text-purple-600 font-bold p-0" onClick={onViewLeads}>
                View All Leads <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-4">
              {activeLeads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border-l-4 transition-all hover:shadow-md cursor-pointer ${lead.priority === 'VIP' ? 'border-l-purple-600' : lead.priority === 'High' ? 'border-l-amber-500' : 'border-l-slate-200'}`}>
                    <CardContent className="p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${lead.priority === 'VIP' ? 'bg-purple-50 text-purple-600' : 'bg-slate-50 text-slate-600'}`}>
                            <Package className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-slate-900">{lead.medicineName}</h4>
                              {lead.priority === 'VIP' && <Badge className="bg-purple-600">VIP REQUEST</Badge>}
                              {lead.priority === 'High' && <Badge variant="secondary" className="bg-amber-100 text-amber-700">High Priority</Badge>}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                              <div className="flex items-center gap-1 font-bold">
                                <Users className="h-3 w-3" /> {lead.patientName}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {lead.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" /> Qty: {lead.quantity} {lead.unit}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-bold uppercase mr-2">{lead.timestamp}</span>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 font-bold h-9">Accept Order</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="bg-purple-900 text-white border-none">
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 text-purple-300 mb-4" />
                <h3 className="text-xl font-bold mb-2">Market Insights</h3>
                <p className="text-purple-200 text-sm mb-6">Paracetamol and Amoxicillin are trending in Nairobi West. Adjust your stock to capture 24% more leads.</p>
                <Button className="w-full bg-white text-purple-900 hover:bg-purple-50 font-bold">View AI Analytics</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Deliveries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[ 
                  { id: "TRK-01", status: "Out for delivery", time: "2:30 PM" },
                  { id: "TRK-02", status: "Processing", time: "Tomorrow" },
                ].map((track) => (
                  <div key={track.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Truck className="h-4 w-4 text-slate-400" />
                      <div>
                        <div className="text-sm font-bold">{track.id}</div>
                        <div className="text-[10px] text-slate-500 uppercase">{track.status}</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-400">{track.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}