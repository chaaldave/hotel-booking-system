import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://nvafsawlcdtyafvpwwoh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52YWZzYXdsY2R0eWFmdnB3d29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0ODc5MzQsImV4cCI6MjA5MDA2MzkzNH0.GxnNbf8Lx8ZgfhmLQOx8ZzwJd5_Lhr4VntBWEWtcg0g";


export const supabase = createClient(supabaseUrl, supabaseAnonKey);






