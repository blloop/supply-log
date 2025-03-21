import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Package } from "lucide-react";
import Spinner from "./Spinner";
import { useLangContext } from "./LangContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const { tl } = useLangContext();

  const handleLogin = async () => {
    setLoading(true);
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, rememberMe }),
    });

    const data = await response.json();
    if (data.success) {
      if (!rememberMe) {
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
      }
      window.location.reload();
    } else {
      setUsername("");
      setPassword("");
      alert("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen size-full flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center flex-wrap gap-2 mb-2">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">{tl("Supply Log")}</h1>
          </div>
          <p className="text-gray-500 mt-2">
            {tl("Sign in to your account to continue")}
          </p>
        </div>

        <div className="bg-white p-4 sm:p-8 rounded-lg border shadow-sm">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{tl("Username")}</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{tl("Password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-blue-500 bg-white border-gray-300 rounded focus:ring focus:ring-blue-400"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {tl("Remember me")}
                </label>
              </div>
            </div>
            <Button
              type="button"
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? <Spinner /> : tl("Sign in")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
