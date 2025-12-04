import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, Users } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

export function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1532934066-274478b07d25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYmFuZG9uZWQlMjBkb2clMjBzdHJlZXR8ZW58MXx8fHwxNzYxMTY5NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Cachorro resgatado"
                className="rounded-3xl shadow-2xl w-full aspect-square object-cover"
              />
              {/* Green blob decoration */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-green-500 rounded-full opacity-20 -z-10"></div>
            </div>

            {/* Volunteers Card */}
            <div className="absolute bottom-8 right-8 bg-white rounded-2xl shadow-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-500" />
                <span>Voluntários</span>
              </div>
              <div className="flex -space-x-2">
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=volunteer1" />
                  <AvatarFallback>V1</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=volunteer2" />
                  <AvatarFallback>V2</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=volunteer3" />
                  <AvatarFallback>V3</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl">
              O que é o nosso projeto?
            </h2>
            <p className="text-gray-600 text-lg">
              Somos um time de voluntários da FCS que decidiu usar a tecnologia para apoiar uma ONG de proteção animal em Votorantim. Nosso objetivo é conectar cães e gatos resgatados a pessoas dispostas a ajudá-los até que encontrem um lar cheio de amor, desde adoção a transparência.
            </p>

            {/* Feedback Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
              <h3 className="mb-4">Feedback</h3>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-600">(4.9 de Reviews)</span>
              </div>
              <div className="flex -space-x-2 mb-3">
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user2" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user3" />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-gray-600 text-sm italic">
                "Projeto incrível! Consegui ajudar vários animais e ver a diferença que isso faz."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
