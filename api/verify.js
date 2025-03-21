import { createClient } from "@supabase/supabase-js";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.session_token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (
    decoded.username !== process.env.ACCOUNT_USERNAME ||
    decoded.password !== process.env.ACCOUNT_PASSWORD
  ) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

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

  const { data, dataError } = await supabase.from("prod").select("*");

  if (dataError) {
    console.log("dataError", dataError);
    return res
      .status(500)
      .json({ success: false, message: "Data retrieval error", dataError });
  }

  data.forEach((e) => {
    e.unit = (Number(e.unit) / 100).toFixed(2);
    e.price = (Number(e.price) / 100).toFixed(2);
  });

  return res.json({ success: true, values: data });
}
