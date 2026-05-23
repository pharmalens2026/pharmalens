export interface Medicine {
  id: string;
  name: string;
  category: string;
  priceRange: string;
  image: string;
  description: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  price: number;
  distance: string;
  availability: "In Stock" | "Low Stock" | "Out of Stock";
  address: string;
  phone: string;
  whatsapp: string;
  location: { lat: number; lng: number };
  email?: string;
  description?: string;
  subscriptionPlan?: string;
  approvalStatus?: 'Pending' | 'Approved' | 'Rejected';
  registrationDate?: string;
  subscriptionStartDate?: string;
  totalLeads?: number;
  revenue?: number;
  licenseNumber?: string;
}

export interface Wholesaler {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  subscriptionPlan: string;
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  registrationDate: string;
  licenseNumber: string;
  rating: number;
  verified: boolean;
}

export interface WholesaleProduct {
  id: string;
  name: string;
  category: string;
  retailPrice: number;
  bulkPrice: number;
  minOrderQty: number;
  unit: string; // e.g., 'units', 'cartons', 'boxes'
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  isWholesaleOnly: boolean;
  wholesalerId: string;
  wholesalerName: string;
}

export interface Lead {
  id: string;
  type: "WhatsApp" | "Call" | "B2B Order";
  medicineName: string;
  quantity?: number;
  unit?: string;
  location?: string;
  timestamp: string;
  patientName: string;
  status: "New" | "Contacted" | "Closed";
  priority?: "Normal" | "High" | "VIP";
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  bulkPrice?: number;
  minOrderQty?: number;
  unit?: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdated: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  color: string;
  features: { name: string; value: string | boolean }[];
}

export interface PaymentTransaction {
  id: string;
  pharmacyId?: string;
  wholesalerId?: string;
  entityName: string;
  amount: number;
  status: 'Pending' | 'Completed' | 'Failed' | 'Cancelled';
  provider: 'Paystack' | 'M-Pesa' | 'Stripe';
  reference: string;
  type: 'Registration' | 'Subscription';
  date: string;
}

export interface SMSLog {
  id: string;
  pharmacyId?: string;
  wholesalerId?: string;
  entityName: string;
  phoneNumber: string;
  message: string;
  status: 'Sent' | 'Delivered' | 'Failed';
  date: string;
}

export const REGISTRATION_FEE = 999;
export const WHOLESALER_REGISTRATION_FEE = 19999;
export const SUBSCRIPTION_GRACE_PERIOD_MONTHS = 3;

export const WHOLESALER_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "silver",
    name: "Silver Supply",
    price: "KES 49,999",
    color: "slate",
    features: [
      { name: "Basic Analytics", value: true },
      { name: "Lead Access", value: "Standard" },
      { name: "Inventory Limit", value: "500 items" },
      { name: "Featured Status", value: false },
    ]
  },
  {
    id: "gold",
    name: "Gold Distribution",
    price: "KES 74,999",
    color: "amber",
    features: [
      { name: "Advanced Analytics", value: true },
      { name: "Lead Access", value: "Priority" },
      { name: "Inventory Limit", value: "Unlimited" },
      { name: "Featured Status", value: "Standard" },
      { name: "VIP Leads", value: false },
    ]
  },
  {
    id: "platinum",
    name: "Platinum Market Leader",
    price: "KES 99,999",
    color: "cyan",
    features: [
      { name: "AI-Powered Analytics", value: true },
      { name: "Lead Access", value: "Instant/VIP" },
      { name: "Inventory Limit", value: "Unlimited" },
      { name: "Featured Status", value: "Premium/Top" },
      { name: "Direct Marketing", value: true },
    ]
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "KES 3,000",
    color: "emerald",
    features: [
      { name: "Verified Pharmacy Status", value: true },
      { name: "Search Listing Visibility", value: "Standard listing" },
      { name: "Medicine Search Results", value: "Yes" },
      { name: "WhatsApp & Call Leads", value: "Basic access" },
      { name: "Profile Details", value: "Basic" },
      { name: "Price Updates", value: "Manual" },
      { name: "Analytics Dashboard", value: false },
      { name: "Featured Pharmacy Status", value: false },
      { name: "Priority Search Ranking", value: false },
    ]
  },
  {
    id: "growth",
    name: "Growth",
    price: "KES 7,000",
    color: "amber",
    features: [
      { name: "Verified Pharmacy Status", value: true },
      { name: "Search Listing Visibility", value: "Priority ranking" },
      { name: "Medicine Search Results", value: "Yes" },
      { name: "WhatsApp & Call Leads", value: "More leads" },
      { name: "Profile Details", value: "Enhanced" },
      { name: "Price Updates", value: "Faster updates" },
      { name: "Comprehensive Analytics", value: "Full dashboard access" },
      { name: "Featured Pharmacy Status", value: "Monthly rotation" },
      { name: "Priority Search Ranking", value: "High ranking" },
      { name: "Inventory Alerts", value: "Real-time" },
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "KES 12,000",
    color: "cyan",
    features: [
      { name: "Verified Pharmacy Status", value: true },
      { name: "Search Listing Visibility", value: "Top 3 guaranteed" },
      { name: "Medicine Search Results", value: "Yes (boosted)" },
      { name: "WhatsApp & Call Leads", value: "Maximum priority" },
      { name: "Profile Details", value: "Premium profile" },
      { name: "Price Updates", value: "Instant + highlighted" },
      { name: "Comprehensive Analytics", value: "Advanced AI insights" },
      { name: "Featured Pharmacy Status", value: "Permanent placement" },
      { name: "Priority Search Ranking", value: "Highest priority" },
      { name: "Direct Patient Messaging", value: "Unlimited" },
      { name: "SMS Notifications", value: "500/month" },
    ]
  }
];

