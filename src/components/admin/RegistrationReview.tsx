import { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Building2, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle 
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PHARMACIES, Pharmacy } from "@/data/mockData";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function RegistrationReview() {
  const [pendingPharmacies, setPendingPharmacies] = useState<Pharmacy[]>(
    PHARMACIES.filter(p => p.approvalStatus === "Pending")
  );

  const handleApprove = (id: string, name: string) => {
    setPendingPharmacies(prev => prev.filter(p => p.id !== id));
    toast.success(`${name} has been approved and granted platform access.`);
  };

  const handleReject = (id: string, name: string) => {
    setPendingPharmacies(prev => prev.filter(p => p.id !== id));
    toast.error(`${name} application has been rejected.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Registration Review</h2>
          <p className="text-muted-foreground">Evaluate and approve new pharmacy applications.</p>
        </div>
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          {pendingPharmacies.length} Pending Applications
        </Badge>
      </div>

      <div className="grid gap-6">
        {pendingPharmacies.length > 0 ? (
          pendingPharmacies.map((pharmacy) => (
            <motion.div
              key={pharmacy.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border-slate-200">
                <CardHeader className="bg-slate-50/50 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-xl bg-white border shadow-sm flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-cyan-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pharmacy.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" /> Applied on {pharmacy.registrationDate}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-rose-600 hover:bg-rose-50 border-rose-200"
                        onClick={() => handleReject(pharmacy.id, pharmacy.name)}
                      >
                        <XCircle className="mr-2 h-4 w-4" /> Reject
                      </Button>
                      <Button 
                        className="bg-emerald-600 hover:bg-emerald-700"
                        size="sm"
                        onClick={() => handleApprove(pharmacy.id, pharmacy.name)}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Approve Access
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Contact Details</h4>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p className="font-medium">Email: <span className="font-normal">{pharmacy.email || "Not provided"}</span></p>
                        <p className="font-medium">Phone: <span className="font-normal">{pharmacy.phone}</span></p>
                        <p className="font-medium">Address: <span className="font-normal">{pharmacy.address}</span></p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Verification Documents</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50">
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-slate-400" />
                            <span>Pharmacy_License.pdf</span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50">
                          <div className="flex items-center gap-2 text-sm">
                            <ShieldCheck className="h-4 w-4 text-slate-400" />
                            <span>Tax_Compliance.pdf</span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">System Checks</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                          <CheckCircle2 className="h-4 w-4" /> Email Verified
                        </div>
                        <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                          <CheckCircle2 className="h-4 w-4" /> Phone Number Active
                        </div>
                        <div className="flex items-center gap-2 text-sm text-amber-600 font-medium">
                          <AlertCircle className="h-4 w-4" /> Manual License Check Required
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">All caught up!</h3>
            <p className="text-slate-500 mt-2">There are no pending pharmacy registrations to review.</p>
          </div>
        )}
      </div>
    </div>
  );
}