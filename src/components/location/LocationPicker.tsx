import React, { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface LocationPickerProps {
  initialLocation?: { lat: number; lng: number };
  initialAddress?: string;
  onLocationChange: (location: { lat: number; lng: number; address: string }) => void;
  height?: string;
  className?: string;
}

export function LocationPicker({ 
  initialLocation = { lat: -1.286389, lng: 36.817223 }, // Nairobi default
  initialAddress = "", 
  onLocationChange,
  height = "300px",
  className = ""
}: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [address, setAddress] = useState(initialAddress);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    if (typeof window.google === "undefined" || !mapRef.current) return;

    const google = window.google;
    const mapInstance = new google.maps.Map(mapRef.current, {
      center: initialLocation,
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    const markerInstance = new google.maps.Marker({
      position: initialLocation,
      map: mapInstance,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current!, {
      componentRestrictions: { country: "ke" },
      fields: ["address_components", "geometry", "formatted_address"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) return;

      const newPos = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      mapInstance.setCenter(newPos);
      markerInstance.setPosition(newPos);
      setAddress(place.formatted_address);
      onLocationChange({ ...newPos, address: place.formatted_address });
    });

    markerInstance.addListener("dragend", () => {
      const position = markerInstance.getPosition();
      const newPos = { lat: position.lat(), lng: position.lng() };
      reverseGeocode(newPos, mapInstance, markerInstance);
    });

    mapInstance.addListener("click", (e: any) => {
      const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      markerInstance.setPosition(newPos);
      reverseGeocode(newPos, mapInstance, markerInstance);
    });

    setMap(mapInstance);
    setMarker(markerInstance);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reverseGeocode = (pos: { lat: number; lng: number }, mapInstance?: any, markerInstance?: any) => {
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ location: pos }, (results: any, status: string) => {
      if (status === "OK" && results[0]) {
        const formattedAddress = results[0].formatted_address;
        setAddress(formattedAddress);
        onLocationChange({ ...pos, address: formattedAddress });
      }
    });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        if (map && marker) {
          map.setCenter(newPos);
          marker.setPosition(newPos);
          reverseGeocode(newPos, map, marker);
        }
        setIsDetecting(false);
        toast.success("Location detected successfully!");
      },
      (error) => {
        console.error(error);
        toast.error("Unable to retrieve your location. Please check permissions.");
        setIsDetecting(false);
      }
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              ref={inputRef}
              placeholder="Search for a location..." 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="pl-10 h-12 bg-white border-slate-200 rounded-xl"
            />
          </div>
          <Button 
            type="button"
            variant="outline" 
            onClick={detectLocation}
            disabled={isDetecting}
            className="h-12 px-4 rounded-xl border-slate-200 text-cyan-600 hover:bg-cyan-50 font-bold gap-2 shrink-0"
          >
            {isDetecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Navigation className="h-4 w-4" />}
            <span className="hidden sm:inline">Detect</span>
          </Button>
        </div>
      </div>
      
      <div 
        ref={mapRef} 
        style={{ height }} 
        className="w-full rounded-2xl border-2 border-slate-100 shadow-inner overflow-hidden"
      />
      
      <div className="flex items-start gap-2 p-3 bg-cyan-50 rounded-xl border border-cyan-100">
        <MapPin className="h-4 w-4 text-cyan-600 mt-0.5" />
        <div className="text-xs text-cyan-800">
          <span className="font-bold">Selected Address:</span> {address || "Drag the pin or search to select location"}
        </div>
      </div>
    </div>
  );
}