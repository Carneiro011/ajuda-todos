import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Camera, Upload, MapPin, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ReportAnimalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReportAnimalDialog({ open, onOpenChange }: ReportAnimalDialogProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    contactName: '',
    contactPhone: '',
    animalType: 'dog',
    urgency: 'medium'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotos(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (photos.length === 0) {
      toast.error('Por favor, adicione pelo menos uma foto do animal');
      return;
    }

    if (!formData.location || !formData.description || !formData.contactName) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // In a real app, this would send to a backend
    console.log('Report submitted:', { ...formData, photos });
    
    toast.success('Relatório enviado com sucesso! Nossa equipe irá verificar em breve.');
    
    // Reset form
    setPhotos([]);
    setFormData({
      location: '',
      description: '',
      contactName: '',
      contactPhone: '',
      animalType: 'dog',
      urgency: 'medium'
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reportar Animal Abandonado</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para nos ajudar a resgatar o animal. Sua ação pode salvar uma vida!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photos Section */}
          <div className="space-y-3">
            <Label>Fotos do Animal *</Label>
            <div className="grid grid-cols-3 gap-3">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img src={photo} alt={`Animal ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Foto
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => cameraInputRef.current?.click()}
              >
                <Camera className="w-4 h-4 mr-2" />
                Tirar Foto
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Animal Type */}
          <div className="space-y-2">
            <Label htmlFor="animalType">Tipo de Animal *</Label>
            <select
              id="animalType"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.animalType}
              onChange={(e) => setFormData({ ...formData, animalType: e.target.value })}
            >
              <option value="dog">Cachorro</option>
              <option value="cat">Gato</option>
              <option value="other">Outro</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Localização *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                id="location"
                placeholder="Ex: Rua ABC, 123 - Bairro"
                className="pl-10"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Urgency */}
          <div className="space-y-2">
            <Label htmlFor="urgency">Nível de Urgência *</Label>
            <select
              id="urgency"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
            >
              <option value="low">Baixa - Animal parece saudável</option>
              <option value="medium">Média - Animal precisa de cuidados</option>
              <option value="high">Alta - Animal em perigo imediato</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição da Situação *</Label>
            <Textarea
              id="description"
              placeholder="Descreva o estado do animal, comportamento, condições do local..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Seu Nome *</Label>
              <Input
                id="contactName"
                placeholder="Nome completo"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Telefone para Contato</Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            >
              Enviar Relatório
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
