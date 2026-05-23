import { ArrowLeft, Share2, Heart, CheckCircle2, AlertCircle, ShoppingCart, Info, MessageSquare, MapPin, ChevronRight, TrendingUp, Truck, Plus, Minus, AlertTriangle, Building2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { POPULAR_MEDICINES, PHARMACIES, WHOLESALE_PRODUCTS } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { WholesaleCheckout } from "@/components/pharmacy/WholesaleCheckout";

interface MedicineDetailScreenProps {
  medicineId: string;
  onBack: () => void;
}

export function MedicineDetailScreen({ medicineId, onBack }: MedicineDetailScreenProps) {
  const navigate = useNavigate();
  const medicine = POPULAR_MEDICINES.find(m => m.id === medicineId) || POPULAR_MEDICINES[0];
  const wholesaleOffers = WHOLESALE_PRODUCTS.filter(wp => wp.name.toLowerCase().includes(medicine.name.toLowerCase()));
  
  const [orderQty, setOrderQty] = useState(1);
  const [selectedOfferForCheckout, setSelectedOfferForCheckout] = useState<any | null>(null);

  const handleWholesaleOrderClick = (offer: any) => {
    setSelectedOfferForCheckout(offer);
  };

  if (selectedOfferForCheckout) {
    return (
      <WholesaleCheckout 
        product={selectedOfferForCheckout}
        onBack={() => setSelectedOfferForCheckout(null)}
        onSuccess={() => {
          setSelectedOfferForCheckout(null);
          onBack();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Top Navigation */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md px-4 py-4 border-b">
        <div className="container max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-slate-100">
            <ArrowLeft className="h-6 w-6 text-slate-700" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
              <Share2 className="h-5 w-5 text-slate-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
              <Heart className="h-5 w-5 text-slate-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl px-4 mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Medicine Visuals */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="aspect-square rounded-[40px] bg-white p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src={medicine.image} 
                alt={medicine.name} 
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Medicine Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-cyan-100 text-cyan-700 border-none px-4 py-1.5 font-black text-[10px] uppercase tracking-[0.2em] rounded-full">
                {medicine.category}
              </Badge>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-black uppercase tracking-widest">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Pharmacy Exclusive
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight tracking-tight">{medicine.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="text-4xl font-black text-cyan-600 tracking-tighter">{medicine.priceRange}</div>
              <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-100 px-3 py-1 font-bold">
                Live Market Data
              </Badge>
            </div>

            <Card className="bg-slate-900 text-white border-none rounded-[32px] mb-8 overflow-hidden relative shadow-2xl shadow-slate-900/20">
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Info className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-black mb-2 uppercase tracking-widest text-xs text-cyan-400">Pharmacist Note</h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                      {medicine.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Wholesale Section - B2B Layer */}
        <AnimatePresence>
          {wholesaleOffers.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Wholesale Supplies (B2B)</h3>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Verified Kenyan Distributors</p>
                  </div>
                </div>
                <Badge className="bg-purple-600 text-white px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border-none shadow-lg shadow-purple-100">
                  Business Only Access
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {wholesaleOffers.map((offer) => (
                  <Card key={offer.id} className="border-2 border-purple-100 bg-white hover:border-purple-300 transition-all rounded-[32px] overflow-hidden group shadow-sm hover:shadow-xl">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-stretch">
                        <div className="flex-1 p-8">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center font-black text-purple-600">
                              {offer.wholesalerName.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-black text-slate-900 text-lg">{offer.wholesalerName}</h4>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-emerald-50 px-2 py-0 font-bold text-[9px] uppercase">Verified Supply</Badge>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Delivery: 12-24h</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-8">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Bulk Unit Price</p>
                              <p className="text-2xl font-black text-purple-700 tracking-tighter">KES {offer.bulkPrice.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Min Order</p>
                              <p className="text-2xl font-black text-slate-900 tracking-tighter">{offer.minOrderQty} <span className="text-sm font-bold text-slate-400">{offer.unit}</span></p>
                            </div>
                            <div className="hidden sm:block">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Supply Status</p>
                              <div className="flex items-center gap-2 pt-1">
                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                <span className="text-sm font-black text-slate-700">IN STOCK</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-8 flex flex-col justify-center gap-4 md:w-80 border-t md:border-t-0 md:border-l border-slate-100">
                          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-inner">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order Quantity</span>
                              <Badge className="bg-slate-900 text-white font-bold h-5 px-2 text-[9px] uppercase tracking-tighter">MOQ Req.</Badge>
                            </div>
                            <div className="text-center font-black text-xl text-slate-900">{offer.minOrderQty} {offer.unit}</div>
                          </div>
                          <Button 
                            className="w-full h-14 bg-purple-600 hover:bg-purple-700 font-black text-lg rounded-2xl shadow-xl shadow-purple-900/10 gap-2 transition-transform hover:scale-[1.02]"
                            onClick={() => handleWholesaleOrderClick(offer)}
                          >
                            Proceed to Checkout
                          </Button>
                          <p className="text-[9px] text-center font-bold text-slate-400 uppercase tracking-widest">Secure B2B Payment Options Available</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Separator className="mb-16" />

        {/* Pharmacy Comparison List */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Retail Availability</h3>
              <p className="text-slate-500 font-medium">Comparing 12 verified pharmacies near your current location</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="rounded-full px-3 py-1 font-bold text-slate-500">Cheapest First</Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1 font-bold text-slate-500">Nearest</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {PHARMACIES.map((pharmacy, index) => (
              <motion.div
                key={pharmacy.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-slate-200 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-900/5 transition-all cursor-pointer group rounded-[32px] bg-white overflow-hidden shadow-sm">
                  <CardContent className="p-0">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-cyan-50 transition-all shadow-inner">
                          <MapPin className="h-8 w-8 text-slate-300 group-hover:text-cyan-600 transition-colors" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-black text-slate-900 text-xl group-hover:text-cyan-700 transition-colors tracking-tight">{pharmacy.name}</h4>
                            <Badge className="bg-emerald-50 text-emerald-700 border-none px-2 h-5 font-black text-[9px] uppercase">Verified</Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-slate-500 font-medium mt-2">
                            <div className="flex items-center gap-1.5">
                              <Navigation className="h-3.5 w-3.5 text-cyan-600" />
                              <span className="text-slate-900 font-bold">{pharmacy.distance} away</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${pharmacy.availability === "In Stock" ? "bg-emerald-500" : "bg-amber-500"} shadow-sm`}></span>
                              <span className={`font-black uppercase text-[10px] tracking-widest ${pharmacy.availability === "In Stock" ? "text-emerald-600" : "text-amber-600"}`}>{pharmacy.availability}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between md:justify-end gap-10 border-t md:border-none pt-6 md:pt-0">
                        <div className="text-right">
                          <div className="text-3xl font-black text-slate-900 flex items-start justify-end tracking-tighter">
                            <span className="text-xs mt-1.5 mr-1 font-bold">KES</span>
                            {pharmacy.price.toFixed(2)}
                          </div>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Direct Price</p>
                        </div>
                        <Button className="h-16 px-10 rounded-2xl bg-cyan-600 hover:bg-cyan-700 font-black text-lg gap-3 shadow-xl shadow-cyan-900/10 transition-transform hover:scale-105">
                          <MessageSquare className="h-5 w-5" />
                          Order Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 bg-slate-900 border border-slate-800 p-8 rounded-[40px] flex gap-6 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <AlertCircle className="h-8 w-8 text-cyan-400 shrink-0" />
          <div className="text-sm">
            <p className="font-black mb-2 uppercase tracking-widest text-cyan-400 text-xs">Medical Disclaimer & Compliance</p>
            <p className="leading-relaxed opacity-70 font-medium">
              This medication requires a valid medical prescription from a registered healthcare professional. 
              Pharmacies on this platform are independently licensed by the Pharmacy and Poisons Board (PPB) Kenya. 
              Verification of documentation will be conducted prior to fulfillment.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-white/80 backdrop-blur-2xl border-t z-50">
        <div className="container max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-0.5">Best Local Deal</p>
            <p className="text-2xl font-black text-cyan-600 tracking-tighter">KES {PHARMACIES[0].price.toFixed(2)}</p>
          </div>
          <Button className="flex-1 h-16 rounded-[20px] bg-slate-900 hover:bg-slate-800 text-xl font-black shadow-2xl shadow-slate-900/20 gap-3 transition-transform hover:scale-[1.02]">
            <ShoppingCart className="h-6 w-6" />
            Check Out Nearby
          </Button>
        </div>
      </div>
    </div>
  );
}