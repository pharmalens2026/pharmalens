import React, { useState } from "react";
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  ArrowUpRight,
  TrendingUp,
  Building2,
  MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_PAYMENTS, PHARMACIES } from "@/data/mockData";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export function PaymentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isInitiating, setIsInitiating] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  
  // New Payment Form State
  const [selectedPharmacyId, setSelectedPharmacyId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentType, setPaymentType] = useState("Subscription");

  const filteredPayments = MOCK_PAYMENTS.filter(p => {
    const matchesSearch = p.entityName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = MOCK_PAYMENTS
    .filter(p => p.status === 'Completed')
    .reduce((acc, p) => acc + p.amount, 0);

  const pendingCount = MOCK_PAYMENTS.filter(p => p.status === 'Pending').length;

  const handleInitiatePaystack = async () => {
    if (!selectedPharmacyId || !paymentAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsInitiating(true);
    const pharmacy = PHARMACIES.find(p => p.id === selectedPharmacyId);
    
    try {
      toast.info("Connecting to Paystack...");

      const { data, error } = await supabase.functions.invoke('initiate-paystack-payment', {
        body: {
          pharmacyId: selectedPharmacyId,
          amount: parseFloat(paymentAmount),
          email: pharmacy?.email || `pharmacy_${selectedPharmacyId}@example.com`,
          paymentType: paymentType.toLowerCase(),
          metadata: {
            pharmacy_name: pharmacy?.name,
          }
        }
      });

      if (error) throw error;

      if (data?.data?.authorization_url) {
        toast.success(`Payment session created for ${pharmacy?.name}!`);
        setShowPayModal(false);
        
        // Open Paystack checkout in new tab
        window.open(data.data.authorization_url, "_blank");
        
        // Also simulate notification
        toast.info("A payment request has been logged. Send the link to the pharmacy via the Message System if they don't complete it immediately.");
      } else {
        throw new Error("Invalid response from payment gateway");
      }
    } catch (error: any) {
      console.error("Payment Error:", error);
      toast.error(error.message || "Failed to initiate payment");
    } finally {
      setIsInitiating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none flex items-center gap-1 w-fit"><CheckCircle2 size={12} /> Completed</Badge>;
      case 'Pending':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none flex items-center gap-1 w-fit"><Clock size={12} /> Pending</Badge>;
      case 'Failed':
        return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-none flex items-center gap-1 w-fit"><XCircle size={12} /> Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Revenue & Payments</h2>
          <p className="text-slate-500">Monitor Paystack transactions and manage platform billings.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 border-slate-200">
            <Download size={16} /> Export Report
          </Button>
          <Dialog open={showPayModal} onOpenChange={setShowPayModal}>
            <DialogTrigger asChild>
              <Button className="bg-cyan-600 hover:bg-cyan-700 gap-2">
                <Plus size={16} /> New Payment Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Initiate Paystack Payment</DialogTitle>
                <DialogDescription>
                  Generate a Paystack checkout session for a pharmacy.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="pharmacy">Pharmacy</Label>
                  <Select onValueChange={setSelectedPharmacyId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pharmacy" />
                    </SelectTrigger>
                    <SelectContent>
                      {PHARMACIES.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (KES)</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      placeholder="999" 
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Billing Type</Label>
                    <Select defaultValue="Subscription" onValueChange={setPaymentType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Registration">Registration</SelectItem>
                        <SelectItem value="Subscription">Subscription</SelectItem>
                        <SelectItem value="Custom">Custom Bill</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPayModal(false)}
                  disabled={isInitiating}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-cyan-600 hover:bg-cyan-700"
                  onClick={handleInitiatePaystack}
                  disabled={isInitiating}
                >
                  {isInitiating ? "Generating..." : "Generate Link"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-sm bg-gradient-to-br from-cyan-600 to-cyan-700 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-100">Total Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {totalRevenue.toLocaleString()}</div>
            <div className="flex items-center mt-1 text-cyan-100 text-xs">
              <TrendingUp size={12} className="mr-1" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Paystack Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{MOCK_PAYMENTS.filter(p => p.provider === 'Paystack').length}</div>
            <p className="text-xs text-slate-400 mt-1">Total transactions via Paystack</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
            <p className="text-xs text-slate-400 mt-1">Payments awaiting confirmation</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="border-b border-slate-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-bold">Transaction History</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input 
                  placeholder="Reference or Pharmacy..." 
                  className="pl-9 w-64 h-9 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 h-9 text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-slate-50/50">
                <TableHead className="font-bold text-slate-700">Reference</TableHead>
                <TableHead className="font-bold text-slate-700">Pharmacy</TableHead>
                <TableHead className="font-bold text-slate-700">Type</TableHead>
                <TableHead className="font-bold text-slate-700">Amount</TableHead>
                <TableHead className="font-bold text-slate-700">Provider</TableHead>
                <TableHead className="font-bold text-slate-700">Status</TableHead>
                <TableHead className="font-bold text-slate-700 text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id} className="group hover:bg-slate-50/80 transition-colors">
                  <TableCell className="font-mono text-xs text-slate-500">{payment.reference}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{payment.entityName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] font-medium uppercase tracking-wider">{payment.type}</Badge>
                  </TableCell>
                  <TableCell className="font-bold text-slate-900">KES {payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded flex items-center justify-center ${
                        payment.provider === 'Paystack' ? 'bg-cyan-50 text-cyan-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        <CreditCard size={14} />
                      </div>
                      <span className="text-sm font-medium">{payment.provider}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className="text-right text-xs text-slate-500">{payment.date}</TableCell>
                </TableRow>
              ))}
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-slate-400">
                    No transactions found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}