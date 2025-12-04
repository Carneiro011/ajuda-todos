import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Heart, MapPin, Calendar, Ruler, Search, Filter } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Animal {
  id: number;
  name: string;
  type: 'dog' | 'cat';
  age: string;
  size: string;
  gender: 'Macho' | 'Fêmea';
  location: string;
  image: string;
  description: string;
  vaccinated: boolean;
  neutered: boolean;
  personality: string[];
}

export function AdoptionPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    type: 'all',
    size: 'all',
    age: 'all',
    search: ''
  });

  const animals: Animal[] = [
    {
      id: 1,
      name: "Thor",
      type: 'dog',
      age: "3 anos",
      size: "Grande",
      gender: "Macho",
      location: "Votorantim, SP",
      image: "https://images.unsplash.com/photo-1706745262357-5ecaa3154433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcHVwcHklMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExMTU0NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Thor é um cachorro muito carinhoso e brincalhão. Adora crianças e se dá bem com outros pets.",
      vaccinated: true,
      neutered: true,
      personality: ["Brincalhão", "Amigável", "Ativo"]
    },
    {
      id: 2,
      name: "Luna",
      type: 'cat',
      age: "2 anos",
      size: "Pequeno",
      gender: "Fêmea",
      location: "Sorocaba, SP",
      image: "https://images.unsplash.com/photo-1599846907490-850533cd3297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXR0ZW4lMjBjYXQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExNzAxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Luna é uma gatinha tranquila e carinhosa. Perfeita para apartamentos e famílias calmas.",
      vaccinated: true,
      neutered: true,
      personality: ["Calma", "Carinhosa", "Independente"]
    },
    {
      id: 3,
      name: "Rex",
      type: 'dog',
      age: "5 anos",
      size: "Médio",
      gender: "Macho",
      location: "Votorantim, SP",
      image: "https://images.unsplash.com/photo-1641349067134-245df2efdc95?w=800",
      description: "Rex é leal, protetor e muito obediente. Ideal para quem busca um companheiro fiel.",
      vaccinated: true,
      neutered: true,
      personality: ["Leal", "Protetor", "Obediente"]
    },
    {
      id: 4,
      name: "Mel",
      type: 'dog',
      age: "1 ano",
      size: "Pequeno",
      gender: "Fêmea",
      location: "Sorocaba, SP",
      image: "https://images.unsplash.com/photo-1517854883321-ab2a463cce90?w=800",
      description: "Mel é uma filhote cheia de energia e amor para dar. Adora brincar e aprender truques novos.",
      vaccinated: true,
      neutered: false,
      personality: ["Energética", "Inteligente", "Dócil"]
    },
    {
      id: 5,
      name: "Simba",
      type: 'cat',
      age: "4 anos",
      size: "Médio",
      gender: "Macho",
      location: "Votorantim, SP",
      image: "https://images.unsplash.com/photo-1700206635806-dd3235b21c42?w=800",
      description: "Simba é um gato aventureiro e curioso. Adora explorar e brincar com outros gatos.",
      vaccinated: true,
      neutered: true,
      personality: ["Aventureiro", "Sociável", "Curioso"]
    },
    {
      id: 6,
      name: "Bella",
      type: 'dog',
      age: "6 meses",
      size: "Médio",
      gender: "Fêmea",
      location: "Sorocaba, SP",
      image: "https://images.unsplash.com/photo-1749135872075-2bbc4a963f02?w=800",
      description: "Bella é jovem, alegre e cheia de vida. Procura uma família ativa que goste de aventuras.",
      vaccinated: true,
      neutered: false,
      personality: ["Alegre", "Ativa", "Amorosa"]
    }
  ];

  const filteredAnimals = animals.filter(animal => {
    if (filters.type !== 'all' && animal.type !== filters.type) return false;
    if (filters.size !== 'all' && animal.size !== filters.size) return false;
    if (filters.search && !animal.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
    toast.success(
      favorites.includes(id) 
        ? 'Removido dos favoritos' 
        : 'Adicionado aos favoritos'
    );
  };

  const handleAdopt = (animal: Animal) => {
    toast.success(`Iniciando processo de adoção para ${animal.name}. Em breve entraremos em contato!`);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Animais Disponíveis para Adoção</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Encontre seu novo melhor amigo! Todos os nossos animais são vacinados, vermifugados e passam por avaliação veterinária.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3>Filtros</h3>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar por nome</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Ex: Rex"
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Animal</Label>
              <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="dog">Cachorro</SelectItem>
                  <SelectItem value="cat">Gato</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Porte</Label>
              <Select value={filters.size} onValueChange={(value) => setFilters({ ...filters, size: value })}>
                <SelectTrigger id="size">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Pequeno">Pequeno</SelectItem>
                  <SelectItem value="Médio">Médio</SelectItem>
                  <SelectItem value="Grande">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Idade</Label>
              <Select value={filters.age} onValueChange={(value) => setFilters({ ...filters, age: value })}>
                <SelectTrigger id="age">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="filhote">Filhote (até 1 ano)</SelectItem>
                  <SelectItem value="adulto">Adulto (1-7 anos)</SelectItem>
                  <SelectItem value="senior">Senior (7+ anos)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Mostrando {filteredAnimals.length} de {animals.length} animais
          </div>
        </div>

        {/* Animals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.map((animal) => (
            <Card key={animal.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <ImageWithFallback
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(animal.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart 
                    className={`w-6 h-6 ${favorites.includes(animal.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                  />
                </button>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white text-gray-800">
                    {animal.type === 'dog' ? '🐕 Cachorro' : '🐱 Gato'}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{animal.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {animal.location}
                    </CardDescription>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {animal.age}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Ruler className="w-4 h-4" />
                    {animal.size}
                  </div>
                  <Badge variant="outline">{animal.gender}</Badge>
                </div>

                <p className="text-gray-600 text-sm mt-3">
                  {animal.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {animal.personality.map((trait, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 mt-3">
                  {animal.vaccinated && (
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      ✓ Vacinado
                    </Badge>
                  )}
                  {animal.neutered && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs">
                      ✓ Castrado
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleAdopt(animal)}
                >
                  Quero Adotar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAnimals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Nenhum animal encontrado com os filtros selecionados.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-green-500 rounded-3xl p-8 md:p-12 text-white mt-16 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Não encontrou o que procurava?</h2>
          <p className="text-lg mb-6 opacity-90">
            Recebemos novos animais constantemente. Cadastre-se para receber alertas quando chegarem pets com o perfil que você busca.
          </p>
          <Button 
            className="bg-white text-green-600 hover:bg-gray-100"
            onClick={() => toast.success('Redirecionando para cadastro de alertas...')}
          >
            Criar Alerta de Adoção
          </Button>
        </div>
      </div>
    </div>
  );
}
