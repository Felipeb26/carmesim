export interface IFuncionario {
    id: number;
    nome: string;
    especialidade: string;
    email: string;
    telefone: string;
    precoPorHora: number;
    bio: string;
    funcionarioType: "TATUADOR" | "SECRETARIO" | "BODY_PIERCER" | "OUTROS";
    status: "ATIVO" | "INATIVO" | "FERIAS" | "LICENCA";
}
