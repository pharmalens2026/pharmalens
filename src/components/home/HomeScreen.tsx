import { useState, useEffect, useRef } from "react";
import { Search, MapPin, TrendingUp, ArrowRight, ShieldCheck, Building2, ChevronDown, LayoutGrid, X, Navigation, Loader2 } from "lucide-react";
import * as Icons from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { POPULAR_MEDICINES, MEDICINE_CATEGORIES } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

declare global {
  interface Window {
    google: any;
  }
}

interface HomeScreenProps {
  onSearch: (query: string) => void;
  onSelectMedicine: (medicine: any) => void;
  onPharmacyAction: () => void;
}

export function HomeScreen({ onSearch, onSelectMedicine, onPharmacyAction }: HomeScreenProps) {
  const [location, setLocation] = useState("Nairobi, Kenya");
  const [searchCriteria, setSearchCriteria] = useState("medicine");
  const [searchValue, setSearchValue] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  
  const autoCompleteRef = useRef<any>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Google Maps Autocomplete if the API is loaded
    if (typeof window.google !== 'undefined' && window.google.maps && locationInputRef.current) {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(locationInputRef.current, {
        componentRestrictions: { country: "ke" },
        fields: ["formatted_address", "geometry"],
      });

      autoCompleteRef.current.addListener("place_changed", () => {
        const place = autoCompleteRef.current?.getPlace();
        if (place?.formatted_address) {
          setLocation(place.formatted_address);
          toast.success(`Location set to ${place.formatted_address.split(',')[0]}`);
        }
      });
    }

    // Auto-detect location on mount if not already set (optional, but requested "picks locations automatically")
    const hasDetected = sessionStorage.getItem('location_detected');
    if (!hasDetected) {
      // We don't force it immediately but maybe suggest it
    }
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: pos }, (results: any, status: string) => {
          if (status === "OK" && results[0]) {
            const addr = results[0].formatted_address;
            setLocation(addr);
            sessionStorage.setItem('location_detected', 'true');
            toast.success(`Location detected: ${results[0].address_components[1]?.long_name || "Success"}`);
          }
          setIsDetecting(false);
        });
      },
      (error) => {
        console.error(error);
        toast.error("Location access denied. Please enter your location manually.");
        setIsDetecting(false);
      }
    );
  };

  const getPlaceholder = () => {
    switch (searchCriteria) {
      case "location": return "Enter location in Kenya...";
      case "category": return "Enter category (e.g. Antibiotics)...";
      default: return "Enter medicine name...";
    }
  };

  const scrollToCategories = () => {
    setShowCategories(!showCategories);
    if (!showCategories) {
      setTimeout(() => {
        categoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/eaadaf1c-4853-43fb-8f2d-23765c7c57d0/pharmacy-hero-webp-e8b3259e-1776952403013.webp" 
            alt="Pharmacy Hero" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        
        <div className="container relative z-10 px-4 text-center text-white mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium border border-white/20 mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Helping Kenyans find affordable medicine
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
          >
            Find Your Medicine <br />
            <span className="text-cyan-400">In Kenya.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl mb-10 text-slate-200 max-w-2xl mx-auto"
          >
            Search across thousands of verified pharmacies in Kenya. Get real-time prices and availability near you.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto relative"
          >
            <div className="relative group p-1 bg-white/20 backdrop-blur-xl rounded-2xl md:rounded-full border border-white/30">
              <div className="relative flex flex-col md:flex-row gap-2">
                <div className="w-full md:w-48 shrink-0">
                  <Select value={searchCriteria} onValueChange={setSearchCriteria}>
                    <SelectTrigger className="h-14 bg-white border-none rounded-2xl md:rounded-l-full md:rounded-r-none text-slate-900 font-bold focus:ring-0">
                      <SelectValue placeholder="Search by" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                      <SelectItem value="medicine" className="py-3 font-semibold">Medicine</SelectItem>
                      <SelectItem value="location" className="py-3 font-semibold">Location</SelectItem>
                      <SelectItem value="category" className="py-3 font-semibold">Category</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                  <Input 
                    placeholder={getPlaceholder()} 
                    className="h-14 pl-14 pr-4 rounded-2xl md:rounded-none bg-white text-slate-900 border-none shadow-inner focus-visible:ring-0"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') onSearch(searchValue);
                    }}
                  />
                </div>
                <Button 
                  className="h-14 px-10 rounded-2xl md:rounded-r-full md:rounded-l-none bg-cyan-600 hover:bg-cyan-700 text-lg font-bold shadow-lg shadow-cyan-900/20 transition-all"
                  onClick={() => onSearch(searchValue || "Paracetamol")}
                >
                  Search Now
                </Button>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2 group/loc">
                <MapPin className="h-4 w-4 text-cyan-400 group-hover/loc:scale-110 transition-transform" />
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Near:</span>
                  <div className="relative flex items-center">
                    <input
                      ref={locationInputRef}
                      type="text"
                      className="bg-transparent border-none focus:ring-0 p-0 text-cyan-400 font-bold hover:underline cursor-pointer min-w-[150px] placeholder:text-cyan-400/50"
                      placeholder="Enter location..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <button 
                      onClick={detectLocation}
                      disabled={isDetecting}
                      className="ml-2 p-1.5 bg-cyan-600/20 hover:bg-cyan-600/40 rounded-full transition-colors group/detect"
                      title="Detect my location"
                    >
                      {isDetecting ? (
                        <Loader2 className="h-3.5 w-3.5 text-cyan-400 animate-spin" />
                      ) : (
                        <Navigation className="h-3.5 w-3.5 text-cyan-400 group-hover/detect:scale-110 transition-transform" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
                <span>Trending: Panadol, Coartem, Amoxicillin</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Medicines Section */}
      <section className="container px-4 mx-auto pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <TrendingUp className="h-7 w-7 text-cyan-600" />
              Popular Medicines
            </h2>
            <p className="text-slate-500">Frequently searched medications in Kenya</p>
          </div>
          <Button 
            variant="ghost" 
            className={`font-bold h-10 px-6 transition-all ${showCategories ? 'bg-cyan-600 text-white hover:bg-cyan-700' : 'text-cyan-600 hover:bg-cyan-50'}`}
            onClick={scrollToCategories}
          >
            {showCategories ? (
              <span className="flex items-center gap-2">Hide Categories <X className="h-4 w-4" /></span>
            ) : (
              <span className="flex items-center gap-2">Explore All Categories <ArrowRight className="h-4 w-4" /></span>
            )}
          </Button>
        </div>

        {/* Categories Explorer */}
        <AnimatePresence>
          {showCategories && (
            <motion.div
              ref={categoryRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-cyan-100 p-2 rounded-lg text-cyan-600">
                    <LayoutGrid size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Medicine Categories</h3>
                    <p className="text-sm text-slate-500">Browse medicines by their medical classification</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {MEDICINE_CATEGORIES.map((cat) => {
                    const IconComp = (Icons as any)[cat.icon] || Icons.Pill;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => onSearch(cat.name)}
                        className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-cyan-200 hover:-translate-y-1 transition-all group"
                      >
                        <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-colors">
                          <IconComp size={24} />
                        </div>
                        <span className="text-xs font-bold text-slate-600 text-center group-hover:text-cyan-700">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {POPULAR_MEDICINES.slice(0, 8).map((med, index) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-slate-100 group rounded-2xl"
                onClick={() => onSelectMedicine(med)}
              >
                <div className="h-40 md:h-48 bg-slate-50 relative overflow-hidden flex items-center justify-center p-4">
                  <img 
                    src={med.image} 
                    alt={med.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur border border-slate-100 px-3 py-1 rounded-full text-[10px] font-bold text-cyan-700 uppercase tracking-wider">
                      {med.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-slate-900 mb-1 truncate">{med.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-sm font-medium text-slate-400">Range:</span>
                    <span className="text-base font-bold text-cyan-600">{med.priceRange}</span>
                  </div>
                  <Button variant="outline" className="w-full h-10 rounded-xl border-cyan-100 text-cyan-700 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all font-bold">
                    View Listings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pharmacy Partner CTA */}
      <section className="container px-4 mx-auto mt-8 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="max-w-xl relative z-10">
            <div className="flex items-center gap-2 mb-4 text-cyan-400">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wider">For Pharmacies</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Are you a Pharmacy Owner?</h3>
            <p className="text-slate-400 text-lg mb-8">
              Join thousands of Kenyan pharmacies growing their business with Pharmalens. List your inventory, manage leads, and reach more patients in your community.
            </p>
            <div className="flex wrap gap-4">
              <Button 
                onClick={onPharmacyAction}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold h-14 px-10 rounded-2xl shadow-xl shadow-cyan-900/40 text-lg transition-transform hover:scale-105"
              >
                Register Your Pharmacy
              </Button>
              <Button 
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 h-14 px-8 rounded-2xl font-bold"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 flex flex-col items-center gap-4 relative z-10">
             <div className="bg-cyan-500/20 p-4 rounded-full text-cyan-400">
               <TrendingUp className="h-8 w-8" />
             </div>
             <div className="text-center">
               <div className="text-sm font-medium text-slate-400 mb-1">Avg. growth for partners</div>
               <div className="text-3xl font-extrabold text-white">+45% leads/mo</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}