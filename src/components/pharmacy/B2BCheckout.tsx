import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  AlertCircle,
  ShieldCheck,
  Truck,
  CreditCard,
  ArrowLeft,
  Plus,
  Minus,
  Info,
  Package,
  Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  minOrderQty: number;
  unit: string;
  wholesalerName: string;
}

interface B2BCheckoutProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function B2BCheckout({ onBack, onSuccess }: B2BCheckoutProps) {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'wp1',
      name: 'Panadol Advance 500mg',
      price: 180,
      quantity: 40, // Below MOQ 50
      minOrderQty: 50,
      unit: 'boxes',
      wholesalerName: 'Global Meds Ltd'
    },
    {
      id: 'wp2',
      name: 'Amoxil 500mg Capsules',
      price: 620,
      quantity: 25,
      minOrderQty: 20,
      unit: 'cartons',
      wholesalerName: 'PharmaLink Kenya'
    }
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const hasMOQError = cart.some(item => item.quantity < item.minOrderQty);

  const handleCheckout = () => {
    if (hasMOQError) {
      toast.error('Minimum Order Quantity (MOQ) not met for one or more items');
      return;
    }
    toast.success('B2B Order placed successfully!');
    onSuccess();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Pharmacy B2B Checkout</h2>
          <p className="text-slate-500 text-sm">Review your bulk order and wholesaler requirements.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const isInvalid = item.quantity < item.minOrderQty;
            
            return (
              <Card key={item.id} className={`overflow-hidden transition-all ${isInvalid ? 'border-rose-200 bg-rose-50/30' : 'border-slate-100'}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="h-20 w-20 bg-white rounded-xl border flex items-center justify-center shrink-0">
                      <Package size={32} className="text-slate-300" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-900">{item.name}</h3>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <ShieldCheck size={12} className="text-cyan-600" />
                            Sold by: <span className="text-cyan-700 font-medium">{item.wholesalerName}</span>
                          </p>
                        </div>
                        <p className="font-bold text-slate-900">KES {(item.price * item.quantity).toLocaleString()}</p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center bg-white border rounded-lg p-1">
                          <button 
                            className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-12 text-center text-sm font-bold">{item.quantity}</span>
                          <button 
                            className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className={`text-[10px] h-5 ${isInvalid ? 'border-rose-300 text-rose-700 bg-white' : 'border-cyan-200 text-cyan-700'}`}>
                            MOQ: {item.minOrderQty} {item.unit}
                          </Badge>
                        </div>
                      </div>

                      {isInvalid && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center gap-2 text-rose-600 bg-white p-2 rounded-lg border border-rose-100 mt-2"
                        >
                          <AlertCircle size={14} />
                          <p className="text-[11px] font-bold uppercase tracking-tight">
                            Action Required: Increase quantity by {item.minOrderQty - item.quantity} to meet wholesaler MOQ.
                          </p>
                        </motion.div>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-300 hover:text-rose-600 h-8 w-8"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {cart.length === 0 && (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed rounded-3xl">
              <ShoppingBag size={48} className="mb-4 opacity-20" />
              <p>Your B2B cart is empty</p>
              <Button variant="link" onClick={onBack} className="text-cyan-600 font-bold mt-2">Back to Marketplace</Button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-xl shadow-slate-200/50">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Estimated VAT (16%)</span>
                  <span>KES {tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery Fee</span>
                  <span className="text-emerald-600 font-medium">FREE</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-slate-900">Total Amount</span>
                <span className="text-xl font-bold text-slate-900">KES {total.toLocaleString()}</span>
              </div>

              <Button 
                className={`w-full h-12 font-bold transition-all shadow-lg shadow-cyan-900/10 ${hasMOQError ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700'}`}
                disabled={hasMOQError || cart.length === 0}
                onClick={handleCheckout}
              >
                {hasMOQError ? 'Resolve MOQ Issues' : 'Place B2B Order'}
              </Button>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <Truck size={14} />
                  <span>Consolidated delivery from 2 wholesalers</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <CreditCard size={14} />
                  <span>Pay via Bank Transfer or M-Pesa Business</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-cyan-50 border border-cyan-100 p-4 rounded-2xl">
            <div className="flex gap-3">
              <Info className="text-cyan-600 shrink-0" size={18} />
              <div className="space-y-1">
                <p className="text-xs font-bold text-cyan-900 uppercase">Wholesale Policy</p>
                <p className="text-[10px] text-cyan-700 leading-relaxed">
                  MOQ (Minimum Order Quantity) is set by individual wholesalers. Your order will only be processed once all item requirements are met.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}