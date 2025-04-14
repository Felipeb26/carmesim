export interface IEvento {
    imagem: string;
    titulo: string;
    descricao: string;
    organizadoPor: string;
    dataEvento: Date | string;
    acompanhar: "remoto" | "presencial" | "hibrido";
    localidade: string;
    website: string;
}