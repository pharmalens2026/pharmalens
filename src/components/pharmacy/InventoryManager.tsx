import { useState } from "react";
import { ArrowLeft, Search, Plus, Trash2, Edit2, X, Package2, AlertTriangle, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INVENTORY_ITEMS, MEDICINE_CATEGORIES } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface InventoryManagerProps {
  onBack: () => void;
}

export function InventoryManager({ onBack }: InventoryManagerProps) {
  const [items, setItems] = useState(INVENTORY_ITEMS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    stockStatus: "In Stock" as const
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price || !newItem.category) {
      toast.error("Please fill all fields, including category");
      return;
    }
    const item = {
      id: Math.random().toString(36).substr(2, 9),
      name: newItem.name,
      category: newItem.category,
      price: parseFloat(newItem.price),
      stockStatus: newItem.stockStatus,
      lastUpdated: "Just now"
    };
    setItems([item, ...items]);
    setNewItem({ name: "", category: "", price: "", stockStatus: "In Stock" });
    setShowAddForm(false);
    toast.success("Medicine added to inventory");
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.info("Item removed");
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-3xl font-extrabold text-slate-900">Inventory Management</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search your inventory..." 
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          className="h-12 bg-cyan-600 hover:bg-cyan-700 px-6 font-bold gap-2"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="h-5 w-5" />
          Add New Entry
        </Button>
      </div>

      {/* Manual Data Entry Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <Card className="border-2 border-cyan-100 bg-cyan-50/30">
              <CardHeader className="pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Pill className="h-5 w-5 text-cyan-600" />
                  Manual Medicine Entry
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowAddForm(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Medicine Name</label>
                    <Input 
                      placeholder="e.g. Paracetamol 500mg" 
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                    <Select 
                      value={newItem.category} 
                      onValueChange={(val) => setNewItem({ ...newItem, category: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {MEDICINE_CATEGORIES.map(cat => (
                          <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Price ($)</label>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="0.00" 
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                    <Select 
                      value={newItem.stockStatus} 
                      onValueChange={(val: any) => setNewItem({ ...newItem, stockStatus: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Low Stock">Low Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-4 flex justify-end gap-2 mt-2">
                    <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
                    <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 px-8">Save Medicine</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inventory List */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Medicine</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Category</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Price</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Last Updated</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredItems.map((item, index) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-50/50"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center">
                          <Package2 className="h-4 w-4 text-slate-400" />
                        </div>
                        <span className="font-semibold text-slate-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{item.category}</td>
                    <td className="p-4 font-medium text-slate-700">${item.price.toFixed(2)}</td>
                    <td className="p-4">
                      <Badge 
                        variant="secondary"
                        className={`${
                          item.stockStatus === "In Stock" ? "bg-emerald-50 text-emerald-700" :
                          item.stockStatus === "Low Stock" ? "bg-amber-50 text-amber-700" :
                          "bg-rose-50 text-rose-700"
                        } border-none`}
                      >
                        {item.stockStatus}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-slate-500">{item.lastUpdated}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-cyan-600">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-slate-400 hover:text-rose-600"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filteredItems.length === 0 && (
              <div className="p-12 text-center text-slate-500">
                <AlertTriangle className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                <p>No medicines found matching your search.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}