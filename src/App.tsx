import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ReportAnimalDialog } from './components/ReportAnimalDialog';
import { Toaster } from './components/ui/sonner';

// Pages
import { HomePage } from './components/pages/HomePage';
import { RegisterPage } from './components/pages/RegisterPage';
import { HowToHelpPage } from './components/pages/HowToHelpPage';
import { AdoptionPage } from './components/pages/AdoptionPage';
import { LoginPage } from './components/pages/LoginPage';
import { AdminDashboard } from './components/pages/AdminDashboard';

interface User {
  email: string;
  isAdmin: boolean;
  name: string;
}

type Page = 'home' | 'register' | 'help' | 'adoption' | 'admin' | 'login';

export default function App() {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleNavigate = (page: Page) => {
    // se for login, abre a tela de login e não troca a página atual
    if (page === 'login') {
      setShowLogin(true);
      return;
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowLogin(false);

    if (userData.isAdmin) {
      setCurrentPage('admin');
    } else {
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    setShowLogin(false);
  };

  // VISÃO ADMIN (admin logado cai direto no dashboard)
  if (user?.isAdmin) {
    return (
      <div className="min-h-screen bg-white">
        <AdminDashboard user={user} onLogout={handleLogout} />
        <Toaster position="top-right" />
      </div>
    );
  }

  // TELA DE LOGIN (quando clicou em "Entrar" no header e não está logado)
  if (showLogin && !user) {
    return (
      <div className="min-h-screen bg-white">
        <LoginPage
          onLogin={handleLogin}
          onGoToRegister={() => {
            setShowLogin(false);       // fecha login
            setCurrentPage('register'); // abre página de cadastro
          }}
        />
        <Toaster position="top-right" />
      </div>
    );
  }

  // VISITANTE / USUÁRIO COMUM
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onReportAnimal={() => setReportDialogOpen(true)} />;

      case 'register':
        return (
          <RegisterPage
            onGoToLogin={() => {
              setShowLogin(true); // abre tela de login
            }}
          />
        );

      case 'help':
        return <HowToHelpPage />;

      case 'adoption':
        return <AdoptionPage />;

      default:
        return <HomePage onReportAnimal={() => setReportDialogOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onReportAnimal={() => setReportDialogOpen(true)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        user={user}
        onLogout={handleLogout}
      />

      <main>{renderPage()}</main>

      <Footer />

      <ReportAnimalDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
      />

      <Toaster position="top-right" />
    </div>
  );
}
