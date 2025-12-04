import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckCircle2 } from 'lucide-react';

export function ProjectSection() {
  const projects = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1517854883321-ab2a463cce90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXBweSUyMGFkb3B0aW9ufGVufDF8fHx8MTc2MTA2NzEzOXww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Nosso projeto resgata animais e oferece a eles um lar, cuidado médico e amor.",
      bgColor: "bg-green-400"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1749135872075-2bbc4a963f02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0cyUyMGRvZ3MlMjBzaGVsdGVyfGVufDF8fHx8MTc2MTE2OTY2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Trabalhamos para que um futuro melhor e feliz, gatos, ajudando-os a encontrar lares amorosos.",
      bgColor: "bg-green-400"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1717085102580-68eda533012e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBoZWxwaW5nJTIwZG9nfGVufDF8fHx8MTc2MTE2OTY2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Com sua ajuda, conseguimos alimentar, abrigar e encontrar lares para animais resgatados.",
      bgColor: "bg-green-400"
    }
  ];

  return (
    <section id="projeto" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl mb-12">
          Conheça nosso projeto
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative rounded-3xl overflow-hidden mb-4 aspect-[4/5]">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Checkmark Badge */}
                <div className={`absolute top-4 right-4 ${project.bgColor} rounded-full p-2 shadow-lg`}>
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-center text-gray-700 px-4">
                {project.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
