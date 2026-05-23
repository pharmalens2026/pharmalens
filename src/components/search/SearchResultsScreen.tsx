import { Search, MapPin, ArrowLeft, Filter, Phone, MessageCircle, Map as MapIcon, Clock, Star, ChevronDown, List, Navigation, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PHARMACIES } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function SearchResultsScreen({ query, onBack, onSelectPharmacy }: { query: string; onBack: () => void; onSelectPharmacy: (p: any) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [searchCriteria, setSearchCriteria] = useState("medicine");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [isDetecting, setIsDetecting] = useState(false);
  const [userLocation, setUserLocation] = useState("Nairobi, KE");
  const [googleMap, setGoogleMap] = useState<any>(null);

  useEffect(() => {
    if (typeof window.google !== 'undefined' && window.google.maps && inputRef.current && searchCriteria === "location") {
      new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "ke" },
        fields: ["formatted_address"],
      });
    }
  }, [searchCriteria]);

  useEffect(() => {
    if (viewMode === "map" && mapContainerRef.current && typeof window.google !== 'undefined') {
      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: -1.286389, lng: 36.817223 },
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
      });

      PHARMACIES.forEach((pharmacy) => {
        const marker = new window.google.maps.Marker({
          position: pharmacy.location.lat !== 0 ? pharmacy.location : { lat: -1.286389 + (Math.random() - 0.5) * 0.05, lng: 36.817223 + (Math.random() - 0.5) * 0.05 },
          map: map,
          title: pharmacy.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#0891b2',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#ffffff',
            scale: 10,
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; font-family: sans-serif;">
              <h3 style="margin: 0 0 5px 0; font-weight: bold;">${pharmacy.name}</h3>
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #666;">${pharmacy.address}</p>
              <div style="color: #0891b2; font-weight: bold;">KES ${(pharmacy.price * 150).toLocaleString()}</div>
            </div>
          `
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });

      setGoogleMap(map);
    }
  }, [viewMode]);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: pos }, (results: any, status: string) => {
          if (status === "OK" && results[0]) {
            setUserLocation(results[0].formatted_address.split(',')[0]);
            if (googleMap) googleMap.setCenter(pos);
            toast.success("Location updated!");
          }
          setIsDetecting(false);
        });
      },
      () => {
        setIsDetecting(false);
        toast.error("Permission denied");
      }
    );
  };

  const getPlaceholder = () => {
    switch (searchCriteria) {
      case "location": return "Search by location...";
      case "category": return "Search by category...";
      default: return "Search medicine...";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Search Header */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b px-4 py-4 space-y-4 shadow-sm">
        <div className="container max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-3">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2 hover:bg-slate-100 rounded-full shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex-1 md:w-48">
              <Select value={searchCriteria} onValueChange={setSearchCriteria}>
                <SelectTrigger className="h-12 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-cyan-500 font-bold text-slate-700">
                  <SelectValue placeholder="Search by" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                  <SelectItem value="medicine" className="py-3 font-medium">Medicine</SelectItem>
                  <SelectItem value="location" className="py-3 font-medium">Location</SelectItem>
                  <SelectItem value="category" className="py-3 font-medium">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              ref={searchCriteria === "location" ? inputRef : null}
              defaultValue={query} 
              className="pl-11 h-12 bg-slate-100 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-cyan-500 transition-all font-medium" 
              placeholder={getPlaceholder()}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-56 group/loc">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                placeholder="Nairobi, KE"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                className="w-full h-12 pl-10 pr-10 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-cyan-500 text-sm outline-none font-medium"
              />
              <button 
                onClick={detectLocation}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-600 hover:text-cyan-700"
              >
                {isDetecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Navigation className="h-4 w-4" />}
              </button>
            </div>
            <Button 
              variant="outline" 
              className={`h-12 px-4 rounded-2xl border-slate-200 transition-all ${viewMode === "map" ? 'bg-slate-900 text-white border-slate-900' : 'bg-white hover:bg-slate-50'}`}
              onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
            >
              {viewMode === "list" ? (
                <div className="flex items-center gap-2"><MapIcon className="h-4 w-4" /> <span className="hidden sm:inline">Map</span></div>
              ) : (
                <div className="flex items-center gap-2"><List className="h-4 w-4" /> <span className="hidden sm:inline">List</span></div>
              )}
            </Button>
          </div>
        </div>
        
        <div className="container max-w-4xl mx-auto overflow-x-auto pb-1">
          <Tabs defaultValue="cheapest" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-xl">
              <TabsTrigger value="cheapest" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 text-xs font-bold uppercase tracking-wider">Cheapest First</TabsTrigger>
              <TabsTrigger value="nearest" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 text-xs font-bold uppercase tracking-wider">Nearest First</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="container max-w-5xl px-4 mx-auto py-8">
        <AnimatePresence mode="wait">
          {viewMode === "list" ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Results for <span className="text-cyan-600">"{query || 'General'}"</span>
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">
                    Found {PHARMACIES.length} verified pharmacies in Kenya
                  </p>
                </div>
                <Badge variant="outline" className="bg-white px-3 py-1 border-slate-200 text-slate-500 font-semibold gap-1.5">
                  <Clock className="h-3 w-3" /> Updated 2m ago
                </Badge>
              </div>

              <div className="space-y-4">
                {PHARMACIES.sort((a, b) => a.price - b.price).map((pharmacy, index) => (
                  <motion.div
                    key={pharmacy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 group rounded-2xl bg-white cursor-pointer"
                      onClick={() => onSelectPharmacy(pharmacy)}
                    >
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-extrabold text-xl text-slate-900 group-hover:text-cyan-600 transition-colors">{pharmacy.name}</h3>
                                <Badge className="bg-emerald-50 text-emerald-700 border-none text-[10px] uppercase font-black tracking-tighter">Verified</Badge>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                  <span className="font-medium">{pharmacy.distance} \\\\u2022 {pharmacy.address}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                                  <span className="font-bold text-slate-700">4.8</span>
                                  <span className="text-xs text-slate-400">(120+ reviews)</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-none pt-4 md:pt-0">
                              <div className="text-left md:text-right">
                                <div className="text-3xl font-black text-cyan-600 flex items-start gap-0.5">
                                  <span className="text-sm mt-1">KES</span>
                                  {(pharmacy.price * 150).toLocaleString()}
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">per unit</p>
                              </div>
                              <Badge 
                                className={`h-7 px-3 text-[10px] font-black uppercase tracking-widest border-none ${
                                  pharmacy.availability === "In Stock" ? "bg-emerald-500" : 
                                  pharmacy.availability === "Low Stock" ? "bg-amber-500" : "bg-rose-500"
                                }`}
                              >
                                {pharmacy.availability}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 border-t divide-x h-14 bg-slate-50/50">
                          <Button 
                            variant="ghost" 
                            className="rounded-none h-full text-emerald-600 hover:text-white hover:bg-emerald-600 transition-all font-bold gap-2 group/btn"
                            onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/${pharmacy.whatsapp}`); }}
                          >
                            <MessageCircle className="h-5 w-5" />
                            <span className="text-sm">WhatsApp</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="rounded-none h-full text-blue-600 hover:text-white hover:bg-blue-600 transition-all font-bold gap-2"
                            onClick={(e) => { e.stopPropagation(); window.open(`tel:${pharmacy.phone}`); }}
                          >
                            <Phone className="h-5 w-5" />
                            <span className="text-sm">Call Now</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="rounded-none h-full text-slate-600 hover:text-white hover:bg-slate-900 transition-all font-bold gap-2"
                            onClick={(e) => { e.stopPropagation(); }}
                          >
                            <MapIcon className="h-5 w-5" />
                            <span className="text-sm">Get Route</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="map-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-[calc(100vh-280px)] min-h-[500px] w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative"
            >
              <div ref={mapContainerRef} className="w-full h-full" />
              <div className="absolute top-4 left-4 z-10">
                 <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-200">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Nearby Pharmacies</p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}