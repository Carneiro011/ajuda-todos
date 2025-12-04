import { useState } from "react";
import { Heart, HandHeart, Home, Megaphone, ShoppingBag, Users } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";

type PlanId = "amigo" | "protetor" | "heroi";

interface DonationPlan {
  id: PlanId;
  name: string;
  price: number;
  highlight?: boolean;
  benefits: string[];
}

// PIX “estático” de exemplo
const PIX_KEY = "chave-pix-ajudatodos@exemplo.com";

const PLANS: DonationPlan[] = [
  {
    id: "amigo",
    name: "Amigo",
    price: 25,
    benefits: [
      "Ajuda com alimentação básica",
      "Certificado de doador",
      "Agradecimentos nas redes sociais",
    ],
  },
  {
    id: "protetor",
    name: "Protetor",
    price: 50,
    highlight: true,
    benefits: [
      "Cobre vacinas e vermífugos",
      "Todos os benefícios do plano Amigo",
      "Visita guiada ao abrigo",
      "Foto personalizada de um pet ajudado",
    ],
  },
  {
    id: "heroi",
    name: "Herói",
    price: 100,
    benefits: [
      "Tratamentos médicos complexos",
      "Todos os benefícios anteriores",
      "Relatório trimestral da utilização das doações",
      "Apadrinhamento de um animal",
      "Participação em eventos especiais",
    ],
  },
];

// “API” de pagamento de exemplo (simulada)
function createPixPayment(plan: DonationPlan) {
  // aqui, em um cenário real, você chamaria um backend:
  // POST /api/pagamentos/pix  { planoId: plan.id }
  const amount = plan.price.toFixed(2).replace(".", ",");
  const copyPaste = `Chave PIX: ${PIX_KEY} | Valor: R$ ${amount} | Plano: ${plan.name}`;

  return {
    pixKey: PIX_KEY,
    amount,
    description: `Doação Plano ${plan.name}`,
    copyPaste,
  };
}

export function HowToHelpPage() {
  const [selectedPlan, setSelectedPlan] = useState<DonationPlan | null>(null);
  const [pixData, setPixData] = useState<ReturnType<typeof createPixPayment> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChoosePlan = (plan: DonationPlan) => {
    const payment = createPixPayment(plan);
    setSelectedPlan(plan);
    setPixData(payment);
    setDialogOpen(true);
  };

  const handleCopyPix = () => {
    if (!pixData) return;
    navigator.clipboard.writeText(pixData.copyPaste).then(() => {
      toast.success("Dados do PIX copiados para a área de transferência!");
    });
  };

  return (
    <div className="bg-gray-50 pb-16">
      {/* Seção: Como Você Pode Ajudar? */}
      <section className="max-w-6xl mx-auto pt-16 px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4">
            <HandHeart className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Como Você Pode Ajudar?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Existem diversas formas de fazer a diferença na vida dos animais abandonados.
            Escolha a maneira que mais combina com você!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Adote um Animal */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center mb-3">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
              <CardTitle>Adote um Animal</CardTitle>
              <CardDescription>
                Dê um lar amoroso para um cão ou gato que precisa de você. A adoção é a forma mais direta de salvar uma vida.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                Ver Animais
              </Button>
            </CardContent>
          </Card>

          {/* Doação */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
                <span className="font-bold text-green-600">R$</span>
              </div>
              <CardTitle>Faça uma Doação</CardTitle>
              <CardDescription>
                Contribua financeiramente para alimentação, tratamento médico e manutenção do abrigo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={() => handleChoosePlan(PLANS[0])}
              >
                Doar Agora
              </Button>
            </CardContent>
          </Card>

          {/* Voluntariado */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <CardTitle>Seja Voluntário</CardTitle>
              <CardDescription>
                Dedique seu tempo ajudando nos cuidados diários, eventos e campanhas de arrecadação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                Voluntariar-se
              </Button>
            </CardContent>
          </Card>

          {/* Lar Temporário */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
                <Home className="w-5 h-5 text-purple-500" />
              </div>
              <CardTitle>Lar Temporário</CardTitle>
              <CardDescription>
                Acolha temporariamente um animal enquanto ele aguarda uma adoção definitiva.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                Saiba Mais
              </Button>
            </CardContent>
          </Card>

          {/* Doação de Suprimentos */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-3">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
              </div>
              <CardTitle>Doe Suprimentos</CardTitle>
              <CardDescription>
                Ração, remédios, cobertores, brinquedos e outros itens são sempre bem-vindos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                Ver Lista
              </Button>
            </CardContent>
          </Card>

          {/* Divulgue */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center mb-3">
                <Megaphone className="w-5 h-5 text-cyan-500" />
              </div>
              <CardTitle>Divulgue</CardTitle>
              <CardDescription>
                Compartilhe nas redes sociais para aumentar o alcance e encontrar mais adotantes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                Compartilhar
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Seção: Planos de Doação */}
      <section className="max-w-6xl mx-auto mt-16 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Planos de Doação Mensal</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Torne-se um doador recorrente e ajude continuamente na manutenção do abrigo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`border shadow-sm ${
                plan.highlight ? "border-green-500 ring-2 ring-green-300" : "border-gray-200"
              }`}
            >
              <CardHeader>
                {plan.highlight && (
                  <span className="inline-block text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full mb-2">
                    Mais Popular
                  </span>
                )}
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription className="mt-2">
                  <span className="text-2xl font-bold text-green-600">
                    R$ {plan.price}/mês
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-sm text-gray-700 space-y-1">
                  {plan.benefits.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>

                <Button
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleChoosePlan(plan)}
                >
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Dialog PIX */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedPlan
                ? `Doação - Plano ${selectedPlan.name}`
                : "Doação"}
            </DialogTitle>
          </DialogHeader>

          {pixData && (
            <div className="space-y-4">
              <div>
                <Label>Valor</Label>
                <Input value={`R$ ${pixData.amount}`} readOnly />
              </div>

              <div>
                <Label>Chave PIX</Label>
                <Input value={pixData.pixKey} readOnly />
              </div>

              <div>
                <Label>Copiar e colar (descrição)</Label>
                <textarea
                  className="w-full border rounded-md p-2 text-sm"
                  rows={3}
                  readOnly
                  value={pixData.copyPaste}
                />
              </div>

              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={handleCopyPix}
              >
                Copiar dados do PIX
              </Button>

              <p className="text-xs text-gray-500">
                Este é um exemplo de integração de pagamento com PIX estático.
                Em um ambiente real, estes dados viriam de uma API de pagamento.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