export const MEDICINE_CATEGORIES = [
  { id: "nsaid", name: "Non-Steroidal Anti-Inflammatory Drugs", icon: "Pill" },
  { id: "opioids", name: "Opioids", icon: "Lock" },
  { id: "antipyretics", name: "Antipyretics", icon: "Thermometer" },
  { id: "antivirals", name: "Antivirals", icon: "Shield" },
  { id: "antifungals", name: "Antifungals", icon: "Biohazard" },
  { id: "antiparasitics", name: "Antiparasitics", icon: "Bug" },
  { id: "antihypertensives", name: "Antihypertensives", icon: "Activity" },
  { id: "diuretics", name: "Diuretics", icon: "Droplets" },
  { id: "anticoagulants", name: "Anticoagulants", icon: "Heart" },
  { id: "bronchodilators", name: "Bronchodilators", icon: "Wind" },
  { id: "antihistamines", name: "Antihistamines", icon: "Waves" },
  { id: "decongestants", name: "Decongestants", icon: "CloudRain" },
  { id: "antacids", name: "Antacids", icon: "Stomach" },
  { id: "ppi", name: "Proton Pump Inhibitors", icon: "Zap" },
  { id: "laxatives", name: "Laxatives", icon: "ArrowDown" },
  { id: "antiemetics", name: "Antiemetics", icon: "RefreshCcw" },
  { id: "antidepressants", name: "Antidepressants", icon: "Brain" },
  { id: "anxiolytics", name: "Anxiolytics", icon: "Sofa" },
  { id: "antipsychotics", name: "Antipsychotics", icon: "Focus" },
  { id: "mood-stabilizers", name: "Mood Stabilizers", icon: "Scale" },
  { id: "antidiabetics", name: "Antidiabetics", icon: "Syringe" },
  { id: "thyroid", name: "Thyroid Hormones", icon: "Dna" },
  { id: "contraceptives", name: "Contraceptives", icon: "Users" },
  { id: "corticosteroids", name: "Corticosteroids", icon: "Flame" },
  { id: "cytotoxics", name: "Cytotoxics (Chemotherapy)", icon: "FlaskConical" },
  { id: "immunosuppressants", name: "Immunosuppressants", icon: "ShieldCheck" },
  { id: "anesthetics", name: "Anesthetics", icon: "Moon" },
  { id: "pain-relief", name: "Pain Relief", icon: "Pill" },
  { id: "antibiotics", name: "Antibiotics", icon: "Beaker" },
  { id: "antimalarials", name: "Antimalarials", icon: "Bug" },
  { id: "cough-cold", name: "Cough, Cold & Flu", icon: "Thermometer" },
  { id: "vitamins", name: "Vitamins & Supplements", icon: "Apple" },
  { id: "diabetes", name: "Diabetes Care", icon: "Activity" },
  { id: "heart-health", name: "Heart & Blood Pressure", icon: "Heart" },
  { id: "digestive", name: "Digestive Health", icon: "Stomach" },
  { id: "skin-care", name: "Skin Care", icon: "Sparkles" },
  { id: "eye-ear", name: "Eye & Ear Care", icon: "Eye" },
  { id: "allergy-asthma", name: "Allergy & Asthma", icon: "Wind" },
  { id: "maternal-child", name: "Maternal & Child Health", icon: "Baby" },
  { id: "family-planning", name: "Family Planning", icon: "Users" },
  { id: "first-aid", name: "First Aid", icon: "FirstAid" },
  { id: "mental-health", name: "Mental Health", icon: "Brain" },
  { id: "hiv-aids", name: "HIV/AIDS Management", icon: "Shield" },
  { id: "oral-health", name: "Oral Health", icon: "Smile" },
  { id: "vaccines", name: "Vaccines and Biologicals", icon: "Syringe" },
  { id: "blood", name: "Blood & Blood Products", icon: "Droplets" },
  { id: "medical-devices", name: "Medical Devices and IVDs", icon: "Activity" },
  { id: "cosmetics", name: "Cosmetics", icon: "Sparkles" },
  { id: "food-supplements", name: "Food Supplements", icon: "Apple" },
  { id: "herbal", name: "Herbal and Complementary Medicines", icon: "Leaf" }
];

