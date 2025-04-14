import { ITipoDocumentos } from "./ITipoDocumentos"

export interface ICliente {
    id: number
    nome: string
    email: string
    telefone: string
    dataNascimento: string
    documento: string
    tipoDocumento: ITipoDocumentos
    termoConsentimento: boolean
}