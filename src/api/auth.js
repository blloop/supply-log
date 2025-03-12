import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (username === process.env.MASTER_USERNAME && password === process.env.MASTER_PASSWORD) {
    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_KEY);
    
    // Insert test row
    const { data, error } = await supabase
      .from("test")
      .insert([{ 
        content: "Test Write",
      }]);

    if (error) {
      return res.status(500).json({ success: false, message: "Database error", error });
    }

    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}
