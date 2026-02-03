import { MapPin, Gift, Calendar, Award } from "lucide-react";

const EventDetails = () => {
  return (
    <section className="bg-card py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center font-display text-3xl font-bold text-foreground md:text-4xl">
          Informações do <span className="text-gradient-primary">Evento</span>
        </h2>
        <p className="mb-12 text-center text-muted-foreground">
          Tudo que você precisa saber sobre a corrida
        </p>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {/* Local */}
          <DetailCard
            icon={<MapPin className="h-7 w-7" />}
            title="Local de Largada"
            description="Em frente à Igreja Evangélica Semeando Família"
            details={[
              "Rua Honório Sampaio, nº 20",
              "Recanto do Sol",
              "São Pedro da Aldeia - RJ"
            ]}
            variant="primary"
          />

          {/* Kit */}
          <DetailCard
            icon={<Gift className="h-7 w-7" />}
            title="Kit do Corredor"
            description="Incluso na inscrição"
            details={[
              "Camisa oficial do evento",
              "Viseira exclusiva",
              "Medalha de participação"
            ]}
            variant="secondary"
          />

          {/* Retirada */}
          <DetailCard
            icon={<Calendar className="h-7 w-7" />}
            title="Retirada do Kit"
            description="Dia 23 de Maio"
            details={[
              "Horário: 09:00 às 11:30",
              "Local: Igreja Evangélica Semeando Família",
              "Levar documento com foto"
            ]}
            variant="secondary"
          />

          {/* Premiação */}
          <DetailCard
            icon={<Award className="h-7 w-7" />}
            title="Premiação"
            description="Troféu para os melhores"
            details={[
              "Top 5 Masculino",
              "Top 5 Feminino",
              "Entrega após a corrida"
            ]}
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
};

interface DetailCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  variant: "primary" | "secondary";
}

const DetailCard = ({ icon, title, description, details, variant }: DetailCardProps) => {
  const iconBg = variant === "primary" 
    ? "bg-primary/10 text-primary" 
    : "bg-secondary/10 text-secondary";
  
  const borderColor = variant === "primary"
    ? "border-l-primary"
    : "border-l-secondary";

  return (
    <div className={`group rounded-xl border-l-4 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${borderColor}`}>
      <div className="flex items-start gap-4">
        <div className={`rounded-lg p-3 ${iconBg}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{description}</p>
          <ul className="space-y-1.5">
            {details.map((detail, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-foreground/80">
                <span className={`h-1.5 w-1.5 rounded-full ${variant === "primary" ? "bg-primary" : "bg-secondary"}`} />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
