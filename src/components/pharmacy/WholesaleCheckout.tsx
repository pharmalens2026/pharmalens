import { useState } from "react";
import { ArrowLeft, CheckCircle2, ShoppingCart, Truck, AlertTriangle, ShieldCheck, CreditCard, ChevronRight, Package, DollarSign, MapPin, TrendingUp, Info, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface WholesaleCheckoutProps {
  onBack: () => void;
  onSuccess: () => void;
  product: {
    id: string;
    name: string;
    bulkPrice: number;
    minOrderQty: number;
    unit: string;
    wholesalerName: string;
    retailPrice?: number;
  };
}

export function WholesaleCheckout({ onBack, onSuccess, product }: WholesaleCheckoutProps) {
  const [orderQty, setOrderQty] = useState(product.minOrderQty);
  const [step, setStep] = useState<"checkout" | "success">("checkout");
  const isMOQMet = orderQty >= product.minOrderQty;
  const totalAmount = orderQty * product.bulkPrice;
  const estRetailValue = orderQty * (product.retailPrice || (product.bulkPrice * 1.5));
  const profitMargin = estRetailValue - totalAmount;

  const handleCheckout = () => {
    if (!isMOQMet) {
      toast.error(`Order Failed: Minimum Order Quantity (MOQ) requirement not met.`, {
        description: `This wholesaler requires a minimum of ${product.minOrderQty} ${product.unit}.`,
        className: "bg-red-50 border-red-200 text-red-900 rounded-3xl p-6 shadow-2xl",
      });
      return;
    }
    setStep("success");
    toast.success("B2B Supply Request Initiated!", {
      description: `Your order for ${orderQty} ${product.unit} has been routed.`,
      className: "bg-emerald-50 border-emerald-200 text-emerald-900 rounded-3xl p-6 shadow-2xl",
    });
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="w-32 h-32 bg-emerald-100 rounded-[48px] flex items-center justify-center mx-auto mb-10 shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
            <CheckCircle2 className="h-16 w-16 text-emerald-600 relative z-10" />
          </div>
          <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Supply Routing Confirmed!</h2>
          <p className="text-slate-500 font-medium mb-12 text-xl leading-relaxed">
            Your bulk order for <span className="text-slate-900 font-black">{orderQty} {product.unit}</span> of {product.name} is being processed by <span className="text-purple-600 font-black">{product.wholesalerName}</span>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="rounded-[40px] border-emerald-100 bg-emerald-50/30 overflow-hidden text-left">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 text-emerald-700 font-black text-[10px] uppercase tracking-widest mb-4">
                  <Truck className="h-4 w-4" /> Logistics Status
                </div>
                <p className="text-xl font-black text-emerald-900 mb-1">Processing Release</p>
                <p className="text-sm text-emerald-600 font-bold">Estimated Dispatch: Within 4 Hours</p>
              </CardContent>
            </Card>
            <Card className="rounded-[40px] border-slate-100 bg-slate-50/50 overflow-hidden text-left">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 text-slate-500 font-black text-[10px] uppercase tracking-widest mb-4">
                  <CreditCard className="h-4 w-4" /> Final Payment
                </div>
                <p className="text-xl font-black text-slate-900 mb-1">Pay on Delivery</p>
                <p className="text-sm text-slate-500 font-bold italic">Check your WhatsApp for invoice.</p>
              </CardContent>
            </Card>
          </div>

          <Button 
            className="w-full h-20 bg-slate-900 hover:bg-slate-800 font-black text-2xl rounded-[28px] shadow-2xl shadow-slate-900/20 active:scale-95 transition-transform" 
            onClick={onSuccess}
          >
            Return to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="gap-2 font-black text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-2xl h-12 px-6"
          >
            <ArrowLeft className="h-5 w-5" /> Back to Search Results
          </Button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Verified B2B Transaction</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="h-20 w-20 bg-purple-100 rounded-[32px] flex items-center justify-center text-purple-600 shadow-inner shrink-0">
                <Truck className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">B2B Supply Request</h1>
                <div className="flex items-center gap-3">
                  <Badge className="bg-purple-600 text-[10px] font-black uppercase tracking-widest">BULK ORDER</Badge>
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-wider">Distributor: <span className="text-purple-600">{product.wholesalerName}</span></p>
                </div>
              </div>
            </div>

            <Card className="rounded-[48px] border-slate-200/60 shadow-2xl shadow-slate-900/5 overflow-hidden bg-white">
              <CardContent className="p-10">
                <div className="flex flex-col md:flex-row items-start gap-10 mb-12">
                  <div className="h-32 w-32 bg-slate-50 rounded-[40px] flex items-center justify-center text-slate-300 border border-slate-100 shrink-0 shadow-inner group transition-all hover:bg-purple-50">
                    <Package className="h-16 w-16 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">{product.name}</h3>
                      <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-emerald-50 px-3 py-1 font-black text-[10px] uppercase">Official Supply</Badge>
                    </div>
                    <p className="text-slate-500 font-medium text-lg italic leading-relaxed">
                      Supply contract for licensed pharmacies. Includes full cold-chain support if required.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-2">
                        <Info className="h-4 w-4 text-purple-600" />
                        <span className="text-xs font-black text-slate-600 uppercase tracking-widest">PPB Certified Stock</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 px-2">Requested Volume</Label>
                      <div className="relative group">
                        <Input 
                          type="number" 
                          className={`h-20 text-4xl font-black rounded-[28px] bg-slate-50 border-4 transition-all pl-8 ${!isMOQMet ? 'border-red-100 text-red-600 focus-visible:ring-red-200' : 'border-slate-50 focus-visible:ring-purple-200'}`}
                          value={orderQty}
                          onChange={(e) => setOrderQty(parseInt(e.target.value) || 0)}
                        />
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 font-black uppercase text-sm tracking-widest">{product.unit}</div>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {!isMOQMet && (
                        <motion.div 
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="p-8 bg-red-50 rounded-[32px] border-2 border-red-100 flex items-start gap-5 shadow-sm"
                        >
                          <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-red-600 shrink-0 shadow-sm border border-red-50">
                            <AlertTriangle className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-black text-red-900 text-sm uppercase tracking-wider mb-1">Minimum Order Violated</h4>
                            <p className="text-xs text-red-700 font-bold leading-relaxed">
                              This B2B contract requires at least <span className="text-red-900 underline decoration-2">{product.minOrderQty} {product.unit}</span>. Adjust your quantity to unlock wholesale pricing.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-4">
                    <div className="p-8 bg-purple-50 rounded-[40px] border border-purple-100 shadow-inner relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="flex items-center gap-3 text-purple-700 mb-6 relative z-10">
                        <TrendingUp className="h-5 w-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Supply Benefit Analysis</span>
                      </div>
                      <div className="space-y-6 relative z-10">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-black uppercase text-[10px] tracking-widest">B2B Unit Price:</span>
                          <span className="text-2xl font-black text-slate-900 tracking-tight">KES {product.bulkPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-emerald-600">
                          <span className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Est. Retail Value:</span>
                          <span className="text-xl font-black">KES {estRetailValue.toLocaleString()}</span>
                        </div>
                        <div className="pt-4 border-t border-purple-200 flex justify-between items-center">
                          <span className="text-purple-700 font-black uppercase text-[10px] tracking-widest">Projected Margin:</span>
                          <span className="text-2xl font-black text-purple-700 tracking-tighter">+ KES {profitMargin.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="rounded-[40px] border-slate-200/60 shadow-lg shadow-slate-900/5 overflow-hidden bg-white">
                <CardHeader className="bg-slate-50 border-b p-8">
                  <CardTitle className="text-xl font-black tracking-tight flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple-600" /> Delivery Target
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-1">
                    <p className="font-black text-slate-900 text-lg">City Central Pharmacy</p>
                    <p className="text-sm text-slate-500 font-medium">View Park Towers, Suite 1604, Nairobi</p>
                    <div className="pt-4 flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Free B2B Logistics Included
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-[40px] border-slate-200/60 shadow-lg shadow-slate-900/5 overflow-hidden bg-white">
                <CardHeader className="bg-slate-50 border-b p-8">
                  <CardTitle className="text-xl font-black tracking-tight flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-purple-600" /> Receiving Officer
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-1">
                    <p className="font-black text-slate-900 text-lg">Dr. Sarah Kemunto</p>
                    <p className="text-sm text-slate-500 font-medium">Chief Pharmacist (PPB/R/8821)</p>
                    <div className="pt-4">
                      <Badge variant="outline" className="border-slate-100 text-slate-400 font-bold px-3 py-1 rounded-lg">Verified Credentials</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <Card className="rounded-[48px] shadow-2xl shadow-purple-900/10 border-slate-100 overflow-hidden bg-white">
                <CardHeader className="bg-slate-900 text-white p-10 pb-16">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-3xl font-black tracking-tight leading-none">Order <br/> Summary</CardTitle>
                    <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center">
                      <ShoppingCart className="h-7 w-7 text-purple-400" />
                    </div>
                  </div>
                  <CardDescription className="text-purple-300 font-black uppercase tracking-widest text-[10px]">Supply Contract ID: PHL-B2B-{Date.now().toString().slice(-6)}</CardDescription>
                </CardHeader>
                <CardContent className="p-10 -mt-10 bg-white rounded-t-[48px] space-y-8 relative z-10">
                  <div className="space-y-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Contract Value ({orderQty} Units)</span>
                      <span className="font-black text-slate-900">KES {totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">B2B Transaction Fee</span>
                      <span className="font-black text-emerald-600">0.00 (SUBSIDIZED)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Regional Logistics</span>
                      <span className="font-black text-slate-900">TBD ON INVOICE</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-slate-100 w-full" />
                  
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-black text-slate-900 tracking-tight">Est. Subtotal</span>
                    <div className="text-right">
                      <div className="text-4xl font-black text-purple-600 tracking-tighter leading-none mb-1">
                        <span className="text-sm mr-1">KES</span>
                        {totalAmount.toLocaleString()}
                      </div>
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Excl. Variable Logistics</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      disabled={!isMOQMet}
                      className={`w-full h-20 font-black text-2xl rounded-[24px] shadow-2xl transition-all active:scale-95 ${
                        isMOQMet 
                        ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-900/30 hover:scale-[1.01]' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                      }`}
                      onClick={handleCheckout}
                    >
                      Commit to Supply
                    </Button>
                    <p className="text-[10px] text-center font-black text-slate-400 uppercase tracking-widest leading-loose">
                      Payment terms: <span className="text-slate-900">Cash on Delivery / 30-Day Credit</span> <br/> subject to wholesaler approval.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="p-8 bg-amber-50 rounded-[40px] border-2 border-amber-100 flex items-start gap-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-amber-600 shrink-0 shadow-sm border border-amber-50 relative z-10">
                  <Info className="h-6 w-6" />
                </div>
                <div className="relative z-10">
                  <h4 className="font-black text-amber-900 text-xs uppercase tracking-widest mb-1">Legal Notice</h4>
                  <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
                    B2B orders are legally binding supply agreements. Cancellations after warehouse dispatch may incur restocking fees up to 15%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}