export const POPULAR_MEDICINES: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    priceRange: "KES 50 - KES 200",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/eaadaf1c-4853-43fb-8f2d-23765c7c57d0/medicine-blister-webp-10179db2-1776952401962.webp",
    description: "Used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers."
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    priceRange: "KES 300 - KES 850",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/eaadaf1c-4853-43fb-8f2d-23765c7c57d0/medicine-generic-webp-b121ece4-1776952402491.webp",
    description: "Used to treat certain infections caused by bacteria, such as pneumonia, bronchitis, and infections of the ears, nose, throat, urinary tract, and skin."
  },
  {
    id: "3",
    name: "Loratadine 10mg",
    category: "Allergy & Asthma",
    priceRange: "KES 150 - KES 400",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/eaadaf1c-4853-43fb-8f2d-23765c7c57d0/medicine-blister-webp-10179db2-1776952401962.webp",
    description: "Antihistamine that reduces the effects of natural chemical histamine in the body."
  },
  {
    id: "4",
    name: "Metformin 500mg",
    category: "Diabetes Care",
    priceRange: "KES 400 - KES 1,200",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/eaadaf1c-4853-43fb-8f2d-23765c7c57d0/medicine-generic-webp-b121ece4-1776952402491.webp",
    description: "Used with a proper diet and exercise program and possibly with other medications to control high blood sugar."
  },
  {
    id: "5",
    name: "Coartem 80/480mg",
    category: "Antimalarials",
    priceRange: "KES 600 - KES 1,500",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/eaadaf1c-4853-43fb-8f2d-23765c7c57d0/medicine-blister-webp-10179db2-1776952401962.webp",
    description: "A combination medication used to treat acute uncomplicated malaria infections caused by Plasmodium falciparum."
  },
  {
    id: "6",
    name: "Panadol Extra",
    category: "Pain Relief",
    priceRange: "KES 100 - KES 300",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/eaadaf1c-4853-43fb-8f2d-23765c7c57d0/medicine-generic-webp-b121ece4-1776952402491.webp",
    description: "Contains paracetamol and caffeine for enhanced pain relief from headaches, migraines, and period pain."
  },
  {
    id: "7",
    name: "Hedex",
    category: "Pain Relief",
    priceRange: "KES 20 - KES 50",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/eaadaf1c-4853-43fb-8f2d-23765c7c57d0/medicine-blister-webp-10179db2-1776952401962.webp",
    description: "Fast acting relief for headaches, backaches, and toothaches. Very common in the Kenyan market."
  },
  {
    id: "8",
    name: "Ventolin Inhaler",
    category: "Allergy & Asthma",
    priceRange: "KES 800 - KES 2,500",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/eaadaf1c-4853-43fb-8f2d-23765c7c57d0/medicine-generic-webp-b121ece4-1776952402491.webp",
    description: "Used to relieve symptoms of asthma and chronic obstructive pulmonary disease (COPD) such as coughing, wheezing and feeling breathless."
  }
];

export const PHARMACIES: Pharmacy[] = [
  {
    id: "p1",
    name: "City Central Pharmacy",
    price: 3.50,
    distance: "0.8 km",
    availability: "In Stock",
    address: "View Park Towers, 16th Floor, Suite 1604, Monrovia Street, Nairobi, Kenya",
    phone: "0724795895",
    whatsapp: "254724795895",
    location: { lat: -1.2841, lng: 36.8155 },
    email: "citycentral@pharmalens.com",
    subscriptionPlan: "Premium",
    approvalStatus: 'Approved',
    registrationDate: '2023-10-12',
    subscriptionStartDate: '2024-01-12',
    totalLeads: 450,
    revenue: 120000,
    licenseNumber: 'PHA/2023/8821'
  },
  {
    id: "p2",
    name: "Green Life Meds",
    price: 2.75,
    distance: "1.5 km",
    availability: "Low Stock",
    address: "45 Green Road, North Park",
    phone: "0712345678",
    whatsapp: "254712345678",
    location: { lat: 0, lng: 0 },
    approvalStatus: 'Approved',
    registrationDate: '2023-11-05',
    subscriptionStartDate: '2024-02-05',
    totalLeads: 120,
    revenue: 45000,
    licenseNumber: 'PHA/2023/1234',
    subscriptionPlan: 'Growth',
    email: 'greenlife@example.com'
  }
];

