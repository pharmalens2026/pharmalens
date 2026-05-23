import React, { useState } from 'react';
import {
  Zap,
  MapPin,
  Clock,
  Package,
  MessageSquare,
  CheckCircle2,
  Filter,
  Search,
  AlertCircle,
  TrendingUp,
  MoreHorizontal,
  Check,
  X,
  Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { MOCK_WHOLESALER_LEADS } from '@/data/mockData';
import { motion } from 'framer-motion';

export function LeadRoutingDashboard() {
  const [leads, setLeads] = useState(MOCK_WHOLESALER_LEADS);
  const [filter, setFilter] = useState('all');

  const handleAction = (id: string, action: 'claimed' | 'rejected') => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, status: action === 'claimed' ? 'Claimed' : 'Rejected' } : lead));
    toast.success(`Lead ${action} successfully`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'VIP': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'High': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">B2B Lead Routing</h2>
          <p className="text-slate-500">Active medicine requests from retail pharmacies to wholesalers.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input className="pl-10 w-64" placeholder="Search leads..." />
          </div>
          <Select defaultValue="all" onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Claimed">Claimed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-rose-50 border-rose-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-rose-600 uppercase tracking-wider">High Priority</p>
                <p className="text-2xl font-bold text-slate-900">{leads.filter(l => l.priority === 'High').length}</p>
              </div>
              <div className="h-12 w-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600">
                <AlertCircle size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">Instant VIP Leads</p>
                <p className="text-2xl font-bold text-slate-900">{leads.filter(l => l.priority === 'VIP').length}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                <Zap size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-cyan-50 border-cyan-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Total Requests</p>
                <p className="text-2xl font-bold text-slate-900">{leads.length}</p>
              </div>
              <div className="h-12 w-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600">
                <TrendingUp size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {leads.filter(l => filter === 'all' || l.status === filter).map((lead, idx) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow group">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${lead.priority === 'VIP' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <Package size={24} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg text-slate-900">{lead.medicineName}</h3>
                        <Badge variant="outline" className={getPriorityColor(lead.priority)}>
                          {lead.priority === 'VIP' ? 'Instant Notification (VIP)' : `${lead.priority} Priority Lead`}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Building2 size={14} />
                          <span>{lead.pharmacyName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{lead.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{lead.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">{lead.quantity}</p>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Units Requested</p>
                    </div>
                    
                    <div className="flex items-center gap-2 border-l pl-6">
                      {lead.status === 'Pending' ? (
                        <>
                          <Button 
                            className="bg-slate-900 hover:bg-slate-800 gap-2"
                            onClick={() => handleAction(lead.id, 'claimed')}
                          >
                            <CheckCircle2 size={16} /> Claim Lead
                          </Button>
                          <Button variant="outline" size="icon" className="text-slate-400" onClick={() => handleAction(lead.id, 'rejected')}>
                            <X size={18} />
                          </Button>
                        </>
                      ) : (
                        <Badge className={`px-4 py-1.5 ${lead.status === 'Claimed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                          {lead.status}
                        </Badge>
                      )}
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}