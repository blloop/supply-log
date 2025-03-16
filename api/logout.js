import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  res.setHeader(
    "Set-Cookie",
    serialize("session_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(0),
      path: "/",
    }),
  );

  return res.json({ success: true, message: "Logged out" });
}
