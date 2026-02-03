-- Create inscricoes table for race registrations
CREATE TABLE public.inscricoes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    sexo TEXT NOT NULL CHECK (sexo IN ('M', 'F')),
    idade INTEGER NOT NULL CHECK (idade >= 5 AND idade <= 120),
    tamanho_camisa TEXT NOT NULL CHECK (tamanho_camisa IN ('P', 'M', 'G')),
    status_pagamento TEXT NOT NULL DEFAULT 'pendente' CHECK (status_pagamento IN ('pendente', 'pago')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new registrations (public registration form)
CREATE POLICY "Anyone can create inscricoes"
ON public.inscricoes
FOR INSERT
WITH CHECK (true);

-- Allow authenticated users (admins) to view all registrations
CREATE POLICY "Authenticated users can view inscricoes"
ON public.inscricoes
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users (admins) to update registrations
CREATE POLICY "Authenticated users can update inscricoes"
ON public.inscricoes
FOR UPDATE
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_inscricoes_updated_at
BEFORE UPDATE ON public.inscricoes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();