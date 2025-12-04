import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PawPrint, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface LoginPageProps {
  onLogin: (user: { email: string; isAdmin: boolean; name: string }) => void;
  onGoToRegister?: () => void;
}

// Ajuda o TypeScript a entender o objeto google
declare const google: any;

export function LoginPage({ onLogin, onGoToRegister }: LoginPageProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ===============================
  // 1) Login normal com e-mail/senha
  // ===============================
  async function loginAPI(email: string, password: string) {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      // se estiver usando sessão/cookie no backend:
      // credentials: "include",
    });

    if (!response.ok) throw new Error("Credenciais inválidas");

    return response.json();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await loginAPI(formData.email, formData.password);

      toast.success(`Bem-vindo, ${data.user.name}!`);

      onLogin({
        email: data.user.email,
        isAdmin: data.user.isAdmin,
        name: data.user.name,
      });
    } catch (error) {
      toast.error("Email ou senha inválidos");
    } finally {
      setIsLoading(false);
    }
  };

  // ===============================
  // 2) Login com Google (GIS)
  // ===============================

  // helper simples para decodificar o JWT do Google
  function decodeJwt(token: string): any {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  }

  const handleGoogleCredentialResponse = (response: any) => {
    try {
      const payload = decodeJwt(response.credential);

      const userGoogle = {
        email: payload.email,
        name: payload.name,
        isAdmin: false, // se quiser, depois você define admins pelo email
      };

      toast.success(`Bem-vindo, ${userGoogle.name}! (Google)`);

      onLogin(userGoogle);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao processar login com Google.");
    }
  };

  useEffect(() => {
    // garante que o script do Google carregou
    if (typeof google === "undefined" || !google.accounts?.id) {
      return;
    }

    google.accounts.id.initialize({
      client_id:
        import.meta.env.VITE_GOOGLE_CLIENT_ID ||
        "SEU_CLIENT_ID_GOOGLE_AQUI", // substitua ou use env
      callback: handleGoogleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleLoginDiv"),
      {
        theme: "outline",
        size: "large",
        width: "100%",
      }
    );

    // se quiser o "One Tap", pode ativar:
    // google.accounts.id.prompt();
  }, []);

  // ===============================
  // JSX
  // ===============================

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
            <PawPrint className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2 font-bold">AJUDATODOS</h1>
          <p className="text-gray-600">Faça login para continuar</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Formulário de e-mail/senha */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">Lembrar-me</span>
                </label>

                <a href="#" className="text-green-600 hover:underline">
                  Esqueceu a senha?
                </a>
              </div>

              {/* Botão Entrar */}
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Botão do Google (GIS renderiza aqui dentro) */}
            <div className="mt-4">
              <div id="googleLoginDiv" className="flex justify-center" />
            </div>

            {/* Register link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Não tem uma conta?{" "}
              {onGoToRegister ? (
                <button
                  type="button"
                  onClick={onGoToRegister}
                  className="text-green-600 hover:underline"
                >
                  Cadastre-se
                </button>
              ) : (
                <span className="text-green-600">Cadastre-se</span>
              )}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
