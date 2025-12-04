import { Menu, Search, User, PawPrint, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

interface UserData {
  name: string;
  email: string;
  isAdmin: boolean;
}

interface HeaderProps {
  onReportAnimal: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  user: UserData | null;
  onLogout: () => void;
}

export function Header({
  onReportAnimal,
  onNavigate,
  currentPage,
  user,
  onLogout,
}: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
              <PawPrint className="w-4 h-4 text-white" />
            </div>
            <span className="text-green-600 font-semibold">AJUDATODOS</span>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate("home")}
              className={`${
                currentPage === "home"
                  ? "text-green-600"
                  : "text-gray-700"
              } hover:text-green-600 transition-colors`}
            >
              Início
            </button>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-4">
                      <button
                        onClick={() => onNavigate("home")}
                        className="block py-2 hover:text-green-600 w-full text-left"
                      >
                        Nosso Projeto
                      </button>
                      <button
                        onClick={() => onNavigate("home")}
                        className="block py-2 hover:text-green-600 w-full text-left"
                      >
                        Nossa História
                      </button>
                      <button
                        onClick={() => onNavigate("register")}
                        className="block py-2 hover:text-green-600 w-full text-left"
                      >
                        Cadastro
                      </button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <button
              onClick={() => onNavigate("help")}
              className={`${
                currentPage === "help"
                  ? "text-green-600"
                  : "text-gray-700"
              } hover:text-green-600 transition-colors`}
            >
              Como Ajudar?
            </button>
            <button
              onClick={() => onNavigate("adoption")}
              className={`${
                currentPage === "adoption"
                  ? "text-green-600"
                  : "text-gray-700"
              } hover:text-green-600 transition-colors`}
            >
              Animais para Adoção
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>

            {/* SE NÃO estiver logado → mostra ENTRAR */}
            {!user && (
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex"
                onClick={() => onNavigate("login")}
              >
                <User className="w-5 h-5" />
              </Button>
            )}

            {/* SE estiver logado → mostra nome + SAIR */}
            {user && (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-gray-700 text-sm">
                  Olá, <strong>{user.name}</strong>
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onLogout}
                  className="text-red-500 hover:text-red-700"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            )}

            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={onReportAnimal}
            >
              Reportar Animal
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
