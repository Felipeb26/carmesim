export interface IAgendamento {
    clienteId: number;
    funcionarioId: number;
    dataHoraAgendada: string;
    status: "PENDENTE" | "CONFIRMADO" | "REAGENDADO" | "AGUARDANDO_CLIENTE" | "CANCELADO_CLIENTE" | "CANCELADO_ESTUDIO" | "NAO_COMPARECEU" | "CONCLUIDO" | "RETORNO_AGENDADO" | "AGUARDANDO_SINAL";
    descricaoTattoo: string;
    precoEstimado: number;
    pago: boolean;
    observacao: string;
    dataCancelamento?: string;
    sinalPago?: number;
}

