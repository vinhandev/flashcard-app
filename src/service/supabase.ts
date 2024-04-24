import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://glaaueblznpnriqvztud.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsYWF1ZWJsem5wbnJpcXZ6dHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NDA3MDQsImV4cCI6MjAyOTUxNjcwNH0.rwusAL6xfh36bUCnhKSBrJZfPFizD5QuXnWcAtxyJuU';
export const supabase = createClient(supabaseUrl, supabaseKey);
