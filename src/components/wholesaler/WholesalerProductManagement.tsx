import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Tag,
  Box,
  Truck,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Layers,
  ChevronRight,
  BarChart2,
  Settings,
  ArrowRightLeft
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogDescription,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { MEDICINE_CATEGORIES } from '@/data/mockData';

interface WholesalerProduct {
  id: string;
  name: string;
  category: string;
  retailPrice: number;
  bulkPrice: number;
  minOrderQty: number;
  unit: string;
  stock: number;
  isWholesaleOnly: boolean;
}

const INITIAL_PRODUCTS: WholesalerProduct[] = [
  {
    id: 'wp1',
    name: 'Panadol Advance 500mg',
    category: 'Pain Relief',
    retailPrice: 250,
    bulkPrice: 180,
    minOrderQty: 50,
    unit: 'boxes',
    stock: 5000,
    isWholesaleOnly: false
  },
  {
    id: 'wp2',
    name: 'Amoxil 500mg Capsules',
    category: 'Antibiotics',
    retailPrice: 850,
    bulkPrice: 620,
    minOrderQty: 20,
    unit: 'cartons',
    stock: 200,
    isWholesaleOnly: true
  },
  {
    id: 'wp3',
    name: 'Augmentin 625mg',
    category: 'Antibiotics',
    retailPrice: 2400,
    bulkPrice: 1850,
    minOrderQty: 10,
    unit: 'boxes',
    stock: 450,
    isWholesaleOnly: true
  }
];

export function WholesalerProductManagement() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [pricingMode, setPricingMode] = useState<'retail' | 'wholesale'>('wholesale');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<WholesalerProduct | null>(null);
  const [formData, setFormData] = useState<Partial<WholesalerProduct>>({
    isWholesaleOnly: false,
    unit: 'units',
    minOrderQty: 1
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({ isWholesaleOnly: false, unit: 'units', minOrderQty: 1 });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (product: WholesalerProduct) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.bulkPrice || !formData.minOrderQty) {
      toast.error('Please fill in all mandatory wholesale fields');
      return;
    }

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } as WholesalerProduct : p));
      toast.success('Product updated successfully');
    } else {
      const product: WholesalerProduct = {
        id: `wp-${Date.now()}`,
        name: formData.name as string,
        category: formData.category || 'General',
        retailPrice: formData.retailPrice || 0,
        bulkPrice: formData.bulkPrice as number,
        minOrderQty: formData.minOrderQty as number,
        unit: formData.unit as string,
        stock: formData.stock || 0,
        isWholesaleOnly: formData.isWholesaleOnly || false
      };
      setProducts([product, ...products]);
      toast.success('Product added successfully to inventory');
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product removed from inventory');
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Product & Inventory Management</h2>
          <p className="text-slate-500">Manage your catalog, pricing models, and bulk supply settings.</p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={pricingMode} onValueChange={(v: any) => setPricingMode(v)} className="bg-slate-100 p-1 rounded-xl">
            <TabsList className="grid w-[240px] grid-cols-2">
              <TabsTrigger value="retail" className="text-xs font-bold">Retail Prices</TabsTrigger>
              <TabsTrigger value="wholesale" className="text-xs font-bold">Wholesale B2B</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={handleOpenAdd} className="bg-cyan-600 hover:bg-cyan-700 gap-2 h-11">
            <Plus size={18} /> Add New Product
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search by name or category..." 
            className="pl-10 h-11 bg-white"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-44 h-11 bg-white">
            <Filter className="mr-2 text-slate-400" size={16} />
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Inventory</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden border-slate-200 hover:border-cyan-200 transition-all group">
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-medium">
                    {product.category}
                  </Badge>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-cyan-700 transition-colors">{product.name}</h3>
                </div>
                {product.isWholesaleOnly && (
                  <Badge className="bg-purple-100 text-purple-700 border-none">Wholesale Only</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`space-y-1 p-3 rounded-xl transition-all ${pricingMode === 'retail' ? 'bg-cyan-50 border border-cyan-100' : 'bg-slate-50'}`}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Retail Price</p>
                  <p className={`font-bold ${pricingMode === 'retail' ? 'text-cyan-700' : 'text-slate-700'}`}>KES {product.retailPrice.toLocaleString()}</p>
                </div>
                <div className={`space-y-1 p-3 rounded-xl border transition-all ${pricingMode === 'wholesale' ? 'bg-cyan-50 border-cyan-100' : 'bg-slate-50 border-transparent'}`}>
                  <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider">Wholesale Price</p>
                  <p className={`font-bold ${pricingMode === 'wholesale' ? 'text-cyan-700' : 'text-slate-700'}`}>KES {product.bulkPrice.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <Box size={16} />
                  <span>Min Order: <span className="font-bold text-slate-900">{product.minOrderQty} {product.unit}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`h-2 w-2 rounded-full ${product.stock > 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="font-medium text-slate-600">{product.stock.toLocaleString()} Stock</span>
                </div>
              </div>
            </div>
            <div className="px-5 py-4 bg-slate-50/80 border-t flex items-center justify-between">
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-cyan-600" onClick={() => handleOpenEdit(product)}>
                <Edit2 size={14} className="mr-2" /> Edit Details
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600" onClick={() => handleDelete(product.id)}>
                  <Trash2 size={14} />
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">Analytics</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>Set up your product with dual pricing and bulk ordering requirements.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Product Name *</Label>
                <Input 
                  placeholder="e.g. Paracetamol 500mg"
                  value={formData.name || ''}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={v => setFormData({...formData, category: v})}
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
                <Label>Stock Quantity</Label>
                <Input 
                  type="number" 
                  placeholder="0"
                  value={formData.stock || ''}
                  onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="space-y-0.5">
                  <Label>Wholesale Only</Label>
                  <p className="text-[10px] text-slate-500">Restrict this product to B2B buyers only.</p>
                </div>
                <Switch 
                  checked={formData.isWholesaleOnly} 
                  onCheckedChange={v => setFormData({...formData, isWholesaleOnly: v})}
                />
              </div>
            </div>

            <div className="space-y-4 bg-cyan-50/50 p-4 rounded-xl border border-cyan-100">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="text-cyan-600" size={18} />
                <h4 className="font-bold text-cyan-900">Pricing & Bulk Settings</h4>
              </div>
              <div className="space-y-2">
                <Label>Retail Price (per unit)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">KES</span>
                  <Input 
                    className="pl-12 bg-white"
                    type="number" 
                    placeholder="0.00"
                    value={formData.retailPrice || ''}
                    onChange={e => setFormData({...formData, retailPrice: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-cyan-700">Wholesale Bulk Price *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 text-sm">KES</span>
                  <Input 
                    className="pl-12 border-cyan-200 bg-white focus:ring-cyan-500"
                    type="number" 
                    placeholder="0.00"
                    value={formData.bulkPrice || ''}
                    onChange={e => setFormData({...formData, bulkPrice: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-cyan-700">Min Order Qty *</Label>
                  <Input 
                    type="number" 
                    className="border-cyan-200 bg-white"
                    value={formData.minOrderQty || 1}
                    onChange={e => setFormData({...formData, minOrderQty: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Order Unit</Label>
                  <Select 
                    value={formData.unit} 
                    onValueChange={v => setFormData({...formData, unit: v})}
                  >
                    <SelectTrigger className="bg-white border-cyan-200">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="units">Units</SelectItem>
                      <SelectItem value="boxes">Boxes</SelectItem>
                      <SelectItem value="cartons">Cartons</SelectItem>
                      <SelectItem value="pallets">Pallets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={handleSaveProduct}>
              {editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}