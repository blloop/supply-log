import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (
    username !== process.env.ACCOUNT_USERNAME ||
    password !== process.env.ACCOUNT_PASSWORD
  ) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  const { id } = req.body;

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_KEY,
  );

  const { _, authError } = await supabase.auth.signInWithPassword({
    email: process.env.MASTER_USERNAME,
    password: process.env.MASTER_PASSWORD,
  });

  if (authError) {
    console.log("authError", authError);
    return res
      .status(500)
      .json({ success: false, message: "Database error", authError });
  }

  const { __, dataError } = await supabase.from("prod").delete().eq("id", id);

  if (dataError) {
    console.log("dataError", dataError);
    return res
      .status(500)
      .json({ success: false, message: "Data retrieval error", dataError });
  }

  return res.json({ success: true });
}
