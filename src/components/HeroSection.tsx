import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Play, Star, MapPin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface HeroSectionProps {
  onVejaFinal: () => void;
}

export function HeroSection({ onVejaFinal }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl">
              Transforme vidas com um simples gesto de <span className="text-green-500">amor.</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Com a sua ajuda, centenas de cães e gatos resgatados podem ter uma nova chance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white px-8"
                onClick={onVejaFinal}
              >
                Veja Final
              </Button>
              <Button variant="outline" className="gap-2">
                Conheça Nossos Animais
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Content - Dog Image with Cards */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1641349067134-245df2efdc95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHJlc2N1ZXxlbnwxfHx8fDE3NjExMzUxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Cachorro feliz resgatado"
                className="w-full h-[500px] object-cover"
              />
              {/* Green blob decoration */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-500 rounded-full opacity-20 blur-3xl"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute bottom-8 left-4 bg-white rounded-2xl shadow-lg p-4 max-w-[200px]">
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1517854883321-ab2a463cce90?w=100"
                  alt="Rex"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4>Rex Rauch</h4>
                  <p className="text-gray-500 text-sm">Resgatado em SP</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">4.9</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-8 right-4 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=volunteer" />
                <AvatarFallback>V</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm">Ajudamos um Pet</p>
                <p className="text-xs text-gray-500">hoje</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
