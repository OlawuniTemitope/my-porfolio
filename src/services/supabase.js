
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://vppenmbocxmiwvqxaktc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwcGVubWJvY3htaXd2cXhha3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA5MjI5MzUsImV4cCI6MjAxNjQ5ODkzNX0.jYkf9kD94KM-qgxafjjeeBChBvvJ1cQkhB2Bar0Bfs0"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase