import { Button } from './ui/button';
import { HeartHandshake, Shield, Award, Users } from 'lucide-react';

export function SolutionsSection() {
  const solutions = [
    {
      id: 1,
      icon: <HeartHandshake className="w-8 h-8" />,
      title: "VÍNCULO EMOCIONAL",
      description: "Conectamos você diretamente com animais que precisam de um lar, criando laços verdadeiros.",
      color: "text-green-500"
    },
    {
      id: 2,
      icon: <Shield className="w-8 h-8" />,
      title: "TRANSPARÊNCIA",
      description: "Rastreamos cada doação e garantimos que sua ajuda chegue aos animais.",
      color: "text-green-500"
    },
    {
      id: 3,
      icon: <Award className="w-8 h-8" />,
      title: "REDE DE DOAÇÕES",
      description: "Sistema seguro de doações que permite você acompanhar o impacto da sua contribuição.",
      color: "text-green-500"
    },
    {
      id: 4,
      icon: <Users className="w-8 h-8" />,
      title: "COMUNIDADE",
      description: "Uma rede de voluntários e doadores comprometidos com o bem-estar animal.",
      color: "text-green-500"
    }
  ];

  return (
    <section id="historia" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl">
              Nossa História & Soluções
            </h2>
            <p className="text-gray-600 text-lg">
              Desde 2023, trabalhamos incansavelmente para mudar a vida de cães e gatos resgatados. Nossa plataforma conecta ONGs, os animais e a comunidade, criando uma rede de amor e cuidado.
            </p>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8">
              Saiba Mais
            </Button>
          </div>

          {/* Right - Solutions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {solutions.map((solution) => (
              <div 
                key={solution.id}
                className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`${solution.color} mb-4`}>
                  {solution.icon}
                </div>
                <h3 className="mb-2 text-green-700">{solution.title}</h3>
                <p className="text-gray-600 text-sm">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
