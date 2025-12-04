import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  LogOut,
  BarChart3,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AdminDashboardProps {
  user: { email: string; name: string };
  onLogout: () => void;
}

interface AnimalReport {
  id: number;
  animalType: string;
  location: string;
  description: string;
  contactName: string;
  contactPhone: string;
  urgency: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  date: string;
  photos: number;
}

interface AdoptionRequest {
  id: number;
  animalName: string;
  animalType: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [selectedReport, setSelectedReport] = useState<AnimalReport | null>(null);
  const [selectedAdoption, setSelectedAdoption] = useState<AdoptionRequest | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showAdoptionDialog, setShowAdoptionDialog] = useState(false);

  // Mock data
  const [reports, setReports] = useState<AnimalReport[]>([
    {
      id: 1,
      animalType: 'Cachorro',
      location: 'Rua das Flores, 123 - Votorantim',
      description: 'Cachorro de porte médio, aparentemente abandonado há alguns dias. Está com fome e assustado.',
      contactName: 'Maria Silva',
      contactPhone: '(15) 98765-4321',
      urgency: 'high',
      status: 'pending',
      date: '2024-10-20',
      photos: 3
    },
    {
      id: 2,
      animalType: 'Gato',
      location: 'Avenida Central, 456 - Sorocaba',
      description: 'Gato filhote encontrado próximo ao mercado. Parece estar machucado na pata.',
      contactName: 'João Santos',
      contactPhone: '(15) 99876-5432',
      urgency: 'medium',
      status: 'in_progress',
      date: '2024-10-19',
      photos: 2
    },
    {
      id: 3,
      animalType: 'Cachorro',
      location: 'Praça da Matriz - Votorantim',
      description: 'Cão adulto, muito dócil, estava esperando alguém. Possui coleira mas sem identificação.',
      contactName: 'Ana Paula',
      contactPhone: '(15) 97654-3210',
      urgency: 'low',
      status: 'resolved',
      date: '2024-10-18',
      photos: 4
    }
  ]);

  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([
    {
      id: 1,
      animalName: 'Thor',
      animalType: 'Cachorro',
      userName: 'Carlos Oliveira',
      userEmail: 'carlos@email.com',
      userPhone: '(15) 98888-7777',
      status: 'pending',
      date: '2024-10-21'
    },
    {
      id: 2,
      animalName: 'Luna',
      animalType: 'Gato',
      userName: 'Fernanda Costa',
      userEmail: 'fernanda@email.com',
      userPhone: '(15) 97777-6666',
      status: 'pending',
      date: '2024-10-21'
    },
    {
      id: 3,
      animalName: 'Rex',
      animalType: 'Cachorro',
      userName: 'Ricardo Mendes',
      userEmail: 'ricardo@email.com',
      userPhone: '(15) 96666-5555',
      status: 'approved',
      date: '2024-10-20'
    }
  ]);

  const stats = {
    totalReports: reports.length,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    totalAdoptions: adoptionRequests.length,
    pendingAdoptions: adoptionRequests.filter(a => a.status === 'pending').length,
    resolvedReports: reports.filter(r => r.status === 'resolved').length,
    approvedAdoptions: adoptionRequests.filter(a => a.status === 'approved').length
  };

  const handleReportAction = (reportId: number, newStatus: AnimalReport['status']) => {
    setReports(reports.map(r => 
      r.id === reportId ? { ...r, status: newStatus } : r
    ));
    toast.success(`Reporte atualizado para: ${getStatusLabel(newStatus)}`);
    setShowReportDialog(false);
  };

  const handleAdoptionAction = (adoptionId: number, newStatus: AdoptionRequest['status']) => {
    setAdoptionRequests(adoptionRequests.map(a => 
      a.id === adoptionId ? { ...a, status: newStatus } : a
    ));
    toast.success(`Solicitação de adoção ${newStatus === 'approved' ? 'aprovada' : 'rejeitada'}`);
    setShowAdoptionDialog(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
      in_progress: { label: 'Em Andamento', color: 'bg-blue-100 text-blue-800' },
      resolved: { label: 'Resolvido', color: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rejeitado', color: 'bg-red-100 text-red-800' },
      approved: { label: 'Aprovado', color: 'bg-green-100 text-green-800' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'Pendente',
      in_progress: 'Em Andamento',
      resolved: 'Resolvido',
      rejected: 'Rejeitado',
      approved: 'Aprovado'
    };
    return labels[status as keyof typeof labels];
  };

  const getUrgencyBadge = (urgency: string) => {
    const urgencyConfig = {
      low: { label: 'Baixa', color: 'bg-gray-100 text-gray-800' },
      medium: { label: 'Média', color: 'bg-orange-100 text-orange-800' },
      high: { label: 'Alta', color: 'bg-red-100 text-red-800' }
    };
    const config = urgencyConfig[urgency as keyof typeof urgencyConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-green-600" />
              <div>
                <h1 className="text-xl">Painel Administrativo</h1>
                <p className="text-sm text-gray-600">Bem-vindo, {user.name}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total de Reportes</CardTitle>
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.totalReports}</div>
              <p className="text-xs text-gray-600 mt-1">
                {stats.pendingReports} pendentes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Adoções Solicitadas</CardTitle>
              <Heart className="w-4 h-4 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.totalAdoptions}</div>
              <p className="text-xs text-gray-600 mt-1">
                {stats.pendingAdoptions} pendentes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Reportes Resolvidos</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.resolvedReports}</div>
              <p className="text-xs text-gray-600 mt-1">
                Este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Adoções Aprovadas</CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.approvedAdoptions}</div>
              <p className="text-xs text-gray-600 mt-1">
                Este mês
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="reports" className="gap-2">
              <AlertTriangle className="w-4 h-4" />
              Reportes de Animais
            </TabsTrigger>
            <TabsTrigger value="adoptions" className="gap-2">
              <Heart className="w-4 h-4" />
              Solicitações de Adoção
            </TabsTrigger>
          </TabsList>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reportes de Animais Abandonados</CardTitle>
                <CardDescription>
                  Gerencie os reportes de animais que precisam de ajuda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Urgência</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>#{report.id}</TableCell>
                        <TableCell>{report.animalType}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {report.location}
                        </TableCell>
                        <TableCell>{report.contactName}</TableCell>
                        <TableCell>{getUrgencyBadge(report.urgency)}</TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>{new Date(report.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedReport(report);
                              setShowReportDialog(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Adoptions Tab */}
          <TabsContent value="adoptions">
            <Card>
              <CardHeader>
                <CardTitle>Solicitações de Adoção</CardTitle>
                <CardDescription>
                  Aprove ou rejeite solicitações de adoção de animais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Animal</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Solicitante</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adoptionRequests.map((adoption) => (
                      <TableRow key={adoption.id}>
                        <TableCell>#{adoption.id}</TableCell>
                        <TableCell>{adoption.animalName}</TableCell>
                        <TableCell>{adoption.animalType}</TableCell>
                        <TableCell>{adoption.userName}</TableCell>
                        <TableCell>{adoption.userEmail}</TableCell>
                        <TableCell>{adoption.userPhone}</TableCell>
                        <TableCell>{getStatusBadge(adoption.status)}</TableCell>
                        <TableCell>{new Date(adoption.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedAdoption(adoption);
                              setShowAdoptionDialog(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Report Details Dialog */}
      <AlertDialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Detalhes do Reporte #{selectedReport?.id}</AlertDialogTitle>
            <AlertDialogDescription>
              Informações completas sobre o animal reportado
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Tipo de Animal</p>
                  <p>{selectedReport.animalType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Urgência</p>
                  {getUrgencyBadge(selectedReport.urgency)}
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Localização</p>
                  <p>{selectedReport.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nome do Contato</p>
                  <p>{selectedReport.contactName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <p>{selectedReport.contactPhone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Descrição</p>
                  <p className="text-sm">{selectedReport.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fotos Anexadas</p>
                  <p>{selectedReport.photos} foto(s)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status Atual</p>
                  {getStatusBadge(selectedReport.status)}
                </div>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
            {selectedReport?.status === 'pending' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleReportAction(selectedReport.id, 'in_progress')}
                >
                  Marcar Em Andamento
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => handleReportAction(selectedReport.id, 'resolved')}
                >
                  Marcar como Resolvido
                </Button>
              </>
            )}
            {selectedReport?.status === 'in_progress' && (
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => handleReportAction(selectedReport.id, 'resolved')}
              >
                Marcar como Resolvido
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Adoption Details Dialog */}
      <AlertDialog open={showAdoptionDialog} onOpenChange={setShowAdoptionDialog}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Solicitação de Adoção #{selectedAdoption?.id}</AlertDialogTitle>
            <AlertDialogDescription>
              Avalie a solicitação de adoção
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {selectedAdoption && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Animal</p>
                  <p>{selectedAdoption.animalName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipo</p>
                  <p>{selectedAdoption.animalType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nome do Solicitante</p>
                  <p>{selectedAdoption.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">E-mail</p>
                  <p>{selectedAdoption.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <p>{selectedAdoption.userPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status Atual</p>
                  {getStatusBadge(selectedAdoption.status)}
                </div>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
            {selectedAdoption?.status === 'pending' && (
              <>
                <Button
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => handleAdoptionAction(selectedAdoption.id, 'rejected')}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Rejeitar
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => handleAdoptionAction(selectedAdoption.id, 'approved')}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aprovar
                </Button>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