export const WHOLESALERS: Wholesaler[] = [
  {
    id: "w1",
    name: "Global Pharma Distributors",
    email: "info@globalpharma.com",
    address: "Industrial Area, Road A, Nairobi",
    phone: "0700111222",
    subscriptionPlan: "Platinum Market Leader",
    approvalStatus: "Approved",
    registrationDate: "2024-01-15",
    licenseNumber: "WHL/2024/001",
    rating: 4.8,
    verified: true
  },
  {
    id: "w2",
    name: "Nairobi Med Supply",
    email: "sales@nmed.com",
    address: "Mombasa Road, Nairobi",
    phone: "0711222333",
    subscriptionPlan: "Gold Distribution",
    approvalStatus: "Approved",
    registrationDate: "2024-02-10",
    licenseNumber: "WHL/2024/002",
    rating: 4.5,
    verified: true
  }
];

export const WHOLESALE_PRODUCTS: WholesaleProduct[] = [
  {
    id: "wp1",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    retailPrice: 5,
    bulkPrice: 2.5,
    minOrderQty: 100,
    unit: "cartons",
    stockStatus: "In Stock",
    isWholesaleOnly: false,
    wholesalerId: "w1",
    wholesalerName: "Global Pharma Distributors"
  },
  {
    id: "wp2",
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    retailPrice: 15,
    bulkPrice: 8,
    minOrderQty: 50,
    unit: "boxes",
    stockStatus: "In Stock",
    isWholesaleOnly: true,
    wholesalerId: "w2",
    wholesalerName: "Nairobi Med Supply"
  }
];

export const WHOLESALE_LEADS: Lead[] = [
  {
    id: "wl1",
    type: "B2B Order",
    medicineName: "Paracetamol 500mg",
    quantity: 250,
    unit: "cartons",
    location: "Nairobi CBD",
    timestamp: "5 mins ago",
    patientName: "City Central Pharmacy",
    status: "New",
    priority: "VIP"
  },
  {
    id: "wl2",
    type: "B2B Order",
    medicineName: "Amoxicillin 250mg",
    quantity: 100,
    unit: "boxes",
    location: "Westlands",
    timestamp: "25 mins ago",
    patientName: "QuickCare Pharmacy",
    status: "New",
    priority: "High"
  },
  {
    id: "wl3",
    type: "WhatsApp",
    medicineName: "Loratadine 10mg",
    timestamp: "2 hours ago",
    patientName: "Green Life Meds",
    status: "Contacted",
    priority: "Normal"
  }
];

export const PHARMACY_LEADS: Lead[] = [
  {
    id: "l1",
    type: "WhatsApp",
    medicineName: "Paracetamol 500mg",
    timestamp: "10 mins ago",
    patientName: "John Doe",
    status: "New"
  },
  {
    id: "l2",
    type: "Call",
    medicineName: "Amoxicillin 250mg",
    timestamp: "1 hour ago",
    patientName: "Sarah Smith",
    status: "Contacted"
  }
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  { id: "i1", name: "Paracetamol 500mg", category: "Pain Relief", price: 3.50, stockStatus: "In Stock", lastUpdated: "Today" },
  { id: "i2", name: "Amoxicillin 250mg", category: "Antibiotics", price: 12.00, stockStatus: "Low Stock", lastUpdated: "Yesterday" }
];

export const MOCK_PAYMENTS: PaymentTransaction[] = [
  {
    id: "pay-1",
    entityName: "City Central Pharmacy",
    amount: 12000,
    status: "Completed",
    provider: "Paystack",
    reference: "T772183921",
    type: "Subscription",
    date: "2024-03-20 10:45 AM"
  }
];

export const MOCK_SMS_LOGS: SMSLog[] = [
  {
    id: "sms-1",
    entityName: "City Central Pharmacy",
    phoneNumber: "0724795895",
    message: "Your subscription for Premium plan has been renewed successfully.",
    status: "Delivered",
    date: "2024-03-20 10:46 AM"
  }
];