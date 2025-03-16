import { createClient } from "@supabase/supabase-js";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const { username, password, rememberMe } = req.body;

  if (
    username === process.env.ACCOUNT_USERNAME &&
    password === process.env.ACCOUNT_PASSWORD
  ) {
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_KEY,
    );

    const { _, authError } = await supabase.auth.signInWithPassword({
      email: process.env.MASTER_USERNAME,
      password: process.env.MASTER_PASSWORD,
    });

    if (authError) {
      console.log("authError", authError)
      return res
        .status(500)
        .json({ success: false, message: "Database error", authError });
    }

    const token = jwt.sign({ id: process.env.ACCOUNT_USERNAME }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    if (rememberMe) {
      res.setHeader("Set-Cookie", serialize("session_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
      }));
    } else {
      res.setHeader("Set-Cookie", serialize("session_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 30,
        path: "/",
      }));
    }

    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
}
