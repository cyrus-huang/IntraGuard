import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jguaykxfajlnzpmystgn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpndWF5a3hmYWpsbnpwbXlzdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyMzg2OTksImV4cCI6MjAwNjgxNDY5OX0.rgx3Db6krJt9Gt_XXd4HZ2C4o9AqRfdGo9P_caKNAmk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
