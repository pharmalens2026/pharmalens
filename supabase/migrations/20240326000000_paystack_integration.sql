-- Add specific fields for Paystack tracking if not present in generic payments
-- The existing provider_reference in payments table will store the Paystack 'reference' or 'access_code'

-- Add a view for Paystack specific analytics
CREATE OR REPLACE VIEW public.paystack_analytics AS
SELECT 
    COUNT(*) as total_transactions,
    SUM(amount) FILTER (WHERE status = 'completed') as total_revenue,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
    COUNT(*) FILTER (WHERE status = 'failed') as failure_count
FROM public.payments
WHERE provider = 'paystack';

-- Grant access to authenticated users (admin role check handled by RLS on table)
GRANT SELECT ON public.paystack_analytics TO authenticated;