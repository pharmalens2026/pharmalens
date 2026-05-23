import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, MapPin, Phone, Globe, Info, Mail } from "lucide-react";
import { toast } from "sonner";
import { PHARMACIES } from "@/data/mockData";
import { LocationPicker } from "@/components/location/LocationPicker";

interface PharmacyProfileEditProps {
  onBack: () => void;
  pharmacyId?: string;
}

export const PharmacyProfileEdit = ({ onBack, pharmacyId = "p1" }: PharmacyProfileEditProps) => {
  const currentPharmacy = PHARMACIES.find(p => p.id === pharmacyId) || PHARMACIES[0];
  
  const [formData, setFormData] = useState({
    name: currentPharmacy.name || "New Pharmacy",
    address: currentPharmacy.address || "View Park Towers, Nairobi, Kenya",
    phone: currentPharmacy.phone || "0724795895",
    whatsapp: currentPharmacy.whatsapp || "254724795895",
    email: currentPharmacy.email || "",
    description: currentPharmacy.description || "Providing quality healthcare services and authentic medications.",
    website: "www.pharmalens.com",
    location: currentPharmacy.location || { lat: -1.2841, lng: 36.8155 },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (loc: { lat: number; lng: number; address: string }) => {
    setFormData(prev => ({
      ...prev,
      address: loc.address,
      location: { lat: loc.lat, lng: loc.lng }
    }));
  };

  const handleSave = () => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
      loading: 'Saving profile changes...',
      success: 'Profile updated successfully!',
      error: 'Error updating profile',
    });
    setTimeout(() => {
      onBack();
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Pharmacy Profile</h1>
          <p className="text-slate-500">Update your public information and how patients reach you.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-cyan-600" /> General Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Pharmacy Business Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">About Your Pharmacy</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  rows={4} 
                  value={formData.description} 
                  onChange={handleInputChange}
                  placeholder="Tell patients about your pharmacy..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-cyan-600" /> Location & Map Selection
              </CardTitle>
              <CardDescription>Drag the pin or search to set your exact location for patient searches.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <LocationPicker 
                initialLocation={formData.location}
                initialAddress={formData.address}
                onLocationChange={handleLocationChange}
              />
              
              <div className="space-y-2">
                <Label htmlFor="address">Full Display Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  placeholder="Building, Street, Area..." 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-cyan-600" /> Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input id="phone" name="phone" className="pl-10" value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input id="whatsapp" name="whatsapp" className="pl-10" value={formData.whatsapp} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Public Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input id="email" name="email" type="email" className="pl-10" value={formData.email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input id="website" name="website" className="pl-10" value={formData.website} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-2">
              <Button className="bg-cyan-600 hover:bg-cyan-700 font-bold" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Save Profile
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Profile Preview</CardTitle>
              <CardDescription>How your pharmacy appears to patients.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-2xl p-5 space-y-4 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-slate-900">{formData.name}</h3>
                  <Badge className="bg-cyan-100 text-cyan-600 text-[10px] border-none uppercase font-black">Verified</Badge>
                </div>
                <div className="space-y-2 text-xs text-slate-500">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-cyan-500" />
                    <span className="leading-relaxed">{formData.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-cyan-500" />
                    <span>{formData.phone}</span>
                  </div>
                </div>
                <div className="pt-1">
                  <p className="text-xs text-slate-600 line-clamp-3 italic">"{formData.description}"</p>
                </div>
                <Button className="w-full h-10 text-sm bg-emerald-600 hover:bg-emerald-700 font-bold rounded-xl">
                  Contact via WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};