# Wholesaler B2B Layer Implementation Plan

## 1. Wholesaler Product Listing & Management (`src/components/wholesaler/WholesalerInventory.tsx`)
- Enhance the 'Add Product' modal with a high-contrast toggle for 'Retail' vs 'Wholesale' pricing.
- Implement strict validation for `bulk_price` (float) and `min_order_qty` (integer).
- Add unit selection dropdown with standard B2B units (cartons, boxes, pallets, units).
- Improve the inventory card design to clearly highlight wholesale specific data.

## 2. Pharmacy Lead Routing Dashboard (`src/components/wholesaler/WholesalerLeads.tsx`)
- Create a high-fidelity dashboard for medicine requests.
- Implement 'VIP' and 'High Priority' visual styling using animations and glowing badges.
- Include pharmacy location (distance), requested quantity, and urgency status.
- Add quick-action buttons for WhatsApp/Call lead follow-up.

## 3. Wholesaler Registration & Subscription Flow (`src/components/wholesaler/signup/WholesalerSignUp.tsx`)
- Implement a 3-step registration flow:
  1. Company Profile & License Verification.
  2. One-time Registration Fee (Ksh 19,999) with simulated payment gateway (Paystack style).
  3. Subscription Package Selection:
     - Silver Supply (Ksh 49,999)
     - Gold Distribution (Ksh 74,999)
     - Platinum Market Leader (Ksh 99,999)
- Detail specific B2B features for each tier (lead priority, AI analytics, etc.).

## 4. Pharmacy Checkout MOQ Enforcement (`src/components/pharmacy/WholesaleCheckout.tsx`)
- Implement real-time validation for Minimum Order Quantity (MOQ).
- Disable checkout and display a prominent warning if MOQ is not met.
- Show potential savings in the checkout summary to encourage meeting MOQ.

## 5. Global Navigation & Routing
- Update `src/components/layout/Header.tsx` to include clear entry points for wholesalers.
- Ensure `src/App.tsx` routes are properly protected and linked.
