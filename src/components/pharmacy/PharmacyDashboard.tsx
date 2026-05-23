import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  MessageSquare, 
  Phone, 
  Settings, 
  Package, 
  ArrowUpRight, 
  Clock,
  User,
  LogOut,
  ChevronRight,
  TrendingUp,
  Award,
  Grid3X3,
  Pill,
  Shield,
  Activity,
  Heart,
  Wind,
  Brain,
  Syringe,
  Baby,
  Smile,
  Thermometer,
  Sparkles,
  Zap,
  Waves,
  Truck,
  ShoppingCart
} from "lucide-react";
import { PHARMACY_LEADS, PHARMACIES, MEDICINE_CATEGORIES } from "@/data/mockData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface PharmacyDashboardProps {
  onLogout: () => void;
  onManageInventory: () => void;
  onEditProfile?: () => void;
}

// Map category icons to Lucide components
const IconMap: Record<string, any> = {
  Pill: Pill,
  Lock: Shield,
  Thermometer: Thermometer,
  Shield: Shield,
  Biohazard: Activity,
  Bug: Activity,
  Activity: Activity,
  Droplets: Waves,
  Heart: Heart,
  Wind: Wind,
  Waves: Waves,
  CloudRain: Wind,
  Stomach: Activity,
  Zap: Zap,
  ArrowDown: ChevronRight,
  RefreshCcw: Activity,
  Brain: Brain,
  Sofa: Brain,
  Focus: Brain,
  Scale: Activity,
  Syringe: Syringe,
  Dna: Activity,
  Users: Baby,
  Flame: Activity,
  FlaskConical: Activity,
  ShieldCheck: Shield,
  Moon: Activity,
  Beaker: Pill,
  Apple: Pill,
  Sparkles: Sparkles,
  Eye: Activity,
  Baby: Baby,
  FirstAid: Shield,
  Smile: Smile
};

export const PharmacyDashboard = ({ onLogout, onManageInventory, onEditProfile }: PharmacyDashboardProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "leads">("overview");
  const pharmacy = PHARMACIES[0]; // Mocking City Central Pharmacy

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-slate-900">Welcome, {pharmacy.name}</h1>
            <Award className="text-cyan-600 h-5 w-5" />
          </div>
          <p className="text-slate-500 text-sm">Here's what's happening with your pharmacy today.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" onClick={onEditProfile} className="flex-1 md:flex-none">
            <User className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
          <Button variant="outline" size="sm" onClick={onLogout} className="flex-1 md:flex-none text-red-600 border-red-100 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Leads", value: "128", icon: MessageSquare, trend: "+12%", color: "blue" },
          { label: "Medicine Views", value: "1,452", icon: BarChart3, trend: "+8%", color: "cyan" },
          { label: "Stock Accuracy", value: "94%", icon: Package, trend: "0%", color: "emerald" },
          { label: "Response Rate", value: "12m", icon: Clock, trend: "-2m", color: "amber" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                    <stat.icon size={20} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 
                    stat.trend.startsWith('-') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-900 text-white border-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Package size={120} />
              </div>
              <CardHeader>
                <CardTitle>Inventory Manager</CardTitle>
                <CardDescription className="text-slate-400">Update your medicine prices and availability.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={onManageInventory} className="bg-cyan-500 hover:bg-cyan-600 text-white border-none">
                  Update Stock <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-cyan-600 text-white border-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Truck size={120} />
              </div>
              <CardHeader>
                <CardTitle>B2B Wholesaler Ordering</CardTitle>
                <CardDescription className="text-cyan-100">Restock your inventory from verified wholesalers.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate('/pharmacy/b2b-checkout')} className="bg-white text-cyan-700 hover:bg-cyan-50 border-none">
                  Place Bulk Order <ShoppingCart className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Medicine Categories Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Grid3X3 className="h-5 w-5 text-cyan-600" />
                Available Medicine Categories
              </h2>
              <Badge variant="outline" className="text-cyan-600 bg-cyan-50 border-cyan-100">
                {MEDICINE_CATEGORIES.length} Categories
              </Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {MEDICINE_CATEGORIES.map((category, index) => {
                const CategoryIcon = IconMap[category.icon] || Pill;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className="group"
                  >
                    <Card className="h-full hover:border-cyan-200 hover:shadow-md transition-all cursor-pointer bg-white">
                      <CardContent className="p-3 flex flex-col items-center text-center gap-2">
                        <div className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-colors">
                          <CategoryIcon size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-700 leading-tight">
                          {category.name}
                        </span>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Recent Leads */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>Direct inquiries from patients</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-cyan-600">View All</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {PHARMACY_LEADS.map((lead) => (
                  <div key={lead.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        lead.type === 'WhatsApp' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {lead.type === 'WhatsApp' ? <MessageSquare size={18} /> : <Phone size={18} />}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{lead.medicineName}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span>{lead.patientName}</span>
                          <span>•</span>
                          <span>{lead.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        lead.status === 'New' ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {lead.status}
                      </span>
                      <ChevronRight className="text-slate-300 h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-cyan-100 bg-cyan-50/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="text-cyan-600 h-5 w-5" /> Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-cyan-100">
                <div className="text-sm font-medium text-slate-500 mb-1">Top Searched Item</div>
                <div className="font-bold text-slate-900">Paracetamol 500mg</div>
                <div className="text-xs text-emerald-600 mt-2 font-medium">+24% this week</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-cyan-100">
                <div className="text-sm font-medium text-slate-500 mb-1">Demand Alert</div>
                <div className="font-bold text-slate-900">Amoxicillin</div>
                <div className="text-xs text-amber-600 mt-2 font-medium">High demand, low stock</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 mb-4">Our partner support team is available 24/7 to help you manage your digital pharmacy.</p>
              <Button 
                variant="outline" 
                className="w-full border-slate-200"
                onClick={() => window.open('https://wa.me/254724795895')}
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};