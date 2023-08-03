import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ogkuohcmystgbmxuyphb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9na3VvaGNteXN0Z2JteHV5cGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5NzQ1MDQsImV4cCI6MjAwNjU1MDUwNH0.PyY-Vq6oMLDhANuwFq7Ic7raTGt6ETI3pnDdNjKISeQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
