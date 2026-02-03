import { Button } from "@/components/ui/button";
import { CheckCircle, Copy, Phone, QrCode, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import QRCode from "react-qr-code";

interface PaymentScreenProps {
  registration: {
    nome: string;
    sexo: "M" | "F";
    idade: number;
    tamanho_camisa: "P" | "M" | "G";
  };
  onBack: () => void;
}

const PIX_KEY = "semeandofamilia@gmail.com";
const SUPPORT_PHONE = "(22) 98851-6911";
const EVENT_VALUE = 70;

const PaymentScreen = ({ registration, onBack }: PaymentScreenProps) => {
  const copyPixKey = () => {
    navigator.clipboard.writeText(PIX_KEY.replace(/[^\d]/g, ""));
    toast.success("Chave PIX copiada!");
  };

  // Generate PIX code for QR
  const pixPayload = `00020126470014BR.GOV.BCB.PIX0125semeandofamilia@gmail.com520400005303986540570.005802BR5901N6001C62110507CORRIDA63044507`;

  return (
    <section className="min-h-screen bg-muted py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-xl">
          {/* Success Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Inscrição Realizada!
            </h2>
            <p className="mt-2 text-muted-foreground">
              Agora é só realizar o pagamento via PIX
            </p>
          </div>

          {/* Registration Summary */}
          <div className="mb-6 rounded-xl bg-card p-5 shadow-card">
            <h3 className="mb-4 font-display font-semibold text-foreground">Resumo da Inscrição</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-muted p-3">
                <span className="text-muted-foreground">Nome</span>
                <p className="font-medium text-foreground">{registration.nome}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <span className="text-muted-foreground">Sexo</span>
                <p className="font-medium text-foreground">
                  {registration.sexo === "M" ? "Masculino" : "Feminino"}
                </p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <span className="text-muted-foreground">Idade</span>
                <p className="font-medium text-foreground">{registration.idade} anos</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <span className="text-muted-foreground">Camisa</span>
                <p className="font-medium text-foreground">Tamanho {registration.tamanho_camisa}</p>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="mb-6 overflow-hidden rounded-xl bg-card shadow-card">
            {/* Header */}
            <div className="hero-gradient px-5 py-4 text-primary-foreground">
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold">Valor da Inscrição</span>
                <span className="font-display text-2xl font-bold">R$ {EVENT_VALUE},00</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center p-6">
              <div className="mb-4 rounded-lg bg-background p-4">
                <QRCode
                  value={pixPayload}
                  size={180}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
              <p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <QrCode className="h-4 w-4" />
                Escaneie o QR Code com seu app do banco
              </p>

              {/* PIX Key */}
              <div className="w-full rounded-lg border-2 border-dashed border-border bg-muted/50 p-4">
                <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Ou copie a chave PIX (CNPJ)
                </p>
                <div className="flex items-center justify-between gap-3 rounded-lg bg-background px-4 py-3">
                  <code className="font-mono text-sm text-foreground">{PIX_KEY}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyPixKey}
                    className="text-primary hover:text-primary"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Support Contact */}
          <div className="mb-6 rounded-xl border border-secondary/30 bg-accent p-5">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-secondary/10 p-3">
                <Phone className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dúvidas ou problemas?</p>
                <a
                  href={`https://wa.me/55${SUPPORT_PHONE.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-bold text-secondary hover:underline"
                >
                  {SUPPORT_PHONE}
                </a>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-6 rounded-xl bg-card p-5 shadow-soft">
            <h4 className="mb-3 font-display font-semibold text-foreground">📋 Importante</h4>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                Após o pagamento, sua inscrição será confirmada em até 24h
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                Retire seu kit no dia 23 de Maio, das 09:00 às 11:30
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                Leve um documento com foto para retirar o kit
              </li>
            </ul>
          </div>

          {/* Back Button */}
          <Button
            variant="outline"
            size="lg"
            onClick={onBack}
            className="w-full gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Fazer nova inscrição
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PaymentScreen;
