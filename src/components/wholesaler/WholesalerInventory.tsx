import { useState } from "react";
import { ArrowLeft, Plus, Search, Filter, Edit2, Trash2, Package, Truck, AlertCircle, Info, ChevronRight, Check, TrendingUp, AlertTriangle, DollarSign, Box, LayoutGrid, Layers, Trash, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WHOLESALE_PRODUCTS } from "@/data/mockData";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface WholesalerInventoryProps {
  onBack: () => void;
}

export function WholesalerInventory({ onBack }: WholesalerInventoryProps) {
  const [inventory, setInventory] = useState(WHOLESALE_PRODUCTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [pricingModel, setPricingModel] = useState<"retail" | "wholesale">("wholesale");
  const [isWholesaleOnly, setIsWholesaleOnly] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    retailPrice: "",
    bulkPrice: "",
    minOrderQty: "",
    unit: "cartons"
  });

  const handleAddProduct = () => {
    if (!formData.name || !formData.category) {
      toast.error("Product name and category are required");
      return;
    }

    if (pricingModel === "wholesale") {
      if (!formData.bulkPrice || !formData.minOrderQty) {
        toast.error("B2B listings require Bulk Price and Minimum Order Quantity (MOQ)");
        return;
      }
    }

    const newProduct = {
      id: `wp-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      retailPrice: parseFloat(formData.retailPrice) || 0,
      bulkPrice: parseFloat(formData.bulkPrice) || 0,
      minOrderQty: parseInt(formData.minOrderQty) || 1,
      unit: formData.unit,
      stockStatus: "In Stock" as const,
      isWholesaleOnly: isWholesaleOnly,
      wholesalerId: "w1",
      wholesalerName: "MedLink Distributors"
    };

    // @ts-ignore - Adding to state
    setInventory([newProduct, ...inventory]);
    toast.success(`${formData.name} added to your B2B marketplace catalog!`);
    setShowAddModal(false);
    
    // Reset form
    setFormData({
      name: "",
      category: "",
      retailPrice: "",
      bulkPrice: "",
      minOrderQty: "",
      unit: "cartons"
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Dynamic Header */}
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
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">Stock Management</h1>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-[9px] font-black uppercase tracking-widest h-5">B2B ACTIVE</Badge>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{inventory.length} Verified Listings</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-14 px-6 rounded-2xl font-black gap-2 border-slate-200 hidden sm:flex">
              <Layers className="h-5 w-5 text-slate-400" /> Bulk Import
            </Button>
            <Button 
              className="h-14 px-8 rounded-2xl bg-purple-600 hover:bg-purple-700 font-black text-lg shadow-xl shadow-purple-900/20 gap-3 group transition-transform hover:scale-[1.02]" 
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform" />
              New B2B Listing
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl px-4 mx-auto py-10">
        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
            <Input 
              className="pl-14 h-16 bg-white rounded-3xl border-slate-200 text-lg font-medium shadow-sm focus-visible:ring-purple-500 transition-all" 
              placeholder="Filter your catalog by name, SKU or category..." 
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-16 px-8 font-black gap-3 rounded-3xl border-slate-200 bg-white shadow-sm">
              <Filter className="h-5 w-5" /> Filter Results
            </Button>
            <Button variant="outline" className="h-16 w-16 p-0 rounded-3xl border-slate-200 bg-white shadow-sm">
              <LayoutGrid className="h-6 w-6 text-slate-400" />
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {inventory.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="group hover:shadow-2xl hover:shadow-purple-900/5 transition-all duration-500 border-slate-200/60 rounded-[40px] overflow-hidden bg-white">
                  <CardContent className="p-0">
                    {/* Visual Preview Area */}
                    <div className="aspect-[16/9] bg-slate-50 relative flex items-center justify-center border-b border-slate-100 group-hover:bg-purple-50/30 transition-colors">
                      <div className="absolute top-5 left-5">
                        <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-slate-200 text-slate-600 px-3 py-1 font-black text-[9px] uppercase tracking-widest shadow-sm">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="absolute top-5 right-5 flex gap-2">
                        <Button variant="secondary" size="icon" className="h-9 w-9 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors">
                          <Edit2 className="h-4 w-4 text-slate-600" />
                        </Button>
                        <Button variant="secondary" size="icon" className="h-9 w-9 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:bg-red-50 hover:text-red-600 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Package className="h-20 w-20 text-slate-200 group-hover:text-purple-200 transition-colors" />
                    </div>

                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-purple-700 transition-colors">{product.name}</h3>
                          <div className="flex items-center gap-3">
                            <div className={`h-2 w-2 rounded-full ${product.stockStatus === 'In Stock' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.stockStatus}</span>
                          </div>
                        </div>
                        {product.isWholesaleOnly ? (
                          <Badge className="bg-slate-900 text-white font-black text-[9px] uppercase px-3 py-1 rounded-lg">B2B ONLY</Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-500 font-black text-[9px] uppercase px-3 py-1 rounded-lg border-slate-200">HYBRID</Badge>
                        )}
                      </div>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 group-hover:border-purple-100 group-hover:bg-purple-50/20 transition-all">
                          <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Bulk Contract Price</p>
                            <div className="text-3xl font-black text-purple-700 tracking-tighter">
                              <span className="text-sm mr-1 font-bold">KES</span>
                              {product.bulkPrice.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Min. Order</p>
                            <div className="text-xl font-black text-slate-900 tracking-tight">
                              {product.minOrderQty} <span className="text-xs font-bold text-slate-400 uppercase">{product.unit}</span>
                            </div>
                          </div>
                        </div>
                        
                        {!product.isWholesaleOnly && (
                          <div className="flex justify-between items-center px-5 text-sm">
                            <span className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">Est. Retail Value</span>
                            <span className="font-black text-slate-900">KES {product.retailPrice.toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      <Button className="w-full h-14 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 hover:bg-slate-50 hover:border-slate-200 font-black gap-2 transition-all">
                        <TrendingUp className="h-5 w-5 text-purple-600" /> View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Product Modal Overlay */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative bg-white w-full max-w-3xl rounded-[48px] shadow-2xl overflow-hidden border border-slate-200"
            >
              <div className="p-12">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Create B2B Listing</h2>
                    <p className="text-slate-500 font-medium text-lg italic">Distribute your stock to the retail pharmacy network</p>
                  </div>
                  <div className="h-20 w-20 bg-purple-100 rounded-[32px] flex items-center justify-center text-purple-600 shadow-inner">
                    <Box className="h-10 w-10" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    {/* Basic Info */}
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Product Name</Label>
                        <Input 
                          placeholder="e.g. Paracetamol 500mg (10x10)" 
                          className="h-16 rounded-[24px] bg-slate-50 border-slate-200 focus:ring-purple-500 text-lg font-bold px-6 shadow-sm"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Inventory Category</Label>
                        <Select onValueChange={(v) => setFormData({ ...formData, category: v })}>
                          <SelectTrigger className="h-16 rounded-[24px] bg-slate-50 border-slate-200 text-lg font-bold px-6 shadow-sm">
                            <SelectValue placeholder="Select Sector" />
                          </SelectTrigger>
                          <SelectContent className="rounded-3xl p-2 border-slate-100">
                            <SelectItem value="Pain Relief" className="rounded-xl font-bold py-3">Pain Relief</SelectItem>
                            <SelectItem value="Antibiotics" className="rounded-xl font-bold py-3">Antibiotics</SelectItem>
                            <SelectItem value="Diabetes Care" className="rounded-xl font-bold py-3">Diabetes Care</SelectItem>
                            <SelectItem value="Antimalarials" className="rounded-xl font-bold py-3">Antimalarials</SelectItem>
                            <SelectItem value="Vitamins" className="rounded-xl font-bold py-3">Vitamins</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="p-8 bg-slate-900 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="flex items-center justify-between relative z-10">
                        <div className="space-y-1">
                          <Label className="text-sm font-black text-purple-300 uppercase tracking-widest">Visibility Control</Label>
                          <h4 className="text-lg font-black">Wholesale Exclusive</h4>
                          <p className="text-xs text-slate-400 font-medium leading-relaxed">Hide from public search; show only to verified retail pharmacies.</p>
                        </div>
                        <Switch 
                          checked={isWholesaleOnly} 
                          onCheckedChange={setIsWholesaleOnly} 
                          className="data-[state=checked]:bg-purple-500" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* B2B Configuration */}
                    <div className="p-10 bg-purple-50 rounded-[44px] border border-purple-100 shadow-inner">
                      <div className="flex items-center gap-3 text-purple-700 mb-8">
                        <TrendingUp className="h-6 w-6" />
                        <span className="text-xs font-black uppercase tracking-[0.25em]">B2B Pricing Engine</span>
                      </div>
                      
                      <div className="space-y-8">
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-purple-900/40 px-2">Bulk Contract Price (KES)</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-purple-400" />
                            <Input 
                              type="number" 
                              placeholder="0.00" 
                              className="h-16 pl-14 bg-white rounded-[24px] border-purple-200 focus:ring-purple-600 text-2xl font-black shadow-sm" 
                              value={formData.bulkPrice}
                              onChange={(e) => setFormData({ ...formData, bulkPrice: e.target.value })}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-xs font-black uppercase tracking-widest text-purple-900/40 px-2">Min Order (MOQ)</Label>
                            <Input 
                              type="number" 
                              placeholder="100" 
                              className="h-16 bg-white rounded-[24px] border-purple-200 focus:ring-purple-600 text-xl font-black text-center shadow-sm" 
                              value={formData.minOrderQty}
                              onChange={(e) => setFormData({ ...formData, minOrderQty: e.target.value })}
                            />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-xs font-black uppercase tracking-widest text-purple-900/40 px-2">Unit Type</Label>
                            <Select defaultValue="cartons" onValueChange={(v) => setFormData({ ...formData, unit: v })}>
                              <SelectTrigger className="h-16 bg-white rounded-[24px] border-purple-200 text-lg font-black px-6 shadow-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl p-2">
                                <SelectItem value="units" className="font-bold py-2">Units (Pcs)</SelectItem>
                                <SelectItem value="cartons" className="font-bold py-2">Cartons</SelectItem>
                                <SelectItem value="boxes" className="font-bold py-2">Boxes</SelectItem>
                                <SelectItem value="pallets" className="font-bold py-2">Pallets</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {!isWholesaleOnly && (
                          <div className="space-y-3 pt-4">
                            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Est. Retail Price (Single Unit)</Label>
                            <Input 
                              type="number" 
                              placeholder="0.00" 
                              className="h-14 bg-white/50 border-slate-200 rounded-[20px] text-lg font-bold px-6 shadow-sm" 
                              value={formData.retailPrice}
                              onChange={(e) => setFormData({ ...formData, retailPrice: e.target.value })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 mt-16">
                  <Button 
                    variant="ghost" 
                    className="flex-1 h-20 rounded-[28px] font-black text-xl text-slate-500 hover:bg-slate-50" 
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-2 h-20 bg-purple-600 hover:bg-purple-700 font-black text-2xl shadow-[0_25px_50px_-12px_rgba(147,51,234,0.3)] rounded-[28px] gap-4 transition-all hover:scale-[1.01] active:scale-95" 
                    onClick={handleAddProduct}
                  >
                    <Save className="h-7 w-7" />
                    Commit Listing
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}