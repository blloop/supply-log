import { createClient } from "@supabase/supabase-js";
import { parse } from "cookie";

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.session_token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  const { date, buyer, unit, price, hours, notes } = req.body;

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

  const { data, dataError } = await supabase.from("prod").insert({
    date,
    buyer,
    unit,
    price,
    hours,
    notes,
  });

  if (dataError) {
    console.log("dataError", dataError);
    return res
      .status(500)
      .json({ success: false, message: "Data retrieval error", dataError });
  }

  return res.json({ success: true, values: data });
}
