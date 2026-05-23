-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    pharmacy_id UUID REFERENCES public.pharmacies(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'KES',
    status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, failed, cancelled
    provider TEXT NOT NULL, -- mpesa, flutterwave, stripe
    provider_reference TEXT UNIQUE, -- transaction ID from provider
    payment_type TEXT NOT NULL, -- registration, subscription
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create sms_logs table
CREATE TABLE IF NOT EXISTS public.sms_logs (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    pharmacy_id UUID REFERENCES public.pharmacies(id) ON DELETE SET NULL,
    phone_number TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL, -- sent, delivered, failed
    provider_response JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_payments_pharmacy_id ON public.payments(pharmacy_id);
CREATE INDEX IF NOT EXISTS idx_payments_provider_reference ON public.payments(provider_reference);
CREATE INDEX IF NOT EXISTS idx_sms_logs_pharmacy_id ON public.sms_logs(pharmacy_id);
CREATE INDEX IF NOT EXISTS idx_sms_logs_phone_number ON public.sms_logs(phone_number);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sms_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Payments
-- Pharmacies can see their own payments
CREATE POLICY "Pharmacies can view own payments" ON public.payments
    FOR SELECT USING (auth.uid() = pharmacy_id);

-- Super Admins can see all payments (assuming admin metadata or role)
-- For now, let's allow service role or specific admin logic if implemented
CREATE POLICY "Admins can view all payments" ON public.payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (auth.users.raw_user_meta_data->>'role' = 'super_admin')
        )
    );

-- RLS Policies for SMS Logs
CREATE POLICY "Admins can view all SMS logs" ON public.sms_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (auth.users.raw_user_meta_data->>'role' = 'super_admin')
        )
    );

-- Trigger to update updated_at on payments
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();