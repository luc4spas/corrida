import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-corrida.jpeg";

interface HeroSectionProps {
  onRegisterClick: () => void;
}

const HeroSection = ({ onRegisterClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen overflow-hidden">
    {/* Background Image Container */}
<div className="absolute inset-0 overflow-hidden">
  
  {/* Imagem Mobile (Vertical - IMG_1847.jpg) */}
  <img
    src="/IMG_1847.jpeg"
    alt="2ª Corrida Rústica Semeando"
    className="block md:hidden h-full w-full object-cover object-top"
  />

  {/* Imagem Desktop (Horizontal - IMG_1848.jpg) */}
  <img
    src="/IMG_1848.jpeg"
    alt="2ª Corrida Rústica Semeando" 
    className="hidden md:block h-full w-full object-cover" 
  />

  {/* Overlay para contraste (opcional) */}
  <div className="absolute inset-0 bg-black/10" />
</div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-4 py-8 text-primary-foreground">
        {/* Top Badge */}
        <div className="animate-fade-in-up mt-8">
          <div className="cta-gradient rounded-full px-6 py-2 text-sm font-bold uppercase tracking-widest shadow-cta">
            24 . Maio
          </div>
        </div>

        {/* Main Title */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="animate-fade-in-up font-display text-5xl font-black leading-tight md:text-7xl lg:text-8xl" style={{ animationDelay: '0.1s' }}>
            <span className="block text-primary-foreground drop-shadow-lg">2ª CORRIDA</span>
            <span className="text-gradient-primary drop-shadow-lg">RÚSTICA</span>
          </h1>
          <p className="animate-fade-in-up mt-2 font-display text-2xl font-semibold tracking-[0.3em] text-primary-foreground/90 md:text-3xl" style={{ animationDelay: '0.2s' }}>
            SEMEANDO
          </p>
        </div>

        {/* Event Info Cards */}
        <div className="w-full max-w-4xl animate-fade-in-up space-y-4 pb-8" style={{ animationDelay: '0.3s' }}>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <InfoCard icon={<Calendar className="h-5 w-5" />} label="Data" value="24 de Maio" />
            <InfoCard icon={<Clock className="h-5 w-5" />} label="Horário" value="08:00" />
            <InfoCard icon={<MapPin className="h-5 w-5" />} label="Percurso" value="5 km" />
            <InfoCard icon={<Trophy className="h-5 w-5" />} label="Valor" value="R$ 70,00" />
          </div>

          {/* CTA Button */}
          <Button
            variant="cta"
            size="xl"
            className="w-full animate-pulse-slow"
            onClick={onRegisterClick}
          >
            Quero me inscrever agora
          </Button>
        </div>
      </div>
    </section>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoCard = ({ icon, label, value }: InfoCardProps) => (
  <div className="flex flex-col items-center rounded-xl bg-primary-foreground/10 p-3 backdrop-blur-sm transition-all hover:bg-primary-foreground/20">
    <div className="mb-1 text-secondary">{icon}</div>
    <span className="text-xs font-medium uppercase tracking-wide text-primary-foreground/70">{label}</span>
    <span className="font-display text-sm font-bold">{value}</span>
  </div>
);

export default HeroSection;
