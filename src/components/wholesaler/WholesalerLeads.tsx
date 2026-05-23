import { ArrowLeft, Search, Filter, Phone, MessageCircle, MapPin, Package, Bell, ShieldCheck, Star, Zap, Clock, TrendingUp, ChevronRight, Check, Share2, Eye, ExternalLink, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WHOLESALE_LEADS } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

interface WholesalerLeadsProps {
  onBack: () => void;
}

export function WholesalerLeads({ onBack }: WholesalerLeadsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "vip" | "high">("all");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  
  const filteredLeads = WHOLESALE_LEADS.filter(lead => {
    if (activeTab === "vip") return lead.priority === "VIP";
    if (activeTab === "high") return lead.priority === "High";
    return true;
  });

  const handleAcceptLead = (leadId: string) => {
    toast.success("Lead accepted! Pharmacy contact details unlocked.");
    setSelectedLead(leadId);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Premium B2B Header */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl px-4 py-6 border-b border-slate-200/60 shadow-sm">
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={onBack} 
              className="rounded-2xl border-slate-200 hover:border-purple-300 hover:text-purple-600 transition-all h-12 w-12"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">Lead Routing</h1>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-[9px] font-black uppercase tracking-widest h-5 flex gap-1.5 items-center">
                  <Star className="h-2.5 w-2.5 fill-current" /> PLATINUM CHANNEL
                </Badge>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Real-time B2B Requests</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">System Online: Live Routing</span>
            </div>
            <Button variant="outline" className="h-14 px-6 rounded-2xl font-black gap-2 border-slate-200 hidden sm:flex">
              <Bell className="h-5 w-5 text-purple-600" /> Alert Config
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl px-4 mx-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Advanced Filtering Column */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="rounded-[40px] border-slate-200/60 shadow-xl shadow-slate-900/5 bg-white overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                    <Filter className="h-5 w-5" />
                  </div>
                  <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">Routing Filters</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Priority Stream</Label>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: 'all', label: 'All Active Leads', icon: Layers, color: 'slate' },
                        { id: 'vip', label: 'VIP (Instant)', icon: Zap, color: 'purple' },
                        { id: 'high', label: 'High Urgency', icon: TrendingUp, color: 'amber' }
                      ].map((tab) => (
                        <Button 
                          key={tab.id}
                          variant={activeTab === tab.id ? 'default' : 'outline'} 
                          className={`justify-start gap-3 h-14 rounded-2xl font-black transition-all ${
                            activeTab === tab.id 
                            ? (tab.id === 'vip' ? 'bg-purple-600 shadow-lg shadow-purple-900/20' : tab.id === 'high' ? 'bg-amber-500 shadow-lg shadow-amber-900/20' : 'bg-slate-900') 
                            : 'border-slate-100 hover:bg-slate-50'
                          }`}
                          onClick={() => setActiveTab(tab.id as any)}
                        >
                          <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-white' : tab.id === 'vip' ? 'text-purple-600' : tab.id === 'high' ? 'text-amber-500' : 'text-slate-400'}`} />
                          {tab.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Regional Targeting</Label>
                    <Select defaultValue="nairobi">
                      <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 text-slate-900 font-bold px-6">
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent className="rounded-3xl p-2 border-slate-100 shadow-2xl">
                        <SelectItem value="nairobi" className="rounded-xl font-bold py-3">Nairobi Metropolitan</SelectItem>
                        <SelectItem value="mombasa" className="rounded-xl font-bold py-3">Mombasa Coastal</SelectItem>
                        <SelectItem value="kisumu" className="rounded-xl font-bold py-3">Kisumu Hub</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Insights Sidebar */}
            <Card className="bg-slate-900 text-white border-none rounded-[40px] overflow-hidden relative group shadow-2xl shadow-slate-900/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-3 font-black text-purple-400 text-xs uppercase tracking-[0.2em] mb-6">
                  <Star className="h-4 w-4 fill-current animate-pulse" />
                  <span>Market Intelligence</span>
                </div>
                <h4 className="text-xl font-black mb-4 leading-tight">Pain Relief Demand Spike</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-8 font-medium italic">
                  "Westlands pharmacies are searching for Paracetamol in bulk. Stock levels are 40% below demand."
                </p>
                <Button className="w-full bg-white text-slate-900 hover:bg-slate-50 font-black h-14 rounded-2xl shadow-xl shadow-white/5 transition-transform active:scale-95">
                  Expand Analysis
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Leads Stream Column */}
          <div className="lg:col-span-9 space-y-8">
            {/* Search and Quick Metrics */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-6 rounded-[40px] border border-slate-200/60 shadow-xl shadow-slate-900/5">
              <div className="relative flex-1 w-full group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                <Input 
                  className="pl-14 h-16 border-none bg-slate-50 rounded-3xl text-lg font-medium focus-visible:ring-2 focus-visible:ring-purple-100 transition-all" 
                  placeholder="Search by medicine, pharmacy name or location..." 
                />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button variant="outline" className="h-16 px-8 rounded-3xl font-black gap-3 border-slate-200 bg-white">
                  Export Data <Share2 className="h-5 w-5" />
                </Button>
                <div className="bg-purple-600 text-white px-8 h-16 flex items-center rounded-3xl shadow-xl shadow-purple-900/20">
                  <span className="text-sm font-black uppercase tracking-widest">{filteredLeads.length} Total Hits</span>
                </div>
              </div>
            </div>

            {/* Leads List */}
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead, i) => (
                    <motion.div
                      key={lead.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className={`overflow-hidden border-2 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/10 rounded-[44px] group ${
                        lead.priority === 'VIP' ? 'border-purple-200 bg-purple-50/10' : 
                        lead.priority === 'High' ? 'border-amber-100' : 'border-slate-100'
                      }`}>
                        <CardContent className="p-0">
                          <div className="flex flex-col lg:flex-row">
                            <div className="flex-1 p-10">
                              {/* Lead Badge Header */}
                              <div className="flex flex-wrap items-center gap-3 mb-8">
                                {lead.priority === 'VIP' ? (
                                  <Badge className="bg-purple-600 text-white font-black px-5 py-2 rounded-full shadow-lg shadow-purple-900/20 border-none animate-in fade-in zoom-in duration-700">
                                    <Zap className="h-4 w-4 mr-2 fill-current" /> INSTANT NOTIFICATION (VIP)
                                  </Badge>
                                ) : lead.priority === 'High' ? (
                                  <Badge className="bg-amber-500 text-white font-black px-5 py-2 rounded-full shadow-lg shadow-amber-900/20 border-none">
                                    <TrendingUp className="h-4 w-4 mr-2" /> HIGH PRIORITY LEAD
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary" className="px-5 py-2 rounded-full font-black text-slate-500 border-none bg-slate-100">Standard Request</Badge>
                                )}
                                <div className="flex items-center gap-2 text-xs text-slate-400 font-black ml-auto uppercase tracking-widest">
                                  <Clock className="h-4 w-4" /> Routing: {lead.timestamp}
                                </div>
                              </div>
                              
                              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
                                <div className="space-y-2">
                                  <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter group-hover:text-purple-700 transition-colors">{lead.medicineName}</h3>
                                  <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="bg-white border-slate-200 text-slate-600 px-4 py-1.5 font-black text-xs uppercase rounded-xl shadow-sm">
                                      <Package className="h-4 w-4 mr-2 text-purple-600" /> Qty: {lead.quantity} {lead.unit}
                                    </Badge>
                                    <div className="flex items-center text-xs font-bold text-slate-400 italic">
                                      Request from licensed pharmacy
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 group/info hover:border-purple-200 transition-all">
                                  <div className="h-14 w-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0 shadow-inner group-hover/info:bg-emerald-500 group-hover/info:text-white transition-colors">
                                    <ShieldCheck className="h-8 w-8" />
                                  </div>
                                  <div>
                                    <p className="font-black text-slate-900 text-lg leading-none mb-1">{lead.patientName}</p>
                                    <div className="flex items-center gap-1.5">
                                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                      <p className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">Verified Retailer</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 group/info hover:border-purple-200 transition-all">
                                  <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 shadow-inner group-hover/info:bg-blue-500 group-hover/info:text-white transition-colors">
                                    <MapPin className="h-8 w-8" />
                                  </div>
                                  <div>
                                    <p className="font-black text-slate-900 text-lg leading-none mb-1">{lead.location}</p>
                                    <p className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">Nairobi Metropolitan</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Action Pane */}
                            <div className="bg-slate-900 p-10 flex flex-row lg:flex-col justify-center gap-5 lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 relative overflow-hidden group/actions">
                              <div className="absolute inset-0 bg-purple-600/5 group-hover/actions:bg-purple-600/10 transition-colors"></div>
                              <Button 
                                className="flex-1 bg-purple-600 hover:bg-purple-700 font-black h-16 rounded-2xl shadow-2xl shadow-purple-900/40 gap-3 group/btn relative z-10 transition-transform active:scale-95"
                                onClick={() => handleAcceptLead(lead.id)}
                              >
                                <MessageCircle className="h-6 w-6" /> WhatsApp
                                <ChevronRight className="h-5 w-5 hidden lg:block group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                              <Button 
                                variant="outline" 
                                className="flex-1 bg-white/5 border-white/10 hover:bg-white/15 text-white font-black h-16 rounded-2xl gap-3 relative z-10 transition-transform active:scale-95"
                              >
                                <Phone className="h-6 w-6" /> Call Store
                              </Button>
                              <div className="hidden lg:block pt-4 text-center">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-loose">
                                  Lead details secured with <br/> Pharma Lens B2B Protocol
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                      <Search className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">No active leads in this stream</h3>
                    <p className="text-slate-500 font-medium italic">New pharmacy requests will appear here in real-time.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}