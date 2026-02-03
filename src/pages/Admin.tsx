import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Users, DollarSign, Filter, LogOut, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Inscricao = {
  id: string;
  nome: string;
  whatsapp:string;
  sexo: "M" | "F";
  idade: number;
  tamanho_camisa: "P" | "M" | "G";
  status_pagamento: "pendente" | "pago";
  created_at: string;
  updated_at: string;
};

const Admin = () => {
  const navigate = useNavigate();
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSexo, setFilterSexo] = useState<string>("all");
  const [filterTamanho, setFilterTamanho] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    checkAuth();
    fetchInscricoes();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const fetchInscricoes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("inscricoes" as any)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar inscrições:", error);
      toast.error("Erro ao carregar inscrições");
    } else {
      setInscricoes((data as unknown as Inscricao[]) || []);
    }
    setLoading(false);
  };

  const updatePaymentStatus = async (id: string, status: "pendente" | "pago") => {
    const { error } = await supabase
      .from("inscricoes" as any)
      .update({ status_pagamento: status })
      .eq("id", id);

    if (error) {
      toast.error("Erro ao atualizar status");
    } else {
      toast.success(`Status atualizado para ${status}`);
      fetchInscricoes();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const filteredInscricoes = inscricoes.filter((i) => {
    if (filterSexo !== "all" && i.sexo !== filterSexo) return false;
    if (filterTamanho !== "all" && i.tamanho_camisa !== filterTamanho) return false;
    if (filterStatus !== "all" && i.status_pagamento !== filterStatus) return false;
    if (searchTerm && !i.nome.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totalInscritos = inscricoes.length;
  const totalPagos = inscricoes.filter((i) => i.status_pagamento === "pago").length;
  const totalArrecadado = totalPagos * 70;

  const countBySize = (size: string) => inscricoes.filter((i) => i.tamanho_camisa === size).length;
  const countBySex = (sex: string) => inscricoes.filter((i) => i.sexo === sex).length;

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="hero-gradient px-4 py-4 text-primary-foreground shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold md:text-2xl">Painel Administrativo</h1>
            <p className="text-sm text-primary-foreground/80">2ª Corrida Rústica Semeando</p>
          </div>
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <StatCard
            icon={<Users className="h-6 w-6" />}
            label="Total de Inscritos"
            value={totalInscritos}
            variant="primary"
          />
          <StatCard
            icon={<DollarSign className="h-6 w-6" />}
            label="Pagamentos Confirmados"
            value={totalPagos}
            variant="secondary"
          />
          <StatCard
            icon={<DollarSign className="h-6 w-6" />}
            label="Valor Arrecadado"
            value={`R$ ${totalArrecadado.toLocaleString("pt-BR")}`}
            variant="primary"
          />
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="mb-2 text-sm font-medium text-muted-foreground">Distribuição</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded bg-muted p-2">
                <span className="block text-muted-foreground">Masc.</span>
                <span className="font-bold text-foreground">{countBySex("M")}</span>
              </div>
              <div className="rounded bg-muted p-2">
                <span className="block text-muted-foreground">Fem.</span>
                <span className="font-bold text-foreground">{countBySex("F")}</span>
              </div>
              <div className="rounded bg-muted p-2">
                <span className="block text-muted-foreground">P</span>
                <span className="font-bold text-foreground">{countBySize("P")}</span>
              </div>
              <div className="rounded bg-muted p-2">
                <span className="block text-muted-foreground">M</span>
                <span className="font-bold text-foreground">{countBySize("M")}</span>
              </div>
              <div className="rounded bg-muted p-2 col-span-2">
                <span className="block text-muted-foreground">G</span>
                <span className="font-bold text-foreground">{countBySize("G")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl bg-card p-4 shadow-card">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Select value={filterSexo} onValueChange={setFilterSexo}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sexo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="M">Masculino</SelectItem>
              <SelectItem value="F">Feminino</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterTamanho} onValueChange={setFilterTamanho}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Tamanho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="P">P</SelectItem>
              <SelectItem value="M">M</SelectItem>
              <SelectItem value="G">G</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pendente">Pendentes</SelectItem>
              <SelectItem value="pago">Pagos</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="sm" onClick={fetchInscricoes}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl bg-card shadow-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-display font-semibold">Nome</TableHead>
                <TableHead className="font-display font-semibold">Whatsapp</TableHead>
                <TableHead className="font-display font-semibold">Sexo</TableHead>
                <TableHead className="font-display font-semibold">Idade</TableHead>
                <TableHead className="font-display font-semibold">Camisa</TableHead>
                <TableHead className="font-display font-semibold">Status</TableHead>
                <TableHead className="font-display font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : filteredInscricoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    Nenhuma inscrição encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredInscricoes.map((inscricao) => (
                  <TableRow key={inscricao.id}>
                    <TableCell className="font-medium">{inscricao.nome}</TableCell>
                    <TableCell className="font-medium">{inscricao.whatsapp}</TableCell>
                    <TableCell>
                      <Badge variant={inscricao.sexo === "M" ? "default" : "secondary"}>
                        {inscricao.sexo === "M" ? "Masculino" : "Feminino"}
                      </Badge>
                    </TableCell>
                    <TableCell>{inscricao.idade} anos</TableCell>
                    <TableCell>
                      <Badge variant="outline">{inscricao.tamanho_camisa}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          inscricao.status_pagamento === "pago"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/20 text-secondary"
                        }
                      >
                        {inscricao.status_pagamento === "pago" ? "✓ Pago" : "⏳ Pendente"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={inscricao.status_pagamento ?? "pendente"}
                        onValueChange={(value) =>
                          updatePaymentStatus(inscricao.id, value as "pendente" | "pago")
                        }
                      >
                        <SelectTrigger className="h-8 w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pendente">Pendente</SelectItem>
                          <SelectItem value="pago">Pago</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Mostrando {filteredInscricoes.length} de {totalInscritos} inscrições
        </p>
      </main>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  variant: "primary" | "secondary";
}

const StatCard = ({ icon, label, value, variant }: StatCardProps) => (
  <div className="rounded-xl bg-card p-4 shadow-card">
    <div className="flex items-center gap-3">
      <div
        className={`rounded-lg p-3 ${
          variant === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-display text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  </div>
);

export default Admin;
