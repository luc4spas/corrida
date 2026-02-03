import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import EventDetails from "@/components/EventDetails";
import RegistrationForm from "@/components/RegistrationForm";
import PaymentScreen from "@/components/PaymentScreen";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type RegistrationData = {
  nome: string;
  whatsapp: string;
  sexo: "M" | "F";
  idade: number;
  tamanho_camisa: "P" | "M" | "G";
};

const Index = () => {
  const [step, setStep] = useState<"home" | "payment">("home");
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);

  const scrollToForm = () => {
    const form = document.getElementById("inscricao");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRegistration = async (data: RegistrationData) => {
    try {
      const { error } = await supabase.from("inscricoes" as any).insert({
        nome: data.nome,
        whatsapp: data.whatsapp,
        sexo: data.sexo,
        idade: data.idade,
        tamanho_camisa: data.tamanho_camisa,
        status_pagamento: "pendente",
      });

      if (error) {
        console.error("Erro ao salvar inscrição:", error);
        toast.error("Erro ao processar inscrição. Tente novamente.");
        return;
      }

      setRegistrationData(data);
      setStep("payment");
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Inscrição registrada com sucesso!");
    } catch (err) {
      console.error("Erro:", err);
      toast.error("Erro ao processar inscrição. Tente novamente.");
    }
  };

  const handleNewRegistration = () => {
    setStep("home");
    setRegistrationData(null);
  };

  if (step === "payment" && registrationData) {
    return <PaymentScreen registration={registrationData} onBack={handleNewRegistration} />;
  }

  return (
    <main className="min-h-screen">
      <HeroSection onRegisterClick={scrollToForm} />
      <EventDetails />
      <RegistrationForm onSubmit={handleRegistration} />
      
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
