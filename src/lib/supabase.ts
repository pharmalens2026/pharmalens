import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://okjeczvgzqswewospfoy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ramVjenZnenFzd2V3b3NwZm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NjUyNjIsImV4cCI6MjA5MjU0MTI2Mn0.C5ehmWYqotlu6EJxkPvWy-sYDWQlgjBqi9rv1Nf6c80';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);