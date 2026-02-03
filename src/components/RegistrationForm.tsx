import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { z } from "zod";
import { User, Ruler, Shirt, FileText, ArrowRight, Phone } from "lucide-react";

// Esquema de validação com Zod
const formSchema = z.object({
  nome: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  whatsapp: z.string().min(10, "WhatsApp inválido").max(15, "WhatsApp muito longo"),
  sexo: z.enum(["M", "F"], { required_error: "Selecione o sexo" }),
  idade: z.number({ invalid_type_error: "Idade inválida" }).min(5, "Idade mínima: 5 anos").max(120, "Idade inválida"),
  tamanho_camisa: z.enum(["P", "M", "G"], { required_error: "Selecione o tamanho" }),
  termo_aceito: z.literal(true, { errorMap: () => ({ message: "Você deve aceitar o termo de responsabilidade" }) }),
});

type FormData = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  onSubmit: (data: Omit<FormData, "termo_aceito">) => void;
}

const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sexo, setSexo] = useState<"M" | "F" | "">("");
  const [idade, setIdade] = useState("");
  const [tamanhoCamisa, setTamanhoCamisa] = useState<"P" | "M" | "G" | "">("");
  const [termoAceito, setTermoAceito] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse({
      nome,
      whatsapp,
      sexo: sexo || undefined,
      idade: idade ? parseInt(idade) : undefined,
      tamanho_camisa: tamanhoCamisa || undefined,
      termo_aceito: termoAceito,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    onSubmit({
      nome: result.data.nome,
      whatsapp: result.data.whatsapp,
      sexo: result.data.sexo,
      idade: result.data.idade,
      tamanho_camisa: result.data.tamanho_camisa,
    });
  };

  return (
    <section id="inscricao" className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-xl">
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Faça sua <span className="text-gradient-secondary">Inscrição</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Preencha os dados abaixo para a 2ª Corrida Rústica Semeando
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl bg-card p-6 shadow-card md:p-8">
            {/* Campo Nome */}
            <div className="mb-5">
              <Label htmlFor="nome" className="mb-2 flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4 text-primary" />
                Nome Completo
              </Label>
              <Input
                id="nome"
                placeholder="Digite seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={errors.nome ? "border-destructive" : ""}
              />
              {errors.nome && <p className="mt-1 text-xs text-destructive">{errors.nome}</p>}
            </div>

            {/* Novo Campo WhatsApp */}
            <div className="mb-5">
              <Label htmlFor="whatsapp" className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4 text-primary" />
                WhatsApp (com DDD)
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="(22) 98851-6911"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className={errors.whatsapp ? "border-destructive" : ""}
              />
              {errors.whatsapp && <p className="mt-1 text-xs text-destructive">{errors.whatsapp}</p>}
            </div>

            {/* Campo Sexo */}
            <div className="mb-5">
              <Label className="mb-3 flex items-center gap-2 text-sm font-medium">
                <Ruler className="h-4 w-4 text-primary" />
                Sexo
              </Label>
              <RadioGroup value={sexo} onValueChange={(v) => setSexo(v as "M" | "F")} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="M" id="masculino" />
                  <Label htmlFor="masculino" className="cursor-pointer font-normal">Masculino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="F" id="feminino" />
                  <Label htmlFor="feminino" className="cursor-pointer font-normal">Feminino</Label>
                </div>
              </RadioGroup>
              {errors.sexo && <p className="mt-1 text-xs text-destructive">{errors.sexo}</p>}
            </div>

            {/* Campo Idade */}
            <div className="mb-5">
              <Label htmlFor="idade" className="mb-2 flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4 text-primary" />
                Idade
              </Label>
              <Input
                id="idade"
                type="number"
                placeholder="Sua idade"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                className={errors.idade ? "border-destructive" : ""}
              />
              {errors.idade && <p className="mt-1 text-xs text-destructive">{errors.idade}</p>}
            </div>

            {/* Tamanho da Camisa */}
            <div className="mb-6">
              <Label className="mb-3 flex items-center gap-2 text-sm font-medium">
                <Shirt className="h-4 w-4 text-primary" />
                Tamanho da Camisa
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {(["P", "M", "G"] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setTamanhoCamisa(size)}
                    className={`rounded-lg border-2 py-3 font-display font-bold transition-all ${
                      tamanhoCamisa === size
                        ? "border-secondary bg-secondary/10 text-secondary"
                        : "border-border bg-background text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {errors.tamanho_camisa && <p className="mt-1 text-xs text-destructive">{errors.tamanho_camisa}</p>}
            </div>

            {/* Checkbox do Termo */}
            <div className="mb-6 rounded-lg border border-border bg-muted/50 p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="termo"
                  checked={termoAceito}
                  onCheckedChange={(checked) => setTermoAceito(checked === true)}
                />
                <Label htmlFor="termo" className="text-sm leading-relaxed">
                  Li e concordo com o{" "}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button type="button" className="font-semibold text-primary underline underline-offset-2">
                        Termo de Responsabilidade
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Termo de Responsabilidade</DialogTitle>
                      </DialogHeader>
                      <TermoContent />
                    </DialogContent>
                  </Dialog>
                </Label>
              </div>
              {errors.termo_aceito && <p className="mt-2 text-xs text-destructive">{errors.termo_aceito}</p>}
            </div>

            <Button type="submit" className="w-full gap-2 bg-orange-600 hover:bg-orange-700">
              Continuar para Pagamento
              <ArrowRight className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Componente do conteúdo do Termo baseado no documento oficial
const TermoContent = () => (
  <div className="space-y-4 text-sm text-foreground/80">
    <h3 className="font-bold">2ª CORRIDA RÚSTICA DA IGREJA EVANGÉLICA SEMEANDO FAMÍLIA</h3>
    <p>Favor preencher a ficha de forma legível; Entregar preenchido e assinado no momento da retirada do kit.</p>
    
    <div className="rounded bg-muted p-3">
      <h4 className="font-semibold mb-2">DECLARAÇÃO</h4>
      <p>
        Eu abaixo assinado, declaro que minha participação ocorre por livre e espontânea vontade, 
        isentando de quaisquer responsabilidades e acidente que venha a sofrer, os organizadores, 
        patrocinadores e promotores em meu nome e de meus herdeiros ou sucessores.
      </p>
    </div>

    <p>
      Declaro estar em boas condições físicas e médicas para disputar esse simulado e que estou treinado 
      adequadamente para essa prova. Assumo quaisquer despesas médicas e hospitalares decorrentes de 
      acidentes que porventura venham a ocorrer durante a prova.
    </p>

    <p>
      Autorizo a veiculação da minha imagem em televisão, jornais ou qualquer outro tipo de transmissão 
      para essa prova, sem direito a qualquer valor por isso.
    </p>

    <p className="text-xs font-medium">Modalidade: 5 Km | Local: São Pedro da Aldeia.</p>
  </div>
);

export default RegistrationForm;