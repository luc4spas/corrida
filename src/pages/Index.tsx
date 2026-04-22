import HeroSection from "@/components/HeroSection";
import EventDetails from "@/components/EventDetails";
import { XCircle } from "lucide-react";

const Index = () => {
  const scrollToClosed = () => {
    const el = document.getElementById("inscricoes-encerradas");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen">
      <HeroSection onRegisterClick={scrollToClosed} />
      <EventDetails />

      {/* Inscrições Encerradas */}
      <section id="inscricoes-encerradas" className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl rounded-2xl bg-card p-8 text-center shadow-card md:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Inscrições <span className="text-gradient-secondary">Encerradas</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              As inscrições para a 2ª Corrida Rústica Semeando foram encerradas.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Agradecemos a todos os participantes! Nos vemos no dia 24 de Maio às 08h
              em frente à Igreja Evangélica Semeando Família.
            </p>
            <p className="mt-6 text-sm font-medium text-foreground">
              Dúvidas? Entre em contato: <span className="text-primary">(22) 98851-6911</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-8 text-center text-primary-foreground/70">
        <div className="container mx-auto px-4">
          <p className="font-display text-lg font-bold text-primary-foreground">
            2ª Corrida Rústica Semeando
          </p>
          <p className="mt-1 text-sm">
            Igreja Evangélica Semeando Família • 24 de Maio de 2025
          </p>
          <p className="mt-4 text-xs text-primary-foreground/50">
            © 2025 Todos os direitos reservados
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
