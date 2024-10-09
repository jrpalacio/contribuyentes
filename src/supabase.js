import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bulungerbrnuyenjouwv.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bHVuZ2VyYnJudXllbmpvdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxNzM0MzIsImV4cCI6MjA0Mzc0OTQzMn0.Z7DTw-atRNDxtvD2FPjg2vVXaDCtAfm7f1x93Ag_9-Q'
export const supabase = createClient(supabaseUrl, supabaseKey)